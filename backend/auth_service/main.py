import os, pathlib
from dotenv import load_dotenv
from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel                     # ← Import für Metadata
from auth_service.models import User               # ← Ihr User‐Model
from auth_service.crud import create_user, list_users

ROOT = pathlib.Path(__file__).resolve().parents[2]
load_dotenv(ROOT / ".env")


# 2. Datenbank‐URL aus .env
DATABASE_URL = os.getenv('DATABASE_URL')

# 3. Async‐Engine und Session-Maker konfigurieren
engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# 4. FastAPI-App initialisieren
app = FastAPI(title='auth_service')

# 5. Dependency, um pro Request eine DB-Session zu erhalten
async def get_session() -> AsyncSession:
    async with SessionLocal() as session:
        yield session

# 6. Beim Startup die Tabellen anlegen
@app.on_event('startup')
async def on_startup():
    async with engine.begin() as conn:
        # benötigt SQLModel.metadata
        await conn.run_sync(SQLModel.metadata.create_all)

# 7. Endpoints
@app.post('/auth-service/', response_model=User, status_code=201)
async def api_create(obj: User, session: AsyncSession = Depends(get_session)):
    return await create_user(session, obj)

@app.get('/auth-service/', response_model=list[User])
async def api_list(session: AsyncSession = Depends(get_session)):
    return await list_users(session)
