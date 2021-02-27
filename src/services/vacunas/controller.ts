// import { format } from 'date-fns';
import { Request, Response } from 'express';
// import { v4 as uuidv4 } from 'uuid';
import { getVacunasUtil } from '../../utils/vacunas';

export const getVacunas = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'vacunas', serviceHandler: 'getVacunas' });
    req.logger.info({ status: 'start' });

    try {
        const { tipoPacient } = req.params

        if(!tipoPacient){
            const response = { status: 'No tipo Pacient provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        const vacunas = await getVacunasUtil(tipoPacient);

        return res.status(200).json({ vacunas });
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};