"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComplianceReport = exports.getComplianceStatus = exports.ComplianceController = void 0;
const compliance_service_1 = require("../services/compliance.service");
class ComplianceController {
    constructor() {
        this.complianceService = new compliance_service_1.ComplianceService();
    }
    async getComplianceStatus(req, res) {
        try {
            const status = await this.complianceService.getComplianceStatus();
            res.json(status);
        }
        catch (error) {
            res.status(500).json({ error: 'Fehler beim Abrufen des Compliance-Status' });
        }
    }
    async createComplianceReport(req, res) {
        try {
            const report = await this.complianceService.createComplianceReport(req.body);
            res.json(report);
        }
        catch (error) {
            res.status(500).json({ error: 'Fehler beim Erstellen des Compliance-Reports' });
        }
    }
}
exports.ComplianceController = ComplianceController;
const complianceController = new ComplianceController();
exports.getComplianceStatus = complianceController.getComplianceStatus.bind(complianceController);
exports.createComplianceReport = complianceController.createComplianceReport.bind(complianceController);
