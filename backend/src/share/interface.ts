import { Request } from 'express';
import { User } from '../db';

export interface accessTokenPayload {
  userId: number;
  email: string;
}

export interface AuthRequest extends Request {
  user?: User;
}
