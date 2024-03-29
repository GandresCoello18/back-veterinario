import * as envalid from 'envalid';
import path from 'path';

const { str, num } = envalid;

export const config = envalid.cleanEnv(
  process.env,
  {
    DB_HOST: str(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_NAME: str(),
    DB_PORT: num(),
    JWT_SECRET: str(),
    PORT: num(),
    CORREO_GMAIL: str(),
    CLAVE_GMAIL: str(),
  },
  { strict: true, dotEnvPath: path.resolve(__dirname, '../../.env') },
);
