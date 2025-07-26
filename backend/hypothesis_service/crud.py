from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
# Lokaler Import
from models import Hypothesis

async def create_hypothesis(db: AsyncSession, hyp: Hypothesis) -> Hypothesis:
    db.add(hyp)
    await db.commit()
    await db.refresh(hyp)
    return hyp

async def list_hypotheses(db: AsyncSession) -> list[Hypothesis]:
    result = await db.execute(select(Hypothesis))
    return result.scalars().all()
