import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CategoryCoverflow, circularOffset } from './CategoryCoverflow';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('CategoryCoverflow', () => {
  it('wraps slide offsets around the shortest path', () => {
    expect(circularOffset(3, 0, 4)).toBe(-1);
    expect(circularOffset(0, 3, 4)).toBe(1);
  });

  it('supports visible controls and keyboard navigation', () => {
    render(<CategoryCoverflow />);

    expect(screen.getByText('1 de 4')).toBeVisible();
    expect(screen.getByRole('button', { name: /categoria anterior/i })).toBeVisible();
    const nextButton = screen.getByRole('button', { name: /próxima categoria/i });
    expect(nextButton).toBeVisible();
    fireEvent.click(nextButton);
    expect(screen.getByText('2 de 4')).toBeVisible();
    const carousel = screen.getByRole('region', { name: /categorias de personalizados/i });
    fireEvent.keyDown(carousel, {
      key: 'ArrowLeft',
    });
    expect(screen.getByText('1 de 4')).toBeVisible();
    fireEvent.keyDown(carousel, {
      key: 'ArrowRight',
    });
    expect(screen.getByText('2 de 4')).toBeVisible();
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
    expect(screen.getByText('2 de 4')).toBeVisible();
  });

  it('keeps only the active category card in the tab order', () => {
    render(<CategoryCoverflow />);

    const firstCategory = screen.getByRole('button', { name: 'Miniaturas da sua foto' });
    const drawingCategory = screen.getByRole('button', {
      name: 'Do desenho para a vida em 3D',
    });

    expect(firstCategory).toHaveAttribute('tabindex', '0');
    expect(drawingCategory).toHaveAttribute('tabindex', '-1');

    fireEvent.click(screen.getByRole('button', { name: /próxima categoria/i }));

    expect(firstCategory).toHaveAttribute('tabindex', '-1');
    expect(drawingCategory).toHaveAttribute('tabindex', '0');
  });

  it('navigates only when a horizontal pointer drag reaches the threshold', () => {
    render(<CategoryCoverflow />);
    const activeCategory = screen.getByRole('button', { name: 'Miniaturas da sua foto' });

    fireEvent.pointerDown(activeCategory, { clientX: 100, pointerId: 1 });
    fireEvent.pointerUp(activeCategory, { clientX: 60, pointerId: 1 });
    expect(screen.getByText('1 de 4')).toBeVisible();

    fireEvent.pointerDown(activeCategory, { clientX: 100, pointerId: 2 });
    fireEvent.pointerUp(activeCategory, { clientX: 57, pointerId: 2 });
    expect(screen.getByText('2 de 4')).toBeVisible();

    fireEvent.click(activeCategory, { detail: 1 });
    expect(screen.getByText('2 de 4')).toBeVisible();
  });

  it('expires drag click suppression when no residual click is emitted', () => {
    vi.useFakeTimers();
    render(<CategoryCoverflow />);
    const activeCategory = screen.getByRole('button', { name: 'Miniaturas da sua foto' });

    fireEvent.pointerDown(activeCategory, { clientX: 100, pointerId: 1 });
    fireEvent.pointerUp(activeCategory, { clientX: 57, pointerId: 1 });
    expect(screen.getByText('2 de 4')).toBeVisible();

    vi.runOnlyPendingTimers();
    fireEvent.click(activeCategory, { detail: 1 });

    expect(screen.getByText('1 de 4')).toBeVisible();
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

    fireEvent.pointerDown(toggle, { clientX: 100, pointerId: 1 });
    fireEvent.pointerUp(carousel, { clientX: 40, pointerId: 1 });
    fireEvent.click(toggle);

    expect(screen.getByText('2 de 4')).toBeVisible();
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(toggle).toHaveAccessibleName(/mostrar desenho original/i);
  });
});
