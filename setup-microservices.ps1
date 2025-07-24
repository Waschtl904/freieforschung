# setup-microservices.ps1
Param()

$services = @('auth-service','project-service','hypothesis-service')
$backend  = Join-Path $PSScriptRoot 'backend'

foreach ($svc in $services) {
  $dir = Join-Path $backend $svc
  New-Item -ItemType Directory -Force -Path $dir | Out-Null

  # requirements.txt
  @"
fastapi==0.95.2
uvicorn[standard]==0.22.0
sqlmodel==0.0.8
asyncpg==0.27.0
python-dotenv==1.0.0
"@ | Set-Content -Path (Join-Path $dir 'requirements.txt')

  # models.py
  @"
from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4

class ${($svc -replace '-','_')}Model(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    # TODO: Weitere Felder ergänzen
"@ | Set-Content -Path (Join-Path $dir 'models.py')

  # crud.py
  @"
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from .models import ${($svc -replace '-','_')}Model

async def create_${($svc -replace '-','_')}(session: AsyncSession, obj: ${($svc -replace '-','_')}Model) -> ${($svc -replace '-','_')}Model:
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj

async def list_${($svc -replace '-','_')}s(session: AsyncSession) -> list[${($svc -replace '-','_')}Model]:
    result = await session.exec(select(${($svc -replace '-','_')}Model))
    return result.all()
"@ | Set-Content -Path (Join-Path $dir 'crud.py')

  # main.py
  @"
import os
from fastapi import FastAPI, Depends
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession, create_async_engine
from dotenv import load_dotenv
from .models import ${($svc -replace '-','_')}Model
from .crud import create_${($svc -replace '-','_')}, list_${($svc -replace '-','_')}s

load_dotenv()
DATABASE_URL = os.getenv('DATABASE_URL')
engine = create_async_engine(DATABASE_URL, echo=True)

async def get_session() -> AsyncSession:
    async with AsyncSession(engine) as session:
        yield session

app = FastAPI(title='$svc')

@app.on_event('startup')
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

@app.post('/$svc/', response_model=${($svc -replace '-','_')}Model, status_code=201)
async def api_create(obj: ${($svc -replace '-','_')}Model, session: AsyncSession = Depends(get_session)):
    return await create_${($svc -replace '-','_')}(session, obj)

@app.get('/$svc/', response_model=list[${($svc -replace '-','_')}Model])
async def api_list(session: AsyncSession = Depends(get_session)):
    return await list_${($svc -replace '-','_')}s(session)
"@ | Set-Content -Path (Join-Path $dir 'main.py')

  # Dockerfile
  @"
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn","main:app","--host","0.0.0.0","--port","8000"]
"@ | Set-Content -Path (Join-Path $dir 'Dockerfile')

  # .env
  "DATABASE_URL=postgresql+asyncpg://postgres:postgres@db:5432/freieforschung" |
    Set-Content -Path (Join-Path $dir '.env')
}

# docker-compose.yml
@"
version: '3.9'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: freieforschung
    volumes:
      - db_data:/var/lib/postgresql/data
    ports:
      - '5432:5432'

  auth-service:
    build: ./backend/auth-service
    env_file:
      - ./backend/auth-service/.env
    depends_on:
      - db
    ports:
      - '8000:8000'

  project-service:
    build: ./backend/project-service
    env_file:
      - ./backend/project-service/.env
    depends_on:
      - db
    ports:
      - '8001:8001'

  hypothesis-service:
    build: ./backend/hypothesis-service
    env_file:
      - ./backend/hypothesis-service/.env
    depends_on:
      - db
    ports:
      - '8002:8002'

volumes:
  db_data:
"@ | Set-Content -Path (Join-Path $PSScriptRoot 'docker-compose.yml')

Write-Host 'Setup abgeschlossen. Führe nun in einer neuen PowerShell (nicht in .venv):'
Write-Host '  docker compose up --build'
