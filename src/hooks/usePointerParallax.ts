import { useEffect, useRef, type RefObject } from 'react';
import { pointerOffset, shouldEnhanceMotion } from '@/lib/motion';

export function usePointerParallax<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!shouldEnhanceMotion({ finePointer, reducedMotion })) return;

    let frame = 0;
    let cachedRect: DOMRect = node.getBoundingClientRect();

    const updateRect = () => {
      if (node) {
        cachedRect = node.getBoundingClientRect();
      }
    };

    window.addEventListener('resize', updateRect, { passive: true });

    const applyOffset = (x: number, y: number) => {
      node.style.setProperty('--pointer-x', x.toFixed(3));
      node.style.setProperty('--pointer-y', y.toFixed(3));
    };
    const onPointerEnter = () => {
      updateRect();
    };
    const onPointerMove = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const offset = pointerOffset(
          event.clientX,
          event.clientY,
          cachedRect,
        );
        applyOffset(offset.x, offset.y);
      });
    };
    const onPointerLeave = () => applyOffset(0, 0);

    node.addEventListener('pointerenter', onPointerEnter, { passive: true });
    node.addEventListener('pointermove', onPointerMove, { passive: true });
    node.addEventListener('pointerleave', onPointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateRect);
      node.removeEventListener('pointerenter', onPointerEnter);
      node.removeEventListener('pointermove', onPointerMove);
      node.removeEventListener('pointerleave', onPointerLeave);
      applyOffset(0, 0);
    };
  }, []);

  return ref;
}
