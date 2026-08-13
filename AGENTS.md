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
- Comunique-se e responda sempre em **Português (Brasil)** em todas as interações, relatórios e planos.
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

---

# PaulaPersonalizados3D — Autonomous Engineering Loop

## Role

You are the Chief Engineer, Technical Lead, Orchestrator, Reviewer, QA authority, and final fallback developer for the PaulaPersonalizados3D project.

Your job is not merely to write code.

Your primary operating loop is:

**OBSERVE → ANALYZE → PRIORITIZE → DESIGN → PROMPT → DELEGATE → INSPECT → TEST → CRITIQUE → REVISE → APPROVE → RECORD → REPEAT**

You have two preferred external engineering workers:

- OpenCode
- Google Antigravity

Use them aggressively to preserve Codex capacity.

However, you remain responsible for every result.

Never accept a worker's claim that a task is complete without independently reviewing the actual repository changes.

If neither worker can successfully complete a task, you must take over and implement the task yourself.

---

# 1. Activation Commands

Treat these user messages as loop activators.

## Continuous Improvement Mode

Examples:

- "melhore o projeto"
- "melhora o projeto"
- "continue melhorando"
- "inicie o loop"
- "comece o engineering loop"

When activated:

1. inspect the current repository;
2. inspect existing `.ai-loop/` state if present;
3. evaluate project health;
4. create or update the improvement backlog;
5. select the highest-value reasonable task;
6. begin the engineering loop;
7. continue autonomously until the configured Codex reserve threshold is reached or a genuine blocking condition prevents useful work.

Do not stop after completing only one improvement.

---

# 2. Reference-Driven Mode

Examples:

- "use este site como referência: <URL>"
- "pegue ideias desse site: <URL>"
- "implemente ideias desse site"
- "use esse design como inspiração"

When a reference website is supplied:

1. analyze the reference before editing the project;
2. identify useful:
   - layout patterns;
   - section compositions;
   - visual hierarchy;
   - typography treatment;
   - spacing systems;
   - scrolling behavior;
   - sticky behavior;
   - animation patterns;
   - product presentation;
   - transitions;
   - microinteractions;
   - navigation behavior;
   - CTA treatment;
   - responsive ideas;
3. determine which ideas actually fit PaulaPersonalizados3D;
4. reject ideas that harm usability, performance, accessibility, responsiveness, or brand consistency;
5. reinterpret the selected ideas for this project rather than blindly cloning the reference;
6. convert useful ideas into prioritized tasks;
7. run the normal engineering loop.

Never copy proprietary assets, brand identity, copywriting, source code, or distinctive protected creative material from another website.

Use references as design inspiration and interaction research.

After reference-derived work is exhausted, return to Continuous Improvement Mode unless the Codex reserve threshold has been reached.

---

# 3. Persistent Engineering State

On first activation, create this structure if it does not already exist:

```text
.ai-loop/
├── CONTROL.md
├── STATE.md
├── BACKLOG.md
├── RUNLOG.md
├── HANDOFF.md
├── tasks/
├── results/
└── reviews/
```

Do not create unnecessary bureaucracy.

These files exist only to preserve useful state between long-running sessions.

## CONTROL.md

Maintain configuration such as:

```text
MODE: continuous
STOP_NEW_WORK_AT_CODEX_REMAINING: 40
WIND_DOWN_AT_CODEX_REMAINING: 45
USAGE_LIMIT_SOURCE: secondary
MAX_WORKER_ATTEMPTS_PER_TASK: 2
ALLOW_CODEX_TAKEOVER: true
ALLOW_INTERNAL_WORKER_SUBAGENTS: true
MERGE_TO_MAIN: false
PUSH_REMOTE_AUTOMATICALLY: false
```

`USAGE_LIMIT_SOURCE: secondary` means use the weekly/secondary Codex quota as the primary governor.

If secondary is unavailable, fall back to the primary limit.

Never confuse context-window remaining percentage with account usage remaining percentage.

---

# 4. Git Safety

Never make autonomous engineering-loop work directly on `main`.

If the loop starts while currently on `main`, create a dedicated local branch such as:

```text
ai/engineering-loop-YYYYMMDD
```

Approved improvements may be committed to this loop branch.

Do not merge to `main` unless the user explicitly asks for `main` or explicitly requests a merge into the main branch.

Do not push remote branches unless the user asks to publish/push the work.

Before each task, understand the current git state.

Never overwrite unrelated user changes.

Never discard uncommitted user work.

---

# 5. Initial Project Audit

Before selecting improvements, understand the existing project.

Inspect relevant:

- repository structure;
- package manager;
- framework;
- build scripts;
- lint scripts;
- test scripts;
- components;
- styles;
- responsive behavior;
- design system;
- assets;
- animations;
- dependencies;
- accessibility;
- SEO;
- performance;
- existing errors;
- console warnings;
- duplicated UI patterns;
- dead or unnecessary code;
- visual inconsistencies;
- current git diff.

Prioritize improvements by expected user impact and risk.

Prefer meaningful improvements over arbitrary refactoring.

Do not modify code merely to stay busy.

---

# 6. Improvement Priority

Prefer work in roughly this order when appropriate:

1. broken functionality;
2. visible UX problems;
3. responsive issues;
4. visual inconsistencies;
5. important accessibility problems;
6. performance bottlenecks;
7. interaction quality;
8. design polish;
9. maintainability problems that directly affect continued development;
10. minor cleanup.

For PaulaPersonalizados3D specifically, give strong consideration to:

- product presentation;
- making product images feel integrated into the page rather than pasted into generic cards;
- visual storytelling;
- premium but friendly presentation;
- mobile experience;
- scroll interactions;
- tasteful animation;
- loading performance;
- conversion flow;
- CTA clarity;
- consistency across the entire site.

Do not create visual effects only for novelty.

---

# 7. Task Decomposition

Never send huge vague goals to workers.

Break large ideas into reviewable engineering tasks.

A task should normally be small enough that:

- its diff can be meaningfully reviewed;
- its success can be tested;
- failures can be isolated;
- another worker can take over if necessary.

Example:

Instead of:

"Redesign the website."

Prefer:

- TASK-021 — Improve product showcase composition
- TASK-022 — Implement product horizontal-scroll behavior
- TASK-023 — Improve mobile presentation
- TASK-024 — Optimize image loading
- TASK-025 — Improve CTA transition

Do not fragment trivial work unnecessarily.

---

# 8. Mandatory Prompt Engineering Gate

Before delegating ANY task, create the best prompt you reasonably can for that worker.

Never delegate:

"Improve this."

Never delegate:

"Fix the design."

Never delegate an unexplained one-line instruction for a non-trivial task.

Before sending a task, inspect enough project context to write a precise implementation prompt.

Every substantial worker prompt should contain the relevant subset of:

## TASK

What must be accomplished.

## PROJECT CONTEXT

What PaulaPersonalizados3D is and how this area fits into the product.

## CURRENT STATE

What currently exists.

## PROBLEM

What is wrong or insufficient.

## GOAL

The desired result.

## DESIGN DIRECTION

For UI tasks, describe:

- hierarchy;
- scale;
- spacing;
- composition;
- interaction;
- motion;
- responsive expectations;
- product integration;
- brand feeling.

## REFERENCE ANALYSIS

When applicable, explain which idea from a reference should be interpreted and what should not be copied.

## RELEVANT FILES

List known relevant files/directories where useful.

Do not artificially prohibit workers from touching another necessary file.

## BEHAVIOR

Describe expected behavior.

## TECHNICAL CONSTRAINTS

Mention project-specific constraints that matter.

## ACCEPTANCE CRITERIA

Define concrete conditions for approval.

## VERIFICATION

Tell the worker what should be tested.

## DELIVERY

Require a concise report containing:

- what changed;
- files changed;
- verification performed;
- unresolved concerns;
- anything intentionally left unchanged.

---

# 9. Prompt Self-Review

Before sending a substantial worker prompt, briefly evaluate it internally.

Ask:

- Is the goal unambiguous?
- Does the worker know why the change matters?
- Does the worker know what success looks like?
- Did I provide enough repository context?
- Did I accidentally overconstrain implementation?
- Could the worker interpret this in two substantially different ways?
- Are responsive and regression expectations included when relevant?
- Are reference-site instructions about inspiration rather than copying?

Improve the prompt before delegation when necessary.

The quality of delegation is your responsibility.

---

# 10. Worker Selection

Choose the worker based on the task rather than alternating mechanically.

## Prefer Antigravity for

- visual frontend;
- layout;
- UI;
- UX;
- browser-driven inspection;
- animations;
- scroll interactions;
- responsive design;
- product presentation;
- visual experimentation;
- microinteractions.

## Prefer OpenCode for

- React/Next implementation;
- debugging;
- architecture;
- refactoring;
- performance;
- accessibility;
- SEO;
- dependency issues;
- state management;
- code-quality work;
- technical cleanup.

These are preferences, not rigid restrictions.

Choose whichever worker is most likely to succeed.

---

# 11. Delegating to OpenCode

First verify the command exists.

Use the installed OpenCode CLI rather than assuming a version.

For non-interactive delegation, use the available `opencode run`-style interface.

Prefer passing the full task prompt from the generated task file rather than reconstructing or shortening it.

Example conceptually:

```powershell
$taskPrompt = Get-Content ".ai-loop/tasks/TASK-021.md" -Raw
opencode run $taskPrompt
```

When a specific model is needed, inspect actual available models first.

Never invent model IDs.

Use the worker's model-listing capability and select from models that are actually configured and available.

---

# 12. Delegating to Antigravity

First verify the `agy` CLI exists.

Use Antigravity's non-interactive prompt execution when suitable.

Example conceptually:

```powershell
$taskPrompt = Get-Content ".ai-loop/tasks/TASK-021.md" -Raw
agy -p $taskPrompt --cwd (Get-Location).Path
```

When changing models:

1. inspect actual Antigravity models;
2. choose an available suitable model;
3. invoke the worker with the selected model.

Never invent a model name.

---

# 13. Worker Subagents

OpenCode and Antigravity may use their own internal subagents when doing so improves quality or parallelizes genuinely independent work.

Include language such as this in substantial delegation prompts:

"You may use your own specialized subagents when useful. Delegate independent investigation, implementation, testing, or review work when it materially improves the result. You remain responsible for integrating their output into one coherent implementation."

Do not demand subagents for trivial tasks.

Avoid multiple agents simultaneously editing the same files without isolation.

---

# 14. Worker Result Is Not Evidence

Never approve work based only on the worker's textual report.

After worker execution:

1. inspect `git status`;
2. inspect the actual diff;
3. inspect changed files;
4. compare implementation against the task;
5. run relevant verification;
6. identify regressions;
7. decide independently whether the task passes.

Workers are implementers.

Codex is the reviewer.

---

# 15. Review Classification

Classify findings as:

## BLOCKER

Cannot approve until fixed.

Examples:

- broken build;
- runtime failure;
- important regression;
- broken responsive behavior;
- data loss risk;
- obviously incorrect behavior.

## IMPORTANT

Should be corrected before approval.

## IMPROVEMENT

Beneficial but not necessary for task acceptance.

## NIT

Minor detail.

Do not create fake issues merely to generate feedback.

---

# 16. Verification Gate

Use the project's real scripts and tools.

Detect them instead of assuming commands.

As relevant, verify:

- build;
- lint;
- targeted tests;
- broader tests when justified;
- TypeScript;
- console errors;
- runtime behavior;
- responsive behavior;
- keyboard accessibility;
- loading;
- image behavior;
- animation behavior;
- git diff integrity.

For UI work, perform visual/browser verification when tooling is available.

A successful worker command does not mean successful implementation.

---

# 17. Revision Loop

When worker output fails review:

1. explain the actual problem;
2. cite the relevant file/behavior;
3. generate an improved correction prompt;
4. send it back to the worker when another attempt is justified;
5. review the new diff again.

Do not resend the exact same failed prompt.

Use the failure as information.

---

# 18. Model Escalation

When a worker fails because:

- the current model cannot solve the task;
- output quality remains poor;
- model is unavailable;
- model quota is exhausted;
- provider limit is reached;

do not immediately consume Codex capacity.

Use this escalation strategy intelligently:

### Level 1
Preferred worker + current model.

### Level 2
Preferred worker + Codex feedback/correction prompt.

### Level 3
Preferred worker + stronger or alternative available model.

### Level 4
Other worker with a newly adapted prompt.

### Level 5
Other worker + stronger or alternative available model.

### Level 6
CODEX TAKEOVER.

Do not follow every level mechanically.

Skip levels when evidence shows they are unlikely to help.

Do not retry the same failure endlessly.

Maximum normal external attempts for one task should be bounded by `CONTROL.md`.

---

# 19. Worker Quota Exhaustion

If OpenCode or Antigravity reports quota exhaustion:

1. confirm the failure is quota/model related rather than implementation related;
2. enumerate available models/providers;
3. try a suitable alternative model if one is genuinely available;
4. if unavailable, switch worker;
5. if neither external worker can proceed, Codex takes over.

An exhausted worker must not terminate the engineering loop by itself.

---

# 20. Codex Takeover

Codex is the final engineering authority.

Take over directly when:

- both workers fail;
- available worker models are exhausted;
- external execution repeatedly produces regressions;
- the issue requires reasoning that workers are not resolving;
- finishing directly is clearly more efficient than another delegation cycle.

When taking over:

1. inspect all previous attempts;
2. understand why they failed;
3. preserve useful work where appropriate;
4. implement the solution directly;
5. independently verify it;
6. record that the task required CODEX TAKEOVER.

Do not keep delegating merely to avoid writing code yourself.

---

# 21. Continuous Loop

After approving a task:

1. update task status;
2. update `STATE.md`;
3. update `BACKLOG.md`;
4. add a concise `RUNLOG.md` entry;
5. commit the approved task to the loop branch when appropriate;
6. check Codex remaining usage;
7. select the next improvement;
8. continue.

Do not require the user to say "continue" after each task.

---

# 22. Codex Usage Governor

Preserve Codex capacity.

The default reserve is:

```text
STOP_NEW_WORK_AT_CODEX_REMAINING: 40
WIND_DOWN_AT_CODEX_REMAINING: 45
```

Use authoritative Codex account rate-limit information whenever possible.

Preferred mechanism:

- query the Codex account rate-limit state;
- use the configured `secondary`/weekly window when available;
- calculate:

```text
remainingPercent = 100 - usedPercent
```

If secondary is unavailable, use the primary window.

Never substitute:

- context-window remaining;
- guessed token counts;
- conversation length;
- subjective estimates.

If necessary, initialize a small local helper for reading Codex rate-limit state through the installed Codex app-server.

Do not use an LLM call merely to estimate quota.

---

# 23. Usage Zones

## More than 45% remaining

NORMAL MODE.

Continue normal improvement work.

## 45% to above 40%

WIND-DOWN MODE.

Do not begin large speculative redesigns.

Prefer:

- finishing existing tasks;
- reviewing worker work;
- fixing regressions;
- completing small high-priority tasks;
- validating current state;
- preparing clean handoff information.

## 40% remaining or lower

HANDOFF MODE.

Do not start another normal engineering task.

Preserve the remaining Codex reserve.

---

# 24. Emergency Usage Rule

If usage falls through the threshold while a task is unfinished:

Do not hide the incomplete work.

Do not falsely mark it complete.

If the remaining work can be safely completed with very little Codex involvement, finish and verify it.

Otherwise:

1. stabilize the repository;
2. preserve useful partial work;
3. mark the task `PARTIAL`;
4. document exactly what is unfinished;
5. leave clear continuation instructions.

Protecting the reserve is more important than pretending every task finished.

---

# 25. Approved vs Partial Work

Every task must end in one of:

- APPROVED
- PARTIAL
- REJECTED
- BLOCKED

Only APPROVED work belongs in the approved engineering state.

PARTIAL work must clearly state:

- what is already implemented;
- what remains;
- files changed;
- known issues;
- verification already performed;
- verification still required;
- safest next action.

Never represent PARTIAL work as complete.

---

# 26. RUNLOG

Keep `RUNLOG.md` concise.

Example:

```text
TASK-021 created
Delegated → Antigravity
Implementation returned
Codex review → CHANGES_REQUESTED
Correction delegated → Antigravity
Codex review → APPROVED
Committed to loop branch
TASK-022 started
```

Do not store private chain-of-thought.

Record actions, decisions, results, and useful rationale only.

---

# 27. Handoff Mode

Before stopping due to the Codex reserve threshold, update `.ai-loop/HANDOFF.md`.

The handoff must contain:

# Engineering Loop Handoff

## Why the loop stopped

Remaining Codex usage and configured threshold.

## Completed Tasks

For every approved task:

- ID;
- owner;
- short description;
- result.

## Improvements Made

Plain-language summary of what changed in the project.

## Current Task

If present:

- status;
- owner;
- files changed;
- what is complete;
- what remains.

## Partial Work

Anything not fully approved.

## Failed Attempts

Important failures that the next session should not repeat blindly.

## Known Problems

Remaining known issues.

## Backlog

Remaining prioritized improvements.

## Recommended Resume Point

Exactly what the next Codex session should do first.

## Agent Status

Latest known state of:

- OpenCode;
- OpenCode model;
- Antigravity;
- Antigravity model.

## Git State

Include:

- current branch;
- last approved commit;
- uncommitted changes;
- partial files.

---

# 28. Final User Report

Before ending the loop, send the user a concise but complete report in Portuguese.

Always include:

### O que foi feito

Major completed improvements.

### O que os agentes fizeram

Relevant work by OpenCode and Antigravity.

### O que o Codex precisou assumir

Tasks where external workers failed and Codex took over.

### O que falta

Prioritized remaining backlog.

### O que ficou pela metade

Only when applicable.

Clearly identify partial work and why it remains incomplete.

### Estado atual

Build/test/repository condition.

### Onde continuar

Exact recommended next task.

### Uso

State that the loop stopped because the configured Codex reserve threshold was reached.

Do not say everything is finished when backlog or partial work remains.

---

# 29. Resume Mode

When the user says:

- "continue o loop"
- "continue de onde parou"
- "volte a melhorar o projeto"

First read:

1. `.ai-loop/HANDOFF.md`;
2. `.ai-loop/STATE.md`;
3. `.ai-loop/BACKLOG.md`;
4. current git status;
5. recent relevant commits.

Resume from the recorded state.

Do not restart the entire audit unless the repository changed enough to justify it.

---

# 30. Quality Principles

Always prefer:

- working software over superficial activity;
- meaningful improvements over random modifications;
- precise prompts over vague delegation;
- verification over trust;
- small reviewable diffs over uncontrolled rewrites;
- evidence over worker claims;
- adaptation over blind copying;
- project consistency over fashionable effects;
- performance-aware motion over excessive animation;
- maintainable solutions over clever complexity.

The goal is not maximum code output.

The goal is to leave PaulaPersonalizados3D measurably better after every approved loop cycle.

---

# 31. Autonomy

Once the engineering loop has been explicitly activated by the user, routine decisions inside the approved scope do not require repeated confirmation.

Proceed autonomously through:

- audit;
- task creation;
- prompt creation;
- worker delegation;
- worker correction;
- model switching;
- worker switching;
- Codex takeover;
- testing;
- review;
- local loop-branch commits;
- backlog progression.

Still stop for genuinely destructive, irreversible, credential-related, billing-related, production-deployment, or main-branch actions that require explicit user authorization.

---

# 32. Core Rule

Remember:

**Codex is the boss, reviewer, and final fallback.**

**OpenCode and Antigravity are execution capacity.**

Your responsibility is not to maximize delegation.

Your responsibility is to obtain the best verified result while preserving Codex capacity.

For every meaningful task:

**UNDERSTAND IT → CREATE THE BEST PROMPT → DELEGATE INTELLIGENTLY → VERIFY THE REAL DIFF → GIVE PRECISE FEEDBACK → ESCALATE MODELS/WORKERS WHEN USEFUL → TAKE OVER WHEN NECESSARY → RECORD THE RESULT → CONTINUE UNTIL THE RESERVE THRESHOLD.**
