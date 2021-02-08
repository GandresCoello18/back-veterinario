import { Pacient } from "../../models/pacient";
import { dataBase } from "../database";

export const createPacientUtil = async (pacient: Pacient) => {
    try {
        return await new Promise((resolve, reject) => {
            dataBase.query(
              `INSERT INTO pacients (idPacient, tipo, idCategory, nombre, altura, peso, emailPerson, avatar, created_at) VALUES ('${pacient.idPacient}', '${pacient.tipo}', '${pacient.idCategory}', '${pacient.nombre}', ${pacient.altura}, ${pacient.peso}, ${pacient.emailPerson ? `'${pacient.emailPerson}'` : null}, ${pacient.avatar ? `'${pacient.avatar}'` : null}, '${pacient.created_at}'});`,
              (err, data) => err ? reject(err) : resolve(data)
            );
          });
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const ExistPacientUtil = async (nombre: string, emailPerson: string) => {
    try {
        return await new Promise((resolve, reject) => {
            dataBase.query(
              `SELECT idPacient FROM pacients WHERE nombre = '${nombre}' AND emailPerson = '${emailPerson}';`,
              (err, data) => err ? reject(err) : resolve(data)
            );
          }) as Pacient[];
    } catch (error) {
        console.log(error.message);
        return [];
    }
}
