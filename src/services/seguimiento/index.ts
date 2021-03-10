import express from 'express';
import { auth } from '../../middlewares/auth';

import { createSeguimiento, getMisSeguimiento } from './controller';

const router = express.Router();
const baseURL = '/seguimiento';

router.post(`${baseURL}`, auth, createSeguimiento);
router.get(`${baseURL}/:idPacient`, auth, getMisSeguimiento);

export default router;
