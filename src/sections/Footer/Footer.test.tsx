import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('keeps semantic navigation and configured commercial destinations', () => {
    const { container } = render(<Footer />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Navegação do rodapé' })).toBeInTheDocument();
    expect(container.querySelector('a[href=""]')).not.toBeInTheDocument();
  });
});
