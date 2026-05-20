import { createRegistry } from '../lib/registry.js';
import { readConfig } from '../lib/config.js';
import { resolveItems, collectNpmDependencies } from '../lib/resolve.js';
import { writeRegistryFile } from '../lib/files.js';
import { detectPackageManager, installDependencies } from '../lib/package-manager.js';
import { log, color } from '../lib/log.js';

export interface AddOptions {
  names: string[];
  cwd: string;
  overwrite: boolean;
  deps: boolean;
}

export async function runAdd(options: AddOptions): Promise<void> {
  if (options.names.length === 0) {
    throw new Error('Specify at least one component to add, e.g. `lunofi add button`.');
  }

  const config = await readConfig(options.cwd);
  const registry = createRegistry(config.registry, options.cwd);

  log.step(`Resolving ${options.names.map((n) => color.bold(n)).join(', ')}…`);
  const items = await resolveItems(registry, options.names);

  const requested = new Set(options.names);
  const transitive = items.map((item) => item.name).filter((name) => !requested.has(name));
  if (transitive.length > 0) {
    log.step(`Including dependencies: ${transitive.map((n) => color.bold(n)).join(', ')}`);
  }

  let writtenCount = 0;
  let skippedCount = 0;

  for (const item of items) {
    for (const file of item.files) {
      const result = await writeRegistryFile(file, config, options.cwd, options.overwrite);
      if (result.written) {
        log.success(`Added ${color.bold(result.displayPath)}`);
        writtenCount += 1;
      } else {
        log.warn(
          `Skipped ${color.bold(result.displayPath)} ${color.dim('(already exists — use --overwrite)')}`,
        );
        skippedCount += 1;
      }
    }
  }

  const npmDeps = collectNpmDependencies(items);

  if (!options.deps) {
    if (npmDeps.length > 0) {
      log.break();
      log.warn(
        `Skipped installing ${npmDeps.length} npm package(s) (--no-deps): ${npmDeps.join(', ')}`,
      );
    }
  } else if (npmDeps.length > 0) {
    log.break();
    const pm = detectPackageManager(options.cwd);
    await installDependencies(pm, npmDeps, options.cwd);
  }

  log.break();
  log.success(
    `Done. ${color.bold(String(writtenCount))} file(s) written` +
      (skippedCount > 0 ? `, ${skippedCount} skipped` : '') +
      '.',
  );
}
