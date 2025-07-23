from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime

class HypothesisBase(BaseModel):
    project_id: UUID = Field(..., description="Zugehöriges Projekt")
    text: str = Field(..., min_length=5, max_length=5_000)

class HypothesisCreate(HypothesisBase):
    pass

class Hypothesis(HypothesisBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
