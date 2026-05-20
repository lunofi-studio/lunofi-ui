# lunofi-ui

Calm, customizable copy-paste UI components built on [Base UI](https://base-ui.com) and Tailwind CSS.

lunofi-ui is **not** an npm component dependency. Like shadcn/ui, you own the code: a CLI
copies component source straight into your project's `ui/` folder, and you re-theme everything
through CSS variables. The defaults are intentionally quiet — low-chroma, restrained motion —
and trivially overridable.

## Monorepo layout

```
apps/
  web/        Landing page + live component/block showcase + registry host (planned)
  docs/       Storybook component documentation (planned)
packages/
  ui/         Component source — distributed via the registry, not published (planned)
  tailwind/   Shared Tailwind v4 theme preset (calm OKLCH tokens) (planned)
  registry/   Registry build tooling (planned)
  cli/        The `lunofi` install CLI (planned, built last)
  tsconfig/         Shared TypeScript configs
  eslint-config/    Shared ESLint flat configs
```

## Development

```bash
pnpm install
pnpm build          # build all packages
pnpm lint           # lint all packages
pnpm check-types    # typecheck all packages
pnpm format         # format the repo with Prettier
```

Requires Node `>=22.22.1` and pnpm `10.x`.

## License

[MIT](./LICENSE)
