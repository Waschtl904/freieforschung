import os
import pathlib
from dotenv import load_dotenv
from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel

# Lokale Imports statt auth_service.*
from models import User
from crud import create_user, list_users

# .env im Projekt-Root laden
ROOT_DIR = pathlib.Path(__file__).resolve().parents[2]
load_dotenv(ROOT_DIR / ".env")

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL fehlt – bitte .env prüfen!")

engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
app = FastAPI(title="auth_service")

async def get_session() -> AsyncSession:
    async with SessionLocal() as session:
        yield session

@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

@app.get("/health")
async def health():
    return {"status": "OK", "service": "auth_service"}

@app.post("/auth-service/users", response_model=User, status_code=201)
async def api_create_user(user: User, session: AsyncSession = Depends(get_session)):
    return await create_user(session, user)

@app.get("/auth-service/users", response_model=list[User])
async def api_list_users(session: AsyncSession = Depends(get_session)):
    return await list_users(session)
