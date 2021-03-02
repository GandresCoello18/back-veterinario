import { MisVacunasPacient, Vacunas, VacunasPacient } from "../../models/vacunas";
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

export const getNameVacunasUtil = async (tipoPacient: string, idPacient: string) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `SELECT * FROM vacunas WHERE tipo = '${tipoPacient}' AND id_vacuna NOT IN (SELECT id_vacuna FROM vacunas_pacient WHERE idPacient = '${idPacient}') ORDER BY nombres ASC`,
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
            `SELECT pacients.nombre as nombre_paciente, pacients.avatar, vacunas_pacient.id_vacunas_pacient, vacunas_pacient.created_at, users.userName FROM vacunas_pacient INNER JOIN pacients ON pacients.idPacient = vacunas_pacient.idPacient INNER JOIN users ON users.idUser = vacunas_pacient.idUser WHERE vacunas_pacient.idPacient = '${idPacient}' AND vacunas_pacient.id_vacuna = '${idVacuna}';`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        }) as MisVacunasPacient[];
  } catch (error) {
      console.log(error.message);
      return [];
  }
}

export const CreateVacunasPacientUtil = async (VP: VacunasPacient) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `INSERT INTO vacunas_pacient (id_vacunas_pacient, idUser, idPacient, idProducts, created_at, id_vacuna) VALUES ('${VP.id_vacunas_pacient}', '${VP.idUser}', '${VP.idPacient}', '${VP.idProducts}', '${VP.created_at}', '${VP.id_vacuna}');`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        });
  } catch (error) {
      console.log(error.message);
      return false;
  }
}

export const DeleteVacunasPacientUtil = async (id_vacunas_pacient: string) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `DELETE FROM vacunas_pacient WHERE id_vacunas_pacient = '${id_vacunas_pacient}';`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        });
  } catch (error) {
      console.log(error.message);
      return false;
  }
}