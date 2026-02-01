# Setup Rápido - SIGA Bandeirantes

## Pré-requisitos Verificados
- ✅ PostgreSQL instalado e rodando
- ✅ Python 3.13 detectado

## Passo 1: Setup do Banco de Dados

**Opção 1 - Script rápido (recomendado):**
```bash
# No diretório raiz do projeto
./scripts/quick-setup-postgres.sh
```

Este script:
- Cria o banco `siga_db`
- Define a senha do usuário postgres como `lb107400`
- Testa a conexão

**Opção 2 - Script manual:**
```bash
# No diretório raiz do projeto
./scripts/setup-postgres.sh

# Depois definir senha manualmente
sudo -u postgres psql
ALTER USER postgres PASSWORD 'lb107400';
\q
```

## Passo 2: Setup do Backend (Python)

```bash
cd apps/api

# Criar virtual environment (obrigatório!)
python3 -m venv .venv

# Ativar venv
source .venv/bin/activate

# Verificar ativação (prompt deve mostrar (.venv))
python --version

# Instalar dependências
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Copiar arquivo de configuração
cp .env.example .env

# Reinstalar dependências (incluir psycopg2 para Alembic)
pip install -r requirements.txt

# Reinstalar dependências (incluir psycopg2 para Alembic)
pip install -r requirements.txt

# Aplicar migrations (cria tabelas no banco)
alembic upgrade head

# Iniciar servidor API (deixe rodando)
uvicorn siga.main:app --reload --port 8000
```

## Passo 3: Setup do Frontend (Node.js)

**Abra novo terminal:**

```bash
cd apps/web

# Instalar dependências
pnpm install

# Iniciar servidor web
pnpm dev
```

## Passo 4: Acessar Aplicação

- API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Web App: http://localhost:3000

## Troubleshooting

### Erro: "externally-managed-environment"
**Solução:** Você não ativou o virtual environment. Execute:
```bash
cd apps/api
source .venv/bin/activate
pip install -r requirements.txt
```

### Erro: PostgreSQL não conecta
**Solução:** Verifique se PostgreSQL está rodando e se o banco existe:
```bash
sudo systemctl status postgresql

# Testar conexão
psql -U postgres -d siga_db -h localhost

# Criar banco se não existir
psql -U postgres
CREATE DATABASE siga_db;
\q
```

### Erro: Migrations falham
**Solução:** Verifique conexão com banco:
```bash
psql -U siga -d siga -h localhost
```

### Verificar versão Python
```bash
python3 --version  # Deve ser 3.13+
```

### Reinstalar tudo (reset)
```bash
cd apps/api
rm -rf .venv
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip install -r requirements-dev.txt
alembic upgrade head
uvicorn siga.main:app --reload --port 8000
```
