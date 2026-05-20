/**
 * @lunofi/registry — zero-dependency registry build script.
 *
 * Reads @lunofi/ui source and emits the lunofi-ui registry as JSON:
 *   <out>/r/<name>.json   one file per item (component, lib, theme)
 *   <out>/r/index.json    the registry index
 *
 * Uses only Node built-ins. No npm dependencies, no build step.
 *
 * Usage:
 *   node build.mjs [--out <dir>]     default --out = ./public
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

import { registry as registryMeta, items as itemsMeta } from './registry.config.mjs';

const here = dirname(fileURLToPath(import.meta.url));

// Repo layout (this package lives at packages/registry).
const REPO_ROOT = resolve(here, '..', '..');
const UI_COMPONENTS_DIR = join(REPO_ROOT, 'packages', 'ui', 'src', 'components');
const UI_UTILS_FILE = join(REPO_ROOT, 'packages', 'ui', 'src', 'lib', 'utils.ts');
const TAILWIND_TOKENS_FILE = join(REPO_ROOT, 'packages', 'tailwind', 'tokens.css');

const SCHEMA_URL = 'https://lunofi-ui.com/schema/registry-item.json';

// React is a peer/assumed runtime everywhere; never list it as a dependency.
const EXCLUDED_NPM_DEPS = new Set(['react', 'react-dom']);

// The path-alias prefix the source uses for intra-package imports.
const UI_ALIAS = '@lunofi/ui';

/**
 * @typedef {object} Item
 * @property {string} name
 * @property {'registry:ui' | 'registry:lib' | 'registry:theme'} type
 * @property {string} title
 * @property {string} description
 * @property {string[]} categories
 * @property {string[]} dependencies
 * @property {string[]} registryDependencies
 * @property {{ path: string; type: string; content: string }[]} files
 */

function parseArgs(argv) {
  const args = { out: join(here, 'public') };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--out') {
      const value = argv[i + 1];
      if (!value) {
        throw new Error('--out requires a directory argument');
      }
      args.out = resolve(process.cwd(), value);
      i += 1;
    }
  }
  return args;
}

function toTitleCase(name) {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

/**
 * Normalize a bare npm specifier to its package root.
 *   '@base-ui/react/use-render' -> '@base-ui/react'
 *   'class-variance-authority'  -> 'class-variance-authority'
 *   'lodash/merge'              -> 'lodash'
 */
function packageRoot(specifier) {
  const parts = specifier.split('/');
  if (specifier.startsWith('@')) {
    return parts.slice(0, 2).join('/');
  }
  return parts[0];
}

/**
 * Extract every module specifier from `import ... from '...'` and
 * `export ... from '...'` statements (including bare side-effect imports).
 * Deterministic, regex-based, comment-tolerant enough for our hand-written
 * source — we only read the specifier, never rewrite via this pass.
 *
 * @param {string} source
 * @returns {string[]}
 */
function extractSpecifiers(source) {
  const specifiers = [];
  // import ... from '...'   /   export ... from '...'
  const fromRe = /(?:import|export)\b[\s\S]*?from\s*['"]([^'"]+)['"]/g;
  // bare side-effect import: import '...'
  const bareRe = /import\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = fromRe.exec(source)) !== null) {
    specifiers.push(match[1]);
  }
  while ((match = bareRe.exec(source)) !== null) {
    specifiers.push(match[1]);
  }
  return specifiers;
}

/**
 * Classify a single specifier for a component being scanned.
 *
 * @param {string} spec
 * @param {Set<string>} componentNames  set of known component item names
 * @returns {{ npm?: string; registry?: string }}
 */
function classifySpecifier(spec, componentNames) {
  // Relative imports (defensive — current source uses the alias, but keep
  // these working so the format is robust to either style).
  if (spec.startsWith('.')) {
    if (/(?:^|\/)lib\/utils$/.test(spec)) {
      return { registry: 'utils' };
    }
    const sibling = basename(spec);
    if (componentNames.has(sibling)) {
      return { registry: sibling };
    }
    return {};
  }

  // Intra-package alias imports: @lunofi/ui/...
  if (spec === UI_ALIAS || spec.startsWith(`${UI_ALIAS}/`)) {
    const subpath = spec.slice(UI_ALIAS.length + 1); // '' for bare @lunofi/ui
    if (subpath === 'lib/utils') {
      return { registry: 'utils' };
    }
    const sibling = subpath.split('/')[0];
    if (componentNames.has(sibling)) {
      return { registry: sibling };
    }
    return {};
  }

  // Everything else is an external npm package.
  const root = packageRoot(spec);
  if (EXCLUDED_NPM_DEPS.has(root)) {
    return {};
  }
  return { npm: root };
}

/**
 * Rewrite import/export specifiers in the emitted file content so that the
 * installed layout is flat under `ui/`:
 *   ui/<name>.tsx, ui/lib/utils.ts
 *
 * @param {string} source
 * @param {Set<string>} componentNames
 * @returns {string}
 */
function rewriteContent(source, componentNames) {
  return source.replace(/(['"])([^'"]+)\1/g, (whole, quote, spec) => {
    let next = null;

    // @lunofi/ui/lib/utils -> ./lib/utils
    if (spec === `${UI_ALIAS}/lib/utils`) {
      next = './lib/utils';
    } else if (spec === UI_ALIAS || spec.startsWith(`${UI_ALIAS}/`)) {
      const subpath = spec.slice(UI_ALIAS.length + 1);
      const sibling = subpath.split('/')[0];
      if (componentNames.has(sibling)) {
        // @lunofi/ui/button -> ./button
        next = `./${sibling}`;
      }
    } else if (spec.startsWith('.')) {
      // Relative fallback: ../lib/utils -> ./lib/utils
      if (/(?:^|\/)lib\/utils$/.test(spec)) {
        next = './lib/utils';
      }
      // ./<sibling-component> already correct — leave untouched.
    }

    if (next === null) {
      return whole;
    }
    return `${quote}${next}${quote}`;
  });
}

function sortedUnique(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function getMeta(name) {
  const meta = itemsMeta[name] ?? {};
  return {
    title: meta.title ?? toTitleCase(name),
    description: meta.description ?? '',
    categories: meta.categories ?? [],
    extraRegistryDependencies: meta.extraRegistryDependencies ?? [],
    hasEntry: name in itemsMeta,
  };
}

function listComponentFiles() {
  return readdirSync(UI_COMPONENTS_DIR)
    .filter((file) => file.endsWith('.tsx') && !file.endsWith('.stories.tsx'))
    .sort();
}

function main() {
  const { out } = parseArgs(process.argv.slice(2));
  const outDir = join(out, 'r');
  mkdirSync(outDir, { recursive: true });

  const componentFiles = listComponentFiles();
  const componentNames = new Set(componentFiles.map((file) => basename(file, '.tsx')));

  /** @type {Item[]} */
  const items = [];
  /** @type {string[]} */
  const missingMeta = [];

  // --- Component items (registry:ui) ---
  for (const file of componentFiles) {
    const name = basename(file, '.tsx');
    const source = readFileSync(join(UI_COMPONENTS_DIR, file), 'utf8');

    const npmDeps = [];
    const registryDeps = [];
    for (const spec of extractSpecifiers(source)) {
      const { npm, registry } = classifySpecifier(spec, componentNames);
      if (npm) npmDeps.push(npm);
      if (registry) registryDeps.push(registry);
    }

    const meta = getMeta(name);
    if (!meta.hasEntry) missingMeta.push(name);

    items.push({
      name,
      type: 'registry:ui',
      title: meta.title,
      description: meta.description,
      categories: meta.categories,
      dependencies: sortedUnique(npmDeps),
      registryDependencies: sortedUnique([...registryDeps, ...meta.extraRegistryDependencies]),
      files: [
        {
          path: `ui/${name}.tsx`,
          type: 'registry:ui',
          content: rewriteContent(source, componentNames),
        },
      ],
    });
  }

  // --- Lib item: utils (registry:lib) ---
  {
    const name = 'utils';
    const source = readFileSync(UI_UTILS_FILE, 'utf8');
    const npmDeps = [];
    for (const spec of extractSpecifiers(source)) {
      const { npm } = classifySpecifier(spec, componentNames);
      if (npm) npmDeps.push(npm);
    }
    const meta = getMeta(name);
    if (!meta.hasEntry) missingMeta.push(name);

    items.push({
      name,
      type: 'registry:lib',
      title: meta.title,
      description: meta.description,
      categories: meta.categories,
      dependencies: sortedUnique(npmDeps),
      registryDependencies: sortedUnique(meta.extraRegistryDependencies),
      files: [
        {
          path: 'ui/lib/utils.ts',
          type: 'registry:lib',
          content: rewriteContent(source, componentNames),
        },
      ],
    });
  }

  // --- Theme item (registry:theme) ---
  {
    const name = 'theme';
    const content = readFileSync(TAILWIND_TOKENS_FILE, 'utf8');
    const meta = getMeta(name);
    if (!meta.hasEntry) missingMeta.push(name);

    items.push({
      name,
      type: 'registry:theme',
      title: meta.title,
      description: meta.description,
      categories: meta.categories,
      dependencies: [],
      registryDependencies: sortedUnique(meta.extraRegistryDependencies),
      files: [
        {
          path: 'ui/theme.css',
          type: 'registry:theme',
          content,
        },
      ],
    });
  }

  // Stable ordering by name for deterministic output.
  items.sort((a, b) => a.name.localeCompare(b.name));

  // --- Write per-item files ---
  for (const item of items) {
    const itemJson = {
      $schema: SCHEMA_URL,
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      dependencies: item.dependencies,
      registryDependencies: item.registryDependencies,
      files: item.files,
    };
    writeFileSync(
      join(outDir, `${item.name}.json`),
      `${JSON.stringify(itemJson, null, 2)}\n`,
      'utf8',
    );
  }

  // --- Write index.json ---
  const index = {
    name: registryMeta.name,
    homepage: registryMeta.homepage,
    items: items.map((item) => ({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      categories: item.categories,
    })),
  };
  writeFileSync(join(outDir, 'index.json'), `${JSON.stringify(index, null, 2)}\n`, 'utf8');

  // --- Report ---
  console.log(`Wrote ${items.length} item(s) to ${outDir}`);
  console.log(`  index.json + ${items.length} item file(s)`);
  if (missingMeta.length > 0) {
    console.warn(
      `\nWarning: ${missingMeta.length} item(s) missing metadata in registry.config.mjs ` +
        `(using derived title, empty description):\n  - ${missingMeta.join('\n  - ')}`,
    );
  }
}

main();
