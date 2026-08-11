# Redesign editorial com painéis e motion — Paula Personalizados 3D

**Data:** 10 de agosto de 2026
**Status:** aprovado pelo briefing anexado pelo responsável
**Escopo:** redesenhar visualmente a landing existente sem recriar a aplicação nem alterar integrações, rotas ou destinos comerciais.

## Objetivo

Transformar a landing atual em uma experiência editorial afetiva, premium e artesanal, com produtos grandes, pouco texto, bastante espaço negativo e uma narrativa visual contínua. A inspiração orienta composição, contraste e ritmo, mas não será copiada literalmente.

O movimento principal será composto por:

- painéis grandes, com no mínimo uma viewport de altura;
- dois momentos fixados de forma seletiva, nunca todas as seções;
- texto horizontal ligado ao scroll;
- galeria bento limpa;
- transformação foto → processo → peça;
- produtos com profundidade 2.5D e rotação suave controlada pelo scroll.

## Restrições globais

- Não recriar o projeto do zero.
- Não trocar React, TypeScript, Vite, GSAP, Lenis ou a arquitetura atual.
- Não alterar rotas, links, canais, mensagem comercial ou integrações.
- Reutilizar componentes, dados, hooks de motion e testes existentes.
- Não inventar depoimentos, nomes de clientes, resultados ou URLs.
- Não reativar seções legadas fora do grafo atual apenas para preencher o layout.
- Conteúdo deve nascer visível; animações apenas aprimoram a apresentação.
- Preservar teclado, foco, leitores de tela e `prefers-reduced-motion`.
- Priorizar aparência, fluidez, legibilidade, performance e só então efeitos avançados.

## Decisão técnica sobre 3D

### Escolha atual: CSS 2.5D + GSAP

Os personagens serão tratados como objetos em camadas visuais, com perspectiva, sombra de contato, escala e pequenos deslocamentos. O scroll controlará `rotationY`, `translateY` e `scale` por meio do GSAP/ScrollTrigger.

### `img2threejs`: não usar nesta etapa

`img2threejs` é um pipeline que gera factories de `THREE.Group`; não é um efeito de runtime pronto. Seu uso adicionaria Three.js, WebGL, canvas, lifecycle de renderização e fallback específico. Os assets atuais são JPGs sem transparência, multiview ou mapas de profundidade, portanto não justificam esse custo.

Uma prova de conceito futura só será considerada com fotos frontal/lateral/traseira de uma peça isolada, carregamento dinâmico, poster estático e medição real em celulares. Nenhuma dependência 3D será adicionada agora.

## Sistema visual

### Paleta

- creme de base: `#f4ede6`;
- branco quente: `#fffaf6`;
- rosa névoa: `#f2d4d8`;
- rosa queimado: `#cc5270`;
- vinho de interação: `#973149`;
- carvão: `#111111`;
- texto escuro: `#171313`;
- texto claro: `#fff8f4`.

Os tons finais devem dialogar com o logo oficial já existente em `public/assets/photo_2026-08-09_20-14-06.jpg`. Gradientes ficam restritos a luz ambiente discreta; superfícies principais permanecem sólidas e táteis.

### Tipografia

- Títulos: `Playfair Display`, já carregada pelo projeto, com fallback Georgia/serif.
- Navegação, textos e botões: `Manrope`, já carregada pelo projeto, com fallback system-ui/sans-serif.
- Headline em poucas palavras, escala fluida com `clamp()` e entrelinha apertada.
- Rosa destaca no máximo uma linha ou palavra-chave por título.
- Serifas muito finas não serão usadas em tamanhos pequenos.

Não será adicionada nenhuma nova fonte ou requisição tipográfica nesta etapa.

### Superfícies

- Painéis claros usam textura sutil criada por CSS, sem imagem pesada.
- Painéis escuros ocupam a viewport inteira e funcionam como capítulos, não divisores estreitos.
- Bordas arredondadas aparecem apenas na entrada/saída de alguns painéis.
- Sombras ficam quase imperceptíveis e servem somente para profundidade.

## Arquitetura da jornada

A ordem estrutural existente permanece reconhecível:

1. Header compacto.
2. Hero editorial creme.
3. Texto horizontal de confiança.
4. Showcase artesanal carvão.
5. Transformação rosa.
6. Categorias em bento creme.
7. Canais e encerramento carvão.
8. Footer reduzido integrado ao fechamento.

As seções atuais serão reutilizadas sempre que possível. Alterações de markup ficam limitadas à composição visual e aos wrappers necessários para GSAP e layout.

## Painéis empilhados

### Comportamento desktop

- Cada capítulo principal usa `min-height: 100svh`.
- O showcase carvão e a transformação rosa podem usar `position: sticky`/ScrollTrigger dentro de trilhos de scroll maiores que a viewport.
- O próximo painel sobe sobre o anterior por fluxo natural e z-index controlado.
- Hero, bento e encerramento não ficam presos durante toda a rolagem.
- `pinSpacing` permanece habilitado quando o GSAP fizer pin para evitar saltos.
- Nenhum painel depende de scroll hijacking ou wheel listeners personalizados.

### Comportamento mobile

- Painéis mantêm presença de tela cheia, mas usam `min-height` em vez de altura rígida.
- Pinning longo é removido.
- Seções seguem fluxo vertical natural.
- Bento vira trilho horizontal com swipe nativo quando não couber.
- Sobreposições são reduzidas para impedir cortes e overflow.

### Movimento reduzido

- Sem pinning GSAP, scrub, parallax ou loops.
- Todo o conteúdo aparece na posição final.
- A faixa horizontal permanece legível e estática.

## Hero editorial

### Conteúdo

Headline aprovada:

> MEMÓRIAS
> QUE GANHAM
> FORMA.

Texto de apoio curto sobre transformar fotos, desenhos e ideias em peças únicas. CTA principal continua levando ao WhatsApp configurado; CTA secundário leva às categorias.

### Composição

- Copy ocupa aproximadamente 45% da largura desktop.
- Produtos reais ocupam o restante como tableau assimétrico.
- Imagens ficam em alturas, escalas e rotações diferentes.
- Uma foto de origem menor funciona como prova da transformação.
- Nenhum produto fica preso a card tradicional.
- O primeiro asset continua sendo o único com prioridade de carregamento.

### Motion

- Linhas do título entram em stagger curto.
- Produtos revelam por máscara e pequena escala.
- Parallax por ponteiro/scroll permanece abaixo de 50 px.
- Ornamentos decorativos flutuam lentamente.
- Copy nunca se move com o parallax dos produtos.

## Texto horizontal

A faixa atual será elevada a elemento editorial de transição.

Conteúdo:

> FEITO À MÃO ✦ 100% PERSONALIZADO ✦ ENVIO PARA TODO O BRASIL ✦ PRODUÇÃO ARTESANAL ✦

No desktop, o texto percorre horizontalmente conforme o scroll do trecho. Uma cópia contínua pode manter o loop lento quando o painel estiver ocioso. No mobile, o movimento é menor. Com movimento reduzido, a frase fica estática e pode quebrar em linhas.

O texto duplicado para continuidade permanece `aria-hidden`; existe uma única versão acessível.

## Showcase artesanal carvão

### Conteúdo

Título:

> FEITO À MÃO.
> FEITO PRA DURAR.

Quatro provas institucionais existentes podem aparecer em tamanho compacto: personalizado, artesanal, envio nacional e cuidado na produção.

### Produtos

Usar trabalhos reais e não depender de personagens extraídos do screenshot de inspiração. Candidatos iniciais:

- `photo_2026-07-23_10-07-08.jpg` — personagem feminina elegante;
- `photo_2026-08-09_20-15-54.jpg` — pai e filho ambientados.

Se os recortes automáticos não preservarem fidelidade, manter as imagens como objetos editoriais com molduras invisíveis e sombras de contato, sem simular uma malha 3D falsa.

### Motion 2.5D

- Produto esquerdo inicia em `rotationY(-20deg)`.
- Produto direito inicia em `rotationY(20deg)`.
- Ambos terminam em `rotationY(0deg)` no centro do trecho.
- Escala progride de `0.96` para `1`.
- Deslocamento vertical progride de aproximadamente `20px` para `0`.
- A animação usa `scrub` e nunca toca automaticamente.
- Perspectiva e sombras pertencem a wrappers separados para evitar disputa de `transform`.

## Transformação foto → peça

### Assets reais

- Foto de origem: `/assets/photo_2026-07-26_18-37-49.jpg`.
- Resultado coerente: `/assets/photo_2026-07-20_12-15-36.jpg`.

Não existe terceiro arquivo real separado. O estágio “TRANSFORMAÇÃO” será uma apresentação processual do mesmo par: máscara, sobreposição de contorno/duotone e legenda. Ele não apresentará um produto ou resultado fictício.

### Layout

Três grandes elementos contam a história:

1. FOTO;
2. TRANSFORMAÇÃO;
3. PEÇA 3D.

O painel rosa ocupa uma viewport no desktop e cresce naturalmente quando necessário. O texto de apoio é mínimo e o CTA preserva o destino atual.

### Motion

- Foto: `scale(0.92)` para `scale(1)`.
- Processo: opacidade de `0.4` para `1`, com máscara horizontal.
- Resultado: `scale(0.88)` para `scale(1)`.
- Setas progridem sem competir com transformações das imagens.
- Mobile usa entrada sequencial simples, sem pin longo.

## Galeria bento de categorias

As quatro categorias existentes permanecem:

- Miniaturas da sua foto;
- Do desenho para a vida em 3D;
- Bonecos personalizados;
- Lembranças especiais.

### Desktop

- Grid bento assimétrico, limpo, com quatro áreas.
- Uma categoria principal ocupa área maior.
- Imagens dominam; textos ficam curtos no rodapé de cada área.
- A lógica acessível de seleção/compare do desenho é preservada ou adaptada sem retirar sua alternativa explícita para teclado e toque.
- Controles de navegação aparecem apenas se necessários à largura disponível.

### Mobile

- Swipe horizontal nativo com `scroll-snap`.
- Um card principal e parte do próximo ficam visíveis como affordance.
- Teclado, botões e estado anunciado permanecem funcionais.

### Microinterações

- Imagem: `scale(1)` para `scale(1.04)`.
- Tile: `translateY(0)` para `translateY(-6px)`.
- Sombra e seta mudam discretamente.
- Sem flip automático ou conteúdo essencial apenas no hover.

## Encerramento e canais

Não existem depoimentos verificáveis no repositório. Portanto, esta etapa não publicará nomes, fotos ou citações inventadas.

Até o responsável fornecer avaliações reais, o painel final carvão usa:

> FEITO PARA
> QUEM IMPORTA.

- logo oficial grande dentro de superfície clara controlada;
- texto institucional curto;
- WhatsApp, Instagram, Shopee e Mercado Livre;
- cores de plataforma ajustadas para contraste AA;
- footer mínimo integrado ao painel.

Quando avaliações reais forem fornecidas, cards pequenos podem ser adicionados sem mudar a arquitetura do painel.

## Assets e conteúdo

### Fontes de verdade ativas

- `src/data/commercial.ts` para imagens e categorias comerciais;
- `src/data/links.ts` para canais e mensagem do WhatsApp;
- `public/assets/` para arquivos referenciados por `/assets/...`.

### Curadoria obrigatória

- Corrigir mapeamentos ativos de fonte/resultado que hoje usam anúncios compostos.
- Não reutilizar mapeamentos provisórios de `products.ts` ou `gallery.ts` na jornada ativa.
- Não usar screenshots financeiros, logos de terceiros ou marketplace como produto.
- Não remover assets legados nesta etapa; apenas mantê-los fora da experiência ativa.
- Logo anexado já existe byte a byte em `photo_2026-08-09_20-14-06.jpg`; não criar duplicata.

### Limitações conhecidas

- Nenhum asset supera 1280 px; imagens funcionam como objetos/mosaicos, não fundos desktop full-bleed.
- Não há logo transparente.
- Não há cutouts, mapas de profundidade ou multiview dos personagens.
- Não há depoimentos reais.

O layout deve permanecer elegante mesmo com essas limitações e facilitar substituições futuras apenas por dados.

## Responsividade e acessibilidade

- Exatamente um `<h1>` no Hero.
- Títulos de seção permanecem `<h2>`.
- Skip link e `#main-content` permanecem.
- Header preserva trap de foco, Escape, scroll lock e restauração ao acionador.
- Canais indisponíveis não são renderizados como links falsos.
- Imagens informativas mantêm `alt` verdadeiro; ornamentos são ocultos.
- Foco visível e contraste mínimo AA em todos os estados.
- Movimento nunca é necessário para compreender a jornada.
- Nenhuma composição pode produzir overflow horizontal.

## Estratégia de implementação

1. Curar dados e tokens sem alterar a jornada.
2. Construir a infraestrutura de painéis e texto horizontal.
3. Redesenhar Hero e showcase carvão.
4. Redesenhar transformação com o par real.
5. Reapresentar categorias em bento preservando interação.
6. Integrar encerramento e canais.
7. Ajustar motion desktop/mobile/reduced.
8. Verificar automaticamente e em navegador real.

## Critérios de aceite

- A referência editorial é perceptível sem cópia literal.
- Painéis escuros são capítulos de tela cheia, não cortes estreitos.
- Pelo menos dois painéis usam sobreposição/pinning seletivo no desktop.
- Texto horizontal e bento são elementos principais da experiência.
- Produtos reais dominam a composição.
- Transformação usa um par coerente e não inventa estágio final.
- GSAP controla progressos ligados ao scroll com cleanup.
- Sem Three.js/WebGL nesta etapa.
- Mobile é uma composição própria, não desktop comprimido.
- Movimento reduzido entrega todo o conteúdo sem pinning.
- Links, mensagem comercial, menu e interações existentes continuam funcionando.
- Lint, testes, TypeScript, build e browser desktop/mobile/reduced passam.
