from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import Session, create_engine
from sqlmodel import SQLModel
from typing import Generator
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

# Beispiel-Verbindungs-URL anpassen:
DATABASE_URL = "postgresql+asyncpg://postgres:postgres@localhost:5432/freieforschung"

# Engine erzeugen
engine = create_engine(SQLALCHEMY_DATABASE_URL)

def get_session() -> Generator[Session, None, None]:
    """
    Dependency für FastAPI: liefert eine SQLModel-Session und schließt sie danach.
    """
    with Session(engine) as session:
        yield session

SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/dbname"

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)