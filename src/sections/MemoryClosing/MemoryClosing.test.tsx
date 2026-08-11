import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryClosing } from './MemoryClosing';

describe('MemoryClosing', () => {
  it('renders the approved closing statement and informative image', () => {
    render(<MemoryClosing />);

    expect(screen.getByRole('heading', { level: 2, name: 'Feito para quem importa.' })).toBeVisible();
    expect(screen.getByAltText('Logo Paula Personalizados 3D')).toBeVisible();
    expect(screen.getByRole('img', { name: /presente personalizado/i })).toBeVisible();
  });
});
