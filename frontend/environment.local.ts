// frontend/src/environments/environment.local.ts
export const environment = {
  production: false,
  apiBaseUrl: "http://localhost:8000",    // Auth-Service
  websocketUrl: "ws://localhost:8000/ws", // optional
  googleClientId: "…"                     // falls OAuth im Frontend
};
