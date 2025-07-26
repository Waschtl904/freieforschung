"use strict";
// backend/src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables from .env in project root
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));
// Health‐check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
// Example: import and mount your service routers
// Adjust the paths if you rename folders (e.g. scr → src)
const privacy_routes_1 = __importDefault(require("./auth_service/src/routes/privacy.routes"));
const project_routes_1 = __importDefault(require("./project_service/src/routes/project.routes"));
const hypothesis_routes_1 = __importDefault(require("./hypothesis_service/src/routes/hypothesis.routes"));
app.use('/api/privacy', privacy_routes_1.default);
app.use('/api/projects', project_routes_1.default);
app.use('/api/hypotheses', hypothesis_routes_1.default);
// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});
// Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
