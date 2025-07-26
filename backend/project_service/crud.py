from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
# Lokaler Import
from models import Project

async def create_project(db: AsyncSession, proj: Project) -> Project:
    db.add(proj)
    await db.commit()
    await db.refresh(proj)
    return proj

async def list_projects(db: AsyncSession) -> list[Project]:
    result = await db.execute(select(Project))
    return result.scalars().all()
