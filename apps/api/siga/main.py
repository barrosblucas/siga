from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from siga.domains.transparencia.controller import router as transparencia_router
from siga.domains.iniciativas.controller import router as iniciativas_router
from siga.logging.logger import configure_logging, get_logger
from siga.config import get_settings


settings = get_settings()
configure_logging(settings.log_level)
logger = get_logger(__name__)

app = FastAPI(
    title="SIGA Bandeirantes API",
    description="Sistema Integrado de Gestão Aberta",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transparencia_router)
app.include_router(iniciativas_router)


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "siga-api"}


@app.on_event("startup")
async def startup_event():
    logger.info("api_startup", environment=settings.environment)
