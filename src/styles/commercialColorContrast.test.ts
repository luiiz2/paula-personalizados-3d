import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const stylesheet = readFileSync(resolve('src/styles/commercial.css'), 'utf8');

const WHITE = '#ffffff';

function relativeLuminance(hex: string) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)!
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(foreground: string, background: string) {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));

  return (lighter + 0.05) / (darker + 0.05);
}

function colorsFor(selector: string) {
  const declarations = stylesheet
    .split('}')
    .map((rule) => rule.split('{'))
    .find(([selectors]) =>
      selectors
        .split(',')
        .map((candidate) => candidate.trim())
        .includes(selector),
    )?.[1];

  expect(declarations, `missing CSS rule for ${selector}`).toBeDefined();

  return declarations!.match(/#[0-9a-f]{6}/gi) ?? [];
}

describe('commercial CTA contrast', () => {
  it.each([
    '.channel-link--whatsapp',
    '.channel-link--whatsapp:hover',
    '.channel-link--whatsapp:focus-visible',
    '.channel-link--instagram',
    '.channel-link--instagram:hover',
    '.channel-link--instagram:focus-visible',
    '.channel-link--shopee',
    '.channel-link--shopee:hover',
    '.channel-link--shopee:focus-visible',
    '.commercial-button--rose',
    '.commercial-button--rose:hover',
    '.commercial-button--rose:focus-visible',
  ])('%s keeps white text at WCAG AA contrast across every surface color', (selector) => {
    const surfaceColors = colorsFor(selector);

    expect(surfaceColors.length).toBeGreaterThan(0);
    surfaceColors.forEach((surface) => {
      expect(contrastRatio(WHITE, surface), `${selector} on ${surface}`).toBeGreaterThanOrEqual(4.5);
    });
  });
});
