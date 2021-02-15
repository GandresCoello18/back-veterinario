import { format } from 'date-fns';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Products } from '../../models/product';
import { createProductUtil, getProductNameUtil, getProductsUtil } from '../../utils/products';

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

export const newProducts = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'products', serviceHandler: 'newProducts' });
    req.logger.info({ status: 'start' });

    try {
        const { name, stock } = req.body

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
            source: '',
            update_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        }

        await createProductUtil(product)

        return res.status(200).json();
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};