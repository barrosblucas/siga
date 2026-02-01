# SIGA Bandeirantes

Sistema Integrado de Gestão Aberta do Município de Bandeirantes.

## Visão Geral

O SIGA Bandeirantes é uma plataforma municipal de transparência e gestão pública, consolidando dados de múltiplos sistemas:
- Portal da transparência (despesas, receitas, contratos)
- Iniciativas e programas de governo
- Relatórios semestrais
- Atendimento e protocolos
- Tramitação documental
- Obras públicas
- Plano de contratação anual
- Gestão financeira

### Dados de Conexão Local

- **Banco de dados:** siga_db
- **Usuário:** postgres
- **Senha:** lb107400
- **Host:** localhost:5432

### Dados de Conexão Local

- **Banco de dados:** siga_db
- **Usuário:** postgres
- **Senha:** lb107400
- **Host:** localhost:5432

## Stack Tecnológica

### Backend
- Python 3.12+
- FastAPI
- PostgreSQL 17
- SQLAlchemy 2.0 (async)
- Alembic (migrations)
- structlog (logging JSON)

### Frontend
- TypeScript strict
- React 19
- Vite
- TanStack Query
- Zod (validação runtime)
- React Router

### Contratos
- Zod como source of truth
- TypeScript type inference

## Estrutura do Projeto

```
siga/
├── apps/
│   ├── api/           # FastAPI Backend
│   │   ├── siga/
│   │   │   ├── domains/
│   │   │   │   ├── transparencia/
│   │   │   │   ├── iniciativas/
│   │   │   │   └── ...
│   │   │   ├── db/
│   │   │   ├── logging/
│   │   │   └── main.py
│   │   └── tests/
│   └── web/           # React Frontend
│       └── src/
│           ├── domains/
│           └── shared/
├── packages/
│   └── contracts/     # Zod contracts
├── scripts/
│   └── setup-postgres.sh
├── docs/context/      # Documentação viva
└── SETUP.md           # Guia de setup rápido
```
siga/
├── apps/
│   ├── api/           # FastAPI Backend
│   │   ├── siga/
│   │   │   ├── domains/
│   │   │   │   ├── transparencia/
│   │   │   │   ├── iniciativas/
│   │   │   │   └── ...
│   │   │   ├── db/
│   │   │   ├── logging/
│   │   │   └── main.py
│   │   └── tests/
│   └── web/           # React Frontend
│       └── src/
│           ├── domains/
│           └── shared/
├── packages/
│   └── contracts/     # Zod contracts
├── scripts/
│   └── setup-postgres.sh
├── docs/context/      # Documentação viva
└── SETUP.md           # Guia de setup rápido
```

## Início Rápido

### Pré-requisitos
- PostgreSQL instalado e rodando
- Node.js 20+
- Python 3.12+
- pnpm

### 1. Configurar PostgreSQL

Veja `docs/database-setup.md` para instruções detalhadas.

```bash
# Criar usuário e banco (se ainda não existir)
psql -U postgres
CREATE USER siga WITH PASSWORD 'siga';
CREATE DATABASE siga OWNER siga;
GRANT ALL PRIVILEGES ON DATABASE siga TO siga;
\q
```

### 2. Configurar Backend

```bash
cd apps/api

# Criar e ativar virtual environment (obrigatório no Debian/Ubuntu)
python3 -m venv .venv
source .venv/bin/activate  # ou .venv\Scripts\activate no Windows

# Instalar dependências
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

### 3. Executar Migrations

```bash
alembic upgrade head
```

### 4. Iniciar API

```bash
uvicorn siga.main:app --reload --port 8000
```

### 5. Configurar Frontend

```bash
cd apps/web
pnpm install
```

### 6. Iniciar Frontend

```bash
pnpm dev
```

Acesse:
- API: http://localhost:8000
- Web: http://localhost:3000
- Docs API: http://localhost:8000/docs

## Desenvolvimento

### Banco de Dados

```bash
# Verificar status do PostgreSQL
sudo systemctl status postgresql  # Linux
brew services list                 # macOS

# Testar conexão
psql -U siga -d siga -h localhost
```

### Backend

```bash
cd apps/api

# Ativar virtual environment
source .venv/bin/activate

# Lint
ruff check .

# Testes
pytest

# Criar migration
alembic revision --autogenerate -m "descricao"

# Aplicar migrations
alembic upgrade head

# Verificar migrations aplicadas
alembic current

# Desativar venv
deactivate
```

### Frontend

```bash
cd apps/web

# Lint
pnpm lint

# Typecheck
pnpm typecheck

# Build
pnpm build
```

### Reiniciar Serviços

```bash
# Backend (terminal 1)
cd apps/api
source .venv/bin/activate
uvicorn siga.main:app --reload --port 8000

# Frontend (terminal 2)
cd apps/web
pnpm dev
```

## Documentação

- [AGENTS.md](./AGENTS.md) - Instruções para LLMs/Agentes
- [AI-GOVERNANCE.md](./.context/docs/AI-GOVERNANCE.md) - Governança AI
- [REPOMAP.md](./.context/docs/REPOMAP.md) - Mapa Técnico

## Licença

Copyright © 2026 Prefeitura de Bandeirantes
