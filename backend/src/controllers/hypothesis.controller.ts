import { Request, Response } from 'express';
import { HypothesisService } from '../services/hypothesis.service';

export class HypothesisController {
  private hypothesisService: HypothesisService;

  constructor() {
    this.hypothesisService = new HypothesisService();
  }

  async getAllHypotheses(req: Request, res: Response): Promise<void> {
    try {
      const hypotheses = await this.hypothesisService.getAllHypotheses();
      res.json(hypotheses);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Abrufen der Hypothesen' });
    }
  }

  async getHypothesisById(req: Request, res: Response): Promise<void> {
    try {
      const hypothesis = await this.hypothesisService.getHypothesisById(req.params.id);
      if (!hypothesis) {
        res.status(404).json({ error: 'Hypothese nicht gefunden' });
        return;
      }
      res.json(hypothesis);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Abrufen der Hypothese' });
    }
  }

  async createHypothesis(req: Request, res: Response): Promise<void> {
    try {
      const hypothesis = await this.hypothesisService.createHypothesis(req.body);
      res.status(201).json(hypothesis);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Erstellen der Hypothese' });
    }
  }
}

const hypothesisController = new HypothesisController();
export const getAllHypotheses = hypothesisController.getAllHypotheses.bind(hypothesisController);
export const getHypothesisById = hypothesisController.getHypothesisById.bind(hypothesisController);
export const createHypothesis = hypothesisController.createHypothesis.bind(hypothesisController);
