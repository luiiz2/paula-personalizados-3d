export interface MotionCapabilities {
  finePointer: boolean;
  reducedMotion: boolean;
}

export interface EditorialPanelCapabilities {
  width: number;
  reducedMotion: boolean;
}

export interface PointerOffset {
  x: number;
  y: number;
}

export function shouldEnhanceMotion({
  finePointer,
  reducedMotion,
}: MotionCapabilities): boolean {
  return finePointer && !reducedMotion;
}

export function shouldPinEditorialPanel({
  width,
  reducedMotion,
}: EditorialPanelCapabilities): boolean {
  return width >= 960 && !reducedMotion;
}

export function pointerOffset(
  clientX: number,
  clientY: number,
  rect: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>,
): PointerOffset {
  const x = ((clientX - rect.left) / rect.width) * 2 - 1;
  const y = ((clientY - rect.top) / rect.height) * 2 - 1;

  return {
    x: Math.max(-1, Math.min(1, x)),
    y: Math.max(-1, Math.min(1, y)),
  };
}
