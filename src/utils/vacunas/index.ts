import { Vacunas } from "../../models/vacunas";
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
        return false;
    }
}