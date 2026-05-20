import { createRegistry } from '../lib/registry.js';
import { configExists, readConfig, DEFAULT_REGISTRY } from '../lib/config.js';
import { log, color } from '../lib/log.js';
import type { RegistryIndexItem } from '../lib/types.js';

export interface ListOptions {
  cwd: string;
  registry?: string | undefined;
}

const UNCATEGORIZED = 'other';

/** Resolve the registry URL from (1) an explicit flag, (2) config, (3) default. */
async function resolveRegistryUrl(cwd: string, override?: string): Promise<string> {
  if (override) return override;
  if (configExists(cwd)) {
    const config = await readConfig(cwd);
    return config.registry;
  }
  return DEFAULT_REGISTRY;
}

export async function runList(options: ListOptions): Promise<void> {
  const registryUrl = await resolveRegistryUrl(options.cwd, options.registry);
  const registry = createRegistry(registryUrl, options.cwd);

  const index = await registry.getIndex();

  const byCategory = new Map<string, RegistryIndexItem[]>();
  for (const item of index.items) {
    const categories = item.categories.length > 0 ? item.categories : [UNCATEGORIZED];
    for (const category of categories) {
      const bucket = byCategory.get(category) ?? [];
      bucket.push(item);
      byCategory.set(category, bucket);
    }
  }

  log.break();
  log.info(`${color.bold(index.name)} ${color.dim(`(${index.homepage})`)}`);
  log.info(color.dim(`${index.items.length} components available`));
  log.break();

  const categories = [...byCategory.keys()].sort((a, b) => a.localeCompare(b));
  for (const category of categories) {
    const items = byCategory.get(category) ?? [];
    items.sort((a, b) => a.name.localeCompare(b.name));

    log.info(color.bold(color.cyan(category)));
    for (const item of items) {
      const title = color.bold(item.name);
      const desc = item.description ? ` ${color.dim('— ' + item.description)}` : '';
      log.info(`  ${title}${desc}`);
    }
    log.break();
  }

  log.info(color.dim('Add a component with: ') + color.bold('lunofi add <name>'));
}
