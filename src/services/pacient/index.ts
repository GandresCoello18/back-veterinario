import express from 'express';
import { auth } from '../../middlewares/auth';

import { getPacients } from './controller';

const router = express.Router();
const baseURL = '/pacients';

router.get(`${baseURL}`, auth, getPacients);

export default router;
