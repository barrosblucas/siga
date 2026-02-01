# SIGA Bandeirantes — Regras e Padrões (para Codex)

**Projeto:** SIGA Bandeirantes (Sistema Integrado de Gestão Aberta)  
**Objetivo:** Plataforma municipal de transparência e gestão pública, consolidando dados de múltiplos sistemas (portal da transparência, iniciativas, relatórios semestrais, atendimento, tramitação documental, impressão, plano de contratação anual, obras, finanças etc.).  
**Diretriz:** Aplicação **AI‑Native**, **LLM‑Friendly** e **100% AI‑Coded**.

---

## Stack obrigatória

### Backend (obrigatório: Python)
- **Python + FastAPI**
- **PostgreSQL**
- **ORM:** **SQLAlchemy 2.0 (async)** + **asyncpg**
- **Migrations:** **Alembic**
- **Validação:** Pydantic v2 **e/ou** validação por JSON Schema (ver “Contract-first”)
- **Logs:** **structlog** (JSON) com redaction

### Frontend (obrigatório: TypeScript)
- **TypeScript strict** (`strict: true`, `noImplicitAny: true`)
- **Zod** para validação runtime e inferência de tipos
- Framework (escolha do time): React/Next.js ou Vite+React (mantendo TS strict)

### Contratos
- `packages/contracts` (TypeScript) com **Zod** como **source of truth**.

---

## Leis (hard rules) — NÃO negociar

1. **TypeScript strict**  
   - `strict: true`, `noImplicitAny: true`  
   - Use `unknown` quando necessário **e valide com Zod** antes de usar.  
   - **Proibido:** `any`, `@ts-ignore`, `eslint-disable` para fugir de tipo.

2. **Contract-first (borda externa)**  
   - Toda borda externa (HTTP/eventos/jobs) deve ter contrato em `packages/contracts`.  
   - Nunca criar endpoint/handler sem contrato correspondente.

3. **Feature-first (por domínio)**  
   - Nada vive solto em `utils/` ou `services/` genéricos.  
   - Tudo pertence a um **domínio** (ex.: `obras`, `transparencia`, `iniciativas`, etc.).

4. **Controllers finos (API)**  
   - Controller: valida input → chama service → mapeia output.  
   - Regra de negócio **só** no `service`.

5. **ORM isolado (Python)**  
   - SQLAlchemy **somente** em `repo.py` (por domínio).  
   - Se tocar múltiplas entidades/tabelas, **transação obrigatória**.

6. **Segurança**
   - Sem secrets no código (usar env/secret manager).  
   - Sem PII em logs.  
   - Não logar payload bruto.

7. **Limites de tamanho**
   - Soft: **250 linhas**; Hard: **400 linhas**.  
   - Ao atingir 200–250 linhas em arquivos de lógica, refatorar imediatamente.

---

## Auto-crítica (Self‑Healing) antes de considerar pronto

O agente deve responder internamente antes de finalizar um PR/commit:

- Existe algum `any`/`@ts-ignore`/atalho de tipo?
- O arquivo ficou grande demais (soft 250 / hard 400)?
- Validei input na borda (Zod no frontend, Pydantic/JSON Schema no backend)?
- Tratei erros e retornos (early returns, erros previsíveis)?
- Segui feature-first e imports explícitos (sem barrels profundos)?
- Atualizei contratos e testes?

---

## Regras de ouro para IA (sempre)

1) **Contrato primeiro** (`packages/contracts`) → depois API → depois Web  
2) **Mudanças mínimas**: 1 domínio por PR, 1 intenção por commit  
3) **Localidade**: evitar “mágica”; preferir explícito  
4) **Testes como especificação**: sem teste, sem feature  
5) **Falhou no CI?** corrigir até passar — não contornar

---

## Estrutura do repositório (monorepo)

> Exemplo sugerido; manter feature-first.

```
.
├─ apps/
│  ├─ api/                  # FastAPI (Python)
│  │  ├─ siga/
│  │  │  ├─ domains/
│  │  │  │  ├─ obras/
│  │  │  │  │  ├─ controller.py
│  │  │  │  │  ├─ service.py
│  │  │  │  │  ├─ repo.py          # SQLAlchemy SOMENTE aqui
│  │  │  │  │  ├─ schemas.py       # Pydantic (se usado)
│  │  │  │  │  └─ errors.py
│  │  │  │  └─ ...
│  │  │  ├─ security/
│  │  │  ├─ logging/
│  │  │  └─ main.py
│  │  └─ tests/
│  │
│  └─ web/                  # Frontend TS
│     └─ src/domains/...
│
├─ packages/
│  └─ contracts/            # Zod (contratos)
│     └─ src/...
│
└─ docs/context/            # documentação viva
```

---

## Contract-first (detalhamento)

### Fonte de verdade (sempre)
- `packages/contracts`: schemas Zod para:
  - Inputs/Outputs HTTP
  - Eventos (se houver)
  - Jobs (se houver)

### Backend validação (borda HTTP)
Escolher **um** destes modelos (preferência pelo A):

**A) Zero duplicação (preferido):**  
1) Gerar **JSON Schema** a partir do Zod no build do `packages/contracts`  
2) No FastAPI, validar payload contra o JSON Schema via `jsonschema` **antes** de entrar no service.

**B) DX Python forte (aceita duplicação controlada):**  
- Definir Pydantic v2 espelhando os contratos **somente na borda**.  
- Ainda assim, `packages/contracts` continua sendo referência e deve evoluir primeiro.

> Independente do modelo: **nenhum endpoint existe sem contrato.**

---

## Padrão Backend (FastAPI)

### Controllers
- Apenas:
  - parsing/validação (Pydantic ou JSON Schema)
  - auth/permission checks
  - chamar service
  - mapear output / status codes

### Services
- Regras de negócio
- Orquestração de repos
- Garantir invariantes do domínio
- Erros previsíveis viram exceções de domínio tipadas

### Repos (ORM isolado)
- Único lugar com SQLAlchemy
- Transações:
  - Se tocar múltiplas tabelas/entidades, **usar** `async with session.begin():`
- Nunca passar `Session` para controllers
- Preferir funções pequenas e explícitas

---

## Padrão Frontend (TypeScript strict)

- Sempre validar dados externos com Zod antes de usar
- Tipos inferidos de Zod (`z.infer<typeof Schema>`)
- Proibido `any` e `@ts-ignore`
- Domain-first: `src/domains/<dominio>/...`
- Sem “services” genéricos globais: API client por domínio

---

## Erros & Observabilidade

### Logs
- Backend: **structlog** em JSON
- Redaction para campos sensíveis
- Sem payloads brutos
- Correlation ID por request (ex.: `x-request-id`)

### Tratamento de erros
- Erros previsíveis:
  - 400/422 para validação
  - 401/403 auth
  - 404 not found
  - 409 conflitos de negócio
- Erros inesperados:
  - 500 com mensagem genérica (sem vazar detalhes)

---

## Testes (obrigatórios)

- Backend: pytest
  - unit tests por service/repo
  - integration tests (API) com DB (docker) quando fizer sentido
- Frontend: testes por domínio (mínimo: validação e comportamento crítico)
- Sem feature sem teste correspondente

---

## Documentação viva (obrigatória)

Atualizar `docs/context/*` quando mudar:
- regras globais de negócio
- convenções e padrões
- novas rotas públicas/privadas
- decisões arquiteturais relevantes

Use docstrings/TSDoc em funções públicas explicando o **PORQUÊ** (decisão/regra), não o COMO.

---

## Checklist de PR (obrigatório)

- [ ] Contratos criados/atualizados em `packages/contracts`
- [ ] Backend valida contratos na borda
- [ ] Controller fino; regra no service
- [ ] ORM apenas no repo
- [ ] Transação em operações multi-entidade
- [ ] Sem PII/log de payload
- [ ] Arquivos < 250 linhas (ou refatorado)
- [ ] Testes adicionados/atualizados
- [ ] `docs/context` atualizado se aplicável
