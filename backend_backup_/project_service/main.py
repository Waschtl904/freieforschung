import os
import pathlib
from dotenv import load_dotenv
from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel

from project_service.models import Project
from project_service.crud import create_project, list_projects

# .env im Projekt-Root laden
ROOT = pathlib.Path(__file__).resolve().parents[2]
load_dotenv(ROOT / ".env")

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL fehlt – .env prüfen!")

engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine,
                            class_=AsyncSession,
                            expire_on_commit=False)

app = FastAPI(title="project_service")


async def get_db() -> AsyncSession:
    async with SessionLocal() as session:
        yield session


@app.on_event("startup")
async def on_startup() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


@app.get("/health")
async def health_check():
    return {"status": "OK", "service": "project_service"}


# ---------- Endpunkte ----------

@app.post("/projects", response_model=Project, status_code=201)
async def api_create_project(p: Project,
                            db: AsyncSession = Depends(get_db)) -> Project:
    return await create_project(db, p)


@app.get("/projects", response_model=list[Project])
async def api_list_projects(db: AsyncSession = Depends(get_db)) -> list[Project]:
    return await list_projects(db)
