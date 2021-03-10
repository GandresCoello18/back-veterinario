import { dataBase } from "../database";
import { Seguimiento } from '../../models/seguimiento';

export const createSeguimientoUtil = async (seguimiento: Seguimiento) => {
    try {
        return await new Promise((resolve, reject) => {
            dataBase.query(
              `INSERT INTO seguimiento (id_seguimiento, category, title, created_at, idPacient) VALUES ('${seguimiento.id_seguimiento}', '${seguimiento.category}', '${seguimiento.title}', '${seguimiento.created_at}', '${seguimiento.idPacient}');`,
              (err, data) => err ? reject(err) : resolve(data)
            );
          });
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const getMisSeguimientoUtil = async (idPacient: string) => {
    try {
        return await new Promise((resolve, reject) => {
            dataBase.query(
              `SELECT * FROM seguimiento WHERE idPacient = '${idPacient}');`,
              (err, data) => err ? reject(err) : resolve(data)
            );
          });
    } catch (error) {
        console.log(error.message);
        return false;
    }
}