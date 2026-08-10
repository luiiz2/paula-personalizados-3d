import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SmoothScroll } from './SmoothScroll';

vi.mock('lenis', () => ({ default: vi.fn() }));

describe('SmoothScroll', () => {
  it('always renders content when enhanced scrolling is unavailable', () => {
    render(
      <SmoothScroll>
        <p>Conteúdo comercial</p>
      </SmoothScroll>,
    );

    expect(screen.getByText('Conteúdo comercial')).toBeVisible();
  });
});
