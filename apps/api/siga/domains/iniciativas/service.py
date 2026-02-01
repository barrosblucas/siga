from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession

from siga.db.models import Iniciativa, Meta
from siga.logging.logger import get_logger

logger = get_logger(__name__)


async def create_iniciativa(session: AsyncSession, data) -> Iniciativa:
    iniciativa = Iniciativa(
        titulo=data.titulo,
        descricao=data.descricao,
        status=data.status,
        data_inicio=datetime.fromisoformat(data.data_inicio).date() if data.data_inicio else None,
        data_fim_prevista=datetime.fromisoformat(data.data_fim_prevista).date() if data.data_fim_prevista else None,
        progresso=data.progresso,
    )

    session.add(iniciativa)
    await session.flush()

    return iniciativa


async def create_meta(session: AsyncSession, iniciativa_id: str, data) -> Meta:
    meta = Meta(
        iniciativa_id=iniciativa_id,
        titulo=data.titulo,
        descricao=data.descricao,
        valor_alvo=data.valor_alvo,
        valor_atual=data.valor_atual,
        unidade_medida=data.unidade_medida,
        prazo=datetime.fromisoformat(data.prazo).date() if data.prazo else None,
        status=data.status,
    )

    session.add(meta)
    await session.flush()

    return meta
