#!/bin/bash

# Script rápido para criar banco SIGA e definir senha do postgres

set -e

echo "=== Setup Rápido do PostgreSQL para SIGA ==="
echo ""

# Criar banco de dados
echo "1. Criando banco de dados..."
sudo -u postgres psql << 'EOF'
DROP DATABASE IF EXISTS siga_db;
CREATE DATABASE siga_db;
GRANT ALL PRIVILEGES ON DATABASE siga_db TO postgres;
\c siga_db
GRANT ALL ON SCHEMA public TO postgres;
EOF

echo "✅ Banco de dados criado"
echo ""

# Definir senha do usuário postgres
echo "2. Definindo senha do usuário postgres..."
sudo -u postgres psql << 'EOF'
ALTER USER postgres PASSWORD 'lb107400';
EOF

echo "✅ Senha definida"
echo ""

echo "=== Setup concluído ==="
echo ""
echo "Testando conexão com senha..."
PGPASSWORD=lb107400 psql -U postgres -d siga_db -h localhost -c "SELECT current_database(), current_user;" -qt

echo ""
echo "Pronto! Agora você pode:"
echo "  cd apps/api"
echo "  source .venv/bin/activate"
echo "  alembic upgrade head"
echo "  uvicorn siga.main:app --reload --port 8000"
echo ""
