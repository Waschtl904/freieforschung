"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// project_service/src/routes/project.routes.ts
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/projects', async (req, res) => {
    res.json({ message: 'Project service aktiv' });
});
exports.default = router;
