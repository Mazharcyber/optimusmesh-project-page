# OptimusMesh project page

A static research page for **OptimusMesh: Compact Autoregressive Mesh Generation from Point Clouds**. It presents a point-cloud-to-triangle-mesh pipeline, method figures, rotating qualitative comparisons, generated samples, and a scene video. This repository contains the presentation page, not a training or inference implementation.

## What the page states (verified in `index.html`)

- Input: 2,048 point-normal samples. A point-cloud encoder reduces them to **16 learned 48-D latent pivots**.
- Two pivot-conditioned autoregressive Transformer stages generate vertices and then triangular faces. The page describes direct, compact, render-ready meshes without Marching Cubes or simplification.
- The abstract describes a 128-fold reduction from input points to pivots and a 16.1-fold shorter decoder conditioning sequence than the compared methods. The repository does not include the evaluation scripts or underlying measurements.
- Four qualitative rows compare input point clouds with OptimusMesh, FastMesh, MeshAnything, MeshAnythingV2, MeshRipple, NKSR, PSR, and SAP. Rotating samples, three interactive meshes, and an application video are also embedded.

## Files and assets

| Path | Role |
| --- | --- |
| `index.html` | Page copy, sections, relative media references, and BibTeX snippet |
| `styles.css` | Layout, typography, comparison table, and narrow-screen styling |
| `assets/figures/` | Teaser, pipeline, and encoder PNGs |
| `assets/provided/`, `assets/generated_showcase_v2/`, `finalfigures/` | Videos and rotating mesh GIFs |
| `assets/models/meshes.js`, `mesh-viewer.js` | Local interactive mesh viewer and geometry |

The media paths above are taken from HTML references. Confirm every referenced file exists and plays after checkout; the HTML alone does not prove the asset inventory or media integrity.

## Preview and deployment

From the repository root, run `python3 -m http.server 8000` and open `http://localhost:8000/`. The page uses relative URLs and requires no build step. For GitHub Pages, configure **Settings → Pages → Deploy from a branch → main / (root)**, then verify the published URL and media in a fresh browser session. Publishing the branch makes this page public; coordinate timing with the authors.

## Public-release checklist

- [ ] Obtain agreement from **all coauthors** for the exact public page, media, preprint timing, and release of any linked code/data; confirm the venue's concurrent-submission and anonymity rules.
- [ ] Reconcile title, abstract, method diagram, and **autoregressive vertex-stage description** with the actual public manuscript. Confirm 2,048 inputs, 16 × 48-D pivots, and the claimed evaluation subset and percentages from final results.
- [ ] Replace `href="#"` for Paper, Code, Video, and Data with working URLs, or hide unavailable buttons. Upload and link the agreed preprint before using the project page publicly.
- [ ] Replace the placeholder BibTeX `booktitle = {Conference}` and confirm the appropriate entry type/year. Avoid implying acceptance while the manuscript is under review.
- [ ] Verify all referenced images and videos load on GitHub Pages with correct capitalization and have permission for public distribution; check the four comparison rows and ten samples.
- [ ] Test desktop and phone widths, horizontal comparison scrolling, video controls, accessibility text/captions, and the final public URL from a logged-out browser.
- [ ] Before putting the URL in PhD applications, ensure the page identifies the work as **under review/preprint** as applicable, cites a stable manuscript URL, and accurately states your authorship and contribution.

## Still to confirm

The repository page does not establish peer-review outcome, the provenance of its numeric results, asset permissions, whether the referenced media files all exist, or whether the live site is deployed. The method and result bullets above are verified as **statements on this page**, not independently validated research findings.
