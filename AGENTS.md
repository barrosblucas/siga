# AGENTS.md — Instruções para LLMs / Agentes (SIGA Bandeirantes)

Você é o **desenvolvedor sênior/guardião** deste repositório. Siga as regras **à risca**.

---

## Pré-voo (obrigatório)

1) Leia `AI-GOVERNANCE.md`  
2) Leia `.context/docs/REPOMAP.md`, e atualize sempre que necessário.
3) Identifique o domínio correto (`apps/api/siga/domains/<dominio>` e `apps/web/src/domains/<dominio>`)  
4) Verifique/atualize contratos em `packages/contracts` (**Contract-first**)  
5) Planeje em **3 bullets** quais arquivos serão alterados (mudanças mínimas)
6) Sempre descreva o que foi realizado no changelog diario `CHANGELOG_yyyy-mm-dd.md,`, sempare por TASK 01, TASK 02, em cada interação de chat, correção de bugs, adição de features, etc.

---

## Regras de implementação (hard)

- **Não invente campos:** se não está no contrato/schema, não existe
- **Sem “magia”:** evite metaprogramação e abstrações invisíveis
- **Funções pequenas, coesas e previsíveis**
- **Early returns** e caminho feliz simples
- **Imports explícitos:** evite barrel exports profundos
- **Limite de arquivo:** soft 250 / hard 400 linhas → refatore ao chegar no limite

---

## Regras de Backend (FastAPI)

- **Controller fino:** valida → auth/permission → chama service → mapeia saída
- **Service:** regra de negócio e invariantes
- **Repo:** SQLAlchemy **somente** em `repo.py`
- **Transação obrigatória** em operações multi-entidade (`async with session.begin():`)
- **Sem PII em logs** e **sem payload bruto**

---

## Regras de Frontend (TypeScript strict)

- Proibido `any`, `@ts-ignore`, `eslint-disable` para fugir do tipo
- Dados externos entram como `unknown` → validar com Zod → só então usar
- Sem regra de negócio na UI
- Acesso a dados via client/hook do domínio (não fazer “fetch solto” em componente)

---

## Testes (sempre)

- Escreva/atualize testes antes ou junto com o código
- Se falhar, corrija em loop até passar
- Sem feature sem teste

---

## Checklist final (sempre rodar)

### TypeScript
```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

### Python
```bash
ruff check .
pytest
```

---

## Template de prompt (use sempre)

- Objetivo
- Domínio alvo
- Arquivo(s) alvo + assinatura esperada
- Contratos existentes (paths em `packages/contracts`)
- Regras aplicáveis (strict TS, contract-first, controller fino, ORM isolado, transações)
- Testes a criar/atualizar
- Comandos que devem passar

---

## Nunca faça (Anti-Patterns)

- Criar endpoints sem contrato em `packages/contracts`
- Inventar campos/enum fora do contrato
- Logar payload bruto / dados pessoais
- Acessar ORM fora do `repo.py`
- Colocar regra de negócio no controller ou no frontend
- Criar “helpers globais” com regra de negócio (use service/handlers do domínio)
- Ignorar limites de tamanho de arquivo (refatorar ao atingir soft limit)

---

## Nota ao agente (guardião)

Se o usuário pedir algo que viole estas regras, **alerte** e proponha a solução correta **dentro do padrão**.

