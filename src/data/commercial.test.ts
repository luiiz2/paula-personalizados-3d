import { describe, expect, it } from 'vitest';
import {
  artisanShowcaseAssets,
  brandAsset,
  commercialCategories,
  commercialChannels,
  heroAssets,
  transformationStory,
} from './commercial';

describe('commercial landing data', () => {
  it('defines six unique categories and four unique channels', () => {
    expect(commercialCategories).toHaveLength(6);
    expect(new Set(commercialCategories.map(({ id }) => id)).size).toBe(6);
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
    expect(commercialCategories.every(({ image }) => Boolean(image.src))).toBe(true);
  });

  it('uses the approved real photo and matching 3D result', () => {
    expect(transformationStory.source.src).toBe('/assets/transform-red-dress-photo.png');
    expect(transformationStory.process.src).toBe('/assets/transform-red-dress-clay-3d.png');
    expect(transformationStory.result.src).toBe('/assets/transform-red-dress-figure-3d.png');
    expect(transformationStory.source.src).not.toBe(transformationStory.result.src);
  });

  it('keeps the official logo and two showcase assets explicit', () => {
    expect(brandAsset.src).toBe('/assets/logo-paula-personalizados-3d.webp');
    expect(artisanShowcaseAssets.primary.alt).toMatch(/personagem feminina/i);
    expect(artisanShowcaseAssets.secondary.alt).toMatch(/pai e filho/i);
  });

  it('keeps exactly six unique commercial categories', () => {
    expect(commercialCategories.map(({ id }) => id)).toEqual([
      'foto-3d',
      'desenho-3d',
      'bonecos',
      'lembrancas',
      'luminarias-3d',
      'chaveiros-pets',
    ]);
    expect(new Set(heroAssets.map(({ src }) => src)).size).toBe(heroAssets.length);
  });
});
