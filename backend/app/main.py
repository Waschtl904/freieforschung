from app.routes import hypotheses  # NEW

app.include_router(hypotheses.router)  # unter bestehende include_router-Zeilen einfügen
