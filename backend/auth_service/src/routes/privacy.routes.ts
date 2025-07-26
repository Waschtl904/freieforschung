import { Router, Request, Response } from 'express';
import { userService } from '../services/user.service';
import { auditLogger } from '../utils/audit-logger';

const router = Router();

// Auskunftsrecht nach Art. 15 DSGVO
router.get('/privacy/data', async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Nicht authentifiziert' });

  const userData = await userService.getUserData(userId);
  auditLogger.log({
    action: 'data_access_request',
    user_id: userId,
    timestamp: new Date(),
    ip_address: req.ip,
    user_agent: req.get('User-Agent'),
  });

  res.json({
    data: userData,
    note: 'Art. 15 DSGVO – Auskunftserteilung',
    export_date: new Date().toISOString(),
    data_controller: {
      name: 'Freie Forschung Österreich',
      address: 'Wien, Österreich',
      email: 'datenschutz@freieforschung.at',
    },
  });
});

// Löschungsrecht nach Art. 17 DSGVO
router.delete('/privacy/data', async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Nicht authentifiziert' });

  const active = await userService.getActiveProjects(userId);
  if (active.length) {
    return res.status(400).json({
      error: 'Löschung nicht möglich',
      reason: 'Aktive Forschungsprojekte vorhanden',
      active_projects: active.length,
      notice: 'Bitte beenden Sie zuerst alle aktiven Projekte.',
    });
  }

  await userService.deleteUserData(userId);
  auditLogger.log({
    action: 'data_deletion_request',
    user_id: userId,
    timestamp: new Date(),
    ip_address: req.ip,
    user_agent: req.get('User-Agent'),
  });

  res.json({
    message: 'Ihre Daten wurden gelöscht (Art. 17 DSGVO)',
    deletion_date: new Date().toISOString(),
    notice: 'Backup-Daten werden nach Frist gelöscht.',
  });
});

export default router;
