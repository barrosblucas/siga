#!/bin/bash

# Script para criar banco de dados SIGA no PostgreSQL local

set -e

echo "=== Configuração do PostgreSQL para SIGA Bandeirantes ==="
echo ""

# Verificar se PostgreSQL está rodando
if ! pg_isready -q 2>/dev/null; then
    echo "❌ PostgreSQL não está rodando."
    echo "   Inicie o PostgreSQL:"
    echo "   - Linux: sudo systemctl start postgresql"
    echo "   - macOS: brew services start postgresql"
    exit 1
fi

echo "✅ PostgreSQL está rodando"
echo ""

echo "Criando banco de dados SIGA..."
echo ""

# Criar banco usando sudo -u postgres (método padrão em Linux/Ubuntu)
sudo -u postgres psql << 'EOF'
-- Drop se existir (apenas para desenvolvimento)
DROP DATABASE IF EXISTS siga_db;

-- Criar banco
CREATE DATABASE siga_db;

-- Conceder privilégios ao usuário postgres
GRANT ALL PRIVILEGES ON DATABASE siga_db TO postgres;

-- Conectar ao banco para configurar privilégios adicionais
\c siga_db
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres;
EOF

echo ""
echo "✅ Banco de dados criado com sucesso!"
echo ""
echo "Testando conexão..."
sudo -u postgres psql -d siga_db -c "SELECT current_database(), current_user;" -qt

echo ""
echo "=== Configuração concluída ==="
echo ""
echo "Dados de conexão:"
echo "  Host: localhost"
echo "  Porta: 5432"
echo "  Usuário: postgres"
echo "  Senha: lb107400"
echo "  Banco: siga_db"
echo ""
echo "String de conexão:"
echo "  postgresql+asyncpg://postgres:lb107400@localhost:5432/siga_db"
echo ""
echo "⚠️  IMPORTANTE: Você precisa definir uma senha para o usuário postgres:"
echo ""
echo "  sudo -u postgres psql"
echo "  ALTER USER postgres PASSWORD 'lb107400';"
echo "  \\q"
echo ""
echo "Próximos passos:"
echo "1. Defina a senha do postgres (veja acima)"
echo "2. cd apps/api"
echo "3. cp .env.example .env"
echo "4. alembic upgrade head"
echo ""