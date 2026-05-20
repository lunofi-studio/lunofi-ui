#!/usr/bin/env node

import { parseArgs } from 'node:util';
import { resolve } from 'node:path';

import { runInit } from './commands/init.js';
import { runAdd } from './commands/add.js';
import { runList } from './commands/list.js';
import { log, color } from './lib/log.js';

const VERSION = '0.0.0';

const HELP = `
${color.bold('lunofi')} — add calm, customizable UI components to your project.

${color.bold('Usage:')}
  lunofi <command> [options]

${color.bold('Commands:')}
  init                 Create lunofi.json and install the theme + utils baseline.
  add <name...>        Add one or more components (with their dependencies).
  list                 List every component available in the registry.

${color.bold('Common options:')}
  --cwd <dir>          Run against a different project directory.
  --registry <url>     Registry base URL or local path (overrides config).
  --yes                Skip prompts / overwrite config on init.
  -h, --help           Show this help.
  -v, --version        Show the CLI version.

${color.bold('init options:')}
  --ui-dir <dir>       Where components are written (default: src/components/ui).

${color.bold('add options:')}
  --overwrite          Overwrite files that already exist.
  --no-deps            Do not install npm dependencies.

${color.bold('Examples:')}
  ${color.dim('# Initialize against the public registry')}
  lunofi init

  ${color.dim('# Initialize against a locally built registry (for development)')}
  lunofi init --registry ./packages/registry/public/r --ui-dir src/components/ui --yes

  ${color.dim('# Add a component and everything it depends on')}
  lunofi add banner
`;

function printHelp(): void {
  log.info(HELP);
}

function printVersion(): void {
  log.info(VERSION);
}

function resolveCwd(value: string | undefined): string {
  return value ? resolve(process.cwd(), value) : process.cwd();
}

async function main(argv: string[]): Promise<void> {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    strict: true,
    options: {
      help: { type: 'boolean', short: 'h', default: false },
      version: { type: 'boolean', short: 'v', default: false },
      cwd: { type: 'string' },
      registry: { type: 'string' },
      'ui-dir': { type: 'string' },
      yes: { type: 'boolean', default: false },
      overwrite: { type: 'boolean', default: false },
      // node:util parseArgs has no built-in `--no-` negation, so the skip flag
      // is its own boolean and `deps` is derived from it below.
      'no-deps': { type: 'boolean', default: false },
    },
  });

  const [command, ...rest] = positionals;

  if (values.version) {
    printVersion();
    return;
  }

  if (!command || values.help) {
    printHelp();
    return;
  }

  const cwd = resolveCwd(values.cwd);

  switch (command) {
    case 'init':
      await runInit({
        cwd,
        uiDir: values['ui-dir'],
        registry: values.registry,
        yes: values.yes,
        overwrite: values.overwrite,
      });
      return;

    case 'add':
      await runAdd({
        names: rest,
        cwd,
        overwrite: values.overwrite,
        deps: !values['no-deps'],
      });
      return;

    case 'list':
      await runList({
        cwd,
        registry: values.registry,
      });
      return;

    default:
      log.error(`Unknown command: ${color.bold(command)}`);
      log.info(`Run ${color.bold('lunofi --help')} to see available commands.`);
      process.exitCode = 1;
      return;
  }
}

main(process.argv.slice(2)).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  log.error(message);
  process.exitCode = 1;
});
