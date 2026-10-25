# datag.github.io

Personal homepage of Dominik Geyer, hosted on GitHub Pages at
[https://datag.is-a.dev](https://datag.is-a.dev).

The site is built with [Vite](https://vite.dev) and styled with
[Tailwind CSS](https://tailwindcss.com). All assets (Tailwind build, avatar,
favicon) are served from the same origin — no third-party resources are loaded
at runtime.

## Stack

- [Vite](https://vite.dev) (multi-page build: `index.html`, `privacy.html`)
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`
- TypeScript (strict)
- [pnpm](https://pnpm.io)

## Commands

```bash
pnpm install        # install dependencies
pnpm run dev        # start dev server (http://localhost:5173/)
pnpm run typecheck  # type-check sources and the Vite config
pnpm run build      # typecheck + build into dist/
pnpm run preview    # preview the production build
```

## Structure

```
index.html            start page
privacy.html          privacy policy (EN/DE)
src/style.css         Tailwind entry point
src/main.ts           renders the link and project lists
src/data/links.ts     links shown in the "Links" section
src/data/projects.ts  projects shown in the "Open Source Tinkering" section
public/               static assets copied verbatim (avatar, favicon, CNAME)
```

Every HTML file in the repository root is automatically picked up as a build
entry (see `vite.config.ts`).

## Google Search Console

`public/google<token>.html` is the site-ownership verification file for Google
Search Console (HTML file upload method). It is copied to the site root as
`/google<token>.html` and **must stay there** – Search Console periodically
re-checks the token and drops the property if the file is missing.

It exists because the DNS TXT record variant requires the `is-a.dev` domain to
be Cloudflare-proxied, and only a proxied domain may combine a `CNAME` with a
`TXT` record.

## Deployment

`.github/workflows/gh-pages.yml` builds the project and publishes `dist/` to
GitHub Pages. It runs on every push to `main` (and can be triggered manually).

The Pages source of this repository is set to **GitHub Actions**.
