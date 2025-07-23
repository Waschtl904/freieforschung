from fastapi import APIRouter, HTTPException
from uuid import UUID
from .models import Project
from .db import get_project_from_db  # dein Datenzugriff

router = APIRouter(prefix="/projects", tags=["projects"])

@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: UUID):
    project = await get_project_from_db(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Projekt nicht gefunden")
    # Pydantic-Modell enthält schon den "@context"
    return project
