import { format } from 'date-fns';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Email } from '../../models/email';
import { Seguimiento } from '../../models/seguimiento';
import { SendEmail } from '../../utils/email';
import { getOnlyPacientUtil } from '../../utils/pacients';
import { getProductNameUtil, updateProductUtil } from '../../utils/products';
import { createSeguimientoUtil, deleteSeguimientoUtil, getMisSeguimientoUtil, updateSeguimientoUtil } from '../../utils/seguimiento';

export const createSeguimiento = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'products', serviceHandler: 'createSeguimiento' });
    req.logger.info({ status: 'start' });

    try {
        const { category, title, idPacient, producto } = req.body

        if(!category || !title || !idPacient){
            const response = { status: 'No data tipo Pacient provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        /* const seguimientoDate = await getSeguimientoByDateUtil(idPacient, category, format(new Date(), 'yyyy-MM-dd'))

        if(seguimientoDate.length){
            const response = { status: `El seguimiento de la fecha: ${format(new Date(), 'yyyy-MM-dd')} y categorya: ${category}, ya fueron registrados` };
            req.logger.warn(response);
            return res.status(400).json(response);
        } */

        const seguimiento: Seguimiento = {
            id_seguimiento: uuidv4(),
            category,
            title,
            created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            idPacient,
        }

        await createSeguimientoUtil(seguimiento);

        if(producto){
            const thisProducto = await getProductNameUtil(producto);

            const newStock = thisProducto[0].stock - 1

            if(newStock >= 0){
                await updateProductUtil(thisProducto[0].idProducts, newStock)
            }else{
                const response = { status: 'No suficient stock provided' };
                req.logger.warn(response);
                return res.status(400).json(response);
            }
        }

        const pacient = await getOnlyPacientUtil(idPacient);

        if(pacient[0].emailPerson){
            const email: Email = {
                from: pacient[0].emailPerson,
                to: pacient[0].emailPerson,
                subject: 'Registro de seguimiento',
                text:`El veterinario: <strong>${req.user.userName}</strong> acaba de registrar un seguimiento del paciente: <strong>${pacient[0].nombre}</strong>, en la categoria: <strong>${category}</strong> y registrando: <strong>${title}</strong>`,
            }

            await SendEmail(email);
        }

        return res.status(200).json();
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};

export const getMisSeguimiento = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'products', serviceHandler: 'getMisSeguimiento' });
    req.logger.info({ status: 'start' });

    try {
        const { idPacient } = req.params

        if(!idPacient){
            const response = { status: 'No data tipo Pacient provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        const MisSeguimientos = await getMisSeguimientoUtil(idPacient);

        return res.status(200).json({ MisSeguimientos });
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(500).json();
    }
};

export const UpdateSeguimiento = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'products', serviceHandler: 'UpdateSeguimiento' });
    req.logger.info({ status: 'start' });

    try {
        const { idSeguimiento } = req.params
        const { title } = req.body

        if(!idSeguimiento || !title){
            const response = { status: 'No data tipo Pacient or title provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        await updateSeguimientoUtil(idSeguimiento, title);

        return res.status(200).json();
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(500).json();
    }
};

export const deleteSeguimiento = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'products', serviceHandler: 'deleteSeguimiento' });
    req.logger.info({ status: 'start' });

    try {
        const { idSeguimiento } = req.params

        if(!idSeguimiento){
            const response = { status: 'No data tipo Pacient provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        await deleteSeguimientoUtil(idSeguimiento);

        return res.status(200).json();
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(500).json();
    }
};