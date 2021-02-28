import { MisVacunasPacient, Vacunas } from "../../models/vacunas";
import { dataBase } from "../database";

export const getVacunasUtil = async (tipoPacient: string) => {
    try {
        return await new Promise((resolve, reject) => {
            dataBase.query(
              `SELECT * FROM vacunas WHERE tipo = '${tipoPacient}'`,
              (err, data) => err ? reject(err) : resolve(data)
            );
          }) as Vacunas[];
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

export const getVacunasPacientUtil = async (idVacuna: string, idPacient: string) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `SELECT pacients.nombre as nombre_paciente, pacients.avatar, vacunas_pacient.created_at FROM vacunas_pacient INNER JOIN pacients ON pacients.idPacient = vacunas_pacient.idPacient  WHERE vacunas_pacient.idPacient = '${idPacient}' AND vacunas_pacient.id_vacuna = '${idVacuna}';`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        }) as MisVacunasPacient[];
  } catch (error) {
      console.log(error.message);
      return [];
  }
}