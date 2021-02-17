import express from 'express';
import { auth } from '../../middlewares/auth';
import { store_file } from '../../utils/file-imagen';

import { newProducts, getProducts } from './controller';

const router = express.Router();
const baseURL = '/products';
const upload = store_file();

router.post(`${baseURL}`, auth, upload.single('source'), newProducts);
router.get(`${baseURL}`, auth, getProducts);

export default router;
