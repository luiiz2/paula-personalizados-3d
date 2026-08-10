import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { links } from '@/data/links';
import { TransformationStory } from './TransformationStory';

describe('TransformationStory', () => {
  it('keeps the complete story and general conversion link available without motion', () => {
    render(<TransformationStory />);

    expect(
      screen.getByRole('heading', { level: 2, name: /da sua foto para o 3d/i }),
    ).toBeVisible();
    expect(screen.getByRole('img', { name: /referência original/i })).toBeVisible();
    expect(screen.getByRole('img', { name: /resultado personalizado/i })).toBeVisible();
    expect(screen.getByText('Foto ou desenho')).toBeVisible();
    expect(screen.getByText('Transformação')).toBeVisible();
    expect(screen.getByText('Peça 3D')).toBeVisible();
    expect(screen.getByRole('link', { name: /criar meu personalizado/i })).toHaveAttribute(
      'href',
      links.whatsapp,
    );
  });
});
