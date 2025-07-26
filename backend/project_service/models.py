from typing import Optional
from uuid import UUID, uuid4

from sqlalchemy.dialects.postgresql import JSONB
from sqlmodel import SQLModel, Field, Column


class Project(SQLModel, table=True):
    """Datenbank-Tabelle für Forschungsprojekte."""
    id: UUID = Field(default_factory=uuid4, primary_key=True, index=True)
    name: str
    summary: Optional[str] = None
    status: str = "open"               # open | in_progress | closed
    # JSON-Spalte für beliebige Tag-Listen
    tags: Optional[list[str]] = Field(
        sa_column=Column(JSONB)        # PostgreSQL-spezifischer JSONB-Typ
    )
