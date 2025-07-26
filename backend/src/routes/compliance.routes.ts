import { Router } from 'express';
import { getComplianceStatus, createComplianceReport } from '../controllers/compliance.controller';

const router = Router();

router.get('/status', getComplianceStatus);
router.post('/report', createComplianceReport);

export default router;
