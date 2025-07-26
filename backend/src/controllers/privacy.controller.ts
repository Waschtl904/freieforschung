import { Request, Response } from 'express';
import { PrivacyService } from '../services/privacy.service';

export class PrivacyController {
  private privacyService: PrivacyService;

  constructor() {
    this.privacyService = new PrivacyService();
  }

  async getPrivacySettings(req: Request, res: Response): Promise<void> {
    try {
      const settings = await this.privacyService.getPrivacySettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Abrufen der Datenschutzeinstellungen' });
    }
  }

  async updatePrivacySettings(req: Request, res: Response): Promise<void> {
    try {
      const settings = await this.privacyService.updatePrivacySettings(req.body);
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Aktualisieren der Datenschutzeinstellungen' });
    }
  }
}

// Export einzelner Funktionen für einfache Route-Bindung
const privacyController = new PrivacyController();
export const getPrivacySettings = privacyController.getPrivacySettings.bind(privacyController);
export const updatePrivacySettings = privacyController.updatePrivacySettings.bind(privacyController);
