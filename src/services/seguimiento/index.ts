import express from 'express';
import { auth } from '../../middlewares/auth';

import { createSeguimiento, getMisSeguimiento, UpdateSeguimiento, deleteSeguimiento } from './controller';

const router = express.Router();
const baseURL = '/seguimiento';

router.post(`${baseURL}`, auth, createSeguimiento);
router.get(`${baseURL}/:idPacient`, auth, getMisSeguimiento);
router.put(`${baseURL}/:idSeguimiento`, auth, UpdateSeguimiento);
router.delete(`${baseURL}/:idSeguimiento`, auth, deleteSeguimiento);

export default router;
