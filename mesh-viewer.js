(() => {
  const meshes = window.optimusMeshes || {};
  const light = [0.38, 0.8, 0.48];

  function setup(canvas) {
    const mesh = meshes[canvas.dataset.mesh];
    const context = canvas.getContext('2d');
    if (!mesh || !context) return;

    const bounds = [0, 1, 2].map(axis => {
      const values = mesh.vertices.map(vertex => vertex[axis]);
      return [Math.min(...values), Math.max(...values)];
    });
    const center = bounds.map(([min, max]) => (min + max) / 2);
    const extent = Math.max(...bounds.map(([min, max]) => max - min));
    const vertices = mesh.vertices.map(vertex => vertex.map((value, axis) => (value - center[axis]) / extent));

    let yaw = 0.45;
    let pitch = -0.3;
    let zoom = 1;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let previousTime = 0;

    canvas.addEventListener('pointerdown', event => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener('pointermove', event => {
      if (!dragging) return;
      yaw += (event.clientX - lastX) * 0.01;
      pitch = Math.max(-1.2, Math.min(1.2, pitch + (event.clientY - lastY) * 0.01));
      lastX = event.clientX;
      lastY = event.clientY;
    });
    canvas.addEventListener('pointerup', () => { dragging = false; });
    canvas.addEventListener('pointercancel', () => { dragging = false; });
    canvas.addEventListener('wheel', event => {
      event.preventDefault();
      zoom = Math.max(0.65, Math.min(2.2, zoom * Math.exp(-event.deltaY * 0.001)));
    }, { passive: false });

    function draw(time) {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      if (!dragging && previousTime) yaw += Math.min(time - previousTime, 50) * 0.0003;
      previousTime = time;

      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      const scale = Math.min(width, height) * 0.82 * zoom;
      const rotated = vertices.map(([x, y, z]) => {
        const rx = x * cy + z * sy;
        const rz = -x * sy + z * cy;
        return [rx, y * cp - rz * sp, y * sp + rz * cp];
      });
      const projected = rotated.map(([x, y, z]) => {
        const perspective = 2.8 / (2.8 - z);
        return [width / 2 + x * scale * perspective, height / 2 - y * scale * perspective];
      });
      const triangles = mesh.faces.map(face => {
        const a = rotated[face[0]], b = rotated[face[1]], c = rotated[face[2]];
        const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
        const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
        const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        const length = Math.hypot(nx, ny, nz) || 1;
        const shade = Math.min(1, 0.38 + 0.62 * Math.abs((nx * light[0] + ny * light[1] + nz * light[2]) / length));
        return { face, depth: (a[2] + b[2] + c[2]) / 3, shade };
      }).sort((a, b) => a.depth - b.depth);

      for (const { face, shade } of triangles) {
        const [a, b, c] = face.map(index => projected[index]);
        const red = Math.round(42 * shade), green = Math.round(136 * shade), blue = Math.round(156 * shade);
        context.beginPath();
        context.moveTo(a[0], a[1]);
        context.lineTo(b[0], b[1]);
        context.lineTo(c[0], c[1]);
        context.closePath();
        context.fillStyle = `rgb(${red},${green},${blue})`;
        context.fill();
        context.strokeStyle = 'rgba(16, 53, 64, 0.22)';
        context.lineWidth = 0.45;
        context.stroke();
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  document.querySelectorAll('.mesh-canvas').forEach(setup);
})();
