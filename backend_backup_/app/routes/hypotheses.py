from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_session
from app.models.hypothesis import Hypothesis, HypothesisCreate
from app.crud.hypothesis_crud import create_hypothesis, get_hypotheses_by_project

router = APIRouter(prefix="/hypotheses", tags=["hypotheses"])

@router.post("/", response_model=Hypothesis, status_code=status.HTTP_201_CREATED)
async def post_hypothesis(payload: HypothesisCreate,
                          session: AsyncSession = Depends(get_session)):
    return await create_hypothesis(session, payload)

@router.get("/project/{project_id}", response_model=list[Hypothesis])
async def list_hypotheses(project_id: UUID,
                          session: AsyncSession = Depends(get_session)):
    return await get_hypotheses_by_project(session, project_id)
