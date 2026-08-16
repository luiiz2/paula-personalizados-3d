import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from 'react';
import { CommercialImage } from '@/components/ui/CommercialImage';
import { commercialCategories } from '@/data/commercial';

// oxlint-disable-next-line react/only-export-components -- Helper mantido para contrato público e testes
export function circularOffset(index: number, activeIndex: number, length: number): number {
  let offset = index - activeIndex;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
}

const bentoSizes = ['feature', 'wide', 'standard', 'standard'] as const;

export function CategoryCoverflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [revealResult, setRevealResult] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const pointerScrollStart = useRef(0);
  const pointerDragged = useRef(false);
  const pointerDraggedReset = useRef<ReturnType<typeof setTimeout> | null>(null);
  const length = commercialCategories.length;

  useEffect(
    () => () => {
      if (pointerDraggedReset.current !== null) {
        clearTimeout(pointerDraggedReset.current);
      }
    },
    [],
  );

  const goTo = (index: number) => {
    setActiveIndex((index + length) % length);
    setRevealResult(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(activeIndex + 1);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (pointerDraggedReset.current !== null) {
      clearTimeout(pointerDraggedReset.current);
      pointerDraggedReset.current = null;
    }
    pointerStart.current = event.clientX;
    pointerScrollStart.current = event.currentTarget.scrollLeft;
    pointerDragged.current = false;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    if (Math.abs(distance) < 4) return;
    pointerDragged.current = true;
    event.currentTarget.scrollLeft = pointerScrollStart.current - distance;
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    if (pointerStart.current === null) return;

    const scrolled =
      Math.abs(event.currentTarget.scrollLeft - pointerScrollStart.current) > 1;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;

    if (scrolled) {
      pointerDragged.current = false;
      return;
    }

    if (Math.abs(distance) < 42) return;

    pointerDragged.current = true;
    pointerDraggedReset.current = setTimeout(() => {
      pointerDragged.current = false;
      pointerDraggedReset.current = null;
    }, 0);
    goTo(activeIndex + (distance < 0 ? 1 : -1));
  };

  const onPointerCancel = () => {
    if (pointerDraggedReset.current !== null) {
      clearTimeout(pointerDraggedReset.current);
      pointerDraggedReset.current = null;
    }
    pointerStart.current = null;
    pointerDragged.current = false;
  };

  const onSlideClick = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    if (pointerDragged.current && event.detail > 0) {
      if (pointerDraggedReset.current !== null) {
        clearTimeout(pointerDraggedReset.current);
        pointerDraggedReset.current = null;
      }
      pointerDragged.current = false;
      return;
    }

    if (pointerDraggedReset.current !== null) {
      clearTimeout(pointerDraggedReset.current);
      pointerDraggedReset.current = null;
    }
    pointerDragged.current = false;
    goTo(index);
  };

  return (
    <section
      ref={sectionRef}
      id="categorias"
      className="category-coverflow commercial-section"
      aria-labelledby="categories-title"
    >
      <div className="category-coverflow__heading">
        <p className="commercial-eyebrow">Escolha por onde começar</p>
        <h2 id="categories-title">Nossas categorias</h2>
      </div>

      <div
        ref={trackRef}
        className="category-coverflow__viewport"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Categorias de personalizados"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {commercialCategories.map((category, index) => {
          const offset = circularOffset(index, activeIndex, length);
          const active = index === activeIndex;
          const absoluteOffset = Math.abs(offset);
          const shellStyle: CSSProperties & {
            '--coverflow-x': string;
            '--coverflow-depth': string;
            '--coverflow-rotate': string;
            '--coverflow-scale': string;
          } = {
            '--coverflow-x': `${offset * 14}rem`,
            '--coverflow-depth': `${Math.max(0, 1 - absoluteOffset) * 4}rem`,
            '--coverflow-rotate': `${offset * -24}deg`,
            '--coverflow-scale': String(1 - Math.min(absoluteOffset, 2) * 0.12),
            opacity: Math.max(0.5, 1 - absoluteOffset * 0.2),
            zIndex: 5 - absoluteOffset,
          };

          return (
            <div
              key={category.id}
              className="category-coverflow__slide-shell"
              style={shellStyle}
              data-active={active}
              data-bento-size={bentoSizes[index]}
              data-revealed={active && revealResult}
            >
              <div className="category-coverflow__reveal-frame" data-reveal-card>
                <span className="category-coverflow__number" aria-hidden="true">
                  0{index + 1}
                </span>

                <button
                  type="button"
                  className="category-coverflow__slide"
                  aria-current={active ? 'true' : undefined}
                  aria-label={category.title}
                  tabIndex={active ? 0 : -1}
                  onClick={(event) => onSlideClick(event, index)}
                >
                  <CommercialImage
                    asset={category.image}
                    sizes="(max-width: 767px) 72vw, 32vw"
                    decorative={active && revealResult}
                  />
                  {category.revealImage ? (
                    <CommercialImage
                      asset={category.revealImage}
                      sizes="(max-width: 767px) 72vw, 32vw"
                      className="category-coverflow__reveal"
                      decorative={!active || !revealResult}
                    />
                  ) : null}
                  <span className="category-coverflow__label">{category.title}</span>
                  <span className="category-coverflow__arrow" aria-hidden="true">
                    →
                  </span>
                </button>

                {active && category.revealImage ? (
                  <button
                    type="button"
                    className="category-coverflow__compare"
                    aria-label={
                      revealResult ? 'Mostrar desenho original' : 'Mostrar peça 3D pronta'
                    }
                    aria-pressed={revealResult}
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={() => setRevealResult((value) => !value)}
                  >
                    {revealResult ? 'Ver desenho' : 'Ver resultado'}
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
