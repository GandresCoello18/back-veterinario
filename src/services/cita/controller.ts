import { format } from 'date-fns';
import { Request, Response } from 'express';
import randomcolor from 'randomcolor';
import { v4 as uuidv4 } from 'uuid';
import { CreateCita } from '../../models/cita';
import { CreateCitaUtil, DeleteCitaUtil, GetMisCitasUtil, UpdateAsistirCitaUtil } from '../../utils/cita';

export const NewCita = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'citas', serviceHandler: 'NewCita' });
    req.logger.info({ status: 'start' });

    try {
        const { solicitado, time, observaciones, direccion, idPacient, idUser } = req.body
        const user = req.user

        if(!solicitado || !time || !observaciones || !direccion){
            const response = { status: 'No data create cita provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        const cita: CreateCita = {
            idSolicitud: uuidv4(),
            create_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            solicitado,
            time,
            status: 'Pendiente',
            observaciones,
            direccion,
            idPacient: idPacient || null,
            idUser: idUser || null,
            idClient: user.idUser,
        }

        await CreateCitaUtil(cita);

        return res.status(200).json();
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};

export const GetCitas = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'citas', serviceHandler: 'GetCitas' });
    req.logger.info({ status: 'start' });

    try {
        const user = req.user
        let MisCitas = [];

        if(user.isAdmin){
            MisCitas = await GetMisCitasUtil(undefined);
        }else{
            MisCitas = await GetMisCitasUtil(user.idUser);
        }

        return res.status(200).json({ MisCitas });
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};

export const GetCalendarCitas = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'citas', serviceHandler: 'GetCalendarCitas' });
    req.logger.info({ status: 'start' });

    try {
        const user = req.user
        let MisCitas = [];

        if(user.isAdmin){
            MisCitas = await GetMisCitasUtil(undefined);
        }else{
            MisCitas = await GetMisCitasUtil(user.idUser);
        }

        const MiCalendar = await Promise.all(
            MisCitas.map(async citas => {
                let date = format(new Date(citas.solicitado), 'yyyy-MM-dd');
                date = date + 'T' + citas.time;

                const dateHora = new Date(date).getHours();
                const milisecond = new Date(date).setHours(dateHora + 2); 

                const date2 = format(new Date(milisecond), 'yyyy-MM-dd HH:mm:ss');

                const Calendar = {
                    id: citas.idSolicitud,
                    color: randomcolor(),
                    from: date + '+00:00',
                    to: date2 + '+00:00',
                    title: `(OBSERVACIONES) ${citas.observaciones} - (DIRECCION) ${citas.direccion} - (CLIENTE) ${citas.cliente_usermane} - (MASCOTA) ${citas.nombre} - (Estado) ${citas.status}`
                }

                return Calendar
            })
        )

        return res.status(200).json({ MiCalendar });
    } catch (error) {
        console.log(error.message);
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};

export const UpdateAsistirCita = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'citas', serviceHandler: 'UpdateAsistirCita' });
    req.logger.info({ status: 'start' });

    try {
        const user = req.user
        const { idSolicitud } = req.params
        const { status } = req.body

        if(!idSolicitud || !status){
            const response = { status: 'No id Solicitud or status provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        await UpdateAsistirCitaUtil(idSolicitud, user.idUser, status);

        return res.status(200).json();
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};

export const DeleteCita = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'citas', serviceHandler: 'DeleteCita' });
    req.logger.info({ status: 'start' });

    try {
        const { idSolicitud } = req.params

        if(!idSolicitud){
            const response = { status: 'No id Solicitud or status provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        await DeleteCitaUtil(idSolicitud);

        return res.status(200).json();
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};