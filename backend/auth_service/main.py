import os
from fastapi import FastAPI, Depends
from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from dotenv import load_dotenv

# Absolute Importe aus dem Package auth_service
from auth_service.models import User
from auth_service.crud import create_user, list_users

# Umgebungsvariablen aus .env laden
load_dotenv()
DATABASE_URL = os.getenv('DATABASE_URL')

# Async-SQLAlchemy-Engine erstellen
engine = create_async_engine(DATABASE_URL, echo=True)

# Dependency: Liefert pro Request eine AsyncSession
async def get_session() -> AsyncSession:
    async with AsyncSession(engine) as session:
        yield session

# FastAPI-App initialisieren
app = FastAPI(title='auth-service')

# Beim Start die Datenbanktabellen anlegen
@app.on_event('startup')
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

# Endpoint zum Anlegen eines neuen Users
@app.post('/auth-service/', response_model=User, status_code=201)
async def api_create(obj: User, session: AsyncSession = Depends(get_session)):
    return await create_user(session, obj)

# Endpoint zum Auflisten aller Users
@app.get('/auth-service/', response_model=list[User])
async def api_list(session: AsyncSession = Depends(get_session)):
    return await list_users(session)
