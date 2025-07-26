# freieforschung-at/backend/project_service/models.py
from typing import Optional
from uuid import UUID, uuid4
from sqlalchemy.dialects.postgresql import JSONB
from sqlmodel import SQLModel, Field, Column

class Project(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True, index=True)
    name: str
    summary: Optional[str] = None
    status: str = "open"
    tags: Optional[list[str]] = Field(sa_column=Column(JSONB))
