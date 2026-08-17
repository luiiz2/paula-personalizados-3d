# 🌸 Paula Personalizados 3D

<div align="center">

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5.8-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP_3-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Oxlint](https://img.shields.io/badge/Oxlint-orange?style=for-the-badge)
![GitHub Actions](https://img.shields.io/badge/CI-Passing-brightgreen?style=for-the-badge&logo=github-actions)

<p align="center">
  <strong>Landing page comercial editorial de alta conversão para estúdio de arte e personalização 3D artesanal.</strong><br>
  Transformando memórias, fotos e desenhos em peças físicas tridimensionais exclusivas feitas à mão.
</p>

[Visão Geral](#-visão-geral) •
[O Que Foi Feito](#-o-que-foi-feito) •
[Como Foi Feito](#-como-foi-feito) •
[Tecnologias Utilizadas](#-tecnologias-utilizadas) •
[Como Executar](#-como-executar) •
[Guia de Manutenção](#-guia-de-manutenção) •
[Estrutura do Projeto](#-estrutura-do-projeto) •
[Qualidade e Testes](#-qualidade-e-testes)

---

</div>

## 📌 Visão Geral

O projeto **Paula Personalizados 3D** é uma aplicação web estática de alto padrão visual, focada em performance, conversão comercial e experiência do usuário. Apresenta o processo artesanal de transformação de fotos 2D em esculturas, luminárias, miniaturas e chaveiros 3D colecionáveis.

A plataforma foi desenvolvida com arquitetura modular, tipagem estrita de ponta a ponta, animações fluidas via hardware acceleration e conformidade com diretrizes de acessibilidade (WCAG AA).

---

## ✨ O Que Foi Feito

A landing page foi estruturada em capítulos narrativos e visuais estratégicos:

1. **Commercial Hero & Palco 3D**:
   - Palco de apresentação com logotipo tridimensional interativo com efeito de rotação ao clique.
   - Barra de navegação integrada e botões diretos para canais oficiais.
   - Vitrine editorial com miniatura principal e duo equilibrado de produtos secundários (chaveiro pet e luminária coração) otimizados para desktop e mobile.
   - Chamadas para ação (CTA) claras direcionando para atendimento direto no WhatsApp.

2. **Faixa de Confiança (Trust Marquee)**:
   - Faixa contínua com indicadores de credibilidade, garantia artesanal, envio seguro e suporte humanizado.

3. **Artisan Showcase (Painel Carvão)**:
   - Apresentação visual imersiva em fundo escuro (`#000000`) destacando a precisão cirúrgica, os materiais premium e o acabamento manual minucioso de cada peça.

4. **Transformation Story (A Jornada da Arte)**:
   - Narrativa em 3 etapas sequenciais: **Foto de Referência** → **Modelagem & Escultura 3D** → **Peça Física Real**.
   - Demonstração tangível da fidelidade aos traços originais com suporte a fotos reais em alta definição.

5. **Carrossel de Categorias (Infinite Coverflow Loop)**:
   - Carrossel horizontal interativo com **loop infinito contínuo e sem fim** (`01 → 02 → 03 → 04 → 05 → 06 → 01...` e vice-versa).
   - **Interação por arrasto 1:1 (Click + Hold + Drag no desktop / Swipe no mobile)** com cursor dinâmico `grab`/`grabbing`.
   - Física de liberação com inércia calculada e snap suave (`power2.out`) para o card mais próximo.
   - 6 bolinhas de paginação sincronizadas em tempo real com o card central e navegação inteligente pelo caminho mais curto.

6. **Grade de Canais Comerciais (Channel Grid)**:
   - Centralização dos 4 canais oficiais de compra: **WhatsApp**, **Instagram**, **Shopee** e **Mercado Livre**.
   - Tratamento automático de canais indisponíveis (sem links falsos ou placeholders).

7. **Encerramento Emocional & Rodapé**:
   - Fechamento com chamada para eternizar momentos especiais e rodapé institucional com navegação semântica e direitos autorais.

---

## 🛠️ Como Foi Feito

### 1. Arquitetura e Fontes Únicas de Verdade
- Todos os dados comerciais, links, descrições e fotografias estão centralizados na camada de dados (`src/data/links.ts` e `src/data/commercial.ts`).
- Nenhum componente contém dados sensíveis ou URLs fixadas no código (*hardcoded*), facilitando manutenções futuras sem tocar na camada de interface.

### 2. Animações e Performance
- Utilização do **GSAP (GreenSock)** com o hook oficial `@gsap/react` para orquestração precisa de timelines de entrada e microinterações.
- Respeito integral à preferência do sistema por **movimento reduzido** (`prefers-reduced-motion`), desativando transições bruscas para usuários com sensibilidade visual sem ocultar conteúdos.
- Ausência deliberada de bibliotecas pesadas de 3D ao vivo (como Three.js em tempo real para renderizações de catálogo), priorizando fotografias reais de alta resolução com carregamento inteligente (`priority` no Hero e `loading="lazy"` abaixo da dobra).

### 3. Física de Arrasto e Matemática de Loop Infinito
- A translação dos cards opera em espaço de coordenadas relativas normalizadas:
  $$\text{wrappedX} = ((\text{baseX} - \text{bufferMin}) \pmod{\text{totalWidth}} + \text{totalWidth}) \pmod{\text{totalWidth}} + \text{bufferMin}$$
- Permite que o usuário arraste infinitamente para qualquer lado sem saltos visuais, mantendo o card 01 alinhado na abertura inicial.

### 4. Acessibilidade e Semântica (a11y)
- Estrutura hierárquica rigorosa com exatamente um elemento `<h1>` no Hero e `<h2>` nas seções seguintes.
- Suporte total a navegação por teclado (`Tab`, `Enter`, `Espaço`, `Setas direcionais`, `Home`, `End` e `Esc`).
- Estados de foco visíveis (`:focus-visible`), atributos ARIA (`aria-roledescription`, `aria-selected`, `aria-label`, `aria-hidden`) e contraste de cores validado por testes automatizados.

---

## 💻 Tecnologias Utilizadas

| Categoria | Tecnologia | Finalidade |
|---|---|---|
| **Core** | [React 19](https://react.dev/) | Biblioteca para construção de interfaces reativas e declarativas |
| **Linguagem** | [TypeScript 5.8](https://www.typescriptlang.org/) | Tipagem estática rigorosa para prevenção de erros em tempo de compilação |
| **Bundler & Dev Server** | [Vite 8](https://vite.dev/) | Build ultra-rápido com Rollup/Rolldown e Hot Module Replacement (HMR) |
| **Estilização** | [Tailwind CSS 4](https://tailwindcss.com/) & Vanilla CSS | Design tokens, layouts responsivos e estilos modulares customizados |
| **Animações** | [GSAP 3](https://gsap.com/) & `@gsap/react` | Orquestração de animações de entrada e física suave |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) | Rolagem suave baseada em inércia para ponteiros de alta precisão |
| **Ícones** | [Lucide React](https://lucide.dev/) | Biblioteca leve de ícones SVG consistentes e acessíveis |
| **Qualidade & Lint** | [Oxlint](https://oxc.rs/) | Linter estático ultra-rápido em Rust para validação de boas práticas |
| **Testes** | [Vitest](https://vitest.dev/) & [Testing Library](https://testing-library.com/) | Suíte completa de testes unitários, de integração e contratos de acessibilidade |
| **CI/CD** | [GitHub Actions](https://github.com/features/actions) | Pipeline automatizado de linting, testes e verificação de build |

---

## 🚀 Como Executar

### Pré-requisitos
- **Node.js**: `^22.22.2`, `^24.15.0` ou `>=26.0.0`
- **npm**: `>=10.0.0`
- **Git**

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/luiiz2/paula-personalizados-3d.git
   cd paula-personalizados-3d
   ```

2. **Instalar as dependências:**
   ```bash
   npm ci
   ```

3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador em `http://localhost:5173`.

---

## ⚙️ Comandos do Projeto

### Comandos padrão (npm)

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor local de desenvolvimento com HMR |
| `npm test` | Executa todos os 42 testes automatizados via Vitest |
| `npm run test:watch` | Executa os testes em modo interativo contínuo |
| `npm run lint` | Executa a análise estática com Oxlint em todos os arquivos |
| `npm run build` | Compila o TypeScript (`tsc -b`) e gera a pasta otimizada `dist/` |
| `npm run preview` | Executa um servidor local para inspecionar os arquivos de `dist/` |

### Launcher automatizado (Windows)

No Windows, você pode utilizar o script de conveniência `project.cmd`:

```powershell
.\project.cmd setup     # Instala as dependências
.\project.cmd dev       # Inicia o ambiente de desenvolvimento
.\project.cmd check     # Executa Lint + Testes + Build de uma só vez
.\project.cmd test      # Roda a suíte de testes
.\project.cmd build     # Compila a versão final de produção
```

---

## 📖 Guia de Manutenção

### 1. Como alterar os links externos (WhatsApp, Instagram, Shopee, Mercado Livre)
Edite exclusivamente o arquivo [`src/data/links.ts`](file:///src/data/links.ts):
```ts
export const links = {
  whatsapp: 'https://wa.me/5511999999999?text=...',
  instagram: 'https://instagram.com/paulapersonalizados3d',
  shopee: 'https://shopee.com.br/shop/...',
  mercadoLivre: 'https://lista.mercadolivre.com.br/...',
} as const;
```
> *Nota: Caso um canal não esteja disponível, atribua uma string vazia `''`. A interface omitirá automaticamente o botão daquele canal sem quebrar o layout.*

### 2. Como adicionar ou substituir fotografias
1. Adicione a imagem na pasta [`public/assets/`](file:///public/assets/) com nome em minúsculas (ex: `luminaria-casal-real.webp`).
2. Atualize o registro correspondente em [`src/data/commercial.ts`](file:///src/data/commercial.ts) informando `src`, `alt` descritivo, dimensões e `objectPosition`.
3. Valide o projeto executando `npm test` e `npm run build`.

---

## 📂 Estrutura do Projeto

```text
paula-personalizados-3d/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Pipeline automatizada de CI
├── public/
│   └── assets/                    # Assets públicos estáticos (imagens reais, fotos e logotipos)
├── src/
│   ├── components/                # Componentes reutilizáveis
│   │   ├── Header/                # Cabeçalho e navegação mobile acessível
│   │   ├── motion/                # Envoltórios de animação e scroll suave (Lenis)
│   │   └── ui/                    # Botões, imagens com fallback e ícones personalizados
│   ├── data/                      # Fontes únicas de verdade
│   │   ├── commercial.ts          # Textos, produtos, etapas da história e categorias
│   │   └── links.ts               # URLs dos canais de atendimento e venda
│   ├── hooks/                     # Custom hooks (ex: usePointerParallax)
│   ├── lib/                       # Funções utilitárias e regras de movimento
│   ├── sections/                  # Seções principais da landing page
│   │   ├── CommercialHero/        # Hero, logo 3D, vitrine editorial e marquee
│   │   ├── ArtisanShowcase/       # Showcase em fundo carvão
│   │   ├── TransformationStory/   # Narrativa visual da transformação 3D
│   │   ├── CategoryCoverflow/     # Carrossel infinito com arrasto e bolinhas
│   │   ├── ChannelGrid/           # Grade de canais oficiais
│   │   ├── MemoryClosing/         # Seção de fechamento emocional
│   │   └── Footer/                # Rodapé institucional
│   ├── styles/
│   │   └── commercial.css         # Estilos customizados e regras de responsividade
│   ├── test/                      # Testes globais e validação de assets
│   ├── App.tsx                    # Orquestração da jornada comercial
│   ├── index.css                  # Variáveis de cor, tipografia e Tailwind CSS
│   └── main.tsx                   # Ponto de entrada da aplicação React
├── index.html                     # HTML semântico com metatags OpenGraph/SEO
├── package.json                   # Dependências e scripts
├── project.cmd                    # Launcher utilitário para Windows
├── vite.config.ts                 # Configurações do Vite e plugins
└── vitest.config.ts               # Configurações da suíte de testes Vitest
```

---

## 🧪 Qualidade e Testes

O projeto conta com **42 testes automatizados** distribuídos em 18 suítes com 100% de aprovação:

- **Contratos de Acessibilidade**: Validação de foco no menu mobile, títulos semânticos (`h1`/`h2`), nomes acessíveis e atributos ARIA.
- **Segurança de Links**: Validação de links externos com `target="_blank"` e `rel="noopener noreferrer"`.
- **Física e Interação**: Testes de arrasto por ponteiro, limiares de deslocamento (threshold 42px) e supressão de clique acidental.
- **Integridade de Assets**: Verificação automatizada de que todas as URLs referenciadas em `commercial.ts` existem fisicamente em `public/assets/`.
- **Contraste de Cores**: Validação das combinações de cores conforme os padrões WCAG AA.

Para executar todos os testes:
```bash
npm test
```

---

## 🚀 Publicação e Deploy

Para gerar o pacote de produção:
```bash
npm run build
```
Os arquivos estáticos otimizados serão gerados na pasta `dist/`, prontos para serem hospedados em qualquer provedor de conteúdo estático:
- **Vercel**: Deploy automático via Git (Build command: `npm run build`, Output directory: `dist`).
- **Netlify**: Configuração padrão com `dist` como publish directory.
- **Cloudflare Pages** ou **GitHub Pages**.

---

<div align="center">
  <sub>Desenvolvido com foco em excelência visual, performance e fidelidade artesanal para <strong>Paula Personalizados 3D</strong>.</sub>
</div>
