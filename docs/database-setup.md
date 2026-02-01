# Database Setup (PostgreSQL Local)

## Criar Banco de Dados

**Opção 1 - Script automatizado (recomendado):**

```bash
# Criar banco e definir senha automaticamente
./scripts/quick-setup-postgres.sh
```

**Opção 2 - Script manual:**

```bash
# Criar banco
sudo -u postgres psql -c "CREATE DATABASE siga_db;"

# Definir senha do postgres
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'lb107400';"
```

**Opção 3 - Manual completo:**

```bash
# Conectar ao PostgreSQL
sudo -u postgres psql

# Criar banco de dados
CREATE DATABASE siga_db;

# Conceder privilégios
GRANT ALL PRIVILEGES ON DATABASE siga_db TO postgres;

# Definir senha (importante!)
ALTER USER postgres PASSWORD 'lb107400';

# Sair do psql
\q
```

## Testar Conexão

```bash
psql -U postgres -d siga_db -h localhost
```

## Strings de Conexão

**Desenvolvimento:**
```
postgresql+asyncpg://postgres:lb107400@localhost:5432/siga_db
```

**Produção (ajuste conforme necessário):**
```
postgresql+asyncpg://usuario:senha@host:porta/banco
```

## Configurar .env

Copie `.env.example` para `.env` e ajuste as variáveis:

```bash
cd apps/api
cp .env.example .env

# DATABASE_URL já configurado para ambiente local
# postgresql+asyncpg://postgres:lb107400@localhost:5432/siga_db
```

## Virtual Environment (Importante!)

No Debian/Ubuntu com Python 3.13+, é obrigatório usar virtual environment:

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate

# Verificar que está no venv (prompt vai mostrar (.venv))
which python  # Deve apontar para apps/api/.venv/bin/python

# Instalar dependências
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

## Dados de Conexão Local

- **Host:** localhost
- **Porta:** 5432
- **Usuário:** postgres
- **Senha:** lb107400
- **Banco:** siga_db
