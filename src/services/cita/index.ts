import express from 'express';
import { auth } from '../../middlewares/auth';

import { NewCita, GetCitas, GetCalendarCitas, UpdateAsistirCita, DeleteCita } from './controller';

const router = express.Router();
const baseURL = '/citas';

router.post(`${baseURL}`, auth, NewCita);
router.get(`${baseURL}/calendar`, auth, GetCalendarCitas);
router.get(`${baseURL}`, auth, GetCitas);
router.put(`${baseURL}/asistir/:idSolicitud`, auth, UpdateAsistirCita);
router.delete(`${baseURL}/:idSolicitud`, auth, DeleteCita);

export default router;
