from fastapi import FastAPI
from app.routes import hypotheses, projects

app = FastAPI(title="Freie Forschung Backend", version="1.0.0")

# Router einbinden
app.include_router(hypotheses.router, prefix="/api")
app.include_router(projects.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Freie Forschung API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
