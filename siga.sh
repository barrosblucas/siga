#!/bin/bash

# Script para iniciar/parar serviços do SIGA Bandeirantes

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Diretórios
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
API_DIR="$ROOT_DIR/apps/api"
WEB_DIR="$ROOT_DIR/apps/web"
VENV_DIR="$API_DIR/.venv"
ENV_FILE="$API_DIR/.env"

# PIDs dos processos
BACKEND_PID=""
FRONTEND_PID=""

# Arquivo para guardar PIDs
PID_FILE="$ROOT_DIR/.siga_pids"

# Funções
print_header() {
    echo ""
    echo "${BLUE}======================================${NC}"
    echo "${BLUE}$1${NC}"
    echo "${BLUE}======================================${NC}"
    echo ""
}

print_success() {
    echo "${GREEN}✓ $1${NC}"
}

print_error() {
    echo "${RED}✗ $1${NC}"
}

print_warning() {
    echo "${YELLOW}⚠ $1${NC}"
}

check_prerequisites() {
    print_header "Verificando Pré-requisitos"
    
    # Verificar Python
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 não encontrado"
        exit 1
    fi
    print_success "Python 3 encontrado: $(python3 --version)"
    
    # Verificar Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js não encontrado"
        exit 1
    fi
    print_success "Node.js encontrado: $(node --version)"
    
    # Verificar PostgreSQL
    if ! pg_isready -q 2>/dev/null; then
        print_error "PostgreSQL não está rodando"
        echo "  Inicie com: sudo systemctl start postgresql"
        exit 1
    fi
    print_success "PostgreSQL está rodando"
    
    # Verificar venv
    if [ ! -d "$VENV_DIR" ]; then
        print_warning "Virtual environment não encontrado"
        echo "  Criando venv..."
        cd "$API_DIR"
        python3 -m venv .venv
        cd "$ROOT_DIR"
        print_success "Virtual environment criado"
    fi
    print_success "Virtual environment encontrado"
    
    # Verificar pnpm
    if ! command -v pnpm &> /dev/null; then
        print_error "pnpm não encontrado"
        echo "  Instale com: npm install -g pnpm"
        exit 1
    fi
    print_success "pnpm encontrado: $(pnpm --version)"
    
    # Verificar .env
    if [ ! -f "$ENV_FILE" ]; then
        print_warning "Arquivo .env não encontrado"
        echo "  Criando .env a partir do exemplo..."
        cp "$API_DIR/.env.example" "$ENV_FILE"
        print_success "Arquivo .env criado"
    fi
    print_success "Arquivo .env encontrado"
}

check_database() {
    print_header "Verificando Banco de Dados"
    
    if PGPASSWORD=lb107400 psql -U postgres -d siga_db -h localhost -c "SELECT 1;" -qt > /dev/null 2>&1; then
        print_success "Banco de dados siga_db acessível"
    else
        print_warning "Banco de dados siga_db não acessível ou não existe"
        echo ""
        read -p "Deseja criar o banco agora? (s/n) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Ss]$ ]]; then
            ./scripts/quick-setup-postgres.sh
        else
            print_error "Banco de dados necessário para continuar"
            exit 1
        fi
    fi
}

start_backend() {
    print_header "Iniciando Backend"
    
    cd "$API_DIR"
    
    # Ativar venv
    source "$VENV_DIR/bin/activate"
    
    # Verificar se dependências estão instaladas
    if ! pip show fastapi > /dev/null 2>&1; then
        print_warning "Dependências não instaladas"
        echo "  Instalando..."
        pip install -q -r requirements.txt
        pip install -q -r requirements-dev.txt
        print_success "Dependências instaladas"
    fi
    
    # Verificar migrations
    if ! alembic current > /dev/null 2>&1; then
        print_warning "Migrations não aplicadas"
        echo "  Aplicando migrations..."
        alembic upgrade head
        print_success "Migrations aplicadas"
    fi
    
    # Iniciar backend em background
    echo "Iniciando FastAPI..."
    nohup uvicorn siga.main:app --reload --port 8000 > "$ROOT_DIR/backend.log" 2>&1 &
    BACKEND_PID=$!
    
    # Guardar PID
    echo "$BACKEND_PID" > "$PID_FILE"
    
    print_success "Backend iniciado (PID: $BACKEND_PID)"
    print_success "Logs em: $ROOT_DIR/backend.log"
    print_success "API disponível em: http://localhost:8000"
    print_success "API Docs: http://localhost:8000/docs"
    
    cd "$ROOT_DIR"
    sleep 2
}

start_frontend() {
    print_header "Iniciando Frontend"
    
    cd "$WEB_DIR"
    
    # Verificar node_modules
    if [ ! -d "node_modules" ]; then
        print_warning "node_modules não encontrado"
        echo "  Instalando dependências..."
        pnpm install
        print_success "Dependências instaladas"
    fi
    
    # Iniciar frontend em background
    echo "Iniciando Vite dev server..."
    nohup pnpm dev > "$ROOT_DIR/frontend.log" 2>&1 &
    FRONTEND_PID=$!
    
    # Guardar PID
    if [ -f "$PID_FILE" ]; then
        echo "$FRONTEND_PID" >> "$PID_FILE"
    else
        echo "$FRONTEND_PID" > "$PID_FILE"
    fi
    
    print_success "Frontend iniciado (PID: $FRONTEND_PID)"
    print_success "Logs em: $ROOT_DIR/frontend.log"
    print_success "Web App disponível em: http://localhost:3000"
    
    cd "$ROOT_DIR"
    sleep 2
}

stop_services() {
    print_header "Parando Serviços"
    
    local stopped_any=false
    
    # Matar por nome de processo (mais robusto)
    print_warning "Procurando processos SIGA..."
    
    # Parar backend (uvicorn)
    if pkill -f "uvicorn siga.main:app" 2>/dev/null; then
        print_success "Backend parado (uvicorn)"
        stopped_any=true
    fi
    
    # Parar frontend (vite/pnpm dev)
    if pkill -f "vite.*--port" 2>/dev/null; then
        print_success "Frontend parado (vite)"
        stopped_any=true
    fi
    
    # Tentar matar por PID file se ainda existir
    if [ -f "$PID_FILE" ]; then
        while IFS= read -r pid; do
            if kill -0 "$pid" 2>/dev/null; then
                print_success "Parando processo $pid..."
                kill "$pid" 2>/dev/null || true
                sleep 0.5
                kill -9 "$pid" 2>/dev/null || true
                stopped_any=true
            fi
        done < "$PID_FILE"
        rm -f "$PID_FILE"
    fi
    
    # Liberar portas específicas (caso ainda estejam ocupadas)
    for port in 3000 3001 3002 3003 8000; do
        if lsof -ti:$port > /dev/null 2>&1; then
            print_warning "Liberando porta $port..."
            lsof -ti:$port | xargs kill -9 2>/dev/null || true
        fi
    done
    
    if [ "$stopped_any" = false ]; then
        print_warning "Nenhum serviço encontrado rodando"
    else
        print_success "Todos os serviços parados"
    fi
}

show_logs() {
    print_header "Logs dos Serviços"
    
    if [ -f "$ROOT_DIR/backend.log" ]; then
        echo "${BLUE}--- Backend Log (últimas 20 linhas) ---${NC}"
        tail -n 20 "$ROOT_DIR/backend.log"
        echo ""
    fi
    
    if [ -f "$ROOT_DIR/frontend.log" ]; then
        echo "${BLUE}--- Frontend Log (últimas 20 linhas) ---${NC}"
        tail -n 20 "$ROOT_DIR/frontend.log"
        echo ""
    fi
}

show_status() {
    print_header "Status dos Serviços"
    
    local backend_running=false
    local frontend_running=false
    local backend_port=""
    local frontend_port=""
    
    # Verificar backend (uvicorn)
    if pgrep -f "uvicorn siga.main:app" > /dev/null; then
        backend_running=true
        backend_port=$(lsof -ti:8000 2>/dev/null && echo "8000" || echo "??")
        echo "${GREEN}✓ Backend rodando${NC}"
        echo "  API: http://localhost:8000"
        echo "  Docs: http://localhost:8000/docs"
    fi
    
    # Verificar frontend (vite)
    if pgrep -f "vite.*--port" > /dev/null; then
        frontend_running=true
        # Encontrar a porta do vite
        for port in 3000 3001 3002 3003 3004 3005; do
            if lsof -ti:$port > /dev/null 2>&1; then
                frontend_port=$port
                break
            fi
        done
        echo "${GREEN}✓ Frontend rodando${NC}"
        echo "  Web: http://localhost:${frontend_port:-3000}"
    fi
    
    if [ "$backend_running" = false ]; then
        echo "${RED}✗ Backend parado${NC}"
    fi
    
    if [ "$frontend_running" = false ]; then
        echo "${RED}✗ Frontend parado${NC}"
    fi
    
    # Mostrar portas ocupadas
    if [ "$backend_running" = false ] || [ "$frontend_running" = false ]; then
        echo ""
        echo "${YELLOW}Portas ocupadas:${NC}"
        for port in 3000 3001 3002 3003 8000; do
            if lsof -ti:$port > /dev/null 2>&1; then
                echo "  Porta $port: ocupada"
            fi
        done
    fi
}

show_menu() {
    echo ""
    echo "${BLUE}SIGA Bandeirantes - Menu de Controle${NC}"
    echo ""
    echo "1) Iniciar Backend e Frontend"
    echo "2) Iniciar apenas Backend"
    echo "3) Iniciar apenas Frontend"
    echo "4) Parar todos os serviços"
    echo "5) Ver status"
    echo "6) Ver logs"
    echo "7) Abrir web browser (localhost:3000)"
    echo "0) Sair"
    echo ""
}

# Main loop
main() {
    print_header "SIGA Bandeirantes - Dev Server"
    
    check_prerequisites
    check_database
    
    while true; do
        show_menu
        read -p "Escolha uma opção: " choice
        
        case $choice in
            1)
                start_backend
                start_frontend
                show_status
                ;;
            2)
                start_backend
                show_status
                ;;
            3)
                start_frontend
                show_status
                ;;
            4)
                stop_services
                ;;
            5)
                show_status
                ;;
            6)
                show_logs
                ;;
            7)
                # Encontrar porta do frontend
                local frontend_url="http://localhost:3000"
                for port in 3000 3001 3002 3003 3004 3005; do
                    if lsof -ti:$port > /dev/null 2>&1; then
                        frontend_url="http://localhost:$port"
                        break
                    fi
                done
                
                if command -v xdg-open &> /dev/null; then
                    xdg-open "$frontend_url"
                elif command -v open &> /dev/null; then
                    open "$frontend_url"
                else
                    print_error "Não foi possível abrir o navegador automaticamente"
                    echo "  Abra manualmente: $frontend_url"
                fi
                ;;
            0)
                stop_services
                print_success "Até logo!"
                exit 0
                ;;
            *)
                print_error "Opção inválida"
                ;;
        esac
    done
}

# Executar main
main
