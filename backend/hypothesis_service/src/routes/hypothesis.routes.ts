import { Router, Request, Response } from 'express';
import {
  getAllHypotheses,
  getHypothesisById,
  createHypothesis,
  updateHypothesis,
  deleteHypothesis
} from '../controllers/hypothesis.controller';

const router = Router();

// GET Alle Hypothesen abrufen
router.get('/', async (req: Request, res: Response) => {
  try {
    const hypotheses = await getAllHypotheses(req.user?.id);
    res.json(hypotheses);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Hypothesen' });
  }
});

// GET Hypothese nach ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const hypothesis = await getHypothesisById(req.params.id, req.user?.id);
    if (!hypothesis) return res.status(404).json({ error: 'Hypothese nicht gefunden' });
    res.json(hypothesis);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Hypothese' });
  }
});

// POST Neue Hypothese anlegen
router.post('/', async (req: Request, res: Response) => {
  try {
    const newHypothesis = await createHypothesis(req.body, req.user?.id);
    res.status(201).json(newHypothesis);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Erstellen der Hypothese' });
  }
});

// PUT Hypothese aktualisieren
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updated = await updateHypothesis(req.params.id, req.body, req.user?.id);
    if (!updated) return res.status(404).json({ error: 'Hypothese nicht gefunden' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Aktualisieren der Hypothese' });
  }
});

// DELETE Hypothese löschen
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const success = await deleteHypothesis(req.params.id, req.user?.id);
    if (!success) return res.status(404).json({ error: 'Hypothese nicht gefunden' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Löschen der Hypothese' });
  }
});

export default router;
