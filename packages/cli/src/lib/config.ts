import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import type { LunofiConfig } from './types.js';

export const CONFIG_FILE = 'lunofi.json';
export const DEFAULT_REGISTRY = 'https://lunofi-ui.com/r';
export const DEFAULT_UI_DIR = 'src/components/ui';
export const DEFAULT_UI_ALIAS = '@/components/ui';
export const CONFIG_SCHEMA_URL = 'https://lunofi-ui.com/schema/lunofi.json';

export function configPath(cwd: string): string {
  return join(cwd, CONFIG_FILE);
}

export function configExists(cwd: string): boolean {
  return existsSync(configPath(cwd));
}

export async function readConfig(cwd: string): Promise<LunofiConfig> {
  const path = configPath(cwd);
  if (!existsSync(path)) {
    throw new Error(`No ${CONFIG_FILE} found in ${cwd}. Run \`lunofi init\` first.`);
  }
  const raw = await readFile(path, 'utf8');
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (cause) {
    throw new Error(`Could not parse ${path}: ${(cause as Error).message}`);
  }

  const config = parsed as Partial<LunofiConfig>;
  if (typeof config.registry !== 'string' || typeof config.uiDir !== 'string') {
    throw new Error(`Invalid ${CONFIG_FILE}: missing required "registry" or "uiDir".`);
  }

  return {
    $schema: config.$schema ?? CONFIG_SCHEMA_URL,
    registry: config.registry,
    uiDir: config.uiDir,
    aliases: {
      ui: config.aliases?.ui ?? DEFAULT_UI_ALIAS,
    },
  };
}

export async function writeConfig(cwd: string, config: LunofiConfig): Promise<string> {
  const path = configPath(cwd);
  await writeFile(path, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
  return path;
}
