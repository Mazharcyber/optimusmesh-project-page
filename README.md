# OptimusMesh project page

A static research page for **OptimusMesh: Compact Autoregressive Mesh Generation from Point Clouds**. It presents a point-cloud-to-triangle-mesh pipeline, method figures, rotating qualitative comparisons, generated samples, and a scene video. This repository contains the presentation page, not a training or inference implementation.

## What the page states (verified in `index.html`)

- Input: 2,048 point-normal samples. A pretrained point-cloud encoder reduces them to **16 learned 48-D latent pivots**.
- Two pivot-conditioned autoregressive Transformer stages generate vertices and then triangular faces. The page describes direct, compact, render-ready meshes without Marching Cubes or simplification.
- The abstract reports, on a subset of ShapeNet samples, **55.3% lower CD-L1 than PSR** and **58.5% lower than SAP**, with **97.7% and 99.2% fewer faces**, respectively. It also claims **35.7%–55.4% lower CD-L1** than recent autoregressive mesh methods. These are claims displayed by the page; the repository does not include evaluation scripts, tables, or underlying measurements.
- Qualitative rows for chair, table, and display compare input point clouds, ground truth, OptimusMesh, PSR, SAP, MeshAnything, MeshAnythingV2, FastMesh, NKSR, and MeshRipple. Ten more generated mesh GIFs and a scene video are embedded.

## Files and assets

| Path | Role |
| --- | --- |
| `index.html` | Page copy, sections, relative media references, and BibTeX snippet |
| `styles.css` | Layout, typography, comparison table, and narrow-screen styling |
| `assets/figures/` | Referenced teaser, pipeline, and encoder PNGs |
| `assets/provided/` | Referenced teaser/scene MP4s, point-cloud GIFs, per-method GIFs, and generated-sample GIFs |

The media paths above are taken from HTML references. Confirm every referenced file exists and plays after checkout; the HTML alone does not prove the asset inventory or media integrity.

## Preview and deployment

From the repository root, run `python3 -m http.server 8000` and open `http://localhost:8000/`. The page uses relative URLs and requires no build step. For GitHub Pages, configure **Settings → Pages → Deploy from a branch → main / (root)**, then verify the published URL and media in a fresh browser session. Publishing the branch makes this page public; coordinate timing with the authors.

## Public-release checklist

- [ ] Obtain agreement from **all coauthors** for the exact public page, media, preprint timing, and release of any linked code/data; confirm the venue's concurrent-submission and anonymity rules.
- [ ] Reconcile title, abstract, method diagram, and **autoregressive vertex-stage description** with the actual public manuscript. Confirm 2,048 inputs, 16 × 48-D pivots, and the claimed evaluation subset and percentages from final results.
- [ ] Replace `href="#"` for Paper, Code, Video, and Data with working URLs, or hide unavailable buttons. Upload and link the agreed preprint before using the project page publicly.
- [ ] Replace the placeholder BibTeX `booktitle = {Conference}` and confirm the appropriate entry type/year. Avoid implying acceptance while the manuscript is under review.
- [ ] Verify all referenced images and videos exist, load on GitHub Pages with correct capitalization, and have permission for public distribution; check the three comparison rows and ten samples.
- [ ] Test desktop and phone widths, horizontal comparison scrolling, video controls, accessibility text/captions, and the final public URL from a logged-out browser.
- [ ] Before putting the URL in PhD applications, ensure the page identifies the work as **under review/preprint** as applicable, cites a stable manuscript URL, and accurately states your authorship and contribution.

## Still to confirm

The repository page does not establish peer-review outcome, the provenance of its numeric results, asset permissions, whether the referenced media files all exist, or whether the live site is deployed. The method and result bullets above are verified as **statements on this page**, not independently validated research findings.
