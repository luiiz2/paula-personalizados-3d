# Paula Personalizados 3D Commercial Landing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current long landing page with a short, continuous, motion-rich commercial experience that directs visitors to WhatsApp, Instagram, Shopee, or Mercado Livre.

**Architecture:** Keep the existing React 19 + Vite + Tailwind structure, but introduce focused commercial sections backed by centralized data. GSAP/ScrollTrigger owns scroll choreography, CSS owns decorative motion and hover states, React owns carousel state, a small pointer hook owns cursor parallax, and Lenis progressively enhances desktop wheel scrolling without becoming a content dependency.

**Tech Stack:** React 19.2, TypeScript 6, Vite 8, Tailwind CSS 4, GSAP 3.15, `@gsap/react` 2.1, Lenis 1.3.23, Lucide React, Vitest 4, Testing Library, Oxlint.

## Global Constraints

- Node.js must remain `>=22`; npm must remain `>=10`.
- The page is a single cream/pink visual surface. Do not add black section backgrounds or visible white frames around principal images.
- Keep exactly one `<h1>` in the hero; subsequent section titles use `<h2>`.
- Preserve the skip link, visible focus, secure external links, mobile focus trap, `Esc` close, and focus restoration.
- WhatsApp message must be exactly: `Olá! Conheci a Paula Personalizados 3D pelo site e gostaria de criar um personalizado. Pode me ajudar?`
- WhatsApp, Instagram, Shopee, and Mercado Livre URLs remain centralized in `src/data/links.ts`; never add `href="#"` placeholders.
- Real photos prove the work. Promotional treatment may crop, mask, or remove backgrounds, but must not invent an unavailable product, material, or commercial claim.
- Desktop may use pointer parallax and Lenis; touch devices use native scrolling; `prefers-reduced-motion` disables smooth scrolling, parallax, floating loops, and long reveals.
- Content is visible before animation initialization. A GSAP, Lenis, WebGL, or image failure must leave the page readable and operable.
- Do not add Framer Motion or a carousel dependency. React state and CSS transforms implement the coverflow.
- Do not delete the legacy section files in this cycle. They are excluded from the production bundle once `src/App.tsx` stops importing them, and leaving them preserves existing user-owned local changes.
- The worktree is currently dirty. Before execution, run `git status --short`; do not use `git add -A`, do not revert unrelated changes, and do not create a clean worktree from `HEAD` if doing so would omit required local assets or maintenance work. Checkpoint or carry the current state only with user approval.

---

---

### Task 1: Centralize commercial links, copy, and media contracts

**Files:**
- Modify: `src/data/links.ts`
- Create: `src/data/links.test.ts`
- Create: `src/data/commercial.ts`
- Create: `src/data/commercial.test.ts`
- Test: `src/test/assets.test.ts`

**Interfaces:**
- Produces: `WHATSAPP_MESSAGE: string`
- Produces: `buildWhatsappUrl(phone: string, message: string): string`
- Produces: `links: Record<'instagram' | 'whatsapp' | 'shopee' | 'mercadoLivre', string>`
- Produces: `CommercialImageAsset`, `CommercialCategory`, `CommercialChannel`
- Produces: `heroAssets`, `transformationStory`, `commercialCategories`, `commercialChannels`, `closingAsset`, and `trustMessages`
- Consumes: existing files under `public/assets/`

- [ ] **Step 1: Write failing tests for the general WhatsApp URL and the four commercial categories**

Create `src/data/links.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { WHATSAPP_MESSAGE, buildWhatsappUrl, links } from './links';

describe('commercial links', () => {
  it('builds a WhatsApp URL with the approved general message', () => {
    const url = new URL(buildWhatsappUrl('5583988513243', WHATSAPP_MESSAGE));

    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe('/5583988513243');
    expect(url.searchParams.get('text')).toBe(WHATSAPP_MESSAGE);
    expect(links.whatsapp).toBe(url.toString());
  });
});
```

Create `src/data/commercial.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import {
  commercialCategories,
  commercialChannels,
  heroAssets,
  transformationStory,
} from './commercial';

describe('commercial landing data', () => {
  it('defines four unique categories and four unique channels', () => {
    expect(commercialCategories).toHaveLength(4);
    expect(new Set(commercialCategories.map(({ id }) => id)).size).toBe(4);
    expect(commercialChannels.map(({ key }) => key)).toEqual([
      'whatsapp',
      'instagram',
      'shopee',
      'mercadoLivre',
    ]);
  });

  it('provides the media needed for hero and transformation storytelling', () => {
    expect(heroAssets).toHaveLength(3);
    expect(transformationStory.source.src).toMatch(/^\/assets\//);
    expect(transformationStory.result.src).toMatch(/^\/assets\//);
    expect(
      commercialCategories.find(({ id }) => id === 'desenho-3d')?.revealImage,
    ).toBeDefined();
  });
});
```

- [ ] **Step 2: Run the focused tests and verify they fail**

Run:

```powershell
npm test -- src/data/links.test.ts src/data/commercial.test.ts
```

Expected: FAIL because `WHATSAPP_MESSAGE`, `buildWhatsappUrl`, and `src/data/commercial.ts` do not exist.

- [ ] **Step 3: Implement the link builder without removing legacy helpers**

Update the top of `src/data/links.ts` while keeping `LinkKey`, `openExternal`, and `hasLink` available to legacy components:

```ts
export const WHATSAPP_MESSAGE =
  'Olá! Conheci a Paula Personalizados 3D pelo site e gostaria de criar um personalizado. Pode me ajudar?';

export function buildWhatsappUrl(phone: string, message: string): string {
  const normalizedPhone = phone.replace(/\D/g, '');
  const url = new URL(`https://wa.me/${normalizedPhone}`);
  url.searchParams.set('text', message);
  return url.toString();
}

export const links = {
  instagram: 'https://www.instagram.com/paulapersonalizados3d?igsh=M3ZwbzRsbGNsdWc2',
  whatsapp: buildWhatsappUrl('5583988513243', WHATSAPP_MESSAGE),
  shopee: 'https://s.shopee.com.br/7AcdQhxtJo',
  mercadoLivre:
    'https://produto.mercadolivre.com.br/MLB-4949058627?matt_tool=38524122&ua=JRE1CtzhRngN48gcobaHTEcKkx67Zt_n56hVYsbySBz2XMOk#origin=share&sid=share&action=copy',
} as const;
```

- [ ] **Step 4: Create the typed commercial content module**

Create `src/data/commercial.ts`:

```ts
import { links, type LinkKey } from './links';

export interface CommercialImageAsset {
  src: string;
  alt: string;
  objectPosition?: string;
}

export interface CommercialCategory {
  id: 'foto-3d' | 'desenho-3d' | 'bonecos' | 'lembrancas';
  title: string;
  image: CommercialImageAsset;
  revealImage?: CommercialImageAsset;
}

export interface CommercialChannel {
  key: LinkKey;
  label: string;
  href: string;
  tone: 'whatsapp' | 'instagram' | 'shopee' | 'mercado-livre';
}

export const trustMessages = [
  'Feito à mão',
  '100% personalizado',
  'Envio para todo Brasil',
  'Produção artesanal',
] as const;

export const heroAssets: CommercialImageAsset[] = [
  {
    src: '/assets/photo_2026-08-09_20-15-54.jpg',
    alt: 'Pai e filho representados em uma peça personalizada 3D',
    objectPosition: '50% 58%',
  },
  {
    src: '/assets/photo_2026-08-09_20-13-47.jpg',
    alt: 'Desenho infantil ao lado da peça criada a partir dele',
    objectPosition: '55% 50%',
  },
  {
    src: '/assets/photo_2026-08-09_20-13-33.jpg',
    alt: 'Boneco personalizado em estilo colecionável',
    objectPosition: '50% 48%',
  },
];

export const transformationStory = {
  source: {
    src: '/assets/photo_2026-08-09_20-13-47.jpg',
    alt: 'Referência original usada para criar uma peça 3D',
    objectPosition: '28% 50%',
  },
  result: {
    src: '/assets/photo_2026-08-09_20-13-42.jpg',
    alt: 'Resultado personalizado criado em 3D',
    objectPosition: '70% 50%',
  },
} satisfies Record<'source' | 'result', CommercialImageAsset>;

export const commercialCategories: CommercialCategory[] = [
  {
    id: 'foto-3d',
    title: 'Miniaturas da sua foto',
    image: {
      src: '/assets/photo_2026-08-09_20-13-26.jpg',
      alt: 'Miniatura criada a partir de uma fotografia',
      objectPosition: '50% 50%',
    },
  },
  {
    id: 'desenho-3d',
    title: 'Do desenho para a vida em 3D',
    image: {
      src: '/assets/photo_2026-08-09_20-13-47.jpg',
      alt: 'Desenho infantil usado como referência',
      objectPosition: '30% 50%',
    },
    revealImage: {
      src: '/assets/photo_2026-08-09_20-13-42.jpg',
      alt: 'Peça 3D pronta criada a partir do desenho',
      objectPosition: '72% 50%',
    },
  },
  {
    id: 'bonecos',
    title: 'Bonecos personalizados',
    image: {
      src: '/assets/photo_2026-08-09_20-13-33.jpg',
      alt: 'Boneco personalizado em estilo colecionável',
      objectPosition: '50% 48%',
    },
  },
  {
    id: 'lembrancas',
    title: 'Lembranças especiais',
    image: {
      src: '/assets/photo_2026-08-09_20-15-54.jpg',
      alt: 'Lembrança personalizada de pai e filho',
      objectPosition: '50% 58%',
    },
  },
];

export const commercialChannels: CommercialChannel[] = [
  { key: 'whatsapp', label: 'WhatsApp', href: links.whatsapp, tone: 'whatsapp' },
  { key: 'instagram', label: 'Instagram', href: links.instagram, tone: 'instagram' },
  { key: 'shopee', label: 'Shopee', href: links.shopee, tone: 'shopee' },
  {
    key: 'mercadoLivre',
    label: 'Mercado Livre',
    href: links.mercadoLivre,
    tone: 'mercado-livre',
  },
];

export const closingAsset: CommercialImageAsset = {
  src: '/assets/photo_2026-08-09_20-15-54.jpg',
  alt: 'Presente personalizado feito para guardar uma memória especial',
  objectPosition: '50% 58%',
};
```

- [ ] **Step 5: Run data and asset tests**

Run:

```powershell
npm test -- src/data/links.test.ts src/data/commercial.test.ts src/test/assets.test.ts
```

Expected: PASS; all literal `/assets/` references resolve under `public/assets/`.

- [ ] **Step 6: Commit the data contract**

```powershell
git add -- src/data/links.ts src/data/links.test.ts src/data/commercial.ts src/data/commercial.test.ts
git commit -m "feat: define commercial landing content"
```

---

### Task 2: Add adaptive motion foundations and Lenis integration

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `vite.config.ts`
- Modify: `src/test/setup.ts`
- Create: `src/lib/motion.ts`
- Create: `src/lib/motion.test.ts`
- Create: `src/hooks/usePointerParallax.ts`
- Create: `src/hooks/useSectionReveal.ts`
- Create: `src/components/motion/SmoothScroll.tsx`
- Create: `src/components/motion/SmoothScroll.test.tsx`

**Interfaces:**
- Produces: `shouldEnhanceMotion(capabilities: MotionCapabilities): boolean`
- Produces: `pointerOffset(clientX: number, clientY: number, rect: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>): { x: number; y: number }`
- Produces: `usePointerParallax<T extends HTMLElement>(): RefObject<T | null>`
- Produces: `useSectionReveal<T extends HTMLElement>(selector: string): RefObject<T | null>`
- Produces: `SmoothScroll({ children }: PropsWithChildren): ReactNode`
- Consumes: `prefers-reduced-motion`, `(pointer: fine)`, GSAP ticker, ScrollTrigger

- [ ] **Step 1: Install the approved Lenis version and update the Vite chunk map**

Run:

```powershell
npm install lenis@^1.3.23
```

In `vite.config.ts`, replace the unused Framer Motion branch with Lenis:

```ts
if (id.includes('lenis')) return 'lenis';
if (id.includes('gsap')) return 'gsap';
```

Expected: `package.json` lists `lenis` in dependencies and `package-lock.json` resolves it without adding Framer Motion.

- [ ] **Step 2: Write failing unit tests for motion gating and pointer normalization**

Create `src/lib/motion.test.ts`:

```ts
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
```

Create `src/components/motion/SmoothScroll.test.tsx`:

```tsx
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
```

- [ ] **Step 3: Run the focused motion tests and verify they fail**

Run:

```powershell
npm test -- src/lib/motion.test.ts src/components/motion/SmoothScroll.test.tsx
```

Expected: FAIL because the motion helpers and `SmoothScroll` do not exist.

- [ ] **Step 4: Add a stable `matchMedia` test environment**

Append to `src/test/setup.ts`:

```ts
import { vi } from 'vitest';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query === '(prefers-reduced-motion: reduce)',
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

The default test environment intentionally simulates reduced motion so component tests validate the static, progressively enhanced baseline.

- [ ] **Step 5: Implement pure motion helpers**

Create `src/lib/motion.ts`:

```ts
export interface MotionCapabilities {
  finePointer: boolean;
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
```

- [ ] **Step 6: Implement the pointer parallax hook with animation-frame cleanup**

Create `src/hooks/usePointerParallax.ts`:

```ts
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
    const applyOffset = (x: number, y: number) => {
      node.style.setProperty('--pointer-x', x.toFixed(3));
      node.style.setProperty('--pointer-y', y.toFixed(3));
    };
    const onPointerMove = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const offset = pointerOffset(
          event.clientX,
          event.clientY,
          node.getBoundingClientRect(),
        );
        applyOffset(offset.x, offset.y);
      });
    };
    const onPointerLeave = () => applyOffset(0, 0);

    node.addEventListener('pointermove', onPointerMove, { passive: true });
    node.addEventListener('pointerleave', onPointerLeave);
    return () => {
      window.cancelAnimationFrame(frame);
      node.removeEventListener('pointermove', onPointerMove);
      node.removeEventListener('pointerleave', onPointerLeave);
      applyOffset(0, 0);
    };
  }, []);

  return ref;
}
```

- [ ] **Step 7: Implement a reusable staggered section reveal**

Create `src/hooks/useSectionReveal.ts`:

```ts
import { useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function useSectionReveal<T extends HTMLElement>(
  selector: string,
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const animation = gsap.from(selector, {
      y: 42,
      opacity: 0,
      scale: 0.96,
      duration: 0.7,
      stagger: 0.09,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    });
    return () => animation.kill();
  }, { scope: ref, dependencies: [selector] });

  return ref;
}
```

- [ ] **Step 8: Implement one root-level Lenis/GSAP bridge**

Create `src/components/motion/SmoothScroll.tsx`:

```tsx
import { useEffect, type PropsWithChildren } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { shouldEnhanceMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: PropsWithChildren) {
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!shouldEnhanceMotion({ finePointer, reducedMotion })) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
    });
    const update = (time: number) => lenis.raf(time * 1000);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return children;
}
```

- [ ] **Step 9: Run focused tests, lint the new files, and build**

Run:

```powershell
npm test -- src/lib/motion.test.ts src/components/motion/SmoothScroll.test.tsx
npm run lint
npm run build
```

Expected: all commands PASS; the build emits separate `gsap` and `lenis` chunks.

- [ ] **Step 10: Commit the motion foundation**

```powershell
git add -- package.json package-lock.json vite.config.ts src/test/setup.ts src/lib/motion.ts src/lib/motion.test.ts src/hooks/usePointerParallax.ts src/hooks/useSectionReveal.ts src/components/motion/SmoothScroll.tsx src/components/motion/SmoothScroll.test.tsx
git commit -m "feat: add adaptive motion foundation"
```

---

### Task 3: Add resilient commercial imagery with chromatic fallback

**Files:**
- Create: `src/components/ui/CommercialImage.tsx`
- Create: `src/components/ui/CommercialImage.test.tsx`
- Create: `src/styles/commercial.css`
- Modify: `src/main.tsx`

**Interfaces:**
- Consumes: `CommercialImageAsset`
- Produces: `CommercialImageProps` with `asset`, `priority`, `sizes`, `className`, `imageClassName`, and `decorative`
- Guarantees: failed imagery preserves space, communicates failure for informative images, and never produces a black rectangle

- [ ] **Step 1: Write failing tests for loading priority and image fallback**

Create `src/components/ui/CommercialImage.test.tsx`:

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CommercialImage } from './CommercialImage';

const asset = {
  src: '/assets/photo_2026-08-09_20-15-54.jpg',
  alt: 'Pai e filho em uma peça personalizada',
  objectPosition: '50% 58%',
};

describe('CommercialImage', () => {
  it('eagerly loads a priority image with responsive sizing', () => {
    render(<CommercialImage asset={asset} priority sizes="50vw" />);

    const image = screen.getByRole('img', { name: asset.alt });
    expect(image).toHaveAttribute('loading', 'eager');
    expect(image).toHaveAttribute('fetchpriority', 'high');
    expect(image).toHaveAttribute('sizes', '50vw');
    expect(image).toHaveStyle({ objectPosition: '50% 58%' });
  });

  it('shows a labeled chromatic fallback when loading fails', () => {
    render(<CommercialImage asset={asset} />);
    fireEvent.error(screen.getByRole('img', { name: asset.alt }));

    expect(screen.getByRole('img', { name: asset.alt })).toHaveTextContent(
      'Imagem temporariamente indisponível',
    );
  });
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```powershell
npm test -- src/components/ui/CommercialImage.test.tsx
```

Expected: FAIL because `CommercialImage` does not exist.

- [ ] **Step 3: Implement the image wrapper as progressive enhancement**

Create `src/components/ui/CommercialImage.tsx`:

```tsx
import { useState } from 'react';
import { Image } from '@/components/ui/Image';
import { cn } from '@/lib/utils';
import type { CommercialImageAsset } from '@/data/commercial';

export interface CommercialImageProps {
  asset: CommercialImageAsset;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  decorative?: boolean;
}

export function CommercialImage({
  asset,
  priority = false,
  sizes,
  className,
  imageClassName,
  decorative = false,
}: CommercialImageProps) {
  const [failed, setFailed] = useState(false);
  const accessibleAlt = decorative ? '' : asset.alt;

  return (
    <div
      className={cn('commercial-image', className)}
      data-image-state={failed ? 'failed' : 'ready'}
    >
      {failed ? (
        <span
          className="commercial-image__fallback"
          role={decorative ? undefined : 'img'}
          aria-label={decorative ? undefined : asset.alt}
          aria-hidden={decorative || undefined}
        >
          {decorative ? null : 'Imagem temporariamente indisponível'}
        </span>
      ) : (
        <Image
          src={asset.src}
          alt={accessibleAlt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn('commercial-image__media', imageClassName)}
          style={{ objectPosition: asset.objectPosition }}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 4: Add the continuous base stylesheet and import it after Tailwind**

Create `src/styles/commercial.css` with the initial shared rules:

```css
.commercial-site {
  min-height: 100vh;
  color: var(--color-ink);
  background:
    radial-gradient(circle at 88% 8%, rgb(244 162 182 / 0.34), transparent 24rem),
    radial-gradient(circle at 8% 52%, rgb(252 223 165 / 0.22), transparent 26rem),
    linear-gradient(180deg, #fffaf5 0%, #fdf4ee 48%, #fff9f2 100%);
  overflow: clip;
}

.commercial-image {
  position: relative;
  overflow: hidden;
  min-width: 0;
  background: linear-gradient(135deg, #f8e4e8, #fff7ed 58%, #f0c9d3);
}

.commercial-image__media {
  width: 100%;
  height: 100%;
  border: 0;
  object-fit: cover;
}

.commercial-image__fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1rem;
  color: #8d5c68;
  font: 600 0.875rem/1.4 var(--font-sans);
  text-align: center;
}
```

Then append to the imports in `src/main.tsx`:

```ts
import './index.css';
import './styles/commercial.css';
```

- [ ] **Step 5: Run the focused test and full static checks**

Run:

```powershell
npm test -- src/components/ui/CommercialImage.test.tsx
npm run lint
npm run build
```

Expected: PASS; a failed image leaves a pink/cream fallback, not an empty or black region.

- [ ] **Step 6: Commit the image foundation**

```powershell
git add -- src/components/ui/CommercialImage.tsx src/components/ui/CommercialImage.test.tsx src/styles/commercial.css src/main.tsx
git commit -m "feat: add resilient commercial imagery"
```

---

### Task 4: Build the commercial hero and infinite trust marquee

**Files:**
- Modify: `index.html`
- Modify: `src/index.css`
- Modify: `src/styles/commercial.css`
- Create: `src/sections/CommercialHero/CommercialHero.tsx`
- Create: `src/sections/CommercialHero/TrustMarquee.tsx`
- Create: `src/sections/CommercialHero/CommercialHero.test.tsx`

**Interfaces:**
- Consumes: `heroAssets`, `trustMessages`, `links.whatsapp`, `CommercialImage`, `usePointerParallax`
- Produces: `CommercialHero(): JSX.Element`
- Produces: `TrustMarquee(): JSX.Element`
- Guarantees: the page's only `<h1>`, a real WhatsApp link, an internal “Como funciona” anchor, and a duplicated marquee whose visual copy is hidden from assistive technology

- [ ] **Step 1: Write a failing hero contract test**

Create `src/sections/CommercialHero/CommercialHero.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { links } from '@/data/links';
import { CommercialHero } from './CommercialHero';
import { TrustMarquee } from './TrustMarquee';

describe('CommercialHero', () => {
  it('presents the approved headline and conversion paths', () => {
    render(<CommercialHero />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /personalizados 3d que viram memórias/i,
      }),
    ).toBeVisible();
    expect(screen.getByRole('link', { name: /quero criar/i })).toHaveAttribute(
      'href',
      links.whatsapp,
    );
    expect(screen.getByRole('link', { name: /como funciona/i })).toHaveAttribute(
      'href',
      '#como-funciona',
    );
    expect(screen.getAllByRole('img')).toHaveLength(3);
  });

  it('exposes the trust message once to assistive technology', () => {
    render(<TrustMarquee />);

    expect(screen.getByText(/feito à mão · 100% personalizado/i)).toBeVisible();
  });
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```powershell
npm test -- src/sections/CommercialHero/CommercialHero.test.tsx
```

Expected: FAIL because the commercial hero and trust marquee do not exist.

- [ ] **Step 3: Add the condensed display font without removing the current fallbacks**

Replace the Google Fonts `href` in `index.html` with the exact family set below, preserving the existing `preconnect` elements:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Caveat:wght@500;700&family=Manrope:wght@400;500;600;700;800&family=Pacifico&family=Playfair+Display:ital,wght@0,400;0,600;0,800;0,900;1,400&display=swap"
  rel="stylesheet"
/>
```

In `src/index.css`, add this token inside `@theme`:

```css
--font-display: 'Barlow Condensed', 'Arial Narrow', sans-serif;
```

Keep Manrope and Playfair Display loaded because body copy and italic editorial words continue using them.

- [ ] **Step 4: Implement the accessible marquee**

Create `src/sections/CommercialHero/TrustMarquee.tsx`:

```tsx
import { trustMessages } from '@/data/commercial';

export function TrustMarquee() {
  const accessibleMessage = trustMessages.join(' · ');

  return (
    <aside className="trust-marquee" aria-label="Diferenciais da Paula Personalizados 3D">
      <p className="sr-only">{accessibleMessage}</p>
      <div className="trust-marquee__track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="trust-marquee__copy" key={copy}>
            {trustMessages.map((message) => (
              <span key={`${copy}-${message}`}>{message}<i>✦</i></span>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
```

- [ ] **Step 5: Implement the hero with visible-first GSAP reveals and cursor parallax**

Create `src/sections/CommercialHero/CommercialHero.tsx`:

```tsx
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { CommercialImage } from '@/components/ui/CommercialImage';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { heroAssets } from '@/data/commercial';
import { links } from '@/data/links';
import { usePointerParallax } from '@/hooks/usePointerParallax';
import { prefersReducedMotion } from '@/lib/utils';

export function CommercialHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = usePointerParallax<HTMLDivElement>();

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    timeline
      .from('[data-hero-line]', { y: 70, opacity: 0, duration: 0.8, stagger: 0.12 })
      .from('[data-hero-support]', { y: 24, opacity: 0, duration: 0.55 }, '-=0.4')
      .from('[data-hero-media]', { y: 35, opacity: 0, scale: 0.94, duration: 0.75, stagger: 0.1 }, '-=0.5');
    return () => timeline.kill();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="commercial-hero"
      aria-labelledby="commercial-hero-title"
    >
      <div className="commercial-hero__copy">
        <p className="commercial-eyebrow" data-hero-support>Feito a partir da sua história</p>
        <h1 id="commercial-hero-title" className="commercial-hero__title">
          <span data-hero-line>Personalizados</span>
          <span data-hero-line>3D que viram</span>
          <span className="gradient-shimmer" data-hero-line>memórias.</span>
        </h1>
        <p className="commercial-hero__support" data-hero-support>
          Transformamos fotos, desenhos e ideias em peças únicas, feitas para guardar o que realmente importa.
        </p>
        <div className="commercial-hero__actions" data-hero-support>
          <ExternalLink href={links.whatsapp} showIcon={false} className="commercial-button commercial-button--primary">
            Quero criar <span aria-hidden="true">→</span>
          </ExternalLink>
          <a href="#como-funciona" className="commercial-button commercial-button--ghost">
            Como funciona <span aria-hidden="true">↘</span>
          </a>
        </div>
      </div>

      <div ref={visualRef} className="commercial-hero__visual" aria-label="Exemplos de personalizados 3D">
        {heroAssets.map((asset, index) => (
          <CommercialImage
            key={asset.src}
            asset={asset}
            priority={index === 0}
            sizes="(max-width: 767px) 78vw, (max-width: 1199px) 42vw, 30vw"
            className={`commercial-hero__media commercial-hero__media--${index + 1}`}
            imageClassName="commercial-hero__photo"
          />
        ))}
        <span className="commercial-hero__heart" aria-hidden="true">♡</span>
        <span className="commercial-hero__spark" aria-hidden="true">✦</span>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Style the hero as one borderless surface**

Append the following structural rules to `src/styles/commercial.css`; responsive refinements may add values but must preserve these masks and the absence of borders:

```css
.commercial-eyebrow {
  margin: 0 0 0.8rem;
  color: #9f6472;
  font: 800 0.72rem/1 var(--font-sans);
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.commercial-hero__support {
  max-width: 32rem;
  margin: 1.5rem 0 0;
  color: #6d5d59;
  font: 500 clamp(1rem, 1.6vw, 1.2rem)/1.6 var(--font-sans);
}

.commercial-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.commercial-button {
  display: inline-flex;
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  border-radius: 0.8rem;
  padding: 0.8rem 1rem;
  font: 800 0.85rem/1 var(--font-sans);
  text-decoration: none;
  transition: transform 240ms var(--ease-soft), background-color 240ms var(--ease-soft), color 240ms var(--ease-soft);
}

.commercial-button:hover,
.commercial-button:focus-visible { transform: translateY(-0.2rem) scale(1.015); }
.commercial-button--primary { background: #27201f; color: #fff; }
.commercial-button--primary:hover,
.commercial-button--primary:focus-visible { color: #fff; background: #3b3030; }
.commercial-button--ghost { color: #27201f; background: rgb(255 255 255 / 0.58); backdrop-filter: blur(0.75rem); }

.commercial-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(24rem, 1.08fr);
  align-items: center;
  min-height: 100svh;
  max-width: 90rem;
  margin-inline: auto;
  padding: 7.5rem clamp(1.25rem, 5vw, 4.5rem) 5rem;
}

.commercial-hero__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(4rem, 8vw, 8.5rem);
  font-weight: 900;
  line-height: 0.78;
  letter-spacing: -0.035em;
  text-transform: uppercase;
}

.commercial-hero__title > span { display: block; }

.gradient-shimmer {
  width: max-content;
  max-width: 100%;
  color: transparent;
  background: linear-gradient(100deg, #ca4f70 10%, #f2a2b7 38%, #fff 49%, #df6685 62%, #ca4f70 88%);
  background-size: 220% auto;
  background-clip: text;
  -webkit-background-clip: text;
  font-family: var(--font-editorial);
  font-size: 0.82em;
  font-style: italic;
  text-transform: none;
  animation: gradient-shimmer 4.8s linear infinite;
}

@keyframes gradient-shimmer { to { background-position: 220% center; } }

.commercial-hero__visual {
  --pointer-x: 0;
  --pointer-y: 0;
  position: relative;
  min-height: 38rem;
  transform-style: preserve-3d;
  perspective: 70rem;
}

.commercial-hero__visual::before {
  content: '';
  position: absolute;
  inset: 8% 2% 4% 5%;
  border-radius: 50%;
  background: radial-gradient(circle at 58% 42%, rgb(239 136 164 / 0.38), rgb(252 226 214 / 0.18) 48%, transparent 72%);
  filter: blur(1.5rem);
  transform: translate3d(calc(var(--pointer-x) * 18px), calc(var(--pointer-y) * 13px), 0);
  transition: transform 220ms ease-out;
}

.commercial-hero__media {
  position: absolute;
  border-radius: 0;
  box-shadow: none;
  mask-image: radial-gradient(ellipse 74% 74% at 50% 50%, #000 48%, transparent 82%);
  -webkit-mask-image: radial-gradient(ellipse 74% 74% at 50% 50%, #000 48%, transparent 82%);
  transition: transform 300ms var(--ease-soft);
}

.commercial-hero__media--1 {
  inset: 4% 17% 2% 2%;
  z-index: 2;
  transform: translate3d(calc(var(--pointer-x) * 12px), calc(var(--pointer-y) * 8px), 2rem);
  animation: hero-float 6.2s ease-in-out infinite alternate;
}

.commercial-hero__media--2 {
  width: 44%;
  height: 43%;
  right: 0;
  top: 1%;
  z-index: 3;
  transform: translate3d(calc(var(--pointer-x) * -9px), calc(var(--pointer-y) * -6px), 4rem);
  animation: hero-float 7.4s 600ms ease-in-out infinite alternate-reverse;
}

.commercial-hero__media--3 {
  width: 48%;
  height: 40%;
  right: -2%;
  bottom: 2%;
  z-index: 4;
  transform: translate3d(calc(var(--pointer-x) * 7px), calc(var(--pointer-y) * -11px), 5rem);
  animation: hero-float 8.1s 300ms ease-in-out infinite alternate;
}

@keyframes hero-float { to { translate: 0 -0.75rem; } }

.commercial-hero__heart,
.commercial-hero__spark { position: absolute; z-index: 6; color: #df6685; pointer-events: none; }
.commercial-hero__heart { left: 4%; top: 21%; font-size: 2.2rem; animation: hero-decoration 7s ease-in-out infinite alternate; }
.commercial-hero__spark { right: 8%; bottom: 18%; font-size: 1.7rem; animation: hero-decoration 8.5s 500ms ease-in-out infinite alternate-reverse; }
@keyframes hero-decoration { to { transform: translate3d(0.8rem, -0.7rem, 0) rotate(8deg); } }

.trust-marquee {
  position: relative;
  overflow: hidden;
  border-block: 1px solid rgb(202 79 112 / 0.16);
  background: rgb(255 255 255 / 0.18);
  backdrop-filter: blur(0.75rem);
  padding-block: 0.95rem;
}

.trust-marquee__track,
.trust-marquee__copy { display: flex; width: max-content; }
.trust-marquee__track { animation: trust-marquee 28s linear infinite; }
.trust-marquee__copy { flex-shrink: 0; gap: 2.5rem; padding-right: 2.5rem; }
.trust-marquee span { font: 800 0.75rem/1 var(--font-sans); letter-spacing: 0.1em; text-transform: uppercase; color: #9d4860; }
.trust-marquee i { margin-left: 2.5rem; color: #e86b89; font-style: normal; }
@keyframes trust-marquee { to { transform: translate3d(-50%, 0, 0); } }

@media (max-width: 48rem) {
  .commercial-hero { grid-template-columns: 1fr; min-height: auto; padding-top: 7rem; }
  .commercial-hero__visual { min-height: 31rem; margin-top: 1rem; }
  .commercial-hero__title { font-size: clamp(3.5rem, 18vw, 5.8rem); }
}
```

- [ ] **Step 7: Run the hero test and static checks**

Run:

```powershell
npm test -- src/sections/CommercialHero/CommercialHero.test.tsx src/test/assets.test.ts
npm run lint
npm run build
```

Expected: PASS; the hero has one visible `<h1>`, three valid images, and no black background class.

- [ ] **Step 8: Commit the hero and marquee**

```powershell
git add -- index.html src/index.css src/styles/commercial.css src/sections/CommercialHero/CommercialHero.tsx src/sections/CommercialHero/TrustMarquee.tsx src/sections/CommercialHero/CommercialHero.test.tsx
git commit -m "feat: build commercial hero experience"
```

---

### Task 5: Build the scroll-linked reference-to-3D story

**Files:**
- Modify: `src/styles/commercial.css`
- Create: `src/sections/TransformationStory/TransformationStory.tsx`
- Create: `src/sections/TransformationStory/TransformationStory.test.tsx`

**Interfaces:**
- Consumes: `transformationStory`, `links.whatsapp`, `CommercialImage`
- Produces: `TransformationStory(): JSX.Element` with section id `como-funciona`
- Guarantees: both source and result remain in the DOM and visible when reduced motion is active

- [ ] **Step 1: Write a failing static-baseline test**

Create `src/sections/TransformationStory/TransformationStory.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { links } from '@/data/links';
import { TransformationStory } from './TransformationStory';

describe('TransformationStory', () => {
  it('keeps the complete story and general conversion link available without motion', () => {
    render(<TransformationStory />);

    expect(screen.getByRole('heading', { level: 2, name: /da sua foto para o 3d/i })).toBeVisible();
    expect(screen.getByRole('img', { name: /referência original/i })).toBeVisible();
    expect(screen.getByRole('img', { name: /resultado personalizado/i })).toBeVisible();
    expect(screen.getByText('Foto ou desenho')).toBeVisible();
    expect(screen.getByText('Transformação')).toBeVisible();
    expect(screen.getByText('Peça 3D')).toBeVisible();
    expect(screen.getByRole('link', { name: /criar meu personalizado/i })).toHaveAttribute(
      'href',
      links.whatsapp,
    );
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```powershell
npm test -- src/sections/TransformationStory/TransformationStory.test.tsx
```

Expected: FAIL because `TransformationStory` does not exist.

- [ ] **Step 3: Implement visible-first scroll choreography**

Create `src/sections/TransformationStory/TransformationStory.tsx`:

```tsx
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CommercialImage } from '@/components/ui/CommercialImage';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { transformationStory } from '@/data/commercial';
import { links } from '@/data/links';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function TransformationStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 78%',
        end: 'bottom 35%',
        scrub: 0.8,
      },
    });
    timeline
      .from('[data-transform-source]', { xPercent: -16, opacity: 0.35, ease: 'none' }, 0)
      .from('[data-transform-result]', { xPercent: 16, opacity: 0.35, scale: 0.9, ease: 'none' }, 0)
      .from('[data-transform-arrow]', { scaleX: 0, transformOrigin: 'left center', ease: 'none' }, 0.15)
      .to('[data-transform-result]', { rotateY: -3, ease: 'none' }, 0.55);
    return () => timeline.kill();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="transformation-story commercial-section"
      aria-labelledby="transformation-title"
    >
      <div className="transformation-story__copy">
        <p className="commercial-eyebrow">01 · Da ideia à peça</p>
        <h2 id="transformation-title">Da sua foto <em>para o 3D.</em></h2>
        <p>Você envia a referência. Nós transformamos os detalhes em uma lembrança criada especialmente para você.</p>
        <ExternalLink href={links.whatsapp} showIcon={false} className="commercial-button commercial-button--primary">
          Criar meu personalizado <span aria-hidden="true">→</span>
        </ExternalLink>
      </div>
      <div className="transformation-story__visual">
        <div className="transformation-story__source" data-transform-source>
          <CommercialImage
            asset={transformationStory.source}
            sizes="(max-width: 767px) 88vw, 42vw"
            imageClassName="transformation-story__photo"
          />
        </div>
        <span className="transformation-story__arrow" data-transform-arrow aria-hidden="true">→</span>
        <div className="transformation-story__result" data-transform-result>
          <CommercialImage
            asset={transformationStory.result}
            sizes="(max-width: 767px) 88vw, 42vw"
            imageClassName="transformation-story__photo"
          />
        </div>
        <ol className="transformation-story__steps" aria-label="Etapas da transformação">
          <li>Foto ou desenho</li>
          <li>Transformação</li>
          <li>Peça 3D</li>
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add borderless transformation masks and the mobile static layout**

Append to `src/styles/commercial.css`:

```css
.commercial-section { position: relative; max-width: 90rem; margin-inline: auto; padding: clamp(5rem, 10vw, 9rem) clamp(1.25rem, 5vw, 4.5rem); }
.transformation-story { display: grid; grid-template-columns: minmax(17rem, 0.68fr) minmax(32rem, 1.32fr); align-items: center; gap: clamp(2rem, 5vw, 6rem); }
.transformation-story h2 { margin: 0.6rem 0 1.2rem; font: 900 clamp(3.5rem, 7vw, 7.5rem)/0.82 var(--font-display); text-transform: uppercase; }
.transformation-story h2 em { display: block; color: #d85c7c; font: italic 700 0.9em/0.95 var(--font-editorial); text-transform: none; }
.transformation-story__visual { position: relative; min-height: 36rem; perspective: 70rem; }
.transformation-story__source,
.transformation-story__result { position: absolute; width: 58%; height: 88%; top: 6%; }
.transformation-story__source { left: 0; z-index: 1; }
.transformation-story__result { right: 0; z-index: 2; }
.transformation-story__source .commercial-image { height: 100%; mask-image: linear-gradient(90deg, #000 58%, transparent 100%); -webkit-mask-image: linear-gradient(90deg, #000 58%, transparent 100%); }
.transformation-story__result .commercial-image { height: 100%; mask-image: linear-gradient(90deg, transparent 0%, #000 38%); -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 38%); }
.transformation-story__arrow { position: absolute; z-index: 4; left: 47%; top: 48%; color: #df6685; font: 700 3.25rem/1 var(--font-sans); }
.transformation-story__steps { position: absolute; z-index: 5; inset: auto 2rem 0; display: grid; grid-template-columns: repeat(3, 1fr); margin: 0; padding: 0; list-style: none; color: #8f5c68; font: 800 0.7rem/1 var(--font-sans); letter-spacing: 0.09em; text-align: center; text-transform: uppercase; }

@media (max-width: 48rem) {
  .transformation-story { grid-template-columns: 1fr; }
  .transformation-story__visual { min-height: 39rem; }
  .transformation-story__source,
  .transformation-story__result { position: relative; width: 100%; height: 19rem; inset: auto; }
  .transformation-story__source .commercial-image,
  .transformation-story__result .commercial-image { height: 100%; mask-image: linear-gradient(#000 78%, transparent); -webkit-mask-image: linear-gradient(#000 78%, transparent); }
  .transformation-story__arrow { left: 50%; top: 48%; transform: translate(-50%, -50%) rotate(90deg); }
  .transformation-story__steps { position: relative; inset: auto; margin-top: 1rem; }
}
```

- [ ] **Step 5: Run focused tests and the build**

Run:

```powershell
npm test -- src/sections/TransformationStory/TransformationStory.test.tsx src/test/assets.test.ts
npm run lint
npm run build
```

Expected: PASS; both images remain visible in the reduced-motion test environment.

- [ ] **Step 6: Commit the transformation story**

```powershell
git add -- src/styles/commercial.css src/sections/TransformationStory/TransformationStory.tsx src/sections/TransformationStory/TransformationStory.test.tsx
git commit -m "feat: tell the photo to 3d story"
```

---

### Task 6: Build the accessible category coverflow and drawing reveal

**Files:**
- Modify: `src/styles/commercial.css`
- Create: `src/sections/CategoryCoverflow/CategoryCoverflow.tsx`
- Create: `src/sections/CategoryCoverflow/CategoryCoverflow.test.tsx`

**Interfaces:**
- Consumes: `commercialCategories`, `CommercialImage`
- Produces: `circularOffset(index: number, activeIndex: number, length: number): number`
- Produces: `CategoryCoverflow(): JSX.Element` with section id `categorias`
- Guarantees: buttons, keyboard arrows, pointer drag threshold, `aria-current`, live position text, and a touch-operable drawing/result comparison

- [ ] **Step 1: Write failing tests for carousel navigation and the drawing reveal**

Create `src/sections/CategoryCoverflow/CategoryCoverflow.test.tsx`:

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CategoryCoverflow, circularOffset } from './CategoryCoverflow';

describe('CategoryCoverflow', () => {
  it('wraps slide offsets around the shortest path', () => {
    expect(circularOffset(3, 0, 4)).toBe(-1);
    expect(circularOffset(0, 3, 4)).toBe(1);
  });

  it('supports visible controls and keyboard navigation', () => {
    render(<CategoryCoverflow />);

    expect(screen.getByText('1 de 4')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: /próxima categoria/i }));
    expect(screen.getByText('2 de 4')).toBeVisible();
    fireEvent.keyDown(screen.getByRole('region', { name: /categorias de personalizados/i }), {
      key: 'ArrowLeft',
    });
    expect(screen.getByText('1 de 4')).toBeVisible();
  });

  it('offers an explicit drawing-to-result comparison control', () => {
    render(<CategoryCoverflow />);
    fireEvent.click(screen.getByRole('button', { name: /do desenho para a vida em 3d/i }));

    const toggle = screen.getByRole('button', { name: /mostrar peça 3d pronta/i });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```powershell
npm test -- src/sections/CategoryCoverflow/CategoryCoverflow.test.tsx
```

Expected: FAIL because `CategoryCoverflow` and `circularOffset` do not exist.

- [ ] **Step 3: Implement circular positioning, controls, keyboard, and pointer gestures**

Create `src/sections/CategoryCoverflow/CategoryCoverflow.tsx`:

```tsx
import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CommercialImage } from '@/components/ui/CommercialImage';
import { commercialCategories } from '@/data/commercial';
import { useSectionReveal } from '@/hooks/useSectionReveal';

export function circularOffset(index: number, activeIndex: number, length: number): number {
  let offset = index - activeIndex;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
}

export function CategoryCoverflow() {
  const sectionRef = useSectionReveal<HTMLElement>('[data-reveal-card]');
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealResult, setRevealResult] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const length = commercialCategories.length;
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
    pointerStart.current = event.clientX;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) < 42) return;
    goTo(activeIndex + (distance < 0 ? 1 : -1));
  };

  return (
    <section ref={sectionRef} id="categorias" className="category-coverflow commercial-section" aria-labelledby="categories-title">
      <div className="category-coverflow__heading">
        <p className="commercial-eyebrow">Escolha por onde começar</p>
        <h2 id="categories-title">Nossas categorias</h2>
      </div>
      <div
        className="category-coverflow__viewport"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Categorias de personalizados"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
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
              data-revealed={active && revealResult}
              data-reveal-card
            >
              <button
                type="button"
                className="category-coverflow__slide"
                aria-current={active ? 'true' : undefined}
                aria-label={category.title}
                onClick={() => goTo(index)}
              >
                <CommercialImage asset={category.image} sizes="(max-width: 767px) 72vw, 24vw" />
                {category.revealImage ? (
                  <CommercialImage
                    asset={category.revealImage}
                    sizes="(max-width: 767px) 72vw, 24vw"
                    className="category-coverflow__reveal"
                    decorative={!active || !revealResult}
                  />
                ) : null}
                <span className="category-coverflow__label">{category.title}</span>
                <span className="category-coverflow__arrow" aria-hidden="true">→</span>
              </button>
              {active && category.revealImage ? (
                <button
                  type="button"
                  className="category-coverflow__compare"
                  aria-label={revealResult ? 'Mostrar desenho original' : 'Mostrar peça 3D pronta'}
                  aria-pressed={revealResult}
                  onClick={() => setRevealResult((value) => !value)}
                >
                  {revealResult ? 'Ver desenho' : 'Ver resultado'}
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="category-coverflow__controls">
        <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Categoria anterior"><ChevronLeft aria-hidden="true" /></button>
        <span aria-live="polite">{activeIndex + 1} de {length}</span>
        <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Próxima categoria"><ChevronRight aria-hidden="true" /></button>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Style the coverflow without visible image borders**

Append to `src/styles/commercial.css`:

```css
.category-coverflow { max-width: none; padding-inline: 0; }
.category-coverflow__heading { text-align: center; padding-inline: 1.25rem; }
.category-coverflow__heading h2 { margin: 0.55rem 0 0; font: 900 clamp(3rem, 6vw, 6rem)/0.9 var(--font-display); text-transform: uppercase; }
.category-coverflow__viewport { position: relative; height: 32rem; max-width: 78rem; margin: 1.5rem auto 0; outline: none; perspective: 80rem; touch-action: pan-y; }
.category-coverflow__slide-shell { position: absolute; left: 50%; top: 50%; width: min(27vw, 22rem); height: 27rem; transform: translate3d(calc(-50% + var(--coverflow-x)), -50%, var(--coverflow-depth)) rotateY(var(--coverflow-rotate)) scale(var(--coverflow-scale)); transition: transform 550ms var(--ease-soft), opacity 550ms var(--ease-soft); }
.category-coverflow__slide { position: relative; width: 100%; height: 100%; padding: 0; overflow: hidden; border: 0; border-radius: 1.5rem; background: transparent; box-shadow: 0 1.5rem 3.5rem rgb(67 39 37 / 0.16); cursor: pointer; }
.category-coverflow__slide:hover,
.category-coverflow__slide:focus-visible { transform: translateY(-0.5rem); box-shadow: 0 2rem 4rem rgb(67 39 37 / 0.22); }
.category-coverflow__slide .commercial-image__media { transition: transform 500ms var(--ease-soft); }
.category-coverflow__slide:hover .commercial-image__media { transform: scale(1.03) translateY(-0.2rem); }
.category-coverflow__slide .commercial-image { width: 100%; height: 100%; border-radius: inherit; }
.category-coverflow__label { position: absolute; inset: auto 0 0; padding: 4rem 1.25rem 1.25rem; color: #fff; background: linear-gradient(transparent, rgb(25 18 19 / 0.78)); font: 800 1.05rem/1.05 var(--font-display); text-align: left; text-transform: uppercase; }
.category-coverflow__arrow { position: absolute; right: 1.1rem; bottom: 1.1rem; z-index: 4; color: #fff; opacity: 0; transform: translateX(-0.5rem); transition: opacity 260ms var(--ease-soft), transform 260ms var(--ease-soft); }
.category-coverflow__slide:hover .category-coverflow__arrow,
.category-coverflow__slide:focus-visible .category-coverflow__arrow { opacity: 1; transform: translateX(0); }
.category-coverflow__reveal { position: absolute; inset: 0; opacity: 0; transform: translateX(12%); transition: opacity 500ms var(--ease-soft), transform 500ms var(--ease-soft); }
.category-coverflow__slide-shell[data-active='true']:hover .category-coverflow__reveal,
.category-coverflow__slide-shell[data-revealed='true'] .category-coverflow__reveal { opacity: 1; transform: translateX(0); }
.category-coverflow__controls { display: flex; align-items: center; justify-content: center; gap: 1rem; }
.category-coverflow__controls button,
.category-coverflow__compare { min-width: 2.75rem; min-height: 2.75rem; border: 0; border-radius: 999px; background: rgb(255 255 255 / 0.66); color: #27201f; box-shadow: 0 0.6rem 1.5rem rgb(67 39 37 / 0.1); }
.category-coverflow__compare { position: absolute; z-index: 6; top: 1rem; right: 1rem; padding-inline: 0.9rem; font: 700 0.75rem/1 var(--font-sans); }

@media (max-width: 48rem) {
  .category-coverflow__viewport { height: 27rem; }
  .category-coverflow__slide-shell { width: 72vw; height: 23rem; transform: translate3d(calc(-50% + var(--coverflow-x)), -50%, 0) scale(var(--coverflow-scale)); }
}
```

- [ ] **Step 5: Run the coverflow tests and static checks**

Run:

```powershell
npm test -- src/sections/CategoryCoverflow/CategoryCoverflow.test.tsx
npm run lint
npm run build
```

Expected: PASS; no nested interactive-control warning appears in the test output or browser console.

- [ ] **Step 6: Commit the coverflow**

```powershell
git add -- src/styles/commercial.css src/sections/CategoryCoverflow/CategoryCoverflow.tsx src/sections/CategoryCoverflow/CategoryCoverflow.test.tsx
git commit -m "feat: add accessible category coverflow"
```

---

### Task 7: Build the four-channel commercial grid

**Files:**
- Modify: `src/styles/commercial.css`
- Create: `src/sections/ChannelGrid/ChannelGrid.tsx`
- Create: `src/sections/ChannelGrid/ChannelGrid.test.tsx`

**Interfaces:**
- Consumes: `commercialChannels`, `ExternalLink`, existing icon components
- Produces: `ChannelGrid(): JSX.Element` with section id `canais`
- Guarantees: exactly four secure native links using the centralized destinations

- [ ] **Step 1: Write a failing four-channel link test**

Create `src/sections/ChannelGrid/ChannelGrid.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { commercialChannels } from '@/data/commercial';
import { ChannelGrid } from './ChannelGrid';

describe('ChannelGrid', () => {
  it('renders the four approved destinations as secure links', () => {
    render(<ChannelGrid />);

    for (const channel of commercialChannels) {
      const link = screen.getByRole('link', { name: new RegExp(channel.label, 'i') });
      expect(link).toHaveAttribute('href', channel.href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    }
  });
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```powershell
npm test -- src/sections/ChannelGrid/ChannelGrid.test.tsx
```

Expected: FAIL because `ChannelGrid` does not exist.

- [ ] **Step 3: Implement the data-driven channel grid**

Create `src/sections/ChannelGrid/ChannelGrid.tsx`:

```tsx
import type { ComponentType, SVGProps } from 'react';
import { MessageCircle, ShoppingBag, Store } from 'lucide-react';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { InstagramIcon } from '@/components/ui/CustomIcons';
import { commercialChannels, type CommercialChannel } from '@/data/commercial';
import { useSectionReveal } from '@/hooks/useSectionReveal';

const icons: Record<
  CommercialChannel['key'],
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  whatsapp: MessageCircle,
  instagram: InstagramIcon,
  shopee: ShoppingBag,
  mercadoLivre: Store,
};

export function ChannelGrid() {
  const sectionRef = useSectionReveal<HTMLElement>('[data-reveal-channel]');
  return (
    <section ref={sectionRef} id="canais" className="channel-grid commercial-section" aria-labelledby="channels-title">
      <div className="channel-grid__heading">
        <p className="commercial-eyebrow">Escolha seu canal preferido</p>
        <h2 id="channels-title">Onde você nos encontra</h2>
      </div>
      <div className="channel-grid__links">
        {commercialChannels.map((channel) => {
          const Icon = icons[channel.key];
          return (
            <ExternalLink
              key={channel.key}
              href={channel.href}
              showIcon={false}
              className={`channel-link channel-link--${channel.tone}`}
              aria-label={`Abrir ${channel.label}`}
              data-reveal-channel
            >
              <Icon className="channel-link__icon" aria-hidden="true" />
              <span>{channel.label}</span>
              <span className="channel-link__arrow" aria-hidden="true">→</span>
            </ExternalLink>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add brand-aware motion without section cuts**

Append to `src/styles/commercial.css`:

```css
.channel-grid { text-align: center; }
.channel-grid__heading h2 { margin: 0.55rem 0 0; font: 900 clamp(3rem, 6vw, 6rem)/0.9 var(--font-display); text-transform: uppercase; }
.channel-grid__links { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.8rem; margin-top: 2rem; }
.channel-link { min-height: 4.75rem; display: flex; align-items: center; gap: 0.8rem; padding: 1rem 1.15rem; border-radius: 1rem; color: #fff; font: 800 1rem/1 var(--font-sans); box-shadow: 0 0.9rem 2rem rgb(52 37 35 / 0.12); transition: transform 260ms var(--ease-soft), filter 260ms var(--ease-soft), box-shadow 260ms var(--ease-soft); }
.channel-link:hover,
.channel-link:focus-visible { color: #fff; transform: translateY(-0.35rem) scale(1.02); filter: saturate(1.08); box-shadow: 0 1.2rem 2.4rem rgb(52 37 35 / 0.18); }
.channel-link--whatsapp { background: #2fbe68; }
.channel-link--instagram { background: linear-gradient(105deg, #bd3788, #ef6375); }
.channel-link--shopee { background: #ee5a24; }
.channel-link--mercado-livre { background: #f4cf12; color: #28251d; }
.channel-link--mercado-livre:hover,
.channel-link--mercado-livre:focus-visible { color: #28251d; }
.channel-link__icon { width: 1.7rem; height: 1.7rem; transition: transform 260ms var(--ease-soft); }
.channel-link__arrow { margin-left: auto; transition: transform 260ms var(--ease-soft); }
.channel-link:hover .channel-link__icon { transform: rotate(-5deg) scale(1.08); }
.channel-link:hover .channel-link__arrow { transform: translateX(0.3rem); }

@media (max-width: 60rem) { .channel-grid__links { grid-template-columns: 1fr 1fr; } }
@media (max-width: 32rem) { .channel-grid__links { grid-template-columns: 1fr; } }
```

- [ ] **Step 5: Run focused tests and static checks**

Run:

```powershell
npm test -- src/sections/ChannelGrid/ChannelGrid.test.tsx src/components/ui/ExternalLink.test.tsx
npm run lint
npm run build
```

Expected: PASS; all four destinations match `commercialChannels` exactly.

- [ ] **Step 6: Commit the channel grid**

```powershell
git add -- src/styles/commercial.css src/sections/ChannelGrid/ChannelGrid.tsx src/sections/ChannelGrid/ChannelGrid.test.tsx
git commit -m "feat: add commercial channel grid"
```

---

### Task 8: Finish the continuous journey with header, closing statement, and footer

**Files:**
- Modify: `src/components/Header/Header.tsx`
- Modify: `src/components/Header/Header.test.tsx`
- Modify: `src/sections/Footer/Footer.tsx`
- Modify: `src/styles/commercial.css`
- Create: `src/sections/MemoryClosing/MemoryClosing.tsx`
- Create: `src/sections/MemoryClosing/MemoryClosing.test.tsx`

**Interfaces:**
- Consumes: `links.whatsapp`, `commercialChannels`, `closingAsset`, `CommercialImage`, `ExternalLink`
- Produces: header anchors `#hero`, `#como-funciona`, `#categorias`, `#sobre`
- Produces: `MemoryClosing(): JSX.Element` with section id `sobre`
- Guarantees: header/mobile accessibility remains intact and footer stays on the same cream/pink surface

- [ ] **Step 1: Extend the header test before changing markup**

Add to `src/components/Header/Header.test.tsx`:

```tsx
import { links } from '@/data/links';

it('uses the commercial anchors and general WhatsApp CTA', () => {
  render(<Header />);

  expect(screen.getByRole('link', { name: 'Como funciona' })).toHaveAttribute(
    'href',
    '#como-funciona',
  );
  expect(screen.getByRole('link', { name: 'Categorias' })).toHaveAttribute(
    'href',
    '#categorias',
  );
  expect(screen.getByRole('link', { name: /criar personalizado/i })).toHaveAttribute(
    'href',
    links.whatsapp,
  );
});
```

Create `src/sections/MemoryClosing/MemoryClosing.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryClosing } from './MemoryClosing';

describe('MemoryClosing', () => {
  it('renders the approved closing statement and informative image', () => {
    render(<MemoryClosing />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /muito mais que presentes, criamos memórias/i,
      }),
    ).toBeVisible();
    expect(screen.getByRole('img', { name: /presente personalizado/i })).toBeVisible();
  });
});
```

- [ ] **Step 2: Run the focused tests and verify the new contract fails**

Run:

```powershell
npm test -- src/components/Header/Header.test.tsx src/sections/MemoryClosing/MemoryClosing.test.tsx
```

Expected: Header accessibility test still passes; new commercial anchor test and missing closing component fail.

- [ ] **Step 3: Simplify the header while preserving its existing focus-management effects**

Keep the current scroll listener, body lock, mobile focus trap, `Esc` behavior, and focus restoration. Replace `navItems` with:

```ts
const navItems = [
  { label: 'Início', href: '#hero' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Categorias', href: '#categorias' },
  { label: 'Sobre', href: '#sobre' },
] as const;
```

Remove the desktop “Onde comprar” dropdown and its state, refs, effects, and icon imports. Replace desktop actions with a native external link:

```tsx
<ExternalLink
  href={links.whatsapp}
  showIcon={false}
  className="commercial-button commercial-button--rose"
>
  Criar personalizado <span aria-hidden="true">→</span>
</ExternalLink>
```

Place the same link after the mobile navigation list. Keep `aria-label="Paula Personalizados 3D - Início"` on the brand link.

- [ ] **Step 4: Implement the scroll-revealed closing statement**

Create `src/sections/MemoryClosing/MemoryClosing.tsx`:

```tsx
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CommercialImage } from '@/components/ui/CommercialImage';
import { closingAsset } from '@/data/commercial';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const words = ['Muito', 'mais', 'que', 'presentes,', 'criamos', 'memórias.'];

export function MemoryClosing() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const animation = gsap.from('[data-memory-word]', {
      yPercent: 70,
      opacity: 0,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
    });
    const parallax = gsap.to('[data-memory-image]', {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
      },
    });
    return () => {
      animation.kill();
      parallax.kill();
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="sobre" className="memory-closing commercial-section" aria-labelledby="memory-title">
      <div className="memory-closing__copy">
        <h2 id="memory-title">
          {words.map((word) => (
            <span key={word} data-memory-word>{word}{' '}</span>
          ))}
        </h2>
        <p>Cada detalhe é feito com carinho para acompanhar histórias por muitos anos.</p>
      </div>
      <div className="memory-closing__visual" data-memory-image>
        <CommercialImage asset={closingAsset} sizes="(max-width: 767px) 92vw, 48vw" />
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Reduce the footer to essential navigation and channels**

In `src/sections/Footer/Footer.tsx`, replace the old four-column content with this structure while reusing `ExternalLink` and `commercialChannels`:

```tsx
import { ExternalLink } from '@/components/ui/ExternalLink';
import { commercialChannels } from '@/data/commercial';

const footerNav = [
  { label: 'Início', href: '#hero' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Categorias', href: '#categorias' },
  { label: 'Sobre', href: '#sobre' },
] as const;

export function Footer() {
  return (
    <footer className="commercial-footer" role="contentinfo" aria-label="Rodapé">
      <a href="#hero" className="commercial-footer__brand" aria-label="Paula Personalizados 3D - Início">
        Paula Personalizados 3D
      </a>
      <nav aria-label="Navegação do rodapé">
        {footerNav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </nav>
      <div className="commercial-footer__channels" aria-label="Canais comerciais">
        {commercialChannels.map((channel) => (
          <ExternalLink key={channel.key} href={channel.href} showIcon={false}>
            {channel.label}
          </ExternalLink>
        ))}
      </div>
      <p>© 2026 Paula Personalizados 3D. Todos os direitos reservados.</p>
    </footer>
  );
}
```

- [ ] **Step 6: Style the header, closing, and footer on the continuous surface**

Append to `src/styles/commercial.css`:

```css
.commercial-button--rose { background: #df6685; color: #fff; }
.memory-closing { display: grid; grid-template-columns: 1fr 1fr; align-items: center; min-height: 38rem; }
.memory-closing h2 { margin: 0; font: italic 700 clamp(3.6rem, 7vw, 7.8rem)/0.9 var(--font-editorial); }
.memory-closing h2 span { display: inline-block; }
.memory-closing h2 span:nth-last-child(-n + 2) { color: #d85c7c; }
.memory-closing__visual { height: 34rem; }
.memory-closing__visual .commercial-image { width: 100%; height: 100%; mask-image: radial-gradient(ellipse 70% 72% at 55% 52%, #000 48%, transparent 82%); -webkit-mask-image: radial-gradient(ellipse 70% 72% at 55% 52%, #000 48%, transparent 82%); }
.commercial-footer { display: grid; grid-template-columns: 1.2fr 1fr 1.2fr; gap: 2rem; align-items: start; padding: 3rem clamp(1.25rem, 5vw, 4.5rem); border-top: 1px solid rgb(202 79 112 / 0.14); background: transparent; color: #6d5d59; }
.commercial-footer__brand { color: #d85c7c; font: italic 700 1.6rem/1 var(--font-editorial); }
.commercial-footer nav,
.commercial-footer__channels { display: flex; flex-wrap: wrap; gap: 0.65rem 1rem; }
.commercial-footer p { grid-column: 1 / -1; margin: 0; font-size: 0.8rem; }

@media (max-width: 48rem) {
  .memory-closing { grid-template-columns: 1fr; min-height: auto; }
  .memory-closing__visual { height: 26rem; }
  .commercial-footer { grid-template-columns: 1fr; }
  .commercial-footer p { grid-column: auto; }
}
```

Also update the existing header color classes so its unscrolled state uses transparent cream/pink styling rather than `bg-ink/20` or white text.

- [ ] **Step 7: Run focused tests and static checks**

Run:

```powershell
npm test -- src/components/Header/Header.test.tsx src/sections/MemoryClosing/MemoryClosing.test.tsx
npm run lint
npm run build
```

Expected: PASS; the mobile menu still traps focus and closes with `Esc`, and neither closing nor footer has a dark background.

- [ ] **Step 8: Commit the continuous ending and navigation**

```powershell
git add -- src/components/Header/Header.tsx src/components/Header/Header.test.tsx src/sections/Footer/Footer.tsx src/styles/commercial.css src/sections/MemoryClosing/MemoryClosing.tsx src/sections/MemoryClosing/MemoryClosing.test.tsx
git commit -m "feat: finish the commercial journey"
```

---

### Task 9: Assemble the new landing page and verify the complete customer journey

**Files:**
- Modify: `src/App.tsx`
- Create: `src/App.test.tsx`
- Modify: `index.html`
- Modify: `README.md`
- Test: all `src/**/*.test.ts` and `src/**/*.test.tsx`

**Interfaces:**
- Consumes: all components produced by Tasks 2–8
- Produces: final page order `Header → Hero → Marquee → Transformation → Categories → Channels → Closing → Footer`
- Guarantees: old sections are not imported, the skip link remains, there is one `<h1>`, and the four destinations are available without scrolling into hidden UI

- [ ] **Step 1: Write a failing integration test for the final page contract**

Create `src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('commercial landing page', () => {
  it('assembles the approved short conversion journey', () => {
    render(<App />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 2, name: /da sua foto para o 3d/i })).toBeVisible();
    expect(screen.getByRole('heading', { level: 2, name: /nossas categorias/i })).toBeVisible();
    expect(screen.getByRole('heading', { level: 2, name: /onde você nos encontra/i })).toBeVisible();
    expect(screen.getByRole('heading', { level: 2, name: /muito mais que presentes/i })).toBeVisible();
    expect(screen.getByRole('link', { name: /ir para o conteúdo principal/i })).toHaveAttribute(
      'href',
      '#main-content',
    );
  });
});
```

- [ ] **Step 2: Run the integration test and verify it fails against the old page order**

Run:

```powershell
npm test -- src/App.test.tsx
```

Expected: FAIL because `src/App.tsx` still imports the legacy sections.

- [ ] **Step 3: Replace only the page composition, not the legacy source files**

Replace `src/App.tsx` with:

```tsx
import { Header } from '@/components/Header/Header';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { CommercialHero } from '@/sections/CommercialHero/CommercialHero';
import { TrustMarquee } from '@/sections/CommercialHero/TrustMarquee';
import { TransformationStory } from '@/sections/TransformationStory/TransformationStory';
import { CategoryCoverflow } from '@/sections/CategoryCoverflow/CategoryCoverflow';
import { ChannelGrid } from '@/sections/ChannelGrid/ChannelGrid';
import { MemoryClosing } from '@/sections/MemoryClosing/MemoryClosing';
import { Footer } from '@/sections/Footer/Footer';

function App() {
  return (
    <SmoothScroll>
      <div className="commercial-site">
        <a href="#main-content" className="skip-link">
          Ir para o conteúdo principal
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          <CommercialHero />
          <TrustMarquee />
          <TransformationStory />
          <CategoryCoverflow />
          <ChannelGrid />
          <MemoryClosing />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
```

Add the skip-link styling to `src/styles/commercial.css`:

```css
.skip-link { position: fixed; left: 1rem; top: 1rem; z-index: 100; transform: translateY(-6rem); border-radius: 0.75rem; background: #27201f; color: #fff; padding: 0.8rem 1rem; font-weight: 700; transition: transform 180ms ease; }
.skip-link:focus { transform: translateY(0); }
```

- [ ] **Step 4: Align metadata and maintenance documentation with the new page**

In `index.html`, keep the current title but change the description and Open Graph/Twitter description to:

```html
<meta name="description" content="Transformamos fotos, desenhos e ideias em personalizados 3D feitos à mão para guardar suas melhores memórias." />
```

Use the same sentence in `og:description` and `twitter:description`. Keep the existing temporary social image because final social-card production and definitive domain SEO are outside this cycle.

Update the “Onde alterar cada coisa”, structure, tests, and current-state sections in `README.md` so they name:

```text
src/data/commercial.ts
src/data/links.ts
src/sections/CommercialHero/
src/sections/TransformationStory/
src/sections/CategoryCoverflow/
src/sections/ChannelGrid/
src/sections/MemoryClosing/
src/styles/commercial.css
```

Document that final photos can be swapped by editing `CommercialImageAsset` records without changing component markup.

- [ ] **Step 5: Run every automated gate**

Run:

```powershell
npm run lint
npm test
npm run build
```

Expected: all commands PASS; `dist/` contains all referenced assets, and no old section is imported by the production entry graph.

- [ ] **Step 6: Start the development server and run browser verification**

Run:

```powershell
npm run dev -- --host 127.0.0.1 --port 4173
```

Use the `vercel:agent-browser-verify` skill for this step. Verify both `1440 × 1000` and `390 × 844` viewports:

1. Hero headline and primary CTA are visible in the first viewport.
2. Moving the pointer changes depth subtly without moving text or causing horizontal overflow.
3. The marquee loops without a visible blank gap.
4. Transformation remains understandable before, during, and after scrolling.
5. Coverflow works with controls, `ArrowLeft`, `ArrowRight`, and touch-style drag.
6. The drawing category exposes its explicit comparison button.
7. WhatsApp opens a URL whose `text` parameter equals `WHATSAPP_MESSAGE`.
8. Instagram, Shopee, and Mercado Livre open the centralized URLs.
9. Mobile menu traps focus, closes with `Esc`, restores focus, and does not lock the body after closing.
10. No black section cuts, visible white image borders, broken images, horizontal overflow, or console errors appear.

Then emulate `prefers-reduced-motion: reduce` and verify that all content remains visible, Lenis does not initialize, and the carousel remains keyboard-operable.

- [ ] **Step 7: Review the final diff without touching unrelated local changes**

Run:

```powershell
git status --short
git diff -- src/App.tsx src/App.test.tsx index.html README.md src/styles/commercial.css
```

Expected: the final composition and documentation changes match this plan; unrelated pre-existing files remain unstaged and unchanged by the task.

- [ ] **Step 8: Commit the assembled landing page**

```powershell
git add -- src/App.tsx src/App.test.tsx index.html README.md src/styles/commercial.css
git commit -m "feat: launch commercial landing experience"
```

---

## Completion Checklist

- [ ] All nine task commits exist and contain only their listed files.
- [ ] `npm run lint`, `npm test`, and `npm run build` pass from the final commit.
- [ ] The page contains one `<h1>` and all required `<h2>` section headings.
- [ ] WhatsApp uses the exact approved general message.
- [ ] The four external channels use centralized secure links.
- [ ] Desktop pointer motion and Lenis are absent on touch and reduced-motion environments.
- [ ] Images are borderless, masked into the continuous cream/pink surface, and fail to a chromatic placeholder.
- [ ] Coverflow supports pointer, touch-style drag, keyboard, visible buttons, and the drawing/result comparison.
- [ ] Mobile menu accessibility behavior remains covered by tests.
- [ ] Legacy sections remain on disk but are absent from `src/App.tsx` and the production import graph.
- [ ] README explains where to replace final photographs later.

