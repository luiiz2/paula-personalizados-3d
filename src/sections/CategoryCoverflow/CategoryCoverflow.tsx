import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CommercialImage } from '@/components/ui/CommercialImage';
import { commercialCategories } from '@/data/commercial';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

// oxlint-disable-next-line react/only-export-components -- Helper mantido para contrato público e testes
export function circularOffset(index: number, activeIndex: number, length: number): number {
  let offset = index - activeIndex;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
}

const bentoSizes = ['feature', 'wide', 'standard', 'standard', 'wide', 'feature'] as const;

interface HorizontalLoopTimeline extends gsap.core.Timeline {
  next: (vars?: gsap.TweenVars) => gsap.core.Tween;
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween;
  current: () => number;
  toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween;
  times: number[];
}

function horizontalLoop(items: HTMLElement[], config?: {
  repeat?: number;
  paused?: boolean;
  speed?: number;
  snap?: number | false | ((value: number) => number);
  paddingRight?: number;
  reversed?: boolean;
}): HorizontalLoopTimeline {
  const elements = gsap.utils.toArray<HTMLElement>(items);
  const cfg = config || {};
  const tl = gsap.timeline({
    repeat: cfg.repeat ?? -1,
    paused: cfg.paused ?? true,
    defaults: { ease: 'none' },
  }) as HorizontalLoopTimeline;

  const length = elements.length;
  const startX = elements[0]?.offsetLeft || 0;
  const times: number[] = [];
  const widths: number[] = [];
  const xPercents: number[] = [];
  let curIndex = 0;
  const pixelsPerSecond = (cfg.speed || 1) * 100;
  const snap = typeof cfg.snap === 'function'
    ? cfg.snap
    : cfg.snap === false
      ? (v: number) => v
      : gsap.utils.snap(cfg.snap || 1);

  gsap.set(elements, {
    xPercent: (i, el) => {
      const w = (widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px') as string) || 300);
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, 'x', 'px') as string) / w) * 100 +
          ((gsap.getProperty(el, 'xPercent') as number) || 0)
      );
      return xPercents[i];
    },
  });
  gsap.set(elements, { x: 0 });

  const totalWidth =
    (elements[length - 1]?.offsetLeft || 0) +
    ((xPercents[length - 1] || 0) / 100) * (widths[length - 1] || 300) -
    startX +
    (elements[length - 1]?.offsetWidth || 300) *
      (((gsap.getProperty(elements[length - 1], 'scaleX') as number) || 1)) +
    (typeof cfg.paddingRight === 'number' ? cfg.paddingRight : 28);

  for (let i = 0; i < length; i++) {
    const item = elements[i];
    const curX = (xPercents[i] / 100) * widths[i];
    const distanceToStart = item.offsetLeft + curX - startX;
    const distanceToLoop = distanceToStart + widths[i] * (((gsap.getProperty(item, 'scaleX') as number) || 1));
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        { xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100) },
        {
          xPercent: xPercents[i],
          duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add('label' + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }

  function toIndex(index: number, vars?: gsap.TweenVars) {
    const v = vars || {};
    if (Math.abs(index - curIndex) > length / 2) {
      index += index > curIndex ? -length : length;
    }
    const newIndex = gsap.utils.wrap(0, length, index);
    let time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      v.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    v.overwrite = true;
    return tl.tweenTo(time, v);
  }

  tl.next = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true);
  return tl;
}

export function CategoryCoverflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const pointerScrollStart = useRef(0);
  const pointerDragged = useRef(false);
  const pointerDraggedReset = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loopTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const length = commercialCategories.length;

  useGSAP(
    () => {
      if (prefersReducedMotion() || !trackRef.current || !sectionRef.current) return;

      // 1. Heading entrance
      gsap.fromTo(
        '[data-category-heading]',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );

      // 2. 3D Floating organic figures
      const floatTween = gsap.to('[data-category-figure]', {
        y: -7,
        duration: 3.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.4,
          from: 'random',
        },
      });

      // 3. GSAP Pinned Horizontal Scroll Gallery with Seamless Infinite Loop
      const cards = gsap.utils.toArray<HTMLElement>('.category-coverflow__slide-shell');
      if (cards.length > 0) {
        const loop = horizontalLoop(cards, {
          paused: true,
          repeat: -1,
          paddingRight: 28,
        });
        loopTimelineRef.current = loop;

        let lastActiveItem = 0;
        const pinTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          pin: true,
          start: 'top top',
          end: '+=1400',
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Drive the seamless loop progress smoothly with vertical scroll
            loop.progress(self.progress);
            const currentItem = Math.floor(self.progress * length * 2) % length;
            if (currentItem !== lastActiveItem) {
              lastActiveItem = currentItem;
              setActiveIndex(currentItem);
            }
          },
        });

        return () => {
          floatTween.kill();
          pinTrigger.kill();
          loop.kill();
        };
      }

      return () => {
        floatTween.kill();
      };
    },
    { scope: sectionRef },
  );

  useEffect(
    () => () => {
      if (pointerDraggedReset.current !== null) {
        clearTimeout(pointerDraggedReset.current);
      }
    },
    [],
  );

  const goTo = (index: number) => {
    const nextIndex = (index + length) % length;
    setActiveIndex(nextIndex);
    if (loopTimelineRef.current) {
      loopTimelineRef.current.toIndex(nextIndex, { duration: 0.6, ease: 'power2.out' });
    }
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
      <div className="category-coverflow__container">
        <div className="category-coverflow__heading" data-category-heading>
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
          <div className="category-coverflow__track">
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
                opacity: 1,
                zIndex: 5 - absoluteOffset,
              };

              return (
                <div
                  key={category.id}
                  className="category-coverflow__slide-shell"
                  style={shellStyle}
                  data-active={active}
                  data-bento-size={bentoSizes[index]}
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
                      <div className="category-coverflow__image-stage" data-category-figure>
                        <CommercialImage
                          asset={category.image}
                          sizes="(max-width: 767px) 72vw, 32vw"
                        />
                      </div>
                      <div className="category-coverflow__text-group">
                        <span className="category-coverflow__label">{category.title}</span>
                        <span className="category-coverflow__description">{category.description}</span>
                      </div>
                      <span className="category-coverflow__arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
