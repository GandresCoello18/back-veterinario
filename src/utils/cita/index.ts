import { CreateCita, GetMisCita } from "../../models/cita";
import { dataBase } from "../database";

export const CreateCitaUtil = async (cita: CreateCita) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `INSERT INTO solicitudes (idSolicitud, create_at, solicitado, time, status, observaciones, direccion, idPacient, idUser, idClient) VALUES ('${cita.idSolicitud}', '${cita.create_at}', '${cita.solicitado}', '${cita.time}', '${cita.status}', '${cita.observaciones}', '${cita.direccion}', ${cita.idPacient ? `'${cita.idPacient}'` : null}, ${null}, '${cita.idClient}');`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        });
  } catch (error) {
      console.log(error.message);
      return false;
  }
}

export const GetMisCitasUtil = async (idCliente?: string) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `SELECT solicitudes.*, cliente.userName as cliente_usermane, cliente.avatar as cliente_avatar, pacients.nombre, pacients.avatar as avatar_pacient, users.userName as user_username, users.avatar as user_avatar FROM solicitudes INNER JOIN users as cliente ON cliente.idUser = solicitudes.idClient INNER JOIN pacients ON pacients.idPacient = solicitudes.idPacient LEFT JOIN users ON users.idUser = solicitudes.idUser ${idCliente ? `WHERE solicitudes.idClient = '${idCliente}'` : ''} ORDER BY solicitudes.solicitado DESC Limit 2;`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        }) as GetMisCita[];
  } catch (error) {
      console.log(error.message);
      return [];
  }
}

export const ExcistCitasUtil = async (solicitado: string, hora: number) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `SELECT * FROM solicitudes WHERE solicitado = '${solicitado}' AND HOUR(time) = ${hora} AND status = 'asistir'`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        }) as GetMisCita[];
  } catch (error) {
      console.log(error.message);
      return [];
  }
}

export const UpdateAsistirCitaUtil = async (idSolicitud: string, idUser: string, status: string) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `UPDATE solicitudes SET idUser = '${idUser}', status = '${status}' WHERE idSolicitud = '${idSolicitud}'`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        }) as GetMisCita[];
  } catch (error) {
      console.log(error.message);
      return [];
  }
}

export const DeleteCitaUtil = async (idSolicitud: string) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `DELETE FROM solicitudes WHERE idSolicitud = '${idSolicitud}'`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        }) as GetMisCita[];
  } catch (error) {
      console.log(error.message);
      return [];
  }
}
