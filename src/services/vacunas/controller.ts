/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'date-fns';
import { Request, Response } from 'express';
import Locale from 'date-fns/locale/es'
import { v4 as uuidv4 } from 'uuid';
import { CreateVacunasPacientUtil, DeleteVacunasPacientUtil, getNameVacunasUtil, getVacunasPacientUtil, getVacunasUtil } from '../../utils/vacunas';
import { getOnlyPacientUtil, getPacientUtil } from '../../utils/pacients';
import randomcolor from 'randomcolor';
import { EdadMeses } from '../../helper/edad-vacunas';
import { VacunasPacient } from '../../models/vacunas';

export const createVacunaPacient = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'vacunas', serviceHandler: 'createVacunaPacient' });
    req.logger.info({ status: 'start' });

    try {
        const { id_vacuna, idPacient, idProducts } = req.body
        const idUser = req.user.idUser

        if(!id_vacuna || !idPacient || !idProducts){
            const response = { status: 'No id_vacuna or id Pacient provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        const VP: VacunasPacient = {
            id_vacunas_pacient: uuidv4(),
            idUser,
            idPacient,
            idProducts,
            created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            id_vacuna,
        }

        await CreateVacunasPacientUtil(VP);

        return res.status(200).json();
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};

export const getMisVacunas = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'vacunas', serviceHandler: 'getVacunas' });
    req.logger.info({ status: 'start' });

    try {
        const { tipoPacient, idPacient } = req.params

        if(!tipoPacient || !idPacient){
            const response = { status: 'No tipo Pacient or id Pacient provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        const vacunas = await getVacunasUtil(tipoPacient);

        const responseVacunas = await Promise.all(
            vacunas.map(async vacuna => {

                const misVacunas = await getVacunasPacientUtil(vacuna.id_vacuna, idPacient);
                const pacient = await getOnlyPacientUtil(idPacient);

                const ObjVacuna = {
                    created_at: '',
                    id_vacunas_pacient: '',
                    doctor: '',
                    nombre_paciente: pacient[0].nombre,
                    emailPerson: pacient[0].emailPerson,
                    avatar: pacient[0].avatar,
                    id_vacunas: vacuna.id_vacuna,
                    nombre: vacuna.nombres,
                    edad: vacuna.edad,
                    count: vacuna.count,
                    isVacuna: 'Pendiente',
                }

                if(misVacunas.length){
                    ObjVacuna.id_vacunas_pacient = misVacunas[0].id_vacunas_pacient
                    ObjVacuna.doctor = misVacunas[0].userName
                    ObjVacuna.isVacuna = 'Completado'
                    ObjVacuna.created_at = format(new Date(`${misVacunas[0].created_at}`), 'PPPP', {locale: Locale});
                }

                return ObjVacuna
            })
        )

        return res.status(200).json({ vacunas: responseVacunas });
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};

export const getMiCalendario = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'vacunas', serviceHandler: 'getMiCalendario' });
    req.logger.info({ status: 'start' });

    try {
        const { idPacient } = req.params

        if(!idPacient){
            const response = { status: 'No id Pacient provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        const pacient = await getOnlyPacientUtil(idPacient);
        const vacunas = await getVacunasUtil(pacient[0].tipo);

        const MiCalendar = await Promise.all(
            vacunas.map(async vacuna => {

                const calculEdad = EdadMeses(pacient[0].nacimiento, vacuna.edad)

                const Calendar = {
                    id: vacuna.id_vacuna,
                    color: randomcolor(),
                    from: calculEdad?.from,
                    to: calculEdad?.to,
                    title: vacuna.nombres
                }

                return Calendar
            })
        )

        return res.status(200).json({ calendario: MiCalendar });
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};

export const getCalendarioGeneral = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'vacunas', serviceHandler: 'getCalendarioGeneral' });
    req.logger.info({ status: 'start' });

    try {
        const pacients = await getPacientUtil();

        const calendario = await Promise.all(
            pacients.map(async pacient => {
                const vacunas = await getVacunasUtil(pacient.tipo);

                return vacunas.map(vacuna => {

                    const calculEdad = EdadMeses(pacient.nacimiento, vacuna.edad)

                    const Calendar = {
                        id: vacuna.id_vacuna,
                        color: randomcolor(),
                        from: calculEdad?.from,
                        to: calculEdad?.to,
                        title: `** ${pacient.nombre} ** - ${vacuna.nombres}`
                    }

                    return Calendar
                })
            })
        )

        const ConcarArray = [].concat.apply([], calendario);

        return res.status(200).json({ calendario: ConcarArray });
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};

export const getNameVacunas = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'vacunas', serviceHandler: 'getNameVacunas' });
    req.logger.info({ status: 'start' });

    try {
        const { idPacient } = req.params

        if(!idPacient){
            const response = { status: 'No tipo Pacient provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        const pacient = await getOnlyPacientUtil(idPacient);
        const vacunas = await getNameVacunasUtil(pacient[0].tipo, pacient[0].idPacient);

        return res.status(200).json({ vacunas });
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};

export const deleteVacunaPacient = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'vacunas', serviceHandler: 'deleteVacunaPacient' });
    req.logger.info({ status: 'start' });

    try {
        const { id_vacunas_pacient } = req.params

        if(!id_vacunas_pacient){
            const response = { status: 'No tipo Pacient or id vacuna provided' };
            req.logger.warn(response);
            return res.status(400).json(response);
        }

        await DeleteVacunasPacientUtil(id_vacunas_pacient);

        return res.status(200).json();
    } catch (error) {
        req.logger.error({ status: 'error', code: 500 });
        return res.status(404).json();
    }
};