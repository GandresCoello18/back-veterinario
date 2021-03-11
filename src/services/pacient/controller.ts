import { format } from 'date-fns';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Pacient } from '../../models/pacient';
import { createPacientUtil, DeletePacientUtil, ExistPacientUtil, getOnlyPacientUtil, getPacientByUserUtil, getPacientUtil } from '../../utils/pacients';
import { getUserUtil } from '../../utils/users';

export const getPacients = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'pacient', serviceHandler: 'getPacients' });
    req.logger.info({ status: 'start' });

    try {
        const user = req.user

        let users;

        if(user.isAdmin){
            users = await getPacientUtil();
        }else{
            users = await getPacientByUserUtil(user.email);
        }

        return res.status(200).json({ users });
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};

export const getPacient = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'pacient', serviceHandler: 'getPacient' });
    req.logger.info({ status: 'start' });

    try {
        const { idPacient } = req.params

        if(!idPacient){
            const response = { status: 'No data id pacient provided' };
            req.logger.warn(response);
        }

        const pacient = await getOnlyPacientUtil(idPacient);

        return res.status(200).json({ pacient: pacient[0] });
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};

export const newPacients = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'pacient', serviceHandler: 'newPacients' });
    req.logger.info({ status: 'start' });

    try {
        const { tipo, idCategory, nombre, altura, peso, emailPerson, avatar, sexo, nacimiento, raza } = req.body

        if(!tipo || !idCategory || !altura || !peso || !sexo || !nacimiento || !raza){
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
            created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            sexo,
            raza,
            nacimiento,
        }


        const userExist = await getUserUtil({email: emailPerson});

        if(userExist.length === 0){
            const response = { status: `No existe cliente con: ${emailPerson}` };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        if(nombre && emailPerson){
            const existPacient = await ExistPacientUtil(nombre, emailPerson);
            
            if(existPacient.length){
                const response = { status: 'Esta mascota ya esta registrado' };
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

export const removePacients = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'pacient', serviceHandler: 'removePacients' });
    req.logger.info({ status: 'start' });

    try {
        const { idPacient } = req.params

        if(!idPacient){
            const response = { status: 'No data id pacient provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        await DeletePacientUtil(idPacient);

        return res.status(200).json();
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};