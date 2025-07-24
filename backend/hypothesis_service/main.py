import os
from fastapi import FastAPI, Depends
from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from dotenv import load_dotenv

from hypothesis_service.models import HypothesisModel
from hypothesis_service.crud import create_hypothesis, list_hypotheses

load_dotenv()
DATABASE_URL = os.getenv('DATABASE_URL')
engine = create_async_engine(DATABASE_URL, echo=True)

async def get_session() -> AsyncSession:
    async with AsyncSession(engine) as session:
        yield session

app = FastAPI(title='hypothesis-service')

@app.on_event('startup')
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

@app.post('/hypothesis-service/', response_model=HypothesisModel, status_code=201)
async def api_create(obj: HypothesisModel, session: AsyncSession = Depends(get_session)):
    return await create_hypothesis(session, obj)

@app.get('/hypothesis-service/project/{project_id}', response_model=list[HypothesisModel])
async def api_list(project_id: str, session: AsyncSession = Depends(get_session)):
    return await list_hypotheses(session)
