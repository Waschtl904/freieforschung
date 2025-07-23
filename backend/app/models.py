from pydantic import BaseModel
from uuid import UUID
from typing import Dict, Any

class Project(BaseModel):
    id: UUID
    title: str
    description: str
    # JSON-LD-Context für Semantic Tagging
    context: Dict[str, Any] = {
        "@context": {
            "id": "@id",
            "type": "@type",
            "title": "http://schema.org/name",
            "description": "http://schema.org/description",
            "category": "http://schema.org/genre",
            "tags": "http://schema.org/keywords"
        }
    }
