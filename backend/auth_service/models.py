# freieforschung-at/backend/auth_service/models.py
from typing import Optional
from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    pseudonym: str
    email: str
    role: str = "researcher"
    hashed_password: Optional[str] = None
