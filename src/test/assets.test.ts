import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

function sourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? sourceFiles(path) : [path];
  });
}

describe('public image references', () => {
  it('point to files that will be copied by Vite', () => {
    const root = resolve(process.cwd());
    const files = [...sourceFiles(join(root, 'src')), join(root, 'index.html')];
    const references = new Set<string>();

    for (const file of files) {
      const content = readFileSync(file, 'utf8');
      for (const match of content.matchAll(/["'](\/assets\/[^"']+\.(?:avif|jpe?g|png|webp))["']/gi)) {
        references.add(match[1]);
      }
    }

    expect(references.size).toBeGreaterThan(0);
    for (const reference of references) {
      expect(existsSync(join(root, 'public', reference))).toBe(true);
    }
  });
});
