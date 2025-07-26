"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compliance_service_1 = require("../services/compliance.service");
const router = (0, express_1.Router)();
// Compliance-Reports abrufen
router.get('/reports', async (_, res) => {
    const reports = await compliance_service_1.complianceService.getComplianceReports();
    res.json(reports);
});
// Datenschutzverletzung an DSB melden
router.post('/dsb-report', async (req, res) => {
    const { incidentType, description, affectedUsers } = req.body;
    const report = await compliance_service_1.complianceService.createDSBReport({
        incidentType, description, affectedUsers, measuresTaken: [], reportedAt: new Date(), reporterId: req.user?.id
    });
    res.json({ message: 'Meldung erstellt', reportId: report.id, dsbContact: { email: 'dsb@dsb.gv.at', address: 'Barichgasse 40-42, 1030 Wien' } });
});
exports.default = router;
