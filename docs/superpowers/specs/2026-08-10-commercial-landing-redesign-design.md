# Redesign comercial da landing page — Paula Personalizados 3D

**Data:** 10 de agosto de 2026
**Status:** aprovado para planejamento
**Escopo:** substituir a landing page atual por uma experiência comercial curta, moderna e orientada à conversão.

## Objetivo

Transformar o site em uma página comercial contínua que apresente o valor afetivo dos personalizados, explique rapidamente o processo e conduza o visitante a um dos quatro canais reais de atendimento ou compra: WhatsApp, Instagram, Shopee e Mercado Livre.

O resultado deve preservar o caráter delicado e artesanal da marca, mas ganhar hierarquia editorial, movimento contemporâneo e uma jornada mais direta. A página não terá blocos escuros separando seções nem imagens encaixotadas em molduras brancas. Fundo, imagens, texto e elementos decorativos devem formar uma única composição visual.

## Decisões aprovadas

- Substituir, e não apenas revestir, a estrutura longa atual.
- Usar a direção visual “Comercial editorial”, com mais movimento e acabamento contemporâneo.
- Manter creme, rosa e tons quentes como base; preto é reservado à tipografia e a pequenos controles, nunca a grandes cortes de página.
- Integrar imagens ao fundo por recortes, máscaras, transparências e transições de cor, sem bordas visíveis.
- Usar fotos reais como prova do trabalho e criar ou tratar imagens promocionais quando isso melhorar a integração visual.
- Manter WhatsApp, Instagram, Shopee e Mercado Livre como quatro opções igualmente identificáveis.
- Usar uma mensagem geral no WhatsApp, sem vincular o contato a uma categoria específica.
- Aplicar movimento expressivo, porém adaptativo e seguro para acessibilidade e desempenho.

## Direção visual

### Linguagem

A interface combina três influências:

1. A delicadeza comercial do rascunho original: creme, rosa, formas orgânicas e mensagem afetiva.
2. A presença editorial das referências modernas: títulos condensados grandes, serifas expressivas, ritmo tipográfico e bastante espaço negativo.
3. A fluidez de sites de estúdio: elementos que atravessam seções, imagens em profundidade, marquee lento e transições ligadas ao scroll.

O layout deve parecer uma única superfície. Mudanças de assunto são marcadas por espaço, escala tipográfica, gradientes e sobreposição; não por faixas de fundo abruptas.

### Tipografia e cor

- Títulos principais: sans serif condensada, pesada e em caixa alta.
- Palavras afetivas, especialmente “memórias”: serifada editorial em itálico.
- Textos e controles: sans serif de alta legibilidade.
- Paleta principal: creme quente, rosa suave, rosa profundo, preto suave e pequenos acentos dourados.
- Gradient shimmer: restrito a palavras-chave e chamadas especiais; nunca aplicado a parágrafos inteiros.

### Tratamento de imagens

- O hero e o encerramento usam composições promocionais em alta resolução preparadas para se misturar ao fundo.
- Fotos reais aparecem na transformação e nas categorias para provar a autenticidade do trabalho.
- Nenhuma imagem principal recebe contorno branco visível.
- Recortes devem usar máscaras suaves, fundos removidos, gradientes de dissolução ou formas orgânicas.
- O layout deve aceitar troca posterior das fotos sem exigir reconstrução dos componentes; enquadramento e posição serão configuráveis por item.
- Imagens geradas ou retocadas não podem inventar características comerciais, materiais ou resultados que a Paula não ofereça.

### Material fotográfico recomendado para a troca final

- Uma foto forte de produto para o hero, em alta resolução e sem texto sobreposto.
- Dois ou três pares de referência original e peça 3D pronta.
- Uma foto representativa de cada uma das quatro categorias.
- Uma foto de embalagem ou presente para o encerramento.
- Logo em PNG com fundo transparente.

## Estrutura da página

### 1. Cabeçalho

Cabeçalho compacto e levemente translúcido, com logo, âncoras para “Como funciona”, “Categorias” e “Sobre”, além do CTA “Criar personalizado”. No celular, o menu continua acessível por teclado, fecha com `Esc` e devolve o foco ao acionador.

### 2. Hero

Headline:

> PERSONALIZADOS
> 3D QUE VIRAM
> MEMÓRIAS.

Texto de apoio: “Transformamos fotos, desenhos e ideias em peças únicas, feitas para guardar o que realmente importa.”

O CTA principal abre o WhatsApp. O CTA secundário leva a “Como funciona”. À direita, uma composição promocional sem moldura reúne produtos em diferentes profundidades. Os elementos flutuam em velocidades ligeiramente diferentes e respondem suavemente ao cursor.

### 3. Marquee de diferenciais

Faixa contínua e lenta com:

> Feito à mão ✦ 100% personalizado ✦ Envio para todo Brasil ✦ Produção artesanal ✦

O conteúdo se repete sem salto perceptível e pausa ou simplifica quando necessário para acessibilidade.

### 4. Da referência para o 3D

Seção que demonstra “FOTO/DESENHO → TRANSFORMAÇÃO → PEÇA 3D”. A referência entra pela esquerda, o resultado entra pela direita e a seta indica o encontro dos dois elementos conforme o scroll avança.

O produto final pode ter uma rotação 3D pequena no hover em dispositivos com ponteiro preciso. Em toque, o conteúdo permanece estável e completamente legível.

### 5. Categorias em coverflow

Quatro categorias:

- Miniaturas da sua foto.
- Do desenho para a vida em 3D.
- Bonecos personalizados.
- Lembranças especiais.

O item central ganha escala e nitidez; itens laterais mantêm contexto e indicam continuidade. O coverflow aceita arraste, gesto de toque, setas do teclado e controles visíveis.

Na categoria “Do desenho para a vida em 3D”, o hover desloca a referência infantil e revela a peça pronta. Em telas de toque, a comparação deve ser acionável por controle explícito ou apresentada lado a lado.

### 6. Canais comerciais

Quatro botões claramente distinguíveis:

- WhatsApp.
- Instagram.
- Shopee.
- Mercado Livre.

No hover, o botão sobe e cresce levemente, o fundo muda suavemente, o ícone se movimenta e a seta desliza para a direita. Os links vêm exclusivamente de `src/data/links.ts`.

### 7. Encerramento

Headline:

> Muito mais que presentes, criamos memórias.

As palavras aparecem progressivamente durante o scroll. Uma imagem promocional ou de embalagem se mistura ao fundo e recebe parallax discreto.

### 8. Rodapé

Rodapé enxuto, no mesmo fluxo cromático do restante da página, com identificação da marca, acesso aos canais e informações essenciais. Não haverá uma faixa preta ou outra quebra visual abrupta.

## Conversão e dados

O WhatsApp usa a mensagem geral:

> Olá! Conheci a Paula Personalizados 3D pelo site e gostaria de criar um personalizado. Pode me ajudar?

A mensagem será codificada corretamente na URL. Instagram, Shopee e Mercado Livre usam os endereços reais já centralizados. Links indisponíveis não geram controles vazios ou `href="#"`.

Conteúdo repetido — canais, categorias, imagens, textos alternativos e posição de enquadramento — deve permanecer em módulos de dados, não dentro da marcação dos componentes.

Não haverá API, login, carrinho, checkout próprio ou persistência neste ciclo. A conversão ocorre nos canais externos.

## Componentes e responsabilidades

- `Header`: navegação, menu móvel e CTA persistente.
- `Hero`: headline, CTAs, composição promocional e parallax do cursor.
- `TrustMarquee`: diferenciais em repetição contínua.
- `TransformationStory`: sequência referência, transformação e resultado.
- `CategoryCoverflow`: navegação, seleção e comparação especial desenho/peça.
- `ChannelGrid`: quatro destinos externos e microinterações.
- `MemoryClosing`: headline progressiva e imagem final.
- `Footer`: identificação e atalhos essenciais.
- Componentes compartilhados de imagem e link continuam responsáveis por carregamento, texto alternativo, segurança e fallback.

Cada unidade deve expor uma interface pequena e depender de dados centralizados. A animação de uma seção não pode conhecer nem controlar os detalhes internos de outra.

## Sistema de movimento

### Tecnologias

- GSAP e ScrollTrigger para sequências de entrada e animações ligadas ao scroll.
- CSS para shimmer, marquee, hovers e microinterações.
- React para estado e interação do coverflow.
- Um controlador leve baseado em `requestAnimationFrame` para parallax do ponteiro.
- Lenis apenas em dispositivos com ponteiro preciso e quando `prefers-reduced-motion` não estiver ativo. Dispositivos de toque usam scroll nativo.
- Framer Motion não será adicionado, pois duplicaria responsabilidades já cobertas por GSAP e CSS.

### Comportamentos

- Hero: reveal em três tempos, flutuação independente e parallax suave.
- Marquee: movimento contínuo lento.
- Transformação: referência e produto convergem conforme o scroll.
- Categorias: coverflow, escala, deslocamento e sombra progressiva.
- Seções: títulos sobem e revelam; imagens aparecem por máscara; itens entram em sequência.
- Encerramento: palavras surgem progressivamente e a imagem responde ao scroll.
- Botões: escala pequena, mudança de fundo, movimento de ícone e seta.

### Restrições

- Conteúdo nasce visível; JavaScript aprimora a experiência, mas não é necessário para ler ou navegar.
- `prefers-reduced-motion` remove parallax, smooth scroll, flutuação e transições longas.
- Animações ligadas ao cursor só existem com ponteiro preciso.
- Observadores, timelines e listeners são destruídos ao desmontar componentes ou recalcular layout.
- Efeitos não podem bloquear scroll, foco, toque nem cliques.

## Responsividade e acessibilidade

- Desktop recebe a composição em profundidade e o parallax completo.
- Tablet reduz deslocamentos e sobreposições.
- Mobile mantém a hierarquia, usa scroll nativo e reduz efeitos custosos.
- Coverflow possui controles com nomes acessíveis, navegação por teclado e área de toque adequada.
- Links externos usam nova aba com `noopener noreferrer`.
- Apenas um `h1`; seções subsequentes usam `h2`.
- Imagens informativas têm `alt` verdadeiro; imagens decorativas são ignoradas por tecnologia assistiva.
- Contraste, foco visível, skip link e comportamento do menu atual são preservados.

## Falhas e degradação segura

- Se uma imagem falhar, o componente exibe um fallback cromático coerente e preserva o texto associado.
- Se uma imagem promocional ainda não estiver disponível, a composição usa uma foto real configurada sem quebrar o layout.
- Se a inicialização de GSAP, Lenis ou parallax falhar, o conteúdo continua estático e utilizável.
- Links vazios não são renderizados.
- Recalcular a página após resize não cria timelines, listeners ou efeitos duplicados.
- Erros de carregamento não produzem grandes áreas pretas, molduras vazias ou saltos de layout.

## Verificação

### Testes automatizados

- Segurança e destinos dos links externos.
- Mensagem geral e codificação do link do WhatsApp.
- Existência das imagens referenciadas.
- Navegação do coverflow por teclado e controles.
- Comparação desenho/peça em hover e alternativa de toque.
- Menu móvel, fechamento por `Esc` e devolução de foco.
- Renderização utilizável com movimento reduzido.

### Verificação manual

- Desktop e celular em larguras representativas.
- Parallax, shimmer, marquee, coverflow e transformação no scroll.
- Toque, arraste, teclado e foco visível.
- Ausência de cortes pretos, bordas brancas indesejadas e imagens visualmente separadas do fundo.
- Todos os quatro canais e a mensagem do WhatsApp.
- Console sem erros e nenhuma imagem quebrada.

### Portões técnicos

- `npm run lint`.
- `npm test`.
- `npm run build`.

## Fora do escopo

- Checkout ou carrinho dentro do site.
- Área de cliente, login ou acompanhamento de pedido.
- CMS ou painel administrativo.
- Analytics, pixels ou consentimento de cookies.
- Domínio definitivo, canonical, sitemap e configuração final de SEO.
- Produção das fotografias finais; a estrutura permitirá substituí-las depois.

## Critérios de sucesso

- A página comunica o serviço e apresenta um CTA principal no primeiro viewport.
- O visitante encontra os quatro canais comerciais sem ambiguidade.
- A mensagem do WhatsApp é geral e funciona corretamente.
- Imagens parecem integradas à página, sem molduras ou cortes visuais bruscos.
- O movimento adiciona profundidade sem prejudicar leitura, desempenho, toque ou acessibilidade.
- Desktop e mobile preservam conteúdo, hierarquia e capacidade de conversão.
- Lint, testes e build passam antes da entrega.
