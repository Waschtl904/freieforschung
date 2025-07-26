"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePrivacySettings = exports.getPrivacySettings = exports.PrivacyController = void 0;
const privacy_service_1 = require("../services/privacy.service");
class PrivacyController {
    constructor() {
        this.privacyService = new privacy_service_1.PrivacyService();
    }
    async getPrivacySettings(req, res) {
        try {
            const settings = await this.privacyService.getPrivacySettings();
            res.json(settings);
        }
        catch (error) {
            res.status(500).json({ error: 'Fehler beim Abrufen der Datenschutzeinstellungen' });
        }
    }
    async updatePrivacySettings(req, res) {
        try {
            const settings = await this.privacyService.updatePrivacySettings(req.body);
            res.json(settings);
        }
        catch (error) {
            res.status(500).json({ error: 'Fehler beim Aktualisieren der Datenschutzeinstellungen' });
        }
    }
}
exports.PrivacyController = PrivacyController;
// Export einzelner Funktionen für einfache Route-Bindung
const privacyController = new PrivacyController();
exports.getPrivacySettings = privacyController.getPrivacySettings.bind(privacyController);
exports.updatePrivacySettings = privacyController.updatePrivacySettings.bind(privacyController);
