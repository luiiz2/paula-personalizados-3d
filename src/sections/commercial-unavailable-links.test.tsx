import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/data/links', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/data/links')>();
  const configuredLinks = { ...actual.links, whatsapp: '' };

  return {
    ...actual,
    links: configuredLinks,
    hasLink: (key: keyof typeof configuredLinks) =>
      configuredLinks[key].trim().length > 0,
  };
});

import { ChannelGrid } from './ChannelGrid/ChannelGrid';
import { CommercialHero } from './CommercialHero/CommercialHero';
import { TransformationStory } from './TransformationStory/TransformationStory';

describe('commercial consumers with an unavailable channel', () => {
  it('omits unavailable WhatsApp links without hiding the remaining channels', () => {
    const { container } = render(
      <>
        <CommercialHero />
        <TransformationStory />
        <ChannelGrid />
      </>,
    );

    expect(screen.queryByText(/quero criar/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/criar meu personalizado/i)).not.toBeInTheDocument();
    expect(screen.queryByText('WhatsApp')).not.toBeInTheDocument();
    expect(container.querySelector('a[href=""]')).not.toBeInTheDocument();

    expect(screen.getByRole('link', { name: /abrir instagram/i })).toBeVisible();
    expect(screen.getByRole('link', { name: /abrir shopee/i })).toBeVisible();
    expect(screen.getByRole('link', { name: /abrir mercado livre/i })).toBeVisible();
  });
});
