"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHypothesis = exports.getHypothesisById = exports.getAllHypotheses = exports.HypothesisController = void 0;
const hypothesis_service_1 = require("../services/hypothesis.service");
class HypothesisController {
    constructor() {
        this.hypothesisService = new hypothesis_service_1.HypothesisService();
    }
    async getAllHypotheses(req, res) {
        try {
            const hypotheses = await this.hypothesisService.getAllHypotheses();
            res.json(hypotheses);
        }
        catch (error) {
            res.status(500).json({ error: 'Fehler beim Abrufen der Hypothesen' });
        }
    }
    async getHypothesisById(req, res) {
        try {
            const hypothesis = await this.hypothesisService.getHypothesisById(req.params.id);
            if (!hypothesis) {
                res.status(404).json({ error: 'Hypothese nicht gefunden' });
                return;
            }
            res.json(hypothesis);
        }
        catch (error) {
            res.status(500).json({ error: 'Fehler beim Abrufen der Hypothese' });
        }
    }
    async createHypothesis(req, res) {
        try {
            const hypothesis = await this.hypothesisService.createHypothesis(req.body);
            res.status(201).json(hypothesis);
        }
        catch (error) {
            res.status(500).json({ error: 'Fehler beim Erstellen der Hypothese' });
        }
    }
}
exports.HypothesisController = HypothesisController;
const hypothesisController = new HypothesisController();
exports.getAllHypotheses = hypothesisController.getAllHypotheses.bind(hypothesisController);
exports.getHypothesisById = hypothesisController.getHypothesisById.bind(hypothesisController);
exports.createHypothesis = hypothesisController.createHypothesis.bind(hypothesisController);
