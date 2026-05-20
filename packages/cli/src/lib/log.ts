/** Minimal console helpers — no color dependencies, ANSI applied directly. */

const supportsColor =
  process.stdout.isTTY === true &&
  process.env.NO_COLOR === undefined &&
  process.env.TERM !== 'dumb';

function paint(code: string, text: string): string {
  return supportsColor ? `[${code}m${text}[0m` : text;
}

export const color = {
  bold: (t: string) => paint('1', t),
  dim: (t: string) => paint('2', t),
  red: (t: string) => paint('31', t),
  green: (t: string) => paint('32', t),
  yellow: (t: string) => paint('33', t),
  cyan: (t: string) => paint('36', t),
};

export const log = {
  info(message: string): void {
    console.log(message);
  },
  success(message: string): void {
    console.log(`${color.green('✓')} ${message}`);
  },
  warn(message: string): void {
    console.warn(`${color.yellow('!')} ${message}`);
  },
  error(message: string): void {
    console.error(`${color.red('✗')} ${message}`);
  },
  step(message: string): void {
    console.log(`${color.cyan('›')} ${message}`);
  },
  break(): void {
    console.log('');
  },
};
