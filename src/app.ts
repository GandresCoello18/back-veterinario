/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import express from 'express';
import cors from 'cors';
import { logger } from './middlewares';
import {config} from './utils/config';

import User from './services/user';
import Pacient from './services/pacient';
import Product from './services/product';
import Vacunas from './services/vacunas';

export function init() {
  const app = express();

  app.use(cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:8080',
      'https://veterinaria-mundo-animal.vercel.app'
    ]
  }));

  // app.use(express.json());
  // Use JSON parser for all non-webhook routes

  app.use((req, res, next) => {
    if (
      req.originalUrl === '/api/webhooks/stripe' ||
      req.originalUrl === '/api/v2/stripe/webhook'
    ) {
      next();
    } else {
      express.json()(req, res, next);
    }
  });

  app.use("/static", express.static("public"));
  app.set("port", config.PORT)

  app.use('/api', logger, [
    User,
    Pacient,
    Product,
    Vacunas,
  ]);

  return { app };
}

init().app.listen(init().app.get("port"), () => {
  console.log(`🚀 Server ready at http://localhost:${init().app.get("port")}`);
});
