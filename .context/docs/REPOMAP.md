# REPOMAP.md — Repository Technical Map (SIGA Bandeirantes)

> **Generated:** 2026-02-01 | **Purpose:** LLM Context Injection for AI-Native Development

---

## 1) Project Overview

**SIGA Bandeirantes (Sistema Integrado de Gestão Aberta)** é uma plataforma municipal para:

- Transparência pública (despesas, receitas, contratos, licitações, convênios etc.)
- Gestão e acompanhamento (iniciativas, relatórios semestrais, obras, plano anual de contratação, impressão)
- Consolidação operacional (atendimento, protocolos, tramitação/documentos)
- Camada AI-Native (busca, RAG, chat, auditoria e explicabilidade)

**Architecture Pattern:** Modular Monolith (Monólito Modular) com **feature-first**.

---

## 2) Technology Stack

### Backend
- Python + FastAPI
- PostgreSQL
- SQLAlchemy 2.0 (async) + asyncpg
- Alembic (migrations)
- Validation: JSON Schema (gerado do Zod) e/ou Pydantic v2
- Logging: structlog (JSON) + redaction

### Frontend
- TypeScript strict
- Zod
- React (Next.js ou Vite+React — definir na arquitetura do repo)

### Shared
- `packages/contracts` (Zod) como **source of truth**

---

## 3) Repository Structure (monorepo)

```
siga-bandeirantes/
├─ apps/
│  ├─ api/                        # FastAPI (Python)
│  │  ├─ siga/
│  │  │  ├─ domains/              # feature-first (domínios)
│  │  │  ├─ security/             # auth/rbac
│  │  │  ├─ logging/              # structlog setup
│  │  │  ├─ db/                   # session, migrations hooks
│  │  │  └─ main.py               # entrypoint FastAPI
│  │  └─ tests/
│  │
│  └─ web/                        # Frontend TS
│     ├─ src/
│     │  ├─ domains/              # feature-first UI
│     │  ├─ shared/               # infra mínima (api client, auth state)
│     │  └─ app/                  # bootstrap / router
│     └─ tests/
│
├─ packages/
│  └─ contracts/                  # Zod contracts (HTTP/events/jobs)
│     ├─ src/
│     └─ dist/                    # JSON Schema / artifacts gerados
│
├─ docs/
│  └─ context/                    # documentação viva (regras, arquitetura, ADRs)
│
├─ AI-GOVERNANCE.md
├─ AGENTS.md
└─ docker-compose.yml             # postgres + deps locais
```

---

## 4) Backend Architecture (apps/api)

### Entry Point
- `apps/api/siga/main.py` (FastAPI app, middlewares globais, routers)

### Domínios (exemplos esperados)
Cada domínio fica em `apps/api/siga/domains/<dominio>/`:

- `transparencia/` (despesas, receitas, contratos, licitações)
- `iniciativas/` (programas, metas, indicadores)
- `relatorios/` (semestrais, consolidados)
- `atendimento/` (SLA, filas, canais)
- `documentos/` (protocolos, tramitação, publicações)
- `obras/` (status, marcos, medições)
- `contratacao_anual/` (planejado vs executado)
- `impressao/` (custos, volumes)
- `financeiro/` (consolidados)
- `ai/` (RAG, chat, auditoria, prompt packs)

### Padrão de arquivos por domínio
```
<dominio>/
├─ controller.py     # rotas + validação + auth
├─ service.py        # regra de negócio
├─ repo.py           # SQLAlchemy only here
├─ schemas.py        # DTOs (se usar Pydantic na borda)
├─ errors.py         # erros do domínio
└─ tests/
```

---

## 5) Frontend Architecture (apps/web)

### Organização
- `apps/web/src/domains/<dominio>/...` (feature-first)
- `apps/web/src/shared/` apenas para infra transversal (api-client, auth, cache, etc.)

### Padrão por domínio
- `api.ts` (client daquele domínio)
- `hooks.ts` (TanStack Query / hooks)
- `components/` (UI)
- `pages/` (rotas/páginas)

---

## 6) Shared Contracts (packages/contracts)

- Zod schemas são a “fonte da verdade”
- Build gera:
  - Tipos TS inferidos
  - JSON Schemas para validação do backend

---

## 7) Context & Documentation (docs/context)

Documentos esperados:
- `ARCHITECTURE.md` (visão geral, decisões chave)
- `PROJECT_STATE.md` (estado atual, próximos passos)
- `SECURITY.md` (auth, RBAC, rate limiting, logging, PII)
- `DOMAINS.md` (glossário e limites de domínio)
- ADRs (decisões arquiteturais)

---

## 8) AI Agents

- `AGENTS.md`: regras para agentes/LLMs (pré-voo, padrões, checklist)
- (Opcional) playbooks especializados por agente em `docs/context/agents/*`

---

## 9) Development Scripts (mínimo)

### Root
- `docker compose up -d` (Postgres)

### TypeScript
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

### Python
- `ruff check .`
- `pytest`

> Manter scripts padronizados e documentados no `docs/context/PROJECT_STATE.md`.

