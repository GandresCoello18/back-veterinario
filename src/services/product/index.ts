import express from 'express';
import { auth } from '../../middlewares/auth';

import { newProducts, getProducts } from './controller';

const router = express.Router();
const baseURL = '/products';

router.post(`${baseURL}`, auth, newProducts);
router.get(`${baseURL}`, auth, getProducts);

export default router;
