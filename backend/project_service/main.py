import os
from fastapi import FastAPI, Depends
from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from dotenv import load_dotenv

from project_service.models import ProjectModel
from project_service.crud import create_project, list_projects

load_dotenv()
DATABASE_URL = os.getenv('DATABASE_URL')
engine = create_async_engine(DATABASE_URL, echo=True)

async def get_session() -> AsyncSession:
    async with AsyncSession(engine) as session:
        yield session

app = FastAPI(title='project-service')

@app.on_event('startup')
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

@app.post('/project-service/', response_model=ProjectModel, status_code=201)
async def api_create(obj: ProjectModel, session: AsyncSession = Depends(get_session)):
    return await create_project(session, obj)

@app.get('/project-service/', response_model=list[ProjectModel])
async def api_list(session: AsyncSession = Depends(get_session)):
    return await list_projects(session)
