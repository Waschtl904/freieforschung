FROM python:3.11-slim
WORKDIR /app
ENV PYTHONPATH=/app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Dateien ins auth_service-Unterverzeichnis kopieren
RUN mkdir auth_service
COPY . /app/auth_service

EXPOSE 8000
CMD ["uvicorn","auth_service.main:app","--host","0.0.0.0","--port","8000"]
