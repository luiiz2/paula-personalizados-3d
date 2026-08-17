import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { links } from '@/data/links';
import { TransformationStory } from './TransformationStory';

const stylesheet = readFileSync(resolve('src/styles/commercial.css'), 'utf8');

afterEach(cleanup);

describe('TransformationStory', () => {
  it('uses the editorial typeface for the complete transformation heading', () => {
    const headingRule = stylesheet
      .split('}')
      .map((rule) => rule.split('{'))
      .find(([selector]) => selector.trim() === '.transformation-story__copy h2')?.[1];

    expect(headingRule).toMatch(
      /font(?:-family)?:[^;]*var\(--font-editorial\)/,
    );
  });

  it('tells the transformation with three stages and two truthful informative images', () => {
    const { container } = render(<TransformationStory />);

    expect(
      screen.getByRole('heading', { level: 2, name: /da sua foto para o 3d/i }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll('[data-transform-stage]')).toHaveLength(3);
    expect(screen.getByText('SUA FOTO')).toBeInTheDocument();
    expect(screen.getByText('TRANSFORMAÇÃO')).toBeInTheDocument();
    expect(screen.getByText('SUA PEÇA 3D')).toBeInTheDocument();
    expect(container.querySelectorAll('img:not([alt=""])')).toHaveLength(2);
  });

  it('keeps the complete story and general conversion link available without motion', () => {
    render(<TransformationStory />);

    expect(
      screen.getByRole('heading', { level: 2, name: /da sua foto para o 3d/i }),
    ).toBeVisible();
    expect(screen.getByRole('img', { name: /referência original/i })).toBeVisible();
    expect(screen.getByRole('img', { name: /resultado personalizado/i })).toBeVisible();
    expect(screen.getByText('SUA FOTO')).toBeVisible();
    expect(screen.getByText('TRANSFORMAÇÃO')).toBeVisible();
    expect(screen.getByText('SUA PEÇA 3D')).toBeVisible();
    expect(screen.getByRole('link', { name: /criar meu personalizado/i })).toHaveAttribute(
      'href',
      links.whatsapp,
    );
  });
});
