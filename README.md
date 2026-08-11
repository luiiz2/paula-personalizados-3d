# Paula Personalizados 3D

Manual central para desenvolver, manter, testar e publicar a landing page da Paula Personalizados 3D.

Repositório privado: `https://github.com/luiiz2/paula-personalizados-3d`

## Estado atual

- Landing page comercial curta montada na ordem Header → Hero → Marquee → Transformação → Categorias → Canais → Encerramento → Footer.
- Build de produção aprovado.
- Lint e testes automatizados aprovados.
- 42 fotos públicas incluídas corretamente no build.
- Layout verificado em desktop e mobile.
- Menu mobile acessível por teclado e fecha com `Esc`.
- CI configurado no GitHub Actions.
- Audit do npm sem vulnerabilidades conhecidas na última verificação.

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS
- GSAP para animações
- Oxlint
- Vitest e Testing Library
- GitHub Actions

## Requisitos

- Node.js ^22.22.2, ^24.15.0 ou >=26.0.0
- npm
- Git

Se `node` ou `npm` não forem reconhecidos no Windows, use o launcher descrito abaixo. Para voltar a usar os comandos diretamente, feche e abra novamente o terminal após instalar as ferramentas.

## Instalação e desenvolvimento

### Windows — recomendado

Use o launcher do próprio projeto. Ele localiza Node, npm, Git e GitHub CLI nos caminhos comuns do Windows mesmo quando o `PATH` do terminal está desatualizado:

```powershell
.\project.cmd doctor
.\project.cmd setup
.\project.cmd dev
```

Para validar tudo de uma vez:

```powershell
.\project.cmd check
```

Consulte todos os comandos com `.\project.cmd help`.

### npm — qualquer sistema operacional

```bash
npm ci
npm run dev
```

O Vite informará o endereço local, normalmente `http://localhost:5173`.

## Comandos

No Windows, todos estes comandos também estão disponíveis por meio de `project.cmd`:

```powershell
.\project.cmd doctor      # encontra e mostra as ferramentas instaladas
.\project.cmd setup       # instala as dependências
.\project.cmd dev         # desenvolvimento
.\project.cmd lint        # lint
.\project.cmd test        # testes
.\project.cmd test-watch  # testes em modo watch
.\project.cmd build       # build
.\project.cmd check       # lint + testes + build
.\project.cmd preview     # preview de dist/
.\project.cmd github      # autenticação do GitHub e estado do Git
```

Com npm disponível no `PATH`:

```bash
npm run dev         # servidor de desenvolvimento
npm run lint        # análise estática
npm test            # testes automatizados uma vez
npm run test:watch  # testes durante o desenvolvimento
npm run build       # TypeScript + build de produção
npm run preview     # visualiza o conteúdo de dist/
```

Antes de enviar qualquer alteração, execute:

```bash
npm run lint
npm test
npm run build
```

## Onde alterar cada coisa

| Necessidade | Arquivo ou pasta |
| --- | --- |
| Links do Instagram, WhatsApp, Shopee e Mercado Livre | `src/data/links.ts` |
| Textos, categorias e imagens da experiência comercial | `src/data/commercial.ts` |
| Seções e ordem da página | `src/App.tsx` |
| Hero e faixa de confiança | `src/sections/CommercialHero/` |
| Transformação da foto para o 3D | `src/sections/TransformationStory/` |
| Categorias e coverflow | `src/sections/CategoryCoverflow/` |
| Canais comerciais | `src/sections/ChannelGrid/` |
| Encerramento emocional | `src/sections/MemoryClosing/` |
| Cabeçalho e menu mobile | `src/components/Header/Header.tsx` |
| Rodapé, telefone e canais | `src/sections/Footer/Footer.tsx` |
| Cores, fontes, tamanhos e estilos globais | `src/index.css` e `src/styles/commercial.css` |
| Título, descrição e metatags sociais | `index.html` |
| Fotos públicas | `public/assets/` |
| Componentes reutilizáveis | `src/components/` |
| Testes | arquivos `*.test.ts` e `*.test.tsx` |
| Pipeline do GitHub | `.github/workflows/ci.yml` |
| Launcher independente do PATH no Windows | `project.cmd` e `scripts/project.ps1` |

## Como alterar links externos

Edite somente `src/data/links.ts`:

```ts
export const links = {
  instagram: 'URL_REAL',
  whatsapp: 'URL_REAL',
  shopee: 'URL_REAL',
  mercadoLivre: 'URL_REAL',
} as const;
```

Regras:

- Nunca invente uma URL.
- Se um canal não estiver disponível, use uma string vazia.
- Não duplique links diretamente dentro dos componentes.
- Links renderizados pelo componente `ExternalLink` já usam `target="_blank"` e proteção `noopener noreferrer`.
- Não adicione `window.open()` ao `ExternalLink`, pois isso pode abrir duas abas.

## Como adicionar ou trocar fotos

1. Coloque o arquivo em `public/assets/`.
2. Prefira nomes simples, minúsculos e sem espaços, por exemplo `boneca-personalizada-rosa.webp`.
3. Atualize os registros `CommercialImageAsset` em `src/data/commercial.ts`.
4. Escreva um texto `alt` que descreva o conteúdo real.
5. Execute `npm test` e `npm run build`.
6. Confirme que a foto também existe em `dist/assets/` depois do build.

As fotografias finais podem ser substituídas somente nesses registros, sem alterar o markup dos componentes.

Não coloque fotos na pasta `assets/` da raiz. URLs `/assets/...` só são copiadas automaticamente quando os arquivos estão em `public/assets/`.

## Estrutura do projeto

```text
.
├── .github/workflows/ci.yml
├── public/
│   ├── assets/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   ├── data/
│   │   ├── commercial.ts
│   │   └── links.ts
│   ├── sections/
│   │   ├── CommercialHero/
│   │   ├── TransformationStory/
│   │   ├── CategoryCoverflow/
│   │   ├── ChannelGrid/
│   │   └── MemoryClosing/
│   ├── styles/
│   │   └── commercial.css
│   ├── test/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── vite.config.ts
└── vitest.config.ts
```

## Regras importantes de código

- Mantenha apenas um `<h1>` na página; atualmente ele fica no Hero.
- Use `<h2>` para títulos das seções seguintes.
- Não remova o link “Ir para o conteúdo principal” de `src/App.tsx`.
- O menu mobile deve continuar prendendo o foco, fechando com `Esc` e devolvendo o foco ao botão.
- Animações devem respeitar `prefers-reduced-motion`.
- Links de navegação interna devem ser âncoras reais, como `href="#produtos"`.
- Não publique links com `href="#"` apenas como placeholder.
- Não faça mudanças manuais em `dist/`; essa pasta é recriada pelo build.
- Não versione `node_modules/` nem `dist/`.
- Reutilize dados centralizados em vez de hardcodar produtos e links nos componentes.
- Preserve `alt` nas imagens e `aria-label` em controles que possuem somente ícone.

## Testes existentes

- Segurança e comportamento básico de links externos.
- Abertura e fechamento acessível do menu mobile.
- Composição da jornada comercial, com um único `<h1>` e os headings principais.
- Hero, transformação, coverflow, canais, encerramento e smooth scroll.
- Integridade dos dados comerciais e da mensagem do WhatsApp.
- Verificação de que todas as URLs `/assets/...` apontam para arquivos existentes em `public/`.

Ao corrigir um bug, adicione um teste que falharia antes da correção sempre que isso for viável.

## Integração contínua

O arquivo `.github/workflows/ci.yml` executa automaticamente em pushes para `main` e em pull requests:

1. `npm ci`
2. `npm run lint`
3. `npm test`
4. `npm run build`

Não considere uma alteração pronta se o CI estiver vermelho.

## Build e publicação

```bash
npm run build
```

O site estático será gerado em `dist/`. Configure a hospedagem para publicar essa pasta.

Configuração genérica:

- Comando de instalação: `npm ci`
- Comando de build: `npm run build`
- Diretório de saída: `dist`
- Framework: Vite

## Checklist obrigatório antes do primeiro deploy público

- [ ] Escolher e configurar o domínio definitivo.
- [ ] Adicionar `<link rel="canonical">` em `index.html` com a URL definitiva.
- [ ] Adicionar `og:url` com a URL definitiva.
- [ ] Trocar `og:image` e `twitter:image` por URLs absolutas do domínio.
- [ ] Criar uma imagem social dedicada de aproximadamente 1200 × 630 pixels.
- [ ] Criar `public/robots.txt` com a URL do sitemap.
- [ ] Criar `public/sitemap.xml` com a URL definitiva.
- [ ] Criar textos reais de Política de Privacidade e Termos ou manter esses links removidos.
- [ ] Se forem adicionados analytics, pixels ou cookies, avaliar aviso e consentimento conforme a LGPD.
- [ ] Converter as fotos principais para WebP ou AVIF.
- [ ] Criar tamanhos responsivos e `srcset` para reduzir dados no mobile.
- [ ] Testar Instagram, WhatsApp, Shopee, Mercado Livre e telefone em aparelho real.
- [ ] Testar desktop e mobile nos navegadores principais.
- [ ] Conferir títulos, descrições, textos alternativos e informações comerciais.
- [ ] Executar lint, testes e build.
- [ ] Confirmar que o GitHub Actions está verde.

## Otimização de imagens pendente

As 42 fotos atuais totalizam aproximadamente 4,32 MB. Elas carregam corretamente, mas ainda devem ser otimizadas antes de campanhas ou tráfego maior.

Plano recomendado:

1. Manter o JPG original como fallback somente quando necessário.
2. Gerar WebP ou AVIF em larguras adequadas ao layout.
3. Atualizar `src/components/ui/Image.tsx` para aceitar `srcSet` e formatos alternativos.
4. Priorizar somente a imagem principal do Hero.
5. Manter as imagens abaixo da dobra com `loading="lazy"`.
6. Medir novamente o site com Lighthouse após a publicação.

## SEO pendente

O projeto já possui título, descrição, Open Graph, Twitter Card e um `<h1>`. Quando o domínio estiver definido, ainda será necessário:

- Usar URLs absolutas nas metatags sociais.
- Adicionar canonical e `og:url`.
- Criar sitemap e robots.
- Adicionar dados estruturados apropriados ao negócio, sem inventar endereço ou informações comerciais.
- Validar a imagem social e os dados estruturados em ferramentas oficiais.

## Fluxo recomendado de Git

```bash
git status
git add <arquivos>
git commit -m "Descrição curta da alteração"
git push
```

Antes do commit, revise `git diff` e confirme que não há arquivos privados, credenciais, `.env`, `node_modules/` ou conteúdo sem relação com a alteração.

## Definição de pronto

Uma alteração está pronta quando:

- O comportamento solicitado funciona em desktop e mobile.
- Não existem erros no console do navegador.
- Não existem imagens quebradas.
- A navegação por teclado continua funcionando.
- `npm run lint` passa.
- `npm test` passa.
- `npm run build` passa.
- O diff foi revisado.
- A documentação foi atualizada quando a estrutura ou o fluxo mudou.
