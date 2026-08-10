import { describe, expect, it } from 'vitest';
import { pointerOffset, shouldEnhanceMotion } from './motion';

describe('motion capabilities', () => {
  it('enhances motion only for a precise pointer without reduced motion', () => {
    expect(shouldEnhanceMotion({ finePointer: true, reducedMotion: false })).toBe(true);
    expect(shouldEnhanceMotion({ finePointer: false, reducedMotion: false })).toBe(false);
    expect(shouldEnhanceMotion({ finePointer: true, reducedMotion: true })).toBe(false);
  });

  it('normalizes pointer coordinates to the range from -1 to 1', () => {
    const rect = { left: 100, top: 50, width: 200, height: 100 };

    expect(pointerOffset(100, 50, rect)).toEqual({ x: -1, y: -1 });
    expect(pointerOffset(200, 100, rect)).toEqual({ x: 0, y: 0 });
    expect(pointerOffset(300, 150, rect)).toEqual({ x: 1, y: 1 });
  });
});
