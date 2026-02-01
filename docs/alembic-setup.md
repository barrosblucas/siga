# Alembic environment configuration for SIGA Bandeirantes

## Importante: PostgreSQL Driver

O Alembic usa um **driver síncrono** para migrations, diferente da aplicação que usa `asyncpg`.

### URL no alembic.ini
```
postgresql+psycopg2://postgres:lb107400@localhost:5432/siga_db
```

### URL na aplicação (.env)
```
postgresql+asyncpg://postgres:lb107400@localhost:5432/siga_db
```

## Por que drivers diferentes?

- **Alembic:** Precisa de driver síncrono (`postgresql+psycopg2://`)
- **FastAPI:** Usa driver assíncrono (`postgresql+asyncpg://`)

## Instalar psycopg2

Se tiver erro de driver faltando:

```bash
cd apps/api
source .venv/bin/activate
pip install psycopg2-binary
```

## Criar nova migration

```bash
alembic revision --autogenerate -m "descrição da migration"
```

## Aplicar migrations

```bash
alembic upgrade head
```

## Verificar versão atual

```bash
alembic current
```

## Reverter migration

```bash
alembic downgrade -1  # Reverte 1 migration
alembic downgrade base  # Reverte todas
```
