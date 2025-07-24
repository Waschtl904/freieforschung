FROM python:3.11-slim

WORKDIR /app
ENV PYTHONPATH=/app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Code ins hypothesis_service-Package kopieren
RUN mkdir -p hypothesis_service
COPY . /app/hypothesis_service

EXPOSE 8002
CMD ["uvicorn","hypothesis_service.main:app","--host","0.0.0.0","--port","8002"]
