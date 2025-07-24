from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession

from project_service.models import ProjectModel

async def create_project(session: AsyncSession, obj: ProjectModel) -> ProjectModel:
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj

async def list_projects(session: AsyncSession) -> list[ProjectModel]:
    result = await session.exec(select(ProjectModel))
    return result.all()
