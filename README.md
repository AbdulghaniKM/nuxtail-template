# Nuxtail

A high-performance Nuxt 4 starter with Tailwind CSS v4, the VoidZero toolchain (Oxlint + Vitest), and the Vuetail component registry. Config-driven theming, typography, and SEO out of the box.

## Stack


| Layer         | Technology                                         |
| ------------- | -------------------------------------------------- |
| Framework     | Nuxt 4 (Vue 3.5+)                                  |
| Styling       | Tailwind CSS v4 (`@tailwindcss/vite`)              |
| Toolchain     | VoidZero — Oxlint, Rolldown-ready                  |
| Language      | TypeScript (strict) + `vue-tsc`                    |
| Components    | Vuetail UI registry (on-demand install)            |
| State         | Pinia                                              |
| SEO           | `@nuxtjs/seo` wired to `app.config.ts`             |
| HTTP          | Axios (auto-injected plugin with auth interceptor) |
| Icons / Image | `@nuxt/icon`, `@nuxt/image`                        |
| Utilities     | VueUse, date-fns, Zod, motion-v                    |


## Features

- **Single source of truth** — theme colors, typography, icons, and SEO all declared in `app/app.config.ts` and consumed app-wide.
- **SEO auto-wired** — `useSeoMeta` + `useHead` in `app/app.vue` pull from `nuxtail.seo` so every page has defaults; `@nuxtjs/seo` handles sitemap/robots.
- **VoidZero-powered** — `oxlint` for ~1s lints, `vitest` for tests.
- **Vuetail registry** — pull components/composables on demand; drift-detected via `vuetail.json` lockfile.
- **Dynamic theming** — CSS variable design system with runtime color customization and `system` / `light` / `dark` modes.
- **Nuxt 4 layout** — `srcDir: "app/"`, compat mode v4.

## Quick Start

```bash
pnpm install
pnpm dev
```

App runs at `http://localhost:3000`.

## Configuration

Most branding/UX knobs live in a single file:

```ts
// app/app.config.ts
export default defineAppConfig({
  nuxtail: {
    app: { name, title, description, url, language, ... },
    theme: { defaultTheme: 'system', light: {...}, dark: {...} },
    typography: { fonts, primary, secondary, mono, sizes, weights },
    icons: { favicon, sizes },
    seo: { title, description, keywords, robots, openGraph, twitter },
    layout: { containerMaxWidth, spacing },
  },
})
```

For build-time SEO (sitemap, canonical URLs), set the site in `nuxt.config.ts` or via env:

```bash
NUXT_PUBLIC_SITE_URL=https://yourdomain.com
NUXT_PUBLIC_API_BASE=/api
```

## Component Management

Nuxtail ships with the Vuetail registry system instead of a pre-bundled UI library — you install only what you use.

```bash
pnpm add-component AppButton      # fetch a component
pnpm add-composable useToast      # fetch a composable
pnpm vuetail:verify               # check installed files for drift
```

Installed items are tracked in `vuetail.json` with content hashes.

## Scripts

```bash
pnpm dev           # Nuxt dev server
pnpm build         # production build
pnpm generate      # static generate
pnpm preview       # preview production build
pnpm lint          # oxlint (fast)
pnpm lint:fix      # oxlint --fix
pnpm typecheck     # vue-tsc --noEmit
pnpm test          # vitest
pnpm add-component # fetch a UI component from the Vuetail registry
pnpm add-composable
pnpm vuetail:verify
```

## Project Structure

```
app/
├── app.config.ts        # branding / theme / SEO / typography
├── app.vue              # root; wires SEO + icons from app.config
├── assets/css/          # Tailwind entry (main.css)
├── components/          # your + Vuetail-installed components
├── composables/         # useTheme, useColorCustomizer, ...
├── layouts/
├── pages/
├── plugins/
│   └── axios.ts         # axios instance + auth interceptor
├── services/            # API service modules
├── stores/              # Pinia stores
└── types/
nuxt.config.ts           # modules, site, runtimeConfig
.oxlintrc.json           # lint rules (TS + Vue + import + unicorn)
```

## Linting

Oxlint is configured via `.oxlintrc.json` with the `typescript`, `vue`, `unicorn`, `oxc`, `import`, and `promise` plugins enabled. `correctness` and `suspicious` categories are errors; CLI scripts under `scripts/**` have `no-console` disabled.

## License

MIT