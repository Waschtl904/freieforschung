import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { authenticate } from './middleware/authenticate';
import privacyRoutes from './routes/privacy.routes';
import complianceRoutes from './routes/compliance.routes';
import hypothesisRoutes from './routes/hypothesis.routes';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();

// Grundlegende Security-Header
app.use(helmet());
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
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

// Routes
app.use('/api/privacy', privacyRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/hypothesis', hypothesisRoutes);

// Middleware (nach den öffentlichen Routes)
app.use(authenticate);

// Health-Check
app.get('/api/health', (_, res) => res.json({ 
  status: 'OK', 
  timestamp: new Date(),
  version: '0.1.0'
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server läuft auf Port ${PORT}`));

export default app;
