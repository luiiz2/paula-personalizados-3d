import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CategoryCoverflow, circularOffset } from './CategoryCoverflow';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('CategoryCoverflow', () => {
  it('assigns four editorial bento areas without losing the carousel contract', () => {
    const { container } = render(<CategoryCoverflow />);

    expect(container.querySelectorAll('[data-bento-size]')).toHaveLength(4);
    expect(
      [...container.querySelectorAll('[data-bento-size]')].map((node) =>
        node.getAttribute('data-bento-size'),
      ),
    ).toEqual(['feature', 'wide', 'standard', 'standard']);
    expect(screen.getByRole('region', { name: 'Categorias de personalizados' })).toHaveAttribute(
      'aria-roledescription',
      'carrossel',
    );
  });

  it('keeps responsive shell transforms isolated from reveal transforms', () => {
    const { container } = render(<CategoryCoverflow />);
    const shells = [...container.querySelectorAll('.category-coverflow__slide-shell')];
    const revealTargets = [...container.querySelectorAll('[data-reveal-card]')];

    expect(revealTargets).toHaveLength(4);
    expect(shells).toHaveLength(4);
    expect(revealTargets.every((target, index) => shells[index]?.contains(target))).toBe(true);
    expect(revealTargets.some((target) => target.classList.contains('category-coverflow__slide-shell')))
      .toBe(false);
  });

  it('wraps slide offsets around the shortest path', () => {
    expect(circularOffset(3, 0, 4)).toBe(-1);
    expect(circularOffset(0, 3, 4)).toBe(1);
  });

  it('supports keyboard navigation', () => {
    render(<CategoryCoverflow />);

    const firstCategory = screen.getByRole('button', { name: 'Miniaturas da sua foto' });
    const drawingCategory = screen.getByRole('button', { name: 'Do desenho para a vida em 3D' });

    expect(firstCategory).toHaveAttribute('aria-current', 'true');

    const carousel = screen.getByRole('region', { name: /categorias de personalizados/i });
    fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    expect(drawingCategory).toHaveAttribute('aria-current', 'true');
    expect(firstCategory).not.toHaveAttribute('aria-current');

    fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
    expect(firstCategory).toHaveAttribute('aria-current', 'true');
  });

  it('marks only the selected category as current', () => {
    render(<CategoryCoverflow />);

    const firstCategory = screen.getByRole('button', { name: 'Miniaturas da sua foto' });
    const drawingCategory = screen.getByRole('button', {
      name: 'Do desenho para a vida em 3D',
    });

    expect(firstCategory).toHaveAttribute('aria-current', 'true');
    expect(drawingCategory).not.toHaveAttribute('aria-current');

    fireEvent.click(drawingCategory);

    expect(firstCategory).not.toHaveAttribute('aria-current');
    expect(drawingCategory).toHaveAttribute('aria-current', 'true');
  });

  it('keeps only the active category card in the tab order', () => {
    render(<CategoryCoverflow />);

    const firstCategory = screen.getByRole('button', { name: 'Miniaturas da sua foto' });
    const drawingCategory = screen.getByRole('button', {
      name: 'Do desenho para a vida em 3D',
    });

    expect(firstCategory).toHaveAttribute('tabindex', '0');
    expect(drawingCategory).toHaveAttribute('tabindex', '-1');

    fireEvent.click(drawingCategory);

    expect(firstCategory).toHaveAttribute('tabindex', '-1');
    expect(drawingCategory).toHaveAttribute('tabindex', '0');
  });

  it('navigates only when a horizontal pointer drag reaches the threshold', () => {
    render(<CategoryCoverflow />);
    const firstCategory = screen.getByRole('button', { name: 'Miniaturas da sua foto' });
    const drawingCategory = screen.getByRole('button', { name: 'Do desenho para a vida em 3D' });

    // Small drag — should NOT navigate
    fireEvent.pointerDown(firstCategory, { clientX: 100, pointerId: 1 });
    fireEvent.pointerUp(firstCategory, { clientX: 60, pointerId: 1 });
    expect(firstCategory).toHaveAttribute('aria-current', 'true');

    // Large drag — should navigate
    fireEvent.pointerDown(firstCategory, { clientX: 100, pointerId: 2 });
    fireEvent.pointerUp(firstCategory, { clientX: 57, pointerId: 2 });
    expect(drawingCategory).toHaveAttribute('aria-current', 'true');

    // Click after drag is suppressed
    fireEvent.click(firstCategory, { detail: 1 });
    expect(drawingCategory).toHaveAttribute('aria-current', 'true');
  });

  it('expires drag click suppression when no residual click is emitted', () => {
    vi.useFakeTimers();
    render(<CategoryCoverflow />);
    const firstCategory = screen.getByRole('button', { name: 'Miniaturas da sua foto' });
    const drawingCategory = screen.getByRole('button', { name: 'Do desenho para a vida em 3D' });

    fireEvent.pointerDown(firstCategory, { clientX: 100, pointerId: 1 });
    fireEvent.pointerUp(firstCategory, { clientX: 57, pointerId: 1 });
    expect(drawingCategory).toHaveAttribute('aria-current', 'true');

    vi.runOnlyPendingTimers();
    fireEvent.click(firstCategory, { detail: 1 });

    expect(firstCategory).toHaveAttribute('aria-current', 'true');
  });

  it('offers an explicit drawing-to-result comparison control', () => {
    render(<CategoryCoverflow />);
    fireEvent.click(screen.getByRole('button', { name: /do desenho para a vida em 3d/i }));

    const toggle = screen.getByRole('button', { name: /mostrar peça 3d pronta/i });
    expect(toggle.closest('.category-coverflow__slide')).toBeNull();
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });

  it('keeps comparison pointer interaction isolated from carousel drag', () => {
    render(<CategoryCoverflow />);
    fireEvent.click(screen.getByRole('button', { name: /do desenho para a vida em 3d/i }));
    const carousel = screen.getByRole('region', { name: /categorias de personalizados/i });
    const toggle = screen.getByRole('button', { name: /mostrar peça 3d pronta/i });
    const drawingCategory = screen.getByRole('button', { name: /do desenho para a vida em 3d/i });

    fireEvent.pointerDown(toggle, { clientX: 100, pointerId: 1 });
    fireEvent.pointerUp(carousel, { clientX: 40, pointerId: 1 });
    fireEvent.click(toggle);

    expect(drawingCategory).toHaveAttribute('aria-current', 'true');
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(toggle).toHaveAccessibleName(/mostrar desenho original/i);
  });
});
