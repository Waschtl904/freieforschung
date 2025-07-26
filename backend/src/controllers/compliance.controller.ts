import { Request, Response } from 'express';
import { ComplianceService } from '../services/compliance.service';

export class ComplianceController {
  private complianceService: ComplianceService;

  constructor() {
    this.complianceService = new ComplianceService();
  }

  async getComplianceStatus(req: Request, res: Response): Promise<void> {
    try {
      const status = await this.complianceService.getComplianceStatus();
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Abrufen des Compliance-Status' });
    }
  }

  async createComplianceReport(req: Request, res: Response): Promise<void> {
    try {
      const report = await this.complianceService.createComplianceReport(req.body);
      res.json(report);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Erstellen des Compliance-Reports' });
    }
  }
}

const complianceController = new ComplianceController();
export const getComplianceStatus = complianceController.getComplianceStatus.bind(complianceController);
export const createComplianceReport = complianceController.createComplianceReport.bind(complianceController);
