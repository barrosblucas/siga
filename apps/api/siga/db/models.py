from collections.abc import AsyncGenerator
from datetime import date
from uuid import uuid4

from sqlalchemy import Date, ForeignKey, Integer, Numeric, String
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from siga.config import get_settings


class Base(DeclarativeBase):
    pass


class TransparenciaDespesa(Base):
    __tablename__ = "transparencia_despesas"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid4()))
    ano: Mapped[int] = mapped_column(Integer)
    mes: Mapped[int] = mapped_column(Integer)
    categoria: Mapped[str] = mapped_column(String(100))
    subcategoria: Mapped[str | None] = mapped_column(String(100), nullable=True)
    valor: Mapped[float] = mapped_column(Numeric(15, 2))
    descricao: Mapped[str | None] = mapped_column(String(500), nullable=True)
    data_registro: Mapped[date] = mapped_column(Date)


class TransparenciaReceita(Base):
    __tablename__ = "transparencia_receitas"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid4()))
    ano: Mapped[int] = mapped_column(Integer)
    mes: Mapped[int] = mapped_column(Integer)
    fonte: Mapped[str] = mapped_column(String(100))
    valor: Mapped[float] = mapped_column(Numeric(15, 2))
    descricao: Mapped[str | None] = mapped_column(String(500), nullable=True)
    data_registro: Mapped[date] = mapped_column(Date)


class TransparenciaContrato(Base):
    __tablename__ = "transparencia_contratos"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid4()))
    numero: Mapped[str] = mapped_column(String(50))
    fornecedor: Mapped[str] = mapped_column(String(200))
    objeto: Mapped[str] = mapped_column(String(500))
    valor: Mapped[float] = mapped_column(Numeric(15, 2))
    data_inicio: Mapped[date] = mapped_column(Date)
    data_fim: Mapped[date | None] = mapped_column(Date, nullable=True)
    status: Mapped[str] = mapped_column(String(20))


class Iniciativa(Base):
    __tablename__ = "iniciativas"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid4()))
    titulo: Mapped[str] = mapped_column(String(200))
    descricao: Mapped[str] = mapped_column(String(1000))
    status: Mapped[str] = mapped_column(String(20))
    data_inicio: Mapped[date | None] = mapped_column(Date, nullable=True)
    data_fim_prevista: Mapped[date | None] = mapped_column(Date, nullable=True)
    progresso: Mapped[int] = mapped_column(Integer, default=0)


class Meta(Base):
    __tablename__ = "metas"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid4()))
    iniciativa_id: Mapped[str] = mapped_column(String(36), ForeignKey("iniciativas.id"))
    titulo: Mapped[str] = mapped_column(String(200))
    descricao: Mapped[str] = mapped_column(String(500))
    valor_alvo: Mapped[float] = mapped_column(Numeric(15, 2))
    valor_atual: Mapped[float] = mapped_column(Numeric(15, 2), default=0)
    unidade_medida: Mapped[str] = mapped_column(String(50))
    prazo: Mapped[date | None] = mapped_column(Date, nullable=True)
    status: Mapped[str] = mapped_column(String(20))


class Indicador(Base):
    __tablename__ = "indicadores"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid4()))
    meta_id: Mapped[str] = mapped_column(String(36), ForeignKey("metas.id"))
    nome: Mapped[str] = mapped_column(String(200))
    descricao: Mapped[str | None] = mapped_column(String(500), nullable=True)
    valor: Mapped[float] = mapped_column(Numeric(15, 2))
    data_registro: Mapped[date] = mapped_column(Date)


engine = create_async_engine(get_settings().database_url)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session
