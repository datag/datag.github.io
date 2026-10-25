# AGENTS.md

Personal homepage of Dominik Geyer (`datag`), live at https://datag.is-a.dev.
Static multi-page site: Vite 8 + Tailwind CSS v4 + TypeScript, deployed to GitHub Pages.

## Commands

```bash
pnpm install
pnpm run dev        # http://localhost:5173
pnpm run typecheck  # tsc for src/ AND vite.config.ts (two separate tsconfigs)
pnpm run build      # typecheck + vite build -> dist/
pnpm run preview
```

- There is **no test suite, linter, or formatter** in this repo. "Done" = `pnpm run typecheck` + `pnpm run build` pass.
- CI does not use `pnpm run build`; it runs `pnpm exec vite build --base=/` (user site at the domain root). Use that exact command to reproduce a release build.
- pnpm 10.0.0 is pinned via `packageManager`; CI uses corepack + Node 24.

## Gotchas

### Tailwind v4 needs an explicit `@source` per root HTML page
`src/style.css` lists its sources explicitly. A new root-level `*.html` file is **not** scanned, so its utility classes are silently absent from the built CSS (verified with a probe file). Add `@source "../yourpage.html";` to `src/style.css`. Files under `src/**/*.ts` are already covered by `@source "./**/*.ts";`.

### Every root `*.html` file becomes a published page
`vite.config.ts` globs the repo root for `*.html` and turns each one into a Rollup entry. A leftover draft at the root is silently built and deployed to the live site — keep drafts out of the repo root. `public/**` is copied verbatim (never transformed).

### Content is client-rendered: edit data, not markup
`index.html` ships empty `<ul data-links>` / `<ul data-projects>`; `src/main.ts` fills them from `src/data/links.ts` and `src/data/projects.ts`. To add a link or project, edit those data files.

Icons are an SVG sprite in `index.html` (`<symbol id="icon-…">` inside `<defs>`), referenced as `#icon-<name>`. The `IconName` union in `src/data/links.ts` must stay in sync with the sprite ids. `privacy.html` has no script and is pure static HTML (but loads the same `/src/style.css`).

### TypeScript is strict and split across two projects
- `tsconfig.json` includes **only** `src/**/*.ts` — a `.ts` file placed at the repo root is never typechecked.
- `tsconfig.node.json` covers only `vite.config.ts`.
- Notable flags: `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax` (type-only imports need `import type`), `isolatedModules`, and `noEmit` (tsc never emits; Vite builds).
- The app project has `types: ["vite/client"]` only — no Node globals in `src/`.

## Content constraints

- **Same-origin assets only.** No CDN fonts, no third-party scripts, no analytics, no cookies or localStorage on these pages. Adding any of those makes `privacy.html` false.
- `privacy.html` is bilingual: matching `#en` / `#de` sections. When editing, change both languages and the two "Last updated" / "Stand:" dates together.
- `public/CNAME` (datag.is-a.dev) and `public/google*.html` (Google Search Console verification, re-checked periodically by Google) must not be renamed, moved, or deleted.
- `dist/` is gitignored build output — never commit or hand-edit it.

## Style

No formatter is configured, but match the existing code: 2-space indent, single quotes, no semicolons, `type` keyword on type-only imports.

## Git & deploy

- Pushing to `main` triggers `.github/workflows/gh-pages.yml`, which builds and publishes `dist/` (Pages source = GitHub Actions).
- **Do not push to `main`.** Commit to a branch and let the user merge.
