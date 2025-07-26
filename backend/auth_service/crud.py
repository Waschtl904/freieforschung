from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
# Lokaler Import
from models import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def create_user(session: AsyncSession, user: User) -> User:
    if user.hashed_password:
        db_user = user
    else:
        hashed = pwd_context.hash(user.hashed_password or "")
        db_user = User(
            pseudonym=user.pseudonym,
            email=user.email,
            role=user.role,
            hashed_password=hashed,
        )
    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
    return db_user

async def list_users(session: AsyncSession) -> list[User]:
    result = await session.execute(select(User))
    return result.scalars().all()
