// project_service/src/routes/project.routes.ts
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/projects', async (req: Request, res: Response) => {
  res.json({ message: 'Project service aktiv' });
});

export default router;
