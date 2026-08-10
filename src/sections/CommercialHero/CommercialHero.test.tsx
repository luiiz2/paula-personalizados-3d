import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { links } from '@/data/links';
import { CommercialHero } from './CommercialHero';
import { TrustMarquee } from './TrustMarquee';

describe('CommercialHero', () => {
  it('presents the approved headline and conversion paths', () => {
    render(<CommercialHero />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /personalizados 3d que viram memórias/i,
      }),
    ).toBeVisible();
    expect(screen.getByRole('link', { name: /quero criar/i })).toHaveAttribute(
      'href',
      links.whatsapp,
    );
    expect(screen.getByRole('link', { name: /como funciona/i })).toHaveAttribute(
      'href',
      '#como-funciona',
    );
    expect(screen.getAllByRole('img')).toHaveLength(3);
  });

  it('exposes the trust message once to assistive technology', () => {
    render(<TrustMarquee />);

    expect(screen.getByText(/feito à mão · 100% personalizado/i)).toBeVisible();
  });

  it('keeps reveal transforms separate from pointer parallax transforms', () => {
    const { container } = render(<CommercialHero />);
    const revealLayers = container.querySelectorAll<HTMLElement>('[data-hero-media]');
    const parallaxMedia = container.querySelectorAll<HTMLElement>('.commercial-hero__media');

    expect(revealLayers).toHaveLength(3);
    expect(parallaxMedia).toHaveLength(3);

    revealLayers.forEach((layer, index) => {
      expect(layer).not.toBe(parallaxMedia[index]);
      expect(layer).toContainElement(parallaxMedia[index]);
    });
  });
});
