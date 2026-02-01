from fastapi import APIRouter, Depends
from sqlalchemy import and_, select
from sqlalchemy.ext.asyncio import AsyncSession

from siga.db import get_session
from siga.db.models import TransparenciaContrato, TransparenciaDespesa, TransparenciaReceita
from siga.logging.logger import get_logger

logger = get_logger(__name__)
router = APIRouter(prefix="/api/transparencia", tags=["transparencia"])


@router.get("/despesas")
async def get_despesas(
    ano: int | None = None,
    mes: int | None = None,
    categoria: str | None = None,
    limit: int = 20,
    offset: int = 0,
    session: AsyncSession = Depends(get_session)
):
    conditions = []
    if ano:
        conditions.append(TransparenciaDespesa.ano == ano)
    if mes:
        conditions.append(TransparenciaDespesa.mes == mes)
    if categoria:
        conditions.append(TransparenciaDespesa.categoria.ilike(f"%{categoria}%"))  # type: ignore

    query = select(TransparenciaDespesa)
    if conditions:
        query = query.where(and_(*conditions))

    query = query.limit(limit).offset(offset)
    result = await session.execute(query)
    despesas = result.scalars().all()

    logger.info("listagem_despesas", count=len(despesas), ano=ano, mes=mes)

    return [
        {
            "id": d.id,
            "ano": d.ano,
            "mes": d.mes,
            "categoria": d.categoria,
            "subcategoria": d.subcategoria,
            "valor": float(d.valor),
            "descricao": d.descricao,
            "data_registro": d.data_registro.isoformat(),
        }
        for d in despesas
    ]


@router.get("/receitas")
async def get_receitas(
    ano: int | None = None,
    mes: int | None = None,
    fonte: str | None = None,
    limit: int = 20,
    offset: int = 0,
    session: AsyncSession = Depends(get_session)
):
    conditions = []
    if ano:
        conditions.append(TransparenciaReceita.ano == ano)
    if mes:
        conditions.append(TransparenciaReceita.mes == mes)
    if fonte:
        conditions.append(TransparenciaReceita.fonte.ilike(f"%{fonte}%"))  # type: ignore

    query = select(TransparenciaReceita)
    if conditions:
        query = query.where(and_(*conditions))

    query = query.limit(limit).offset(offset)
    result = await session.execute(query)
    receitas = result.scalars().all()

    logger.info("listagem_receitas", count=len(receitas), ano=ano, mes=mes)

    return [
        {
            "id": r.id,
            "ano": r.ano,
            "mes": r.mes,
            "fonte": r.fonte,
            "valor": float(r.valor),
            "descricao": r.descricao,
            "data_registro": r.data_registro.isoformat(),
        }
        for r in receitas
    ]


@router.get("/contratos")
async def get_contratos(
    status: str | None = None,
    fornecedor: str | None = None,
    limit: int = 20,
    offset: int = 0,
    session: AsyncSession = Depends(get_session)
):
    conditions = []
    if status:
        conditions.append(TransparenciaContrato.status == status)
    if fornecedor:
        conditions.append(TransparenciaContrato.fornecedor.ilike(f"%{fornecedor}%"))  # type: ignore

    query = select(TransparenciaContrato)
    if conditions:
        query = query.where(and_(*conditions))

    query = query.limit(limit).offset(offset)
    result = await session.execute(query)
    contratos = result.scalars().all()

    logger.info("listagem_contratos", count=len(contratos), status=status)

    return [
        {
            "id": c.id,
            "numero": c.numero,
            "fornecedor": c.fornecedor,
            "objeto": c.objeto,
            "valor": float(c.valor),
            "data_inicio": c.data_inicio.isoformat(),
            "data_fim": c.data_fim.isoformat() if c.data_fim else None,
            "status": c.status,
        }
        for c in contratos
    ]
