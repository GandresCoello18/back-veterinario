/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { User } from "../../models/users";
import { dataBase } from "../database";

export const getUserUtil = async (option: {
    idUser?: string,
    email?: string,
    userName?: string,
    email_and_username?: {
        email: string,
        userName: string,
    }
}) => {
    try {

      if(!option){
        return []
      }

      let user: User[] = [];
      let sql: string;
      const response_campo = 'idUser, userName, email, created_at, isAdmin, avatar, provider, Phone, cedula';

      if(option.idUser) {
        sql = `SELECT ${response_campo} FROM users WHERE idUser = '${option.idUser}';`;
      }

      if(option.email) {
        sql = `SELECT ${response_campo} FROM users WHERE email = '${option.email}';`;
      }

      if(option.userName) {
        sql = `SELECT ${response_campo} FROM users WHERE userName = '${option.userName}';`;
      }

      if(option.email_and_username) {
        sql = `SELECT ${response_campo} FROM users WHERE userName = '${option.email_and_username.userName}' OR email = '${option.email_and_username.email}';`;
      }

      user = await new Promise((resolve, reject) => dataBase.query(
        sql, (err, data) => err ? reject(err) : resolve(data)
      ));

      return user;
    } catch (error) {
      console.log(error.message);
      return [];
    }
}

export const createUserUtil = async (user: User) => {
    try {
        return await new Promise((resolve, reject) => {
            dataBase.query(
              `INSERT INTO users (idUser, userName, email, created_at, isAdmin, avatar, provider, Phone, cedula) VALUES ('${user.idUser}', '${user.userName}', '${user.email}', '${user.created_at}', ${user.isAdmin}, ${user.avatar ? `'${user.avatar}'` : null}, '${user.provider}', ${user.Phone ? user.Phone : null}, ${user.Cedula ? `'${user.Cedula}'` : null});`,
              (err, data) => err ? reject(err) : resolve(data)
            );
          });
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const updateUserUtil = async (userName: string, email: string, Phone: number, idUser: string, Cedula: number) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `UPDATE users SET userName = '${userName}', email = '${email}', Phone = ${Phone}, cedula = ${Cedula} WHERE idUser = '${idUser}';`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        });
  } catch (error) {
      console.log(error.message);
      return false;
  }
}

export const updatePasswordUserUtil = async (password: string, idUser: string) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `UPDATE users SET password = '${password}' WHERE idUser = '${idUser}';`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        });
  } catch (error) {
      console.log(error.message);
      return false;
  }
}

export const DeleteUserUtil = async (idUser: string) => {
  try {
      return await new Promise((resolve, reject) => {
          dataBase.query(
            `DELETE FROM users WHERE idUser = '${idUser}';`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        });
  } catch (error) {
      console.log(error.message);
      return false;
  }
}
