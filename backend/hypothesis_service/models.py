from typing import Optional
from uuid import UUID, uuid4
from sqlmodel import SQLModel, Field


class Hypothesis(SQLModel, table=True):
    """Datenbank-Tabelle für Hypothesen."""
    id: UUID = Field(default_factory=uuid4, primary_key=True, index=True)
    title: str
    description: Optional[str] = None
    status: str = "draft"          # draft | accepted | rejected
