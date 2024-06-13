import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthProvider, db, Prisma } from '../db';
import { statusCode } from '../share/enum';
import { loginType, registerType } from '../share/validationSchemaAndType';

export const jwt_SECRET = process.env.jwt_SECRET || 'this is jwt secret';
export class AuthService {
  static async register(body: registerType, res: Response) {
    const { name, email, password, provider } = body;
    const existing = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (existing) {
      return res.status(statusCode.BadRequest).json({
        statusCode: statusCode.BadRequest,
        response: {},
        message: 'already email exist',
      });
    }

    const hashPassword = await bcrypt.hash(password, 8);
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        provider: provider as AuthProvider,
      },
    });

    return res.status(statusCode.Create).json({
      statusCode: statusCode.Create,
      response: user,
      message: 'registration successful',
    });
  }

  static async login(body: loginType, res: Response) {
    const { email, password } = body;
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(statusCode.BadRequest).json({
        statusCode: statusCode.BadRequest,
        response: {},
        message: 'invalid email',
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(statusCode.Unauthorize).json({
        statusCode: statusCode.Unauthorize,
        response: {},
        message: 'Invalid credentials',
      });
    }

    const refreshToken = jwt.sign(
      { userId: user.id, email: user.email },
      jwt_SECRET,
    );
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      jwt_SECRET,
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      priority: 'high',
    });

    return res.status(statusCode.Ok).json({
      statusCode: statusCode.Ok,
      response: { ...user, accessToken },
      message: 'registration successful',
    });
  }

  static async getMe(res: Response, userId?: number) {
    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    return res.status(statusCode.Ok).json({
      statusCode: statusCode.Ok,
      response: user,
      message: 'registration successful',
    });
  }
}
