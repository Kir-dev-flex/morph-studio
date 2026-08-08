# MORPH — Sculptural Index

An experimental portfolio landing page for a fictional collectible-object studio. The hero combines a depth texture, halftone scanning, WebGPU post-processing, and an interactive pointer reveal.

## Highlights

- WebGPU and Three.js TSL hero scene
- Automatic depth-driven scan animation
- Local pointer-controlled material reveal
- Responsive editorial layout
- Mobile navigation and static WebGPU fallback
- Local fonts and project-owned image assets

## Stack

- React 19
- TypeScript
- Vite
- Three.js WebGPU / TSL
- React Three Fiber and Drei
- Tailwind CSS 4
- Vitest and Testing Library

## Run locally

```bash
pnpm install
pnpm dev
```

Then open the local URL printed by Vite. WebGPU support is recommended; browsers without it receive the static hero fallback.

## Quality checks

```bash
pnpm test
pnpm typecheck
pnpm test:sites
pnpm build
```

## Project status

Portfolio concept. MORPH and its products are fictional.
