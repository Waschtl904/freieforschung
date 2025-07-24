from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession

from hypothesis_service.models import HypothesisModel

async def create_hypothesis(session: AsyncSession, obj: HypothesisModel) -> HypothesisModel:
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj

async def list_hypotheses(session: AsyncSession) -> list[HypothesisModel]:
    result = await session.exec(select(HypothesisModel))
    return result.all()
