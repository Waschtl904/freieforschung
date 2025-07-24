# 1) BASIS-IMAGE FESTLEGEN
FROM python:3.11-slim

WORKDIR /app
ENV PYTHONPATH=/app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Code ins project_service-Package kopieren
RUN mkdir -p project_service
COPY . /app/project_service

EXPOSE 8001
CMD ["uvicorn","project_service.main:app","--host","0.0.0.0","--port","8001"]
