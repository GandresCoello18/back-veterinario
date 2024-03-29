import { Request, Response } from 'express';
import { format } from 'date-fns'
import Locale from 'date-fns/locale/es'
import { User } from '../../models/users';
import jwt from "jsonwebtoken";
import {config, createUserUtil, dataBase, DeleteUserUtil, getUserUtil, updateUserUtil} from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import { DeletePacientByUserUtil, ExistPacientByUserUtil, getOnlyPacientUtil } from '../../utils/pacients';

export const getUser = async (req: Request, res: Response) => {
    req.logger = req.logger.child({ service: 'users', serviceHandler: 'getUser' });
    req.logger.info({ status: 'start' });

    try {
      const user = req.user
      user.created_at = format(new Date(user.created_at), 'PPPP', {locale: Locale})
      return res.status(200).json({ me: user });
    } catch (error) {
      req.logger.error({ status: 'error', code: 500 });
      return res.status(404).json();
    }
};

export const getUserByPacient = async (req: Request, res: Response) => {
  req.logger = req.logger.child({ service: 'users', serviceHandler: 'getUserByPacient' });
  req.logger.info({ status: 'start' });

  try {
    const { idPacient } = req.params

    if(!idPacient){
      const response = { status: 'No data id Pacient provided' };
      req.logger.warn(response);
      return res.status(400).json(response);
    }

    const pacient = await getOnlyPacientUtil(idPacient)
    let user: User[] = []

    if(pacient.length && pacient[0].emailPerson){
      user = await getUserUtil({email: pacient[0].emailPerson})
    }

    return res.status(200).json({ user: user[0] });
  } catch (error) {
    req.logger.error({ status: 'error', code: 500 });
    return res.status(404).json();
  }
};

export const getUsers = async (req: Request, res: Response) => {
  req.logger = req.logger.child({ service: 'users', serviceHandler: 'getUsers' });
  req.logger.info({ status: 'start' });

  try {
    const users = await new Promise((resolve, reject) => {
      dataBase.query(
        `SELECT * FROM users ORDER BY userName DESC;`,
        (err, data) => err ? reject(err) : resolve(data)
      );
    }) as User[];
    return res.status(200).json({ users });
  } catch (error) {
    req.logger.error({ status: 'error', code: 500 });
    return res.status(404).json();
  }
};

export const login = async (req: Request, res: Response) => {
  req.logger = req.logger.child({ service: 'users', serviceHandler: 'login' });
  req.logger.info({ status: 'start' });

  try {
    const {email, provider, userName, avatar} = req.body;

    if(!email || !provider){
      const response = { status: 'No data user provided' };
      req.logger.warn(response);
      return res.status(400).json(response);
    }

    let user: User[];

      const userExist = await getUserUtil({email});

      if(userExist.length){
        user = await new Promise((resolve, reject) => {
          dataBase.query(
            `SELECT * FROM users WHERE email = '${email}';`,
            (err, data) => err ? reject(err) : resolve(data)
          );
        }) as User[];
      }else{
        const saveUser: User = {
          idUser: uuidv4(),
          userName,
          email,
          created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          isAdmin: false,
          avatar,
          provider,
          Phone: null,
          Cedula: null,
        }

        await createUserUtil(saveUser);
        user = [saveUser]
      }

    const ExistPacient = await ExistPacientByUserUtil(email);

    if(ExistPacient.length === 0 && !user[0].isAdmin){
      const response = { status: 'No tienes mascotas registradas.' };
      req.logger.warn(response);
      return res.status(400).json(response);
    }

    if(user?.length){

      const me = {
        user: user[0],
        token: jwt.sign({idUser: user[0].idUser}, config.JWT_SECRET),
      }

      return res.status(200).json({me})
    }else{
      return res.status(400).json({status: 'Datos incorrectos, revise e intentelo de nuevo'});
    }
  } catch (error) {
    req.logger.error({ status: 'error', code: 500, error: error.message });
    return res.status(404).json();
  }
}

export const updateMe = async (req: Request, res: Response) => {
  req.logger = req.logger.child({ service: 'users', serviceHandler: 'updateMe' });
  req.logger.info({ status: 'start' });

  try {
    const {userName, email, Phone, cedula} = req.body
    const user = req.user
  
    if(!email || !userName || !Phone || !cedula){
      const response = { status: 'No data user provided' };
      req.logger.warn(response);
      return res.status(400).json(response);
    }

    await updateUserUtil(userName, email, Phone, user.idUser, cedula)

    return res.status(200).json();
  } catch (error) {
    req.logger.error({ status: 'error', code: 500 });
    return res.status(404).json();
  }
}

export const updateUser = async (req: Request, res: Response) => {
  req.logger = req.logger.child({ service: 'users', serviceHandler: 'updateUser' });
  req.logger.info({ status: 'start' });

  try {
    const {userName, email, Phone, cedula} = req.body
    const { idUser } = req.params
  
    if(!email || !userName|| !idUser){
      const response = { status: 'No data user provided' };
      req.logger.warn(response);
      return res.status(400).json(response);
    }

    await updateUserUtil(userName, email, Phone, idUser, cedula)

    return res.status(200).json();
  } catch (error) {
    req.logger.error({ status: 'error', code: 500 });
    return res.status(404).json();
  }
}

export const newUser = async (req: Request, res: Response) => {
  req.logger = req.logger.child({ service: 'users', serviceHandler: 'newUser' });
  req.logger.info({ status: 'start' });

  try {
    const {userName, email, admin, Phone, Cedula} = req.body
  
    if(!email || !userName || !Cedula){
      const response = { status: 'No data user provided' };
      req.logger.warn(response);
      return res.status(400).json(response);
    }

    const userExist = await getUserUtil({email});

    if(userExist.length){
      const response = { status: 'Este Usuario ya existe' };
      req.logger.warn(response);
      return res.status(400).json(response);
    }

    const saveUser: User = {
      idUser: uuidv4(),
      userName,
      email,
      created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      isAdmin: admin,
      avatar: null,
      provider: 'veterinario',
      Phone: Phone || null,
      Cedula,
    }

    await createUserUtil(saveUser);

    return res.status(200).json();

  } catch (error) {
    req.logger.error({ status: 'error', code: 500 });
    return res.status(404).json();
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  req.logger = req.logger.child({ service: 'users', serviceHandler: 'deleteUser' });
  req.logger.info({ status: 'start' });

  try {
    const {idUser} = req.params

    if(!idUser){
      const response = { status: 'No data idUser for user delete' };
      req.logger.warn(response);
      return res.status(400).json(response);
    }

    const user = await getUserUtil({idUser});
    await DeletePacientByUserUtil(user[0].email);
    await DeleteUserUtil(idUser);

    return res.status(200).json();
  } catch (error) {
    req.logger.error({ status: 'error', code: 500 });
    return res.status(404).json();
  }
}