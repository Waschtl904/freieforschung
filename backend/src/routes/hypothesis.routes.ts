import { Router } from 'express';
import { getAllHypotheses, getHypothesisById, createHypothesis } from '../controllers/hypothesis.controller';

const router = Router();

router.get('/', getAllHypotheses);
router.get('/:id', getHypothesisById);
router.post('/', createHypothesis);

export default router;
