
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import and_, select
from sqlalchemy.ext.asyncio import AsyncSession

from siga.db import get_session
from siga.db.models import Iniciativa, Meta
from siga.logging.logger import get_logger

logger = get_logger(__name__)
router = APIRouter(prefix="/api/iniciativas", tags=["iniciativas"])


class CreateIniciativaRequest(BaseModel):
    titulo: str
    descricao: str
    status: str
    data_inicio: str | None = None
    data_fim_prevista: str | None = None
    progresso: int = 0


class UpdateIniciativaRequest(BaseModel):
    titulo: str | None = None
    descricao: str | None = None
    status: str | None = None
    data_inicio: str | None = None
    data_fim_prevista: str | None = None
    progresso: int | None = None


class CreateMetaRequest(BaseModel):
    iniciativa_id: str
    titulo: str
    descricao: str
    valor_alvo: float
    valor_atual: float = 0
    unidade_medida: str
    prazo: str | None = None
    status: str


@router.get("")
async def list_iniciativas(
    status: str | None = None,
    limit: int = 20,
    offset: int = 0,
    session: AsyncSession = Depends(get_session)
):
    conditions = []
    if status:
        conditions.append(Iniciativa.status == status)

    query = select(Iniciativa)
    if conditions:
        query = query.where(and_(*conditions))

    query = query.order_by(Iniciativa.data_inicio.desc().nulls_last()).limit(limit).offset(offset)
    result = await session.execute(query)
    iniciativas = result.scalars().all()

    logger.info("listagem_iniciativas", count=len(iniciativas), status=status)

    return [
        {
            "id": i.id,
            "titulo": i.titulo,
            "descricao": i.descricao,
            "status": i.status,
            "data_inicio": i.data_inicio.isoformat() if i.data_inicio else None,
            "data_fim_prevista": i.data_fim_prevista.isoformat() if i.data_fim_prevista else None,
            "progresso": i.progresso,
        }
        for i in iniciativas
    ]


@router.post("")
async def create_iniciativa(
    data: CreateIniciativaRequest,
    session: AsyncSession = Depends(get_session)
):
    from siga.domains.iniciativas.service import create_iniciativa as service_create

    iniciativa = await service_create(session, data)

    logger.info("criacao_iniciativa", iniciativa_id=iniciativa.id, titulo=data.titulo)

    return {
        "id": iniciativa.id,
        "titulo": iniciativa.titulo,
        "descricao": iniciativa.descricao,
        "status": iniciativa.status,
        "data_inicio": iniciativa.data_inicio.isoformat() if iniciativa.data_inicio else None,
        "data_fim_prevista": iniciativa.data_fim_prevista.isoformat() if iniciativa.data_fim_prevista else None,
        "progresso": iniciativa.progresso,
    }


@router.get("/{iniciativa_id}")
async def get_iniciativa(
    iniciativa_id: str,
    session: AsyncSession = Depends(get_session)
):
    result = await session.execute(select(Iniciativa).where(Iniciativa.id == iniciativa_id))
    iniciativa = result.scalar_one_or_none()

    if not iniciativa:
        raise HTTPException(status_code=404, detail="Iniciativa não encontrada")

    metas_result = await session.execute(select(Meta).where(Meta.iniciativa_id == iniciativa_id))
    metas = metas_result.scalars().all()

    return {
        "id": iniciativa.id,
        "titulo": iniciativa.titulo,
        "descricao": iniciativa.descricao,
        "status": iniciativa.status,
        "data_inicio": iniciativa.data_inicio.isoformat() if iniciativa.data_inicio else None,
        "data_fim_prevista": iniciativa.data_fim_prevista.isoformat() if iniciativa.data_fim_prevista else None,
        "progresso": iniciativa.progresso,
        "metas": [
            {
                "id": m.id,
                "titulo": m.titulo,
                "descricao": m.descricao,
                "valor_alvo": float(m.valor_alvo),
                "valor_atual": float(m.valor_atual),
                "unidade_medida": m.unidade_medida,
                "prazo": m.prazo.isoformat() if m.prazo else None,
                "status": m.status,
            }
            for m in metas
        ],
    }


@router.get("/{iniciativa_id}/metas")
async def list_metas(
    iniciativa_id: str,
    status: str | None = None,
    session: AsyncSession = Depends(get_session)
):
    conditions = [Meta.iniciativa_id == iniciativa_id]
    if status:
        conditions.append(Meta.status == status)

    result = await session.execute(select(Meta).where(and_(*conditions)))
    metas = result.scalars().all()

    return [
        {
            "id": m.id,
            "iniciativa_id": m.iniciativa_id,
            "titulo": m.titulo,
            "descricao": m.descricao,
            "valor_alvo": float(m.valor_alvo),
            "valor_atual": float(m.valor_atual),
            "unidade_medida": m.unidade_medida,
            "prazo": m.prazo.isoformat() if m.prazo else None,
            "status": m.status,
        }
        for m in metas
    ]


@router.post("/{iniciativa_id}/metas")
async def create_meta(
    iniciativa_id: str,
    data: CreateMetaRequest,
    session: AsyncSession = Depends(get_session)
):
    from siga.domains.iniciativas.service import create_meta as service_create_meta

    meta = await service_create_meta(session, iniciativa_id, data)

    logger.info("criacao_meta", meta_id=meta.id, iniciativa_id=iniciativa_id)

    return {
        "id": meta.id,
        "iniciativa_id": meta.iniciativa_id,
        "titulo": meta.titulo,
        "descricao": meta.descricao,
        "valor_alvo": float(meta.valor_alvo),
        "valor_atual": float(meta.valor_atual),
        "unidade_medida": meta.unidade_medida,
        "prazo": meta.prazo.isoformat() if meta.prazo else None,
        "status": meta.status,
    }
