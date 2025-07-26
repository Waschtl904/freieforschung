# freieforschung-at/backend/hypothesis_service/models.py
from typing import Optional
from uuid import UUID, uuid4
from sqlmodel import SQLModel, Field

class Hypothesis(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True, index=True)
    title: str
    description: Optional[str] = None
    status: str = "draft"
