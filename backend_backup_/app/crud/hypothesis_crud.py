from uuid import UUID, uuid4
from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import HypothesisORM  # SQLAlchemy-Mapping
from app.models.hypothesis import HypothesisCreate, Hypothesis

async def create_hypothesis(session: AsyncSession, data: HypothesisCreate) -> Hypothesis:
    new_row = HypothesisORM(id=uuid4(), **data.dict())
    session.add(new_row)
    await session.commit()
    await session.refresh(new_row)
    return Hypothesis.from_orm(new_row)

async def get_hypotheses_by_project(session: AsyncSession, project_id: UUID) -> list[Hypothesis]:
    result = await session.execute(select(HypothesisORM).where(HypothesisORM.project_id == project_id))
    return [Hypothesis. from_orm(row) for row in result.scalars().all()]
