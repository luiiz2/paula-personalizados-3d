import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { TrustMarquee } from './TrustMarquee';

it('exposes one accessible statement and hides visual repetitions', () => {
  const { container } = render(<TrustMarquee />);

  expect(screen.getByLabelText('Diferenciais da Paula Personalizados 3D')).toBeInTheDocument();
  expect(container.querySelectorAll('[data-horizontal-copy]')).toHaveLength(2);
  expect(
    [...container.querySelectorAll('[data-horizontal-copy]')].every(
      (copy) => copy.getAttribute('aria-hidden') === 'true',
    ),
  ).toBe(true);
});
