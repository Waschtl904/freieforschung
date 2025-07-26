"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hypothesis_controller_1 = require("../controllers/hypothesis.controller");
const router = (0, express_1.Router)();
router.get('/', hypothesis_controller_1.getAllHypotheses);
router.get('/:id', hypothesis_controller_1.getHypothesisById);
router.post('/', hypothesis_controller_1.createHypothesis);
exports.default = router;
