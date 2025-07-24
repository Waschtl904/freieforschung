from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession  # correct import
from auth_service.models import User  # match your renamed model

async def create_user(session: AsyncSession, obj: User) -> User:
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj

async def list_users(session: AsyncSession) -> list[User]:
    result = await session.exec(select(User))
    return result.all()

