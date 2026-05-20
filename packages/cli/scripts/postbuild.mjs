/**
 * Ensure the compiled entry keeps an executable `#!/usr/bin/env node` shebang.
 *
 * tsc preserves a leading shebang comment in the source, but this guards
 * against it being stripped and sets the executable bit on POSIX systems so
 * `npx lunofi` works regardless of how the file was emitted.
 */

import { readFileSync, writeFileSync, chmodSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SHEBANG = '#!/usr/bin/env node';
const here = dirname(fileURLToPath(import.meta.url));
const entry = join(here, '..', 'dist', 'index.js');

const source = readFileSync(entry, 'utf8');
if (!source.startsWith('#!')) {
  writeFileSync(entry, `${SHEBANG}\n${source}`, 'utf8');
}

try {
  chmodSync(entry, 0o755);
} catch {
  // chmod is a no-op / unsupported on some platforms (Windows); ignore.
}
