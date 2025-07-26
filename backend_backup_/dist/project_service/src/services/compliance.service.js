"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.complianceService = void 0;
// project_service/src/services/compliance.service.ts
exports.complianceService = {
    async createIncidentReport(data) {
        return { id: 'incident-' + Date.now(), ...data };
    },
    async getComplianceReports() {
        return [];
    },
    // Neue Methode hinzufügen
    async createDSBReport(data) {
        return {
            id: 'dsb-report-' + Date.now(),
            status: 'submitted',
            ...data
        };
    }
};
