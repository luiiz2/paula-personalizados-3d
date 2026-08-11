import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ArtisanShowcase } from './ArtisanShowcase';

describe('ArtisanShowcase', () => {
  it('presents two real products and four concise proof points', () => {
    const { container } = render(<ArtisanShowcase />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Feito à mão. Feito pra durar.' }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll('[data-artisan-product]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-artisan-proof]')).toHaveLength(4);
    expect(container.querySelector('[data-artisan-stage]')).toBeInTheDocument();
  });
});
