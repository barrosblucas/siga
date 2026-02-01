# SIGA Bandeirantes - Script de Controle

O script `siga.sh` facilita o gerenciamento dos serviços de desenvolvimento.

## Uso

```bash
./siga.sh
```

## Funcionalidades

### Menu Interativo

O script oferece um menu com as seguintes opções:

1. **Iniciar Backend e Frontend** - Inicia ambos os serviços
2. **Iniciar apenas Backend** - Inicia apenas o FastAPI
3. **Iniciar apenas Frontend** - Inicia apenas o Vite
4. **Parar todos os serviços** - Para backend e frontend
5. **Ver status** - Mostra se os serviços estão rodando
6. **Ver logs** - Exibe os logs dos serviços (últimas 20 linhas)
7. **Abrir web browser** - Abre http://localhost:3000 no navegador
0. **Sair** - Para serviços e encerra

### Funcionalidades Automáticas

O script verifica e configura automaticamente:

- ✅ Python 3 instalado
- ✅ Node.js instalado
- ✅ PostgreSQL rodando
- ✅ Virtual environment criado
- ✅ Dependências instaladas
- ✅ Banco de dados acessível
- ✅ Arquivo .env configurado
- ✅ Migrations aplicadas

### Logs

Os logs são salvos na raiz do projeto:

- `backend.log` - Logs do FastAPI
- `frontend.log` - Logs do Vite

## Exemplo de Uso

```bash
# Iniciar o script
./siga.sh

# Menu aparece:
# SIGA Bandeirantes - Menu de Controle
#
# 1) Iniciar Backend e Frontend
# 2) Iniciar apenas Backend
# 3) Iniciar apenas Frontend
# 4) Parar todos os serviços
# 5) Ver status
# 6) Ver logs
# 7) Abrir web browser (localhost:3000)
# 0) Sair
#
# Escolha uma opção: 1
```

## Comandos Directos (sem menu)

Você também pode criar atalhos personalizados:

```bash
# Criar comando para iniciar tudo
alias siga-start='~/siga/siga.sh <<< "1"'
alias siga-stop='~/siga/siga.sh <<< "4"'
alias siga-status='~/siga/siga.sh <<< "5"'
```

## Troubleshooting

### Serviço não inicia
- Verifique os logs com a opção 6 do menu
- Confira se a porta 8000 ou 3000 já está em uso

### Erro de banco de dados
- O script vai perguntar se deseja criar o banco
- Ou execute manualmente: `./scripts/quick-setup-postgres.sh`

### Erro de dependências
- O script instala automaticamente se necessário
- Se falhar, tente manualmente:
  ```bash
  cd apps/api
  source .venv/bin/activate
  pip install -r requirements.txt
  ```

### Limpar tudo
```bash
# Parar serviços
./siga.sh
# Opção 4

# Remover logs (opcional)
rm -f backend.log frontend.log .siga_pids

# Reinstalar venv (se necessário)
cd apps/api
rm -rf .venv
python3 -m venv .venv
```

## Detalhes Técnicos

- Backend roda com `uvicorn siga.main:app --reload --port 8000`
- Frontend roda com `pnpm dev`
- Processos rodam em background com `nohup`
- PIDs são guardados em `.siga_pids`
- Saída é redirecionada para arquivos de log

## Ports

- **Backend**: 8000
- **Frontend**: 3000

## URLs

- **API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Web App**: http://localhost:3000
