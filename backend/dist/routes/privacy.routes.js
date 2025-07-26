"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const privacy_controller_1 = require("../controllers/privacy.controller");
const router = (0, express_1.Router)();
router.get('/settings', privacy_controller_1.getPrivacySettings);
router.put('/settings', privacy_controller_1.updatePrivacySettings);
exports.default = router;
