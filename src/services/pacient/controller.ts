import { format } from 'date-fns';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Pacient } from '../../models/pacient';
import { createPacientUtil, ExistPacientUtil } from '../../utils/pacients';

export const getPacients = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'pacient', serviceHandler: 'getPacients' });
    req.logger.info({ status: 'start' });

    try {
        const { tipo, idCategory, nombre, altura, peso, emailPerson, avatar } = req.body

        if(!tipo || !idCategory || !altura || !peso){
            const response = { status: 'No data user provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        const pacient: Pacient = {
            idPacient: uuidv4(),
            tipo,
            idCategory,
            nombre: nombre || null,
            altura,
            peso,
            emailPerson: emailPerson || null,
            avatar: avatar || null,
            created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        }

        if(nombre && emailPerson){
            const existPacient = await ExistPacientUtil(nombre, emailPerson);
            
            if(existPacient.length){
                const response = { status: 'Este paciente ya esta registrado' };
                req.logger.warn(response);
                return res.status(400).json(response);
            }
        }

        await createPacientUtil(pacient)

        return res.status(200).json();
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};