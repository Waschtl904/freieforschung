import { Router } from 'express';
import { getPrivacySettings, updatePrivacySettings } from '../controllers/privacy.controller';

const router = Router();

router.get('/settings', getPrivacySettings);
router.put('/settings', updatePrivacySettings);

export default router;
