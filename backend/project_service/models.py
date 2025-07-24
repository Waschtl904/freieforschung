from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4

class ProjectModel(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    title: str
    description: str
