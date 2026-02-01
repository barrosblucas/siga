#!/bin/bash

# Script para limpar todas as portas e processos do SIGA

set -e

echo "${YELLOW}=== Limpando Serviços SIGA Bandeirantes ===${NC}"
echo ""

# Parar processos por nome
echo "Parando processos..."
pkill -f "uvicorn siga.main:app" 2>/dev/null && echo "✓ Backend parado" || echo "- Backend não estava rodando"
pkill -f "vite.*--port" 2>/dev/null && echo "✓ Frontend parado" || echo "- Frontend não estava rodando"
pkill -f "pnpm dev" 2>/dev/null && echo "✓ pnpm dev parado" || echo "- pnpm dev não estava rodando"

# Liberar portas
echo ""
echo "Liberando portas..."
for port in 3000 3001 3002 3003 3004 3005 8000; do
    if lsof -ti:$port > /dev/null 2>&1; then
        lsof -ti:$port | xargs kill -9 2>/dev/null
        echo "✓ Porta $port liberada"
    fi
done

# Remover arquivos temporários
echo ""
echo "Limpando arquivos..."
rm -f .siga_pids backend.log frontend.log 2>/dev/null && echo "✓ Arquivos temporários removidos" || echo "- Nenhum arquivo temporário"

echo ""
echo "${GREEN}=== Limpeza concluída ===${NC}"
echo ""
echo "Agora você pode rodar: ./siga.sh"
