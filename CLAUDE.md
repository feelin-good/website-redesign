# Lepton Projects website: `concept` branch ("the drawing set")

Next.js 14 (App Router), no Tailwind, no UI libraries. Built with the `concept-first-design` skill.
Read `design/` first: material.md (facts & sources), concepts.md, directions.md (why A), critique.md.

- **Content source of truth:** the company deck (`~/Downloads/Lepton Projects Private Ltd.pptx`;
  extracted text in `/Volumes/SanDisk/lepton-deck/slides.txt`). All data lives in `lib/lepton.ts`.
  Do not add figures that aren't in the deck. `main`'s `lib/data` was placeholder content.
- **Concept:** every page is a sheet in a GA drawing set: sheet border with grid refs, zones with
  margin labels, title block footer, register tables, revision tables, red markup. Tokens and
  components are in `app/globals.css`; navy #383070 and red #d83828 are sampled from the real logo.
- Components: `components/sheet.tsx` (header, footer, Zone), `drawing.tsx` (Plate, RouteSchematic,
  Cloud), `register.tsx`, `carousel.tsx` (hero plates).
- `node_modules` is a real folder here (worktree lives on the SanDisk).
- Verify with: `next build && next start -p 3100`, then
  `~/.claude/skills/concept-first-design/scripts/webshot http://localhost:3100 design/renders/x --devices iphone,laptop`.
