import express from 'express';
import { auth } from '../../middlewares/auth';
import { store_file } from '../../utils/file-imagen';

import { newProducts, getProducts, getProductsByTipoPacient, updateProduct, delteProduct } from './controller';

const router = express.Router();
const baseURL = '/products';
const upload = store_file();

router.post(`${baseURL}`, auth, upload.single('source'), newProducts);
router.get(`${baseURL}`, auth, getProducts);
router.get(`${baseURL}/:tipoPacient`, auth, getProductsByTipoPacient);
router.put(`${baseURL}/:idProduct`, auth, updateProduct);
router.delete(`${baseURL}/:idProduct`, auth, delteProduct);

export default router;
