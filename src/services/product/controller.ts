import { format } from 'date-fns';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Products } from '../../models/product';
import { createProductUtil, deleteProductUtil, getProductNameUtil, getProductsByTipoPacientUtil, getProductsUtil, UpdateProductUtil } from '../../utils/products';

export const getProducts = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'products', serviceHandler: 'getProducts' });
    req.logger.info({ status: 'start' });

    try {

        const products = await getProductsUtil();

        return res.status(200).json({ products });
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};

export const getProductsByTipoPacient = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'products', serviceHandler: 'getProductsByTipoPacient' });
    req.logger.info({ status: 'start' });

    try {
        const { tipoPacient } = req.params;

        if(!tipoPacient){
            const response = { status: 'No data tipo Pacient provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        const products = await getProductsByTipoPacientUtil(tipoPacient);

        return res.status(200).json({ products });
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};

export const newProducts = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'products', serviceHandler: 'newProducts' });
    req.logger.info({ status: 'start' });

    try {
        const { name, stock, description, tipo } = req.body

        if(!name || !stock){
            const response = { status: 'No data user provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        const ExistProduct = await getProductNameUtil(name)

        if(ExistProduct.length){
            const response = { status: 'Este producto ya existe' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        const product: Products = {
            idProducts: uuidv4(),
            name,
            stock,
            source: req.file.originalname || null,
            update_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            description: description || null,
            tipo: tipo || null,
        }

        await createProductUtil(product)

        return res.status(200).json();
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'products', serviceHandler: 'updateProduct' });
    req.logger.info({ status: 'start' });

    try {
        const { tipo, name, stock, description } = req.body
        const { idProduct } = req.params

        if(!idProduct){
            const response = { status: 'No id Product provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        await UpdateProductUtil(name, stock, description, tipo, idProduct)

        return res.status(200).json();
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};

export const delteProduct = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'products', serviceHandler: 'delteProduct' });
    req.logger.info({ status: 'start' });

    try {
        const { idProduct } = req.params

        if(!idProduct){
            const response = { status: 'No id Product provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        await deleteProductUtil(idProduct)

        return res.status(200).json();
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};