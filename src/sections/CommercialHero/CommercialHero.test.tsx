import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CommercialHero } from './CommercialHero';
import { TrustMarquee } from './TrustMarquee';

describe('CommercialHero', () => {
  it('presents the approved headline and conversion paths', () => {
    const { container } = render(<CommercialHero />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Memórias que ganham forma.',
      }),
    ).toBeVisible();
    expect(screen.getByRole('link', { name: /quero criar/i })).toHaveAttribute(
      'href',
      expect.stringContaining('wa.me'),
    );
    expect(screen.getByRole('link', { name: /ver categorias/i })).toHaveAttribute(
      'href',
      '#categorias',
    );
    expect(screen.getAllByRole('img')).toHaveLength(3);
    expect(container.querySelectorAll('[data-hero-line]')).toHaveLength(3);
    expect(container.querySelectorAll('[data-hero-media]')).toHaveLength(3);
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

  it('renders the share button and opens the share modal when clicked', async () => {
    render(<CommercialHero />);
    const shareBtn = screen.getByRole('button', { name: /compartilhar o site/i });
    expect(shareBtn).toBeInTheDocument();
  });

  it('renders the animated scroll down indicator link pointing to #feito-a-mao', () => {
    render(<CommercialHero />);
    const scrollIndicator = screen.getByRole('link', { name: /rolar para baixo/i });
    expect(scrollIndicator).toHaveAttribute('href', '#feito-a-mao');
  });
});
