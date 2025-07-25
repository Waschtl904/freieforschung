import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI, Depends
from auth_service.models import User

# Absolute Importe aus dem Package auth_service
from auth_service.models import User
from auth_service.crud import create_user, list_users



# Umgebungsvariablen aus .env laden
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))
DATABASE_URL = os.getenv('DATABASE_URL')

# Engine initialisieren
engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Dependency: Liefert pro Request eine AsyncSession
async def get_session() -> AsyncSession:
    async with AsyncSession(engine) as session:
        yield session

# FastAPI-App initialisieren
app = FastAPI(title='auth_service')

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
