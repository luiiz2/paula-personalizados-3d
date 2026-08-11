# AGENTS.md

## Escopo e precedência

Estas instruções valem para todo o repositório Paula Personalizados 3D.

- Siga primeiro o pedido explícito do usuário e as instruções do ambiente.
- Um `AGENTS.md` mais próximo do arquivo alterado pode acrescentar regras específicas.
- Use este arquivo, o `README.md`, a documentação aprovada e os padrões existentes como fontes do projeto.
- Antes de editar, leia os arquivos relevantes e confirme a estrutura e as versões reais.
- Não copie o `README.md` para cá; consulte-o para procedimentos detalhados.

## Projeto e stack

Esta é uma landing page comercial estática construída com:

- React 19 e TypeScript;
- Vite 8;
- Tailwind CSS 4;
- GSAP e `@gsap/react` para animações;
- Oxlint;
- Vitest, Testing Library e jsdom;
- Node.js ^22.22.2, ^24.15.0 ou >=26.0.0 e npm 10 ou superior.

Use npm. Não troque o gerenciador, a stack ou uma biblioteca sem necessidade comprovada e autorização compatível com o pedido.

## Modo de trabalho

- Faça a menor mudança correta que atenda ao pedido.
- Preserve comportamento, conteúdo e trabalho existente fora do escopo.
- Reutilize componentes, dados, tipos, estilos e dependências existentes.
- Não refatore, renomeie, reorganize ou migre código sem necessidade direta.
- Mantenha tipagem forte; evite `any`, assertions desnecessárias e supressões amplas.
- Em bugs reproduzíveis, identifique a causa e adicione teste de regressão quando viável.
- Não silencie erros, desative verificações ou ajuste testes para aceitar comportamento incorreto.
- Remova logs, mocks e código temporário antes de concluir.

## Segurança da worktree

- Comece por `git status --short --branch` e inspecione o diff dos arquivos que serão tocados.
- Considere toda alteração preexistente como trabalho intencional do usuário.
- Não use reset, checkout, clean, restore ou reversão sobre mudanças que você não criou.
- Não faça staging amplo com `git add .` ou equivalente; adicione somente caminhos revisados.
- Não reescreva histórico ou force push sem pedido explícito.
- Migrações de assets devem incluir adições, remoções e referências de forma atômica.
- Nunca grave tokens, credenciais ou segredos no repositório ou em código entregue ao navegador.
- Variáveis Vite expostas ao cliente também não podem conter segredos.

## Fontes de verdade

- Links globais: `src/data/links.ts`.
- Produtos e destinos específicos: `src/data/products.ts`.
- Conteúdo comercial ativo, incluindo categorias: `src/data/commercial.ts`.
- Galeria legada, proporções e textos alternativos fora da jornada comercial atual: `src/data/gallery.ts`.
- Ordem das seções: `src/App.tsx`.
- Seções: `src/sections/`.
- Componentes reutilizáveis: `src/components/`.
- Estilos e tokens globais: `src/index.css`.
- Assets públicos: `public/assets/`.
- Scripts e dependências: `package.json` e `package-lock.json`.
- Decisões e planos aprovados: `docs/superpowers/`, quando estiverem no escopo do pedido atual.

Não duplique dados centralizados dentro dos componentes.

## Links comerciais

- Nunca invente URL, domínio, telefone, perfil ou informação comercial.
- Edite os quatro canais globais somente em `src/data/links.ts`: WhatsApp, Instagram, Shopee e Mercado Livre.
- Canal indisponível usa string vazia e não deve renderizar botão ou link falso.
- Nunca publique `href="#"` como placeholder.
- Prefira o componente `ExternalLink` para destinos externos.
- Preserve `target="_blank"` e `rel="noopener noreferrer"` em novas abas.
- Não combine `ExternalLink` com `window.open()`, pois isso pode abrir duas abas.
- Mensagens e destinos comerciais devem permanecer gerais quando o conteúdo não for específico de um produto.

## Imagens e assets

- Toda URL `/assets/...` deve apontar para um arquivo real em `public/assets/`.
- Não use a pasta `assets/` da raiz para arquivos públicos.
- Não edite `dist/`; o build recria essa pasta.
- Use nomes de arquivos simples, minúsculos, sem espaços e descritivos.
- Imagens informativas precisam de `alt` verdadeiro e específico.
- Imagens decorativas devem ficar fora da árvore acessível.
- Não invente produto, material, acabamento ou resultado ao criar ou retocar imagens.
- Priorize carregamento eager somente para mídia crítica do Hero; abaixo da dobra, prefira lazy loading.
- A falha de uma imagem não pode remover texto essencial ou tornar a página inoperante.

## Interface, acessibilidade e movimento

- Preserve exatamente um `<h1>`, localizado no Hero; seções seguintes usam `<h2>`.
- Preserve o link “Ir para o conteúdo principal” e o destino `#main-content`.
- Use HTML semântico, foco visível e nomes acessíveis para controles somente com ícone.
- Ícones e ornamentos decorativos usam `aria-hidden` quando apropriado.
- O menu móvel deve prender o foco, fechar com `Esc`, devolver o foco ao acionador e liberar o scroll.
- Interações essenciais devem funcionar por teclado, toque e clique, não apenas por hover.
- Navegação interna usa âncoras reais.
- Animações devem respeitar `prefers-reduced-motion`.
- Com movimento reduzido, remova parallax, smooth scroll, loops e transições longas sem ocultar conteúdo.
- Use GSAP/ScrollTrigger para sequências e scroll; CSS para efeitos decorativos; React para estado interativo.
- Não adicione outra biblioteca que duplique GSAP ou CSS sem necessidade comprovada.
- Conteúdo deve nascer visível; JavaScript apenas aprimora a apresentação.
- Efeitos de cursor só devem atuar em dispositivos com ponteiro preciso.
- Faça cleanup de timelines, listeners, observers e `requestAnimationFrame`.
- Animação nunca deve bloquear scroll, foco, toque ou clique.

## Validação

No Windows, prefira:

```powershell
.\project.cmd check
```

Alternativamente, execute separadamente:

```bash
npm run lint
npm test
npm run build
```

O build já executa a verificação TypeScript. Para mudanças visuais, valide também desktop, mobile, teclado, movimento reduzido, overflow horizontal, console, imagens e os quatro canais comerciais aplicáveis.

Não declare que algo está pronto sem executar e registrar as verificações relevantes. Se uma falha já existia, diferencie-a de regressões introduzidas pela mudança.

## Definição de pronto

- O comportamento solicitado funciona em desktop e mobile.
- Não há erros novos no console, imagens quebradas ou overflow horizontal.
- Navegação por teclado, foco e menu móvel continuam funcionais.
- Movimento reduzido preserva conteúdo e interações.
- Links reais e canais indisponíveis foram tratados corretamente.
- Lint, testes e build passam, ou limitações externas estão claramente relatadas.
- O diff contém somente mudanças intencionais e foi revisado.
- A documentação foi atualizada quando comandos, estrutura ou fontes de verdade mudaram.

## Code Review Rules

- Sinalize URLs fictícias, placeholders ou links comerciais hardcoded fora da camada de dados. Caminho seguro: usar URL fornecida pelo responsável ou string vazia.
- Sinalize `/assets/...` sem arquivo correspondente em `public/assets/`. Caminho seguro: adicionar ou mover o asset e validar teste e build.
- Sinalize regressões de teclado, foco, semântica, texto alternativo ou movimento reduzido. Caminho seguro: preservar o contrato acessível e adicionar teste.
- Sinalize edição manual de `dist/`, staging amplo ou reversão de mudanças alheias. Caminho seguro: alterar fontes e usar staging seletivo.
- Sinalize bugfix reproduzível sem teste quando um teste de regressão for viável.
- Priorize achados por impacto e cite arquivo e linha; deixe formatação e lint mecânico para o CI.

## Relato final

Ao concluir, informe de forma concisa:

- o que mudou;
- o que foi validado;
- qualquer limitação, risco ou pendência real.
