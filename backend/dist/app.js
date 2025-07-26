"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const authenticate_1 = require("./middleware/authenticate");
const privacy_routes_1 = __importDefault(require("./routes/privacy.routes"));
const compliance_routes_1 = __importDefault(require("./routes/compliance.routes"));
const hypothesis_routes_1 = __importDefault(require("./routes/hypothesis.routes"));
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
const app = (0, express_1.default)();
// Grundlegende Security-Header
app.use((0, helmet_1.default)());
app.use(helmet_1.default.hsts({ maxAge: 31536000, includeSubDomains: true }));
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "https://api.freieforschung.at"]
    }
}));
app.use((0, cors_1.default)({ origin: ['http://localhost:4200'], credentials: true }));
app.use(express_1.default.json());
// Routes
app.use('/api/privacy', privacy_routes_1.default);
app.use('/api/compliance', compliance_routes_1.default);
app.use('/api/hypothesis', hypothesis_routes_1.default);
// Middleware (nach den öffentlichen Routes)
app.use(authenticate_1.authenticate);
// Health-Check
app.get('/api/health', (_, res) => res.json({
    status: 'OK',
    timestamp: new Date(),
    version: '0.1.0'
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server läuft auf Port ${PORT}`));
exports.default = app;
