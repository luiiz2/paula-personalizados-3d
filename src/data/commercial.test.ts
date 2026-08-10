import { describe, expect, it } from 'vitest';
import {
  commercialCategories,
  commercialChannels,
  heroAssets,
  transformationStory,
} from './commercial';

describe('commercial landing data', () => {
  it('defines four unique categories and four unique channels', () => {
    expect(commercialCategories).toHaveLength(4);
    expect(new Set(commercialCategories.map(({ id }) => id)).size).toBe(4);
    expect(commercialChannels.map(({ key }) => key)).toEqual([
      'whatsapp',
      'instagram',
      'shopee',
      'mercadoLivre',
    ]);
  });

  it('provides the media needed for hero and transformation storytelling', () => {
    expect(heroAssets).toHaveLength(3);
    expect(transformationStory.source.src).toMatch(/^\/assets\//);
    expect(transformationStory.result.src).toMatch(/^\/assets\//);
    expect(
      commercialCategories.find(({ id }) => id === 'desenho-3d')?.revealImage,
    ).toBeDefined();
  });
});
