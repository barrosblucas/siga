# AI-GOVERNANCE.md — AI Governance & Style Guide (SIGA Bandeirantes)

**Projeto:** SIGA Bandeirantes (Sistema Integrado de Gestão Aberta)  
**Data:** 2026-02-01  
**Objetivo:** Regras arquiteturais e padrões de codificação para manter o sistema **AI-Native**, **LLM-Friendly** e consistente.

---

## 0) Princípios inegociáveis (Hard Rules)

1. **TypeScript strict**
   - `strict: true`, `noImplicitAny: true`
   - Proibido: `any`, `@ts-ignore`, `eslint-disable` para contornar tipos
   - Use `unknown` + validação **Zod** antes de usar valores externos

2. **Contract-first**
   - Toda borda externa (HTTP/eventos/jobs) **nasce** em `packages/contracts`
   - Sem contrato, não existe rota/evento/job

3. **Feature-first**
   - Nada em `utils/` ou `services/` genéricos
   - Tudo pertence a um domínio (ex.: `transparencia`, `obras`, `iniciativas`, `atendimento`, `documentos`, `financeiro`, `contratacao_anual`, `impressao`, `ai`)

4. **Controllers finos**
   - Controller: valida → auth/permission → chama service → mapeia saída
   - Regra de negócio fica no **service**

5. **ORM isolado (Python)**
   - SQLAlchemy **somente** em `repo.py` (por domínio)
   - Transação obrigatória quando tocar múltiplas entidades/tabelas

6. **Segurança & privacidade**
   - Sem secrets no código
   - Sem PII em logs
   - Nunca logar payload bruto

7. **Limite de tamanho**
   - Soft: 250 linhas / Hard: 400 linhas
   - Ao bater ~200–250 linhas em arquivo de lógica: refatorar (composition/extract handlers)

---

## 1) Arquitetura Feature-First (Domínios)

Organização por **domínio de negócio** (feature), não por “tipo de arquivo”:

- Cada domínio tem: `controller`, `service`, `repo`, `schemas`, `errors`, `tests`
- Infra global (mínima): autenticação, logging, DB session, config, healthchecks

---

## 2) Contract-first (Zod-first)

### Source of Truth
- `packages/contracts`: Zod schemas para:
  - Requests/Responses HTTP
  - Eventos (se houver)
  - Jobs (se houver)

### Regras
- **Nunca** escrever interfaces TS manualmente se derivadas de dados externos
- Defina Zod → infira tipos (`z.infer`) → valide runtime (Zod)

### Backend (FastAPI) — validação de borda
Escolha padrão do projeto (recomendado):

**Padrão A — Zero duplicação (preferido):**
1) Build do `packages/contracts` gera JSON Schema por contrato  
2) O FastAPI valida o payload contra JSON Schema **antes** de entrar no service

> Observação: Se o time preferir DX Python, é permitido espelhar contratos com Pydantic v2
> **somente na borda**, mas o contrato sempre muda primeiro em `packages/contracts`.

---

## 3) Backend (FastAPI + SQLAlchemy async)

### Estrutura
- `controller.py`: valida, chama service, retorna DTO
- `service.py`: regras de negócio, orquestra repos, invariantes
- `repo.py`: SQLAlchemy queries + transações

### Transações
- Multi-entidade/tabela: obrigatório `async with session.begin():`
- Proibido “session” vazando para controller

### Validação e DTOs
- Toda entrada na borda deve ser validada (JSON Schema ou Pydantic v2)
- Nunca confiar em `dict` “solto” dentro do service

### Erros
- Use erros de domínio tipados:
  - 400/422 validação
  - 401/403 auth/permission
  - 404 not found
  - 409 conflito de regra de negócio
  - 500 erro inesperado (mensagem genérica)

---

## 4) Frontend (TypeScript strict)

### Regras
- Validar **toda** resposta de API com Zod ao entrar no app
- “Sem fetch em componente”: criar client/hook por domínio
- Sem regra de negócio na UI: UI apenas orquestra input/estado, regra no backend

---

## 5) Logging & Observabilidade

### Backend
- Logger JSON (structlog) com:
  - `request_id` / `correlation_id`
  - redaction para campos sensíveis
- Proibido `print()` / `console.log`
- Logs sem payload bruto e sem PII

### Auditoria (governo)
- Toda mutação relevante (criar/alterar/excluir/aprovar/publicar) deve gerar:
  - trilha de auditoria (quem, quando, o quê, antes/depois minimizado, motivo)

---

## 6) Segurança (mínimo obrigatório)

- Autenticação: JWT/OAuth2 (Bearer) ou sessão segura (definir no `docs/context/ARCHITECTURE.md`)
- Autorização: RBAC/ABAC por domínio + “policies” explícitas
- Rate limiting em rotas sensíveis
- Sanitização/normalização de documentos (IDs, máscaras, etc.) antes de persistir
- Upload de arquivos: antivírus/validações e storage separado (quando aplicável)

---

## 7) LLM-Friendliness (Context Optimization)

- Funções pequenas e puras quando possível
- Arquivos de lógica **< 250 linhas**
- Nomes semânticos (Verbo + Substantivo)
- Comentários/TSDoc/docstrings explicam o **PORQUÊ**, não o como
- Evitar “barrel exports” profundos e imports mágicos

---

## 8) Pipeline de Qualidade (Definição de Pronto)

### TypeScript (web + contracts)
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

### Python (api)
- `ruff check .`
- `pytest`

Sem feature sem teste.

---

## 9) Documentação viva

Atualize `docs/context/*` quando mudar:
- regras globais de negócio
- convenções e padrões
- novas rotas públicas/privadas
- decisões arquiteturais (ADR)

