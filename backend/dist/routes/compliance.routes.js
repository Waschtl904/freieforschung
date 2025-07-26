"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compliance_controller_1 = require("../controllers/compliance.controller");
const router = (0, express_1.Router)();
router.get('/status', compliance_controller_1.getComplianceStatus);
router.post('/report', compliance_controller_1.createComplianceReport);
exports.default = router;
