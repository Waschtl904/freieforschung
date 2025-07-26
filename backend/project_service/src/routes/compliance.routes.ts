import { Router, Request, Response } from 'express';
import { complianceService } from '../services/compliance.service';
const router = Router();

// Compliance-Reports abrufen
router.get('/reports', async (_, res: Response) => {
  const reports = await complianceService.getComplianceReports();
  res.json(reports);
});

// Datenschutzverletzung an DSB melden
router.post('/dsb-report', async (req: Request, res: Response) => {
  const { incidentType, description, affectedUsers } = req.body;
  const report = await complianceService.createDSBReport({
    incidentType, description, affectedUsers, measuresTaken: [], reportedAt: new Date(), reporterId: req.user?.id
  });
  res.json({ message: 'Meldung erstellt', reportId: report.id, dsbContact: { email: 'dsb@dsb.gv.at', address: 'Barichgasse 40-42, 1030 Wien' } });
});

export default router;
