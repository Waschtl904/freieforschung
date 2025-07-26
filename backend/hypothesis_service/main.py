import pathlib, os
from dotenv import load_dotenv
from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel
from hypothesis_service.models import Hypothesis
from hypothesis_service.crud import create_hypothesis, list_hypotheses

ROOT = pathlib.Path(__file__).resolve().parents[2]
load_dotenv(ROOT / ".env")

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL fehlt – .env prüfen!")

engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine,
                            class_=AsyncSession,
                            expire_on_commit=False)

app = FastAPI(title="hypothesis_service")


async def get_db() -> AsyncSession:
    async with SessionLocal() as session:
        yield session


@app.on_event("startup")
async def startup() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


@app.post("/hypotheses", response_model=Hypothesis, status_code=201)
async def api_create(h: Hypothesis,
                     db: AsyncSession = Depends(get_db)) -> Hypothesis:
    return await create_hypothesis(db, h)


@app.get("/hypotheses", response_model=list[Hypothesis])
async def api_list(db: AsyncSession = Depends(get_db)) -> list[Hypothesis]:
    return await list_hypotheses(db)
