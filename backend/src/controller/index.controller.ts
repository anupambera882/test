import express, { Express, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRouter from './auth.controller';
import chatRouter from './chat.controller';
import { statusCode } from '../share/enum';

export function router(app: Express) {
  app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  // add new route here
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/chat', chatRouter);

  app.use('*', async (req, res) => {
    return res.status(statusCode.NotFound).json({
      statusCode: statusCode.NotFound,
      response: {},
      message: 'This route is not exist',
    });
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
}
