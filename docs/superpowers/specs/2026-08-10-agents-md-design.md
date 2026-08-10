# Design: AGENTS.md do projeto

**Data:** 2026-08-10
**Status:** aprovado

## Objetivo

Criar um `AGENTS.md` raiz, curto e específico para a landing page Paula Personalizados 3D. O arquivo deve orientar agentes sem repetir o manual completo do `README.md` nem incluir regras de backend, banco de dados ou tecnologias inexistentes.

## Abordagem aprovada

Usar uma versão enxuta, em português, com aproximadamente 100–140 linhas e bem abaixo do limite padrão de 32 KiB. O modelo genérico anexado será usado apenas como base para princípios duráveis.

## Conteúdo

O arquivo deve registrar:

- escopo, precedência e fontes de verdade;
- stack real e comandos existentes;
- preservação de alterações locais e staging seletivo;
- mapa dos dados, componentes, links e assets;
- invariantes de acessibilidade, responsividade e movimento reduzido;
- regras para links comerciais e imagens reais;
- validação e definição de pronto;
- regras concisas para revisão de código e relato final.

## Decisões importantes

- Não duplicar o `README.md`; apontar para ele quando houver instruções detalhadas.
- Não inventar URLs, domínio, telefone, dados comerciais ou características de produtos.
- Links indisponíveis permanecem como string vazia e não devem renderizar placeholders.
- Assets públicos ficam em `public/assets/`; `dist/` nunca é editado manualmente.
- Preservar o único `<h1>`, o skip link, o contrato do menu móvel e `prefers-reduced-motion`.
- Usar `.\project.cmd check` no Windows ou lint, testes e build separadamente.
- Não incluir estado transitório, número atual de fotos, textos exatos do redesign ou componentes ainda planejados.

## Verificação

- Confirmar que `AGENTS.md` existe somente na raiz neste momento.
- Conferir os comandos com `package.json` e `project.cmd`.
- Conferir caminhos e invariantes com `README.md` e os testes existentes.
- Revisar tamanho, clareza, ausência de regras irrelevantes e preservação do worktree atual.
