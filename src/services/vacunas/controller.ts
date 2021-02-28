/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'date-fns';
import { Request, Response } from 'express';
import Locale from 'date-fns/locale/es'
// import { v4 as uuidv4 } from 'uuid';
import { getVacunasPacientUtil, getVacunasUtil } from '../../utils/vacunas';
import { getOnlyPacientUtil } from '../../utils/pacients';

export const getVacunas = async (req: Request, res: Response) => {
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
                    ObjVacuna.nombre_paciente = misVacunas[0].nombre_paciente,
                    ObjVacuna.avatar = misVacunas[0].avatar,
                    ObjVacuna.isVacuna = 'Completado'
                    ObjVacuna.created_at = format(new Date(misVacunas[0].created_at), 'PPPP', {locale: Locale});                    return vacuna
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