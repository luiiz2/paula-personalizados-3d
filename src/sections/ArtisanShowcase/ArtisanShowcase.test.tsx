import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ArtisanShowcase } from './ArtisanShowcase';

const originalInnerWidth = window.innerWidth;
const originalMatchMedia = window.matchMedia;
const originalScrollTo = window.scrollTo;

interface MediaCapabilities {
  width: number;
  reducedMotion: boolean;
}

function installMutableMatchMedia(initial: MediaCapabilities) {
  let capabilities = initial;
  const listeners = new Map<string, Set<(event: MediaQueryListEvent) => void>>();

  const queryMatches = (query: string) => {
    if (query === '(min-width: 960px)') return capabilities.width >= 960;
    if (query === '(prefers-reduced-motion: reduce)') return capabilities.reducedMotion;
    return false;
  };

  const addListener = (query: string, listener: (event: MediaQueryListEvent) => void) => {
    const queryListeners = listeners.get(query) ?? new Set();
    queryListeners.add(listener);
    listeners.set(query, queryListeners);
  };

  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: capabilities.width,
  });
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: (query: string): MediaQueryList =>
      ({
        matches: queryMatches(query),
        media: query,
        onchange: null,
        addListener: (listener: MediaQueryList['onchange']) => {
          if (listener) addListener(query, listener);
        },
        removeListener: (listener: MediaQueryList['onchange']) => {
          if (listener) listeners.get(query)?.delete(listener);
        },
        addEventListener: (
          _type: string,
          listener: EventListenerOrEventListenerObject | null,
        ) => {
          if (typeof listener === 'function') {
            addListener(query, listener as (event: MediaQueryListEvent) => void);
          }
        },
        removeEventListener: (
          _type: string,
          listener: EventListenerOrEventListenerObject | null,
        ) => {
          if (typeof listener === 'function') {
            listeners.get(query)?.delete(listener as (event: MediaQueryListEvent) => void);
          }
        },
        dispatchEvent: () => true,
      }) as MediaQueryList,
  });
  Object.defineProperty(window, 'scrollTo', {
    configurable: true,
    value: vi.fn(),
  });

  return async (next: MediaCapabilities) => {
    const changedQueries = [
      capabilities.width >= 960 !== next.width >= 960 && '(min-width: 960px)',
      capabilities.reducedMotion !== next.reducedMotion &&
        '(prefers-reduced-motion: reduce)',
    ].filter((query): query is string => Boolean(query));

    capabilities = next;
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: capabilities.width,
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 4));
      changedQueries.forEach((query) => {
        listeners.get(query)?.forEach((listener) =>
          listener({ matches: queryMatches(query), media: query } as MediaQueryListEvent),
        );
      });
    });
  };
}

afterEach(() => {
  cleanup();
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: originalInnerWidth,
  });
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: originalMatchMedia,
  });
  Object.defineProperty(window, 'scrollTo', {
    configurable: true,
    value: originalScrollTo,
  });
});

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

  it('reconfigures pinning when the viewport eligibility changes', async () => {
    const setCapabilities = installMutableMatchMedia({ width: 1440, reducedMotion: false });
    const { container } = render(<ArtisanShowcase />);

    await waitFor(() => {
      expect(container.querySelector('.pin-spacer')).toBeInTheDocument();
    });

    await setCapabilities({ width: 390, reducedMotion: false });

    await waitFor(() => {
      expect(container.querySelector('.pin-spacer')).not.toBeInTheDocument();
    });

    await setCapabilities({ width: 1440, reducedMotion: false });

    await waitFor(() => {
      expect(container.querySelector('.pin-spacer')).toBeInTheDocument();
    });
  });
});
