# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

The frontend for [USAspending.gov](https://www.usaspending.gov/), the public site for U.S. federal spending data. React 19 + Redux (classic, not RTK) + React Query, bundled with Webpack 5, styled with Sass/BEM, tested with Jest + React Testing Library. UI primitives come from a separate published package, `data-transparency-ui` (DTUI).

## Commands

```bash
npm start                  # dev server w/ hot reload (webpack.local.config.js)
npm run sass                # dev server with scss source maps
npm run dev                 # build dev-optimized static assets
npm run prod                 # build production-optimized static assets
npm test                     # run full Jest suite (always exits 0 — see note below)
npm run lint                 # eslint over src/js/** (always exits 0)
npm run errors                # eslint --quiet (errors only, no warnings)
npm run fixLint               # prettier --write on scss/css + eslint --fix on src/js
npm run auditLintTest          # npm audit + eslint --quiet + jest (used in CI)
npm run storybook               # storybook dev server on :6006
npm run build-storybook          # build storybook static site into ./docs
```

Run a single test file or pattern:
```bash
npx jest tests/components/search/SearchPage-test.jsx
npx jest -t "name of test or describe block"
```
Both `npm test` and `npm run lint` are configured with `; exit 0` so they never fail the shell — when running these, inspect actual stdout/stderr for failures rather than relying on exit code.

Node `24.18.1` / npm `10.8.3` are pinned (`.nvmrc`, `engines` in `package.json`). Install with `npm ci --legacy-peer-deps`.

## Architecture

### Module resolution — no relative-path imports from `src/js`
Babel's `module-resolver` plugin is rooted at `src/js` (`babel.config.js`). Any import written as if `src/js` were the root resolves correctly — e.g. from deep inside `src/js/components/search/...`, `import kGlobalConstants from 'GlobalConstants'` or `import { apiRequest } from 'helpers/apiRequest'` both work without `../../..`. Always prefer this bare-path style over relative imports when adding new code, matching the existing codebase. Jest mirrors this via `modulePaths: ["<rootDir>/tests/testResources", "<rootDir>/src/js"]` in `jest.config.js`.

### Directory layout under `src/js`
- `containers/` — components wired to Redux state/dispatch (classic `connect`-style or hooks into the store) and/or React Router params.
- `components/` — presentational React components, organized by page/feature (e.g. `components/search/`, `components/award/`).
- `features/` — a newer pattern for self-contained page features (currently only `features/state`); prefer this structure for net-new large page features over adding to `components/`+`containers/`.
- `redux/actions/<domain>` and `redux/reducers/<domain>` — one subfolder per domain (search, award, agency, covid19, bulkDownload, etc). All reducers are combined in `redux/reducers/deprecated-index.js`.
- `apis/` — thin per-domain API modules built on `helpers/apiRequest.js`.
- `helpers/` — business logic and formatting utilities kept out of components (per `react-testing-library.md`, these should have near-100% test coverage since they're plain JS).
- `models/`, `propTypes/`, `dataMapping/`, `context/`, `hooks/` — shared model classes, PropTypes shapes, data transformation maps, React context providers, and custom hooks respectively.

### App bootstrap
- `src/deprecated-index.js` → requires static assets/CSS, then `src/js/app.jsx`.
- `src/js/app.jsx` sets up the React Query `QueryClient` (infinite `staleTime`, no refetch-on-focus/mount) and renders `containers/AppContainer.jsx`.
- `AppContainer.jsx` creates the Redux store (`createStore`, with `redux-perf-middleware` enabled only when `kGlobalConstants.PERF_LOG` is set) and stores it in `redux/storeSingleton` for non-component access. It wraps the app in `react-router`'s `BrowserRouter`, iterates `routes` from `containers/router/RouterRoutes.jsx`, and wraps each route element in `WithUrlListener`.
- `containers/router/RouterRoutes.jsx` is the single route table — every top-level page is a `React.lazy` import. When adding a new page, add it here (both the lazy import and a `routes` entry) — there's an in-file comment to also update `scripts/pages.js`.

### State: Redux (global/UI/filter state) + React Query (server data)
Two different jobs, don't conflate them:
- Redux (`redux/actions/*`, `redux/reducers/*`) holds cross-page UI/filter state (search filters, applied filters, sidebar/modal visibility, etc). There's no Redux Toolkit, no thunk middleware visible at the store level — actions/reducers follow the classic plain-object pattern.
- `@tanstack/react-query` is used for server-data fetching/caching in newer code (`QueryClientProvider` set up in `app.jsx`). Favor React Query for new data-fetching code; use `apis/` + `helpers/apiRequest.js` as the underlying request layer either way.
- `GlobalConstants.js` (`kGlobalConstants`) is the source of truth for environment-derived config (API base URL, env flags like `QAT`/`STAGING`/`PROD`, Mapbox token, files-server URL). It reads `LocalConstants.js` (gitignored, developer-local overrides) before falling back to `process.env`.

### Styling
Sass under `src/_scss`, organized into `core/`, `elements/`, `components/`, `layouts/`, `pages/`, `mixins/`, `selectors/`, aggregated via `_global.scss`/`all.scss`. Uses Bourbon/Bourbon Neat. DTUI ships its own CSS (`_scss/data-transparency-ui.css`, `_dtui-overrides.scss`) — overrides for the shared component library's default styling live in `_dtui-overrides.scss` and `_shareIcon-dtui-overrides.scss`, not inline.

### `data-transparency-ui` dependency
`data-transparency-ui` is pulled from a GitHub ref (`github:fedspendingtransparency/data-transparency-ui#vX.Y.Z` in `package.json`), not npm — it's a sibling design-system repo providing shared React components (loaders, headers, footers, etc). When a UI primitive is missing or needs changing, check whether it belongs in DTUI before building a one-off local component.

## Testing

- Framework: Jest + React Testing Library (RTL). The project migrated off Enzyme — **do not** write new tests against component internals (state/props/lifecycle); test rendered output and simulated user interaction instead. Full rationale and in-repo examples are in `react-testing-library.md`.
- Test files live under `tests/`, mirroring `src/js/` (`tests/components`, `tests/containers`, `tests/helpers`, `tests/hooks`, `tests/redux`, `tests/models`), and must match `tests/.../*-test.jsx?` (see `testRegex` in `jest.config.js`).
- Use `tests/testResources/test-utils.js` instead of RTL's own `render` — it wraps components in `Provider` (Redux), `QueryClientProvider`, and `BrowserRouter` (`render`), or without the router (`renderWithoutRouter`). Import via `@test-utils` or the relative path.
- `tests/mockApi/` and `tests/mockData/` hold API/data fixtures used across test suites.
- Plain JS (helpers, reducers, models) should be close to fully covered — components/containers are tested through RTL's rendered-output approach instead of forcing coverage on JSX branches that are hard to assert on.
- `jest.config.js` aliases: `lodash-es` → `lodash`, `data-transparency-ui` resolved from `node_modules` directly, `react-markdown` stubbed to an empty mock, images/fonts/media stubbed to `__mocks__/fileMock.js`, CSS/SCSS stubbed to `tests/testResources/stylesStub.js`, and anything importing `GlobalConstants` resolves to `tests/testResources/mockGlobalConstants.js`.

## Linting/formatting conventions worth knowing before editing

ESLint flat config (`eslint.config.mjs`) enforces, beyond standard `react`/`react-hooks`/`jsx-a11y`/`import` recommended sets:
- 4-space indentation, Stroustrup brace style, no trailing commas, semicolons required, single quotes preferred (warn-level).
- `react/prop-types` and `react/no-unused-prop-types` are enforced (warn) — components should declare PropTypes.
- `import/prefer-default-export` is a warning, not an error — single-export modules commonly still use a named export (see `apiRequest.js`), don't "fix" this reflexively.
- `react-hooks/exhaustive-deps` is a warning; existing code sometimes intentionally omits deps — check surrounding comments before "fixing" a dependency array.

## Environment variables

Set these in your shell before running `npm start`/`dev`/`prod`, or via `LocalConstants.js` (gitignored) for persistent local overrides:

| Var | Purpose |
|---|---|
| `ENV` | `prod`/`staging`/`qat`/`sandbox` — drives bundling/feature flags and the `FILES_SERVER_BASE_URL` default |
| `USASPENDING_API` | Backend API base URL |
| `MAPBOX_TOKEN` | Mapbox GL product key |
| `GA_TRACKING_ID` / `GTM_ID` | Analytics IDs baked into the HTML template at build time |
