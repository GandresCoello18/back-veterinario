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
              `SELECT * FROM seguimiento WHERE idPacient = '${idPacient}' ORDER BY created_at DESC;`,
              (err, data) => err ? reject(err) : resolve(data)
            );
          }) as Seguimiento[];
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

export const getSeguimientoByDateUtil = async (idPacient: string, category: string, created_at: string) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `SELECT * FROM seguimiento WHERE idPacient = '${idPacient}' AND category = '${category}' AND created_at LIKE '%${created_at}%' ORDER BY created_at DESC;`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        }) as Seguimiento[];
  } catch (error) {
      console.log(error.message);
      return [];
  }
}

export const updateSeguimientoUtil = async (id_seguimiento: string, title: string) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `UPDATE seguimiento SET title = '${title}' WHERE id_seguimiento = '${id_seguimiento}';`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        });
  } catch (error) {
      console.log(error.message);
      return false;
  }
}

export const deleteSeguimientoUtil = async (id_seguimiento: string) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `DELETE FROM seguimiento WHERE id_seguimiento = '${id_seguimiento}';`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        });
  } catch (error) {
      console.log(error.message);
      return false;
  }
}