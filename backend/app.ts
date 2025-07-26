import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import privacyRoutes from './auth_service/src/routes/privacy.routes';
import complianceRoutes from './project_service/src/routes/compliance.routes';
import hypothesisRoutes from './hypothesis_service/src/routes/hypothesis.routes';
import dotenv from 'dotenv';
import path from 'path';

const app = express();

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Grundlegende Security-Header
app.use(helmet());
// HSTS
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
// CSP
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:"],
    connectSrc: ["'self'", "https://api.freieforschung.at"]
  }
}));

app.use(cors({ origin: ['http://localhost:4200'], credentials: true }));
app.use(express.json());
app.use('/api/privacy', privacyRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/hypothesis', hypothesisRoutes);

// Health-Check
app.get('/health', (_, res) => res.json({ status: 'OK', ts: new Date() }));

app.listen(3000, () => console.log('🚀 Server auf Port 3000'));
