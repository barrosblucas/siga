# CHANGELOG - 2026-02-01

## TASK 01 - Estrutura Inicial do Projeto

### Backend (Python/FastAPI)
- Criada estrutura base do projeto monorepo
- Configurado FastAPI com middleware CORS
- Criados modelos SQLAlchemy para:
  - TransparenciaDespesa
  - TransparenciaReceita
  - TransparenciaContrato
  - Iniciativa
  - Meta
  - Indicador
- Criado módulo de logging com structlog
- Criada configuração com Pydantic Settings
- Criados controllers para transparencia e iniciativas
- Criados services para iniciativas
- Configurado Alembic para migrations
- Criada migration inicial (0001_initial)

### Frontend (React/TypeScript)
- Criado projeto React com Vite
- Configurado TypeScript strict
- Criada estrutura feature-first (domains)
- Implementados hooks com TanStack Query
- Criados componentes:
  - DespesasTable
  - ReceitasTable
  - IniciativasList
  - IniciativaDetail
- Criadas páginas:
  - DespesasPage
  - ReceitasPage
  - IniciativasPage
- Configurado React Router para navegação
- Implementado design responsivo com Tailwind CSS

### Contratos (Zod)
- Criado pacote packages/contracts
- Definidos schemas Zod para:
  - TransparenciaDespesa
  - TransparenciaReceita
  - TransparenciaContrato
  - Iniciativa
  - Meta
  - Indicador
  - Query params para listagem
  - Create/Update schemas

### Infraestrutura
- Configurado para uso com PostgreSQL local (sem Docker)
- Criado script de setup do banco (scripts/setup-postgres.sh)
- Criada documentação de database-setup.md
- Configurado .env.example
- Criado README.md com instruções de setup
- Criada documentação viva em docs/context

### Padrões Aplicados
- Contract-first (Zod como source of truth)
- Feature-first (organização por domínio)
- Controllers finos (validação → service → retorno)
- TypeScript strict (sem any, @ts-ignore)
- ORM isolado em repo.py
- Logging JSON com structlog
- Limite de arquivos < 250 linhas

## TASK 02 - Remoção de Docker e Setup Local

### Alterações
- Atualizado projeto para usar PostgreSQL local (sem Docker)
- Desabilitado docker-compose.yml (mantido como referência)
- Criado script scripts/setup-postgres.sh para setup automático
- Criado docs/database-setup.md com instruções de configuração
- Atualizado README.md para refletir setup local
- Adicionados comandos de verificação e reinicialização de serviços

## TASK 03 - Documentação de Setup Rápido

### Alterações
- Criado SETUP.md com instruções passo-a-passo
- Documentado uso obrigatório de virtual environment (venv)
- Adicionados troubleshooting para problemas comuns
- Atualizado README.md com instruções de venv
- Atualizado docs/database-setup.md com notas sobre venv

## TASK 04 - Configuração Banco de Dados PostgreSQL

### Alterações
- Atualizado para usar usuário `postgres` (não mais `siga`)
- Atualizado senha para `lb107400`
- Atualizado nome do banco para `siga_db` (não mais `siga`)
- Atualizado script `scripts/setup-postgres.sh`
- Atualizado `apps/api/.env.example` com nova string de conexão
- Atualizado toda documentação com novos dados de conexão:
  - docs/database-setup.md
  - SETUP.md
  - README.md

### Dados de Conexão
- Host: localhost
- Porta: 5432
- Usuário: postgres
- Senha: lb107400
- Banco: siga_db
- String: `postgresql+asyncpg://postgres:lb107400@localhost:5432/siga_db`

## TASK 05 - Melhoria Scripts de Setup PostgreSQL

### Alterações
- Atualizado `scripts/setup-postgres.sh` para usar `sudo -u postgres`
  - Remove verificação de senha que causava falha
  - Usa método padrão de autenticação do Linux/Ubuntu
- Criado `scripts/quick-setup-postgres.sh` (script rápido)
  - Cria banco automaticamente
  - Define senha do postgres automaticamente
  - Testa conexão imediatamente
- Atualizado `SETUP.md` com novas opções de setup
- Atualizado `docs/database-setup.md` com 3 opções de criação do banco

### Scripts Disponíveis
1. `./scripts/quick-setup-postgres.sh` - Rápido, automático (recomendado)
2. `./scripts/setup-postgres.sh` - Manual com instruções
3. Criação manual via psql

## TASK 06 - Correção Alembic Driver PostgreSQL

### Problema
- Alembic não suporta drivers assíncronos (`asyncpg`)
- Erro: `sqlalchemy.exc.MissingGreenlet: greenlet_spawn has not been called`

### Solução
- Atualizado `alembic.ini` para usar driver síncrono:
  - `postgresql+psycopg2://postgres:lb107400@localhost:5432/siga_db`
- Atualizado `alembic/env.py` para remover dependência de config
- Adicionado `psycopg2-binary==2.9.10` ao `requirements.txt`
- Criado `docs/alembic-setup.md` com instruções específicas

### Drivers Utilizados
- **Alembic (migrations):** `postgresql+psycopg2://` (síncrono)
- **FastAPI (aplicação):** `postgresql+asyncpg://` (assíncrono)

### Documentação Adicionada
- `docs/alembic-setup.md` - Documentação específica do Alembic
- Explicação sobre por que usar drivers diferentes

### Comandos de Migrations
```bash
# Criar migration
alembic revision --autogenerate -m "descrição"

# Aplicar migrations
alembic upgrade head

# Verificar versão
alembic current

# Reverter
alembic downgrade -1
```

## TASK 07 - Script de Controle de Serviços

### Alterações
- Criado `siga.sh` - Script de controle de serviços
  - Menu interativo para iniciar/parar backend e frontend
  - Verifica automaticamente pré-requisitos
  - Instala dependências se necessário
  - Aplica migrations se necessário
  - Cria banco de dados automaticamente
  - Guarda PIDs para gerenciamento
  - Exibe logs e status dos serviços
  - Abre navegador automaticamente
- Criado `docs/siga-script.md` - Documentação do script

### Funcionalidades do Script
1. Iniciar Backend e Frontend
2. Iniciar apenas Backend
3. Iniciar apenas Frontend
4. Parar todos os serviços
5. Ver status
6. Ver logs (últimas 20 linhas)
7. Abrir web browser

### Verificações Automáticas
- Python 3 instalado
- Node.js instalado
- PostgreSQL rodando
- Virtual environment criado
- Dependências instaladas
- Banco de dados acessível
- Arquivo .env configurado
- Migrations aplicadas

### Logs
- `backend.log` - Logs do FastAPI
- `frontend.log` - Logs do Vite
- `.siga_pids` - PIDs dos processos rodando

### Uso
```bash
./siga.sh
# Escolha uma opção do menu
```

### Atalhos Sugeridos (bashrc/aliases)
```bash
alias siga-start='~/siga/siga.sh <<< "1"'
alias siga-stop='~/siga/siga.sh <<< "4"'
alias siga-status='~/siga/siga.sh <<< "5"'
```
