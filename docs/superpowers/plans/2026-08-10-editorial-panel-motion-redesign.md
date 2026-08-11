# Editorial Panel Motion Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesenhar a landing existente como uma experiência editorial premium com painéis de viewport, texto horizontal, showcase artesanal 2.5D, transformação visual e bento de categorias, preservando links, lógica e acessibilidade.

**Architecture:** A composição atual permanece em React e ganha um novo `ArtisanShowcase`, enquanto Hero, Marquee, Transformation, CategoryCoverflow, ChannelGrid, MemoryClosing e Footer são reapresentados com wrappers e classes editoriais. GSAP/ScrollTrigger controla apenas movimentos ligados ao scroll em desktop; CSS e o fluxo natural sustentam mobile e movimento reduzido. Dados e assets continuam centralizados em `commercial.ts`, sem Three.js ou nova dependência.

**Tech Stack:** React 19, TypeScript, Vite 8, CSS, GSAP 3.15, `@gsap/react` 2.1, ScrollTrigger, Lenis 1.3, Vitest, Testing Library.

## Global Constraints

- Não recriar o projeto, trocar stack, rotas, links, integrações ou mensagem comercial.
- Não adicionar Three.js, `img2threejs` ou outra dependência de motion.
- Usar `Playfair Display` para títulos e `Manrope` para interface; ambas já estão carregadas.
- Preservar exatamente um `<h1>`, skip link, menu mobile acessível, quatro categorias e quatro canais configuráveis.
- Não publicar depoimentos, nomes, fotos ou resultados inventados.
- Produtos e texto devem permanecer visíveis sem JavaScript de animação.
- Desktop pode usar pinning seletivo; mobile e `prefers-reduced-motion` usam fluxo natural.
- Toda referência literal `/assets/...` precisa existir em `public/assets/`.
- Executar `.\project.cmd check` antes de cada handoff e não editar `dist/`.

---

## File Map

### Dados e tipos

- `src/data/commercial.ts`: única fonte ativa de imagens, categorias, showcase, marca e transformação.
- `src/data/commercial.test.ts`: contrato de ids, paths, alts e coerência fonte/resultado.
- `src/lib/motion.ts`: decisões puras de capacidade para pinning e movimento aprimorado.
- `src/lib/motion.test.ts`: limites de viewport e movimento reduzido.

### Seções

- `src/sections/CommercialHero/CommercialHero.tsx`: capa editorial e composição assimétrica.
- `src/sections/CommercialHero/TrustMarquee.tsx`: texto horizontal acessível ligado ao scroll.
- `src/sections/ArtisanShowcase/ArtisanShowcase.tsx`: novo painel carvão com produtos 2.5D.
- `src/sections/TransformationStory/TransformationStory.tsx`: narrativa em três estágios com dois assets reais.
- `src/sections/CategoryCoverflow/CategoryCoverflow.tsx`: mesma interação, layout bento no desktop e swipe no mobile.
- `src/sections/ChannelGrid/ChannelGrid.tsx`: canais integrados ao fechamento carvão.
- `src/sections/MemoryClosing/MemoryClosing.tsx`: headline final, logo e peça emocional.
- `src/sections/Footer/Footer.tsx`: rodapé compacto no mesmo capítulo visual.
- `src/App.tsx`: ordem final e wrappers de capítulos.

### Estilos e documentação

- `src/index.css`: tokens finais e utilitários globais.
- `src/styles/commercial.css`: painéis, composição, responsividade, hover e reduced motion.
- `README.md`: mapa das seções e instruções para troca de assets/depoimentos.

---

### Task 1: Curar os dados comerciais reais

**Files:**
- Modify: `src/data/commercial.ts`
- Modify: `src/data/commercial.test.ts`

**Interfaces:**
- Produces: `brandAsset: CommercialImageAsset`
- Produces: `artisanShowcaseAssets: { primary: CommercialImageAsset; secondary: CommercialImageAsset }`
- Preserves: `heroAssets`, `transformationStory`, `commercialCategories`, `commercialChannels`, `closingAsset`

- [ ] **Step 1: Escrever o teste que exige assets coerentes**

Adicionar a `src/data/commercial.test.ts`:

```ts
import {
  artisanShowcaseAssets,
  brandAsset,
  commercialCategories,
  heroAssets,
  transformationStory,
} from './commercial';

it('uses the approved real photo and matching 3D result', () => {
  expect(transformationStory.source.src).toBe('/assets/photo_2026-07-26_18-37-49.jpg');
  expect(transformationStory.result.src).toBe('/assets/photo_2026-07-20_12-15-36.jpg');
  expect(transformationStory.source.src).not.toBe(transformationStory.result.src);
});

it('keeps the official logo and two showcase assets explicit', () => {
  expect(brandAsset.src).toBe('/assets/photo_2026-08-09_20-14-06.jpg');
  expect(artisanShowcaseAssets.primary.alt).toMatch(/personagem feminina/i);
  expect(artisanShowcaseAssets.secondary.alt).toMatch(/pai e filho/i);
});

it('keeps exactly four unique commercial categories', () => {
  expect(commercialCategories.map(({ id }) => id)).toEqual([
    'foto-3d', 'desenho-3d', 'bonecos', 'lembrancas',
  ]);
  expect(new Set(heroAssets.map(({ src }) => src)).size).toBe(heroAssets.length);
});
```

- [ ] **Step 2: Executar RED**

```powershell
npm test -- src/data/commercial.test.ts
```

Expected: FAIL porque `brandAsset` e `artisanShowcaseAssets` ainda não existem e os paths da transformação apontam para anúncios compostos.

- [ ] **Step 3: Implementar os dados mínimos**

Em `src/data/commercial.ts`, adicionar:

```ts
export const brandAsset: CommercialImageAsset = {
  src: '/assets/photo_2026-08-09_20-14-06.jpg',
  alt: 'Logo Paula Personalizados 3D',
  objectPosition: '50% 50%',
};

export const artisanShowcaseAssets = {
  primary: {
    src: '/assets/photo_2026-07-23_10-07-08.jpg',
    alt: 'Personagem feminina personalizada com vestido elegante',
    objectPosition: '50% 44%',
  },
  secondary: {
    src: '/assets/photo_2026-08-09_20-15-54.jpg',
    alt: 'Pai e filho representados em uma lembrança personalizada',
    objectPosition: '50% 58%',
  },
} satisfies Record<'primary' | 'secondary', CommercialImageAsset>;
```

Trocar `transformationStory` pelos paths do teste. Curar `heroAssets` para três trabalhos distintos e manter apenas o primeiro prioritário no componente. Corrigir `alt` ativos sem importar mapeamentos provisórios de `products.ts` ou `gallery.ts`.

- [ ] **Step 4: Executar GREEN e o teste de assets**

```powershell
npm test -- src/data/commercial.test.ts src/test/assets.test.ts
```

Expected: PASS, sem referência ausente em `public/assets/`.

- [ ] **Step 5: Commit seletivo**

```powershell
git add -- src/data/commercial.ts src/data/commercial.test.ts
git diff --cached --check
git commit -m "fix: curate editorial commercial assets"
```

---

### Task 2: Criar a base de painéis e texto horizontal

**Files:**
- Modify: `src/lib/motion.ts`
- Modify: `src/lib/motion.test.ts`
- Modify: `src/sections/CommercialHero/TrustMarquee.tsx`
- Create: `src/sections/CommercialHero/TrustMarquee.test.tsx`
- Modify: `src/index.css`
- Modify: `src/styles/commercial.css`

**Interfaces:**
- Produces: `shouldPinEditorialPanel({ width, reducedMotion }): boolean`
- Produces: `.editorial-panel` e variantes `--cream`, `--pink`, `--ink`
- Preserves: uma mensagem acessível e cópias visuais `aria-hidden`

- [ ] **Step 1: Escrever testes de gating e semântica**

Adicionar a `src/lib/motion.test.ts`:

```ts
import { shouldPinEditorialPanel } from './motion';

it('pins editorial panels only on wide viewports without reduced motion', () => {
  expect(shouldPinEditorialPanel({ width: 1440, reducedMotion: false })).toBe(true);
  expect(shouldPinEditorialPanel({ width: 959, reducedMotion: false })).toBe(false);
  expect(shouldPinEditorialPanel({ width: 1440, reducedMotion: true })).toBe(false);
});
```

Criar `TrustMarquee.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { TrustMarquee } from './TrustMarquee';

it('exposes one accessible statement and hides visual repetitions', () => {
  const { container } = render(<TrustMarquee />);
  expect(screen.getByLabelText('Diferenciais da Paula Personalizados 3D')).toBeInTheDocument();
  expect(container.querySelectorAll('[data-horizontal-copy]')).toHaveLength(2);
  expect([...container.querySelectorAll('[data-horizontal-copy]')].every(
    (copy) => copy.getAttribute('aria-hidden') === 'true',
  )).toBe(true);
});
```

- [ ] **Step 2: Executar RED**

```powershell
npm test -- src/lib/motion.test.ts src/sections/CommercialHero/TrustMarquee.test.tsx
```

Expected: FAIL pelo helper e pelos novos alvos ausentes.

- [ ] **Step 3: Implementar o helper puro**

```ts
export interface EditorialPanelCapabilities {
  width: number;
  reducedMotion: boolean;
}

export function shouldPinEditorialPanel({
  width,
  reducedMotion,
}: EditorialPanelCapabilities): boolean {
  return width >= 960 && !reducedMotion;
}
```

- [ ] **Step 4: Transformar o marquee em texto horizontal ligado ao scroll**

Em `TrustMarquee.tsx`, usar `useRef`, `useGSAP`, `gsap` e `ScrollTrigger`:

```tsx
<aside ref={sectionRef} className="trust-marquee" aria-label="Diferenciais da Paula Personalizados 3D">
  <p className="sr-only">{accessibleMessage}</p>
  <div className="trust-marquee__motion" data-horizontal-motion aria-hidden="true">
    {[0, 1].map((copy) => (
      <div className="trust-marquee__copy" data-horizontal-copy aria-hidden="true" key={copy}>
        {trustMessages.map((message) => (
          <span key={`${copy}-${message}`}>{message}<i>✦</i></span>
        ))}
      </div>
    ))}
  </div>
</aside>
```

Criar timeline que move somente `[data-horizontal-motion]` de `xPercent: 0` para `-24`, com `scrub: 0.7`. Não criar a timeline em reduced motion. Matar timeline/trigger no cleanup.

- [ ] **Step 5: Adicionar tokens e primitivas de painel**

Em `src/index.css`, atualizar os tokens. Em `commercial.css`:

```css
.editorial-panel {
  position: relative;
  min-height: 100svh;
  overflow: clip;
  isolation: isolate;
}

.editorial-panel--cream { background: #f4ede6; color: #171313; }
.editorial-panel--pink { background: #f2d4d8; color: #171313; }
.editorial-panel--ink { background: #111; color: #fff8f4; }

.trust-marquee__motion {
  display: flex;
  width: max-content;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .trust-marquee__motion { transform: none !important; }
}
```

Não aplicar `position: sticky` globalmente; o pinning pertence aos painéis específicos.

- [ ] **Step 6: Executar GREEN e lint**

```powershell
npm test -- src/lib/motion.test.ts src/sections/CommercialHero/TrustMarquee.test.tsx
npm run lint
```

Expected: PASS e nenhum erro de hooks/cleanup.

- [ ] **Step 7: Commit seletivo**

```powershell
git add -- src/lib/motion.ts src/lib/motion.test.ts src/sections/CommercialHero/TrustMarquee.tsx src/sections/CommercialHero/TrustMarquee.test.tsx src/index.css src/styles/commercial.css
git diff --cached --check
git commit -m "feat: add editorial panel motion foundation"
```

---

### Task 3: Redesenhar o Hero como capa editorial

**Files:**
- Modify: `src/sections/CommercialHero/CommercialHero.tsx`
- Modify: `src/sections/CommercialHero/CommercialHero.test.tsx`
- Modify: `src/styles/commercial.css`

**Interfaces:**
- Consumes: `heroAssets`
- Produces: headline acessível “Memórias que ganham forma.”
- Preserves: CTA WhatsApp condicional, âncora `#categorias`, três wrappers separados de reveal/parallax

- [ ] **Step 1: Atualizar o teste do Hero antes do componente**

```tsx
expect(screen.getByRole('heading', { level: 1, name: 'Memórias que ganham forma.' })).toBeInTheDocument();
expect(screen.getByRole('link', { name: /quero criar/i })).toHaveAttribute('href', expect.stringContaining('wa.me'));
expect(screen.getByRole('link', { name: /ver categorias/i })).toHaveAttribute('href', '#categorias');
expect(container.querySelectorAll('[data-hero-line]')).toHaveLength(3);
expect(container.querySelectorAll('[data-hero-media]')).toHaveLength(3);
```

Manter as asserções que garantem wrappers distintos para GSAP e parallax.

- [ ] **Step 2: Executar RED**

```powershell
npm test -- src/sections/CommercialHero/CommercialHero.test.tsx
```

Expected: FAIL porque headline e CTA secundário usam a copy anterior.

- [ ] **Step 3: Implementar copy e markup editorial**

```tsx
<h1 id="commercial-hero-title" className="commercial-hero__title" aria-label="Memórias que ganham forma.">
  <span data-hero-line>Memórias</span>
  <span className="commercial-hero__accent" data-hero-line>que ganham</span>
  <span data-hero-line>forma.</span>
</h1>
```

Usar CTA secundário “Ver categorias” com `href="#categorias"`, apoio com no máximo duas linhas e `editorial-panel editorial-panel--cream` no section. Manter os três `CommercialImage`, classes de profundidade e `priority={index === 0}`.

- [ ] **Step 4: Implementar layout e motion do Hero**

```css
.commercial-hero {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(28rem, 1.1fr);
  align-items: center;
  min-height: 100svh;
  padding: clamp(7rem, 10vw, 10rem) clamp(1.25rem, 6vw, 6rem) 4rem;
}

.commercial-hero__title {
  font-family: var(--font-editorial);
  font-size: clamp(4rem, 8.4vw, 9.5rem);
  font-weight: 400;
  line-height: 0.78;
}

.commercial-hero__accent { color: var(--color-pink); }
```

Posicionar assets assimetricamente, usar máscara/fade de bordas e manter transforms em wrappers separados. Atualizar timeline para reveal suave; não adicionar pin ao Hero.

- [ ] **Step 5: GREEN e checagem focada**

```powershell
npm test -- src/sections/CommercialHero/CommercialHero.test.tsx src/App.test.tsx src/test/assets.test.ts
npm run lint
```

Expected: PASS, um único h1 e assets existentes.

- [ ] **Step 6: Commit seletivo**

```powershell
git add -- src/sections/CommercialHero/CommercialHero.tsx src/sections/CommercialHero/CommercialHero.test.tsx src/styles/commercial.css
git diff --cached --check
git commit -m "feat: redesign the editorial hero"
```

---

### Task 4: Criar o showcase artesanal carvão com rotação 2.5D

**Files:**
- Create: `src/sections/ArtisanShowcase/ArtisanShowcase.tsx`
- Create: `src/sections/ArtisanShowcase/ArtisanShowcase.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `src/styles/commercial.css`

**Interfaces:**
- Consumes: `artisanShowcaseAssets`, `trustMessages`, `shouldPinEditorialPanel`
- Produces: `<section id="feito-a-mao">` com dois alvos `[data-artisan-product]`

- [ ] **Step 1: Escrever o teste da nova seção**

```tsx
import { render, screen } from '@testing-library/react';
import { ArtisanShowcase } from './ArtisanShowcase';

it('presents two real products and four concise proof points', () => {
  const { container } = render(<ArtisanShowcase />);
  expect(screen.getByRole('heading', { level: 2, name: 'Feito à mão. Feito pra durar.' })).toBeInTheDocument();
  expect(container.querySelectorAll('[data-artisan-product]')).toHaveLength(2);
  expect(container.querySelectorAll('[data-artisan-proof]')).toHaveLength(4);
  expect(container.querySelector('[data-artisan-stage]')).toBeInTheDocument();
});
```

Atualizar `App.test.tsx` para exigir Hero → Feito à mão → Transformação → Categorias.

- [ ] **Step 2: Executar RED**

```powershell
npm test -- src/sections/ArtisanShowcase/ArtisanShowcase.test.tsx src/App.test.tsx
```

Expected: FAIL porque módulo e painel não existem.

- [ ] **Step 3: Implementar o painel visível por padrão**

```tsx
<section ref={sectionRef} id="feito-a-mao" className="artisan-showcase editorial-panel editorial-panel--ink" aria-labelledby="artisan-title">
  <div className="artisan-showcase__stage" data-artisan-stage>
    <div className="artisan-showcase__products" aria-label="Exemplos de peças personalizadas">
      {[artisanShowcaseAssets.primary, artisanShowcaseAssets.secondary].map((asset, index) => (
        <div className={`artisan-showcase__product artisan-showcase__product--${index + 1}`} data-artisan-product key={asset.src}>
          <CommercialImage asset={asset} sizes="(max-width: 767px) 76vw, 38vw" />
        </div>
      ))}
    </div>
    <div className="artisan-showcase__copy">
      <p className="commercial-eyebrow">Personalizado</p>
      <h2 id="artisan-title" aria-label="Feito à mão. Feito pra durar.">
        <span>Feito à mão.</span><span>Feito pra durar.</span>
      </h2>
      <ul>{trustMessages.map((message) => <li data-artisan-proof key={message}>{message}</li>)}</ul>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Adicionar GSAP scroll-linked e cleanup**

Usar `useGSAP` e `ScrollTrigger`. Calcular `shouldPinEditorialPanel({ width: window.innerWidth, reducedMotion: prefersReducedMotion() })`. Quando falso, não criar timeline. Quando verdadeiro:

```ts
const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top top',
    end: '+=90%',
    pin: '[data-artisan-stage]',
    pinSpacing: true,
    scrub: 0.8,
  },
});

timeline
  .fromTo('[data-artisan-product]:first-child', { rotateY: -20, y: 20, scale: 0.96 }, { rotateY: 0, y: 0, scale: 1, ease: 'none' }, 0)
  .fromTo('[data-artisan-product]:last-child', { rotateY: 20, y: 20, scale: 0.96 }, { rotateY: 0, y: 0, scale: 1, ease: 'none' }, 0)
  .from('[data-artisan-proof]', { y: 18, opacity: 0, stagger: 0.08, ease: 'power2.out' }, 0.25);
```

Matar timeline/ScrollTrigger no cleanup. Perspectiva e fade pertencem ao stage/CSS; não aplicar dois transforms no mesmo nó.

- [ ] **Step 5: Integrar e estilizar como viewport inteira**

Montar `<ArtisanShowcase />` após `<TrustMarquee />`. Usar grid 55/45, produtos grandes, `perspective: 1200px`, máscaras discretas nos JPGs e fundo `#111`. Em mobile, empilhar, remover sticky e deixar transforms finais.

- [ ] **Step 6: GREEN e gates focados**

```powershell
npm test -- src/sections/ArtisanShowcase/ArtisanShowcase.test.tsx src/App.test.tsx src/test/assets.test.ts
npm run lint
```

Expected: PASS, sem conteúdo oculto fora da animação.

- [ ] **Step 7: Commit seletivo**

```powershell
git add -- src/sections/ArtisanShowcase src/App.tsx src/App.test.tsx src/styles/commercial.css
git diff --cached --check
git commit -m "feat: add the artisan showcase panel"
```

---

### Task 5: Transformar foto → processo → peça em painel rosa

**Files:**
- Modify: `src/sections/TransformationStory/TransformationStory.tsx`
- Modify: `src/sections/TransformationStory/TransformationStory.test.tsx`
- Modify: `src/styles/commercial.css`

**Interfaces:**
- Consumes: `transformationStory`, `shouldPinEditorialPanel`
- Produces: três `[data-transform-stage]`, dois assets informativos e um processo decorativo derivado da fonte
- Preserves: `id="como-funciona"`, CTA WhatsApp condicional e heading `<h2>`

- [ ] **Step 1: Escrever o contrato dos três estágios**

```tsx
it('tells the transformation with three stages and two truthful informative images', () => {
  const { container } = render(<TransformationStory />);
  expect(screen.getByRole('heading', { level: 2, name: 'Da sua foto para o 3D.' })).toBeInTheDocument();
  expect(container.querySelectorAll('[data-transform-stage]')).toHaveLength(3);
  expect(screen.getByText('Foto')).toBeInTheDocument();
  expect(screen.getByText('Transformação')).toBeInTheDocument();
  expect(screen.getByText('Peça 3D')).toBeInTheDocument();
  expect(container.querySelectorAll('img:not([alt=""])')).toHaveLength(2);
});
```

- [ ] **Step 2: Executar RED**

```powershell
npm test -- src/sections/TransformationStory/TransformationStory.test.tsx
```

Expected: FAIL porque existem dois wrappers visuais.

- [ ] **Step 3: Implementar três estágios sem inventar resultado**

```tsx
<div className="transformation-story__visual" data-transform-stage-track>
  <figure className="transformation-story__stage transformation-story__stage--source" data-transform-stage data-transform-source>
    <CommercialImage asset={transformationStory.source} sizes="(max-width: 767px) 82vw, 29vw" />
    <figcaption>Foto</figcaption>
  </figure>
  <div className="transformation-story__stage transformation-story__stage--process" data-transform-stage data-transform-process aria-label="Transformação da referência em peça 3D">
    <CommercialImage asset={transformationStory.source} decorative sizes="(max-width: 767px) 82vw, 29vw" />
    <span>Transformação</span>
  </div>
  <figure className="transformation-story__stage transformation-story__stage--result" data-transform-stage data-transform-result>
    <CommercialImage asset={transformationStory.result} sizes="(max-width: 767px) 82vw, 29vw" />
    <figcaption>Peça 3D</figcaption>
  </figure>
</div>
```

O intermediário usa a foto como textura decorativa com duotone/máscara CSS; não recebe alt de produto.

- [ ] **Step 4: Substituir a timeline pelo progresso aprovado**

No desktop, timeline com `pin` no stage, `start: 'top top'`, `end: '+=110%'`, `scrub: 0.8`:

```ts
timeline
  .fromTo('[data-transform-source]', { scale: 0.92, rotate: -2 }, { scale: 1, rotate: 0, ease: 'none' }, 0)
  .fromTo('[data-transform-process]', { opacity: 0.4, clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, clipPath: 'inset(0 0% 0 0)', ease: 'none' }, 0.15)
  .fromTo('[data-transform-result]', { scale: 0.88, rotate: 2 }, { scale: 1, rotate: 0, ease: 'none' }, 0.25);
```

No mobile/reduced, não criar timeline; CSS mostra os três estágios em coluna.

- [ ] **Step 5: Estilizar painel rosa e evitar overflow**

Usar `min-height: 100svh`, grid copy + três estágios no desktop e coluna no breakpoint de 58rem. Setas ficam em wrappers sem disputar transform com cards.

- [ ] **Step 6: GREEN, assets e lint**

```powershell
npm test -- src/sections/TransformationStory/TransformationStory.test.tsx src/test/assets.test.ts
npm run lint
```

Expected: PASS.

- [ ] **Step 7: Commit seletivo**

```powershell
git add -- src/sections/TransformationStory src/styles/commercial.css
git diff --cached --check
git commit -m "feat: stage the photo to 3d transformation"
```

---

### Task 6: Reapresentar o coverflow como bento acessível

**Files:**
- Modify: `src/sections/CategoryCoverflow/CategoryCoverflow.tsx`
- Modify: `src/sections/CategoryCoverflow/CategoryCoverflow.test.tsx`
- Modify: `src/styles/commercial.css`

**Interfaces:**
- Preserves: `circularOffset`, ArrowLeft/ArrowRight, threshold 42 px, click pós-drag, compare explícito e `aria-live`
- Produces: `data-bento-size="feature|wide|standard|standard"`

- [ ] **Step 1: Escrever teste que preserve interação e exija bento**

```tsx
it('assigns four editorial bento areas without losing the carousel contract', () => {
  const { container } = render(<CategoryCoverflow />);
  expect(container.querySelectorAll('[data-bento-size]')).toHaveLength(4);
  expect([...container.querySelectorAll('[data-bento-size]')].map(
    (node) => node.getAttribute('data-bento-size'),
  )).toEqual(['feature', 'wide', 'standard', 'standard']);
  expect(screen.getByRole('region', { name: 'Categorias de personalizados' })).toHaveAttribute(
    'aria-roledescription', 'carrossel',
  );
});
```

Não apagar testes de wrap, teclado, drag 40/43 px e compare.

- [ ] **Step 2: Executar RED**

```powershell
npm test -- src/sections/CategoryCoverflow/CategoryCoverflow.test.tsx
```

Expected: FAIL pelos atributos ausentes.

- [ ] **Step 3: Adicionar metadados sem trocar a máquina de estado**

```ts
const bentoSizes = ['feature', 'wide', 'standard', 'standard'] as const;
```

Adicionar `data-bento-size={bentoSizes[index]}` no shell. Manter styles/offsets para mobile; CSS desktop sobrescreve a geometria.

- [ ] **Step 4: Construir grid desktop e swipe mobile**

```css
.category-coverflow__viewport {
  display: grid;
  grid-template-columns: 1.25fr 1fr 0.85fr;
  grid-template-rows: repeat(2, minmax(13rem, 1fr));
  gap: 1rem;
  min-height: 38rem;
}

.category-coverflow__slide-shell[data-bento-size='feature'] { grid-row: 1 / 3; }
.category-coverflow__slide-shell[data-bento-size='wide'] { grid-column: 2 / 4; }
.category-coverflow__slide-shell {
  position: relative;
  inset: auto;
  transform: none;
  opacity: 1 !important;
}
```

Mapear os dois `standard` com `:nth-child(3)`/`:nth-child(4)`. Todos ficam visíveis; `activeIndex` controla destaque, compare e anúncio. Em mobile, preservar swipe/coverflow atual ou migrar para `overflow-x: auto` somente se os testes continuarem verdes.

- [ ] **Step 5: Implementar hover e reduced motion**

Imagem até `scale(1.04)`, tile até `translateY(-6px)` e seta curta. Em reduced motion, remover transform/transition. Touch targets ≥ 44 px.

- [ ] **Step 6: GREEN completo**

```powershell
npm test -- src/sections/CategoryCoverflow/CategoryCoverflow.test.tsx
npm run lint
```

Expected: todos os testes antigos e o novo passam.

- [ ] **Step 7: Commit seletivo**

```powershell
git add -- src/sections/CategoryCoverflow src/styles/commercial.css
git diff --cached --check
git commit -m "feat: present categories as an editorial bento"
```

---

### Task 7: Integrar fechamento, logo e canais em capítulo carvão

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `src/sections/ChannelGrid/ChannelGrid.tsx`
- Modify: `src/sections/ChannelGrid/ChannelGrid.test.tsx`
- Modify: `src/sections/MemoryClosing/MemoryClosing.tsx`
- Modify: `src/sections/MemoryClosing/MemoryClosing.test.tsx`
- Modify: `src/sections/Footer/Footer.tsx`
- Create: `src/sections/Footer/Footer.test.tsx`
- Modify: `src/styles/commercial.css`

**Interfaces:**
- Consumes: `brandAsset`, `closingAsset`, `commercialChannels`
- Produces: `.commercial-closing-chapter` envolvendo canais e memória dentro de `<main>`
- Preserves: Footer fora de `<main>`, quatro destinos reais, canais vazios omitidos

- [ ] **Step 1: Escrever testes do fechamento verdadeiro**

Em `MemoryClosing.test.tsx`:

```tsx
expect(screen.getByRole('heading', { level: 2, name: 'Feito para quem importa.' })).toBeInTheDocument();
expect(screen.getByAltText('Logo Paula Personalizados 3D')).toBeInTheDocument();
```

Em `ChannelGrid.test.tsx`:

```tsx
expect(screen.getAllByRole('link')).toHaveLength(4);
```

Criar `Footer.test.tsx`:

```tsx
it('keeps semantic navigation and configured commercial destinations', () => {
  const { container } = render(<Footer />);
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: 'Navegação do rodapé' })).toBeInTheDocument();
  expect(container.querySelector('a[href=""]')).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Executar RED**

```powershell
npm test -- src/sections/MemoryClosing/MemoryClosing.test.tsx src/sections/ChannelGrid/ChannelGrid.test.tsx src/sections/Footer/Footer.test.tsx
```

Expected: FAIL pela copy/logo final e pelo novo teste.

- [ ] **Step 3: Atualizar MemoryClosing sem depoimentos inventados**

Trocar `words` por `['Feito', 'para', 'quem', 'importa.']`, atualizar `aria-label` e renderizar `brandAsset` em superfície clara, além de `closingAsset`. Manter animação e parallax em wrappers separados.

- [ ] **Step 4: Integrar canais e footer ao universo carvão**

No App:

```tsx
<div className="commercial-closing-chapter">
  <ChannelGrid />
  <MemoryClosing />
</div>
```

Manter `<Footer />` fora do `<main>`, mas com mesmo background. O logo JPG fica em disco claro controlado.

- [ ] **Step 5: Estilizar canais e preservar contraste**

Usar as cores já aprovadas por `commercialColorContrast.test.ts`. Hover/focus muda superfície explicitamente, não via `filter`. O fechamento usa no mínimo uma viewport em desktop, cresce no mobile e não contém cards de depoimento.

- [ ] **Step 6: GREEN e regressões de links**

```powershell
npm test -- src/sections/MemoryClosing/MemoryClosing.test.tsx src/sections/ChannelGrid/ChannelGrid.test.tsx src/sections/Footer/Footer.test.tsx src/sections/commercial-unavailable-links.test.tsx src/styles/commercialColorContrast.test.ts
npm run lint
```

Expected: PASS, quatro canais configurados e nenhum link vazio.

- [ ] **Step 7: Commit seletivo**

```powershell
git add -- src/App.tsx src/App.test.tsx src/sections/ChannelGrid src/sections/MemoryClosing src/sections/Footer src/styles/commercial.css
git diff --cached --check
git commit -m "feat: finish the editorial closing chapter"
```

---

### Task 8: Fechar responsividade, documentação e verificação integral

**Files:**
- Modify: `src/styles/commercial.css`
- Modify: `README.md`
- Modify: tests only if the browser audit reproduces a regression

**Interfaces:**
- Verifies: desktop 1440×1000, tablet 850×1000, mobile 390×844, reduced motion
- Preserves: chunks separados GSAP/Lenis e ausência de overflow

- [ ] **Step 1: Executar baseline final automatizado**

```powershell
.\project.cmd check
git diff --check origin/main..HEAD
```

Expected: lint, testes, TypeScript e Vite passam; diff sem whitespace.

- [ ] **Step 2: Iniciar preview de produção**

```powershell
.\project.cmd preview
```

Usar processo oculto quando automatizado e confirmar HTTP antes do browser.

- [ ] **Step 3: Verificar desktop 1440×1000**

Registrar:

- headline e CTA na primeira viewport;
- três produtos do Hero sem molduras rígidas;
- texto horizontal mudando com scroll;
- showcase carvão em viewport e produtos chegando a `rotationY(0deg)`;
- FOTO → TRANSFORMAÇÃO → PEÇA 3D;
- bento com quatro áreas e compare operável;
- fechamento carvão, logo, quatro canais e footer;
- `scrollWidth === clientWidth`;
- zero imagem quebrada, overlay, console error ou request failure.

- [ ] **Step 4: Verificar tablet 850×1000**

Checar 768–923 px: sem overflow na transformação, bento legível, carvão sem corte e header funcional.

- [ ] **Step 5: Verificar mobile 390×844**

Checar títulos sem clipping; menu com foco/trap/Escape/retorno/body unlock; nenhum pin longo; categorias por swipe/controles; quatro canais; zero overflow.

- [ ] **Step 6: Verificar movimento reduzido**

Confirmar conteúdo visível, nenhum pin/parallax/loop, texto horizontal estático, bento operável por teclado e Lenis ausente.

- [ ] **Step 7: Corrigir regressões somente com TDD**

Para falha reproduzível, escrever primeiro teste do sintoma, executar RED, fazer a menor correção, executar GREEN e repetir browser. Não mascarar causa com `overflow: hidden` interno.

- [ ] **Step 8: Atualizar README**

Documentar nova ordem, `ArtisanShowcase`, paths de foto/resultado, ausência intencional de depoimentos, troca por `CommercialImageAsset` e decisão de não usar `img2threejs`/Three.js.

- [ ] **Step 9: Executar verificação fresca e commit final**

```powershell
.\project.cmd check
git diff --check origin/main..HEAD
git status --short --branch
git add -- README.md
git diff --cached --check
git commit -m "docs: document the editorial panel experience"
```

Qualquer correção de regressão criada durante a auditoria deve ser commitada no ciclo TDD que a produziu; este commit final inclui apenas a documentação.

---

## Definition of Done

- Dados ativos usam assets reais e alts coerentes.
- Hero, showcase, transformação, bento e fechamento seguem a linguagem editorial aprovada.
- Painéis carvão são capítulos de viewport, não faixas estreitas.
- Pinning existe somente no showcase e na transformação em desktop apto.
- Texto horizontal e bento são visualmente centrais.
- GSAP tem cleanup e reduced motion não recebe aprimoramentos pesados.
- Não há Three.js, WebGL, depoimentos inventados ou links falsos.
- Todos os testes existentes e novos passam.
- Browser desktop/tablet/mobile/reduced passa sem overflow ou erros.
