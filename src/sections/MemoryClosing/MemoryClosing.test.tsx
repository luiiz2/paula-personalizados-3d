import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryClosing } from './MemoryClosing';

describe('MemoryClosing', () => {
  it('renders the approved closing statement and informative image', () => {
    render(<MemoryClosing />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /muito mais que presentes, criamos memórias/i,
      }),
    ).toBeVisible();
    expect(screen.getByRole('img', { name: /presente personalizado/i })).toBeVisible();
  });
});
