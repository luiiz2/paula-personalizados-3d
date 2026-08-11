import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { links } from '@/data/links';
import { TransformationStory } from './TransformationStory';

afterEach(cleanup);

describe('TransformationStory', () => {
  it('tells the transformation with three stages and two truthful informative images', () => {
    const { container } = render(<TransformationStory />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Da sua foto para o 3D.' }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll('[data-transform-stage]')).toHaveLength(3);
    expect(screen.getByText('Foto')).toBeInTheDocument();
    expect(screen.getByText('Transformação')).toBeInTheDocument();
    expect(screen.getByText('Peça 3D')).toBeInTheDocument();
    expect(container.querySelectorAll('img:not([alt=""])')).toHaveLength(2);
  });

  it('keeps the complete story and general conversion link available without motion', () => {
    render(<TransformationStory />);

    expect(
      screen.getByRole('heading', { level: 2, name: /da sua foto para o 3d/i }),
    ).toBeVisible();
    expect(screen.getByRole('img', { name: /referência original/i })).toBeVisible();
    expect(screen.getByRole('img', { name: /resultado personalizado/i })).toBeVisible();
    expect(screen.getByText('Foto')).toBeVisible();
    expect(screen.getByText('Transformação')).toBeVisible();
    expect(screen.getByText('Peça 3D')).toBeVisible();
    expect(screen.getByRole('link', { name: /criar meu personalizado/i })).toHaveAttribute(
      'href',
      links.whatsapp,
    );
  });
});
