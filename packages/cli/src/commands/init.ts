import { createRegistry } from '../lib/registry.js';
import { writeRegistryFile } from '../lib/files.js';
import {
  CONFIG_FILE,
  CONFIG_SCHEMA_URL,
  DEFAULT_REGISTRY,
  DEFAULT_UI_DIR,
  DEFAULT_UI_ALIAS,
  configExists,
  configPath,
  writeConfig,
} from '../lib/config.js';
import { log, color } from '../lib/log.js';
import type { LunofiConfig } from '../lib/types.js';

export interface InitOptions {
  cwd: string;
  uiDir?: string | undefined;
  registry?: string | undefined;
  yes: boolean;
  overwrite: boolean;
}

/** Baseline items every project gets at init time. */
const BASELINE_ITEMS = ['theme', 'utils'] as const;

export async function runInit(options: InitOptions): Promise<void> {
  const config: LunofiConfig = {
    $schema: CONFIG_SCHEMA_URL,
    registry: options.registry ?? DEFAULT_REGISTRY,
    uiDir: options.uiDir ?? DEFAULT_UI_DIR,
    aliases: {
      ui: DEFAULT_UI_ALIAS,
    },
  };

  if (configExists(options.cwd) && !options.yes && !options.overwrite) {
    log.warn(
      `${CONFIG_FILE} already exists at ${configPath(options.cwd)}. ` +
        `Re-run with --yes to overwrite the config and refresh baseline files.`,
    );
    return;
  }

  const path = await writeConfig(options.cwd, config);
  log.success(`Wrote ${color.bold(CONFIG_FILE)} ${color.dim(`(${path})`)}`);

  const registry = createRegistry(config.registry, options.cwd);
  log.step(`Using registry: ${color.dim(registry.location)}`);

  for (const name of BASELINE_ITEMS) {
    const item = await registry.getItem(name);
    for (const file of item.files) {
      // init refreshes the baseline, so overwrite by default here.
      const result = await writeRegistryFile(file, config, options.cwd, true);
      log.success(`Added ${color.bold(result.displayPath)}`);
    }
  }

  log.break();
  log.info(color.bold('Done!') + ' Next steps:');
  log.info(`  ${color.dim('1.')} Make sure Tailwind imports your theme:`);
  log.info(`     ${color.cyan(`@import "./${config.uiDir}/theme.css";`)}`);
  log.info(`  ${color.dim('2.')} Add components:`);
  log.info(`     ${color.cyan('lunofi add button')}`);
  log.info(`  ${color.dim('3.')} Browse everything available:`);
  log.info(`     ${color.cyan('lunofi list')}`);
}
