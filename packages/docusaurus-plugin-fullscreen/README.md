# Docusaurus Fullscreen Plugin Monorepo

A pnpm monorepo containing a Docusaurus fullscreen plugin and its documentation.

## Structure

- `packages/docusaurus-plugin-fullscreen/` - The Docusaurus plugin implementation
- `docs/` - Docusaurus documentation site that uses the plugin

## Prerequisites

- Node.js 18.0 or higher
- pnpm 8.0 or higher

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server for the docs:
   ```bash
   cd docs
   pnpm start
   ```

3. Build all packages:
   ```bash
   pnpm build
   ```

## Development

### Plugin Development

The plugin is located in `packages/docusaurus-plugin-fullscreen/`. It's written in JavaScript and doesn't require a build step.

### Documentation

The documentation site is in the `docs/` folder and uses the local plugin via workspace dependencies.

## Scripts

- `pnpm build` - Build all packages
- `pnpm dev` - Start development mode for all packages
- `pnpm clean` - Clean all packages
- `pnpm lint` - Lint all packages
- `pnpm test` - Test all packages

## License

MIT