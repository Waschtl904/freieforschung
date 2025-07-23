from sqlmodel import Session, create_engine
from sqlmodel import SQLModel
from typing import Generator

# Beispiel-Verbindungs-URL anpassen:
DATABASE_URL = "postgresql+asyncpg://postgres:postgres@localhost:5432/freieforschung"

# Engine erzeugen
engine = create_engine(DATABASE_URL, echo=True)

def get_session() -> Generator[Session, None, None]:
    """
    Dependency für FastAPI: liefert eine SQLModel-Session und schließt sie danach.
    """
    with Session(engine) as session:
        yield session
