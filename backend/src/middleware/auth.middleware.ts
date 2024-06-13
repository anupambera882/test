import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { db, User } from '../db';
import { AuthRequest, accessTokenPayload } from '../share/interface';
import { statusCode } from '../share/enum';

const authentication = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    return res.status(statusCode.Unauthorize).json({
      statusCode: statusCode.Unauthorize,
      response: {},
      message: 'invalid token',
    });
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded: accessTokenPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as accessTokenPayload;

    const user = (await db.user.findUnique({
      where: {
        id: Number(decoded.userId),
      },
    })) as User;

    if (!user) {
      return res.status(statusCode.Unauthorize).json({
        statusCode: statusCode.Unauthorize,
        response: {},
        message: 'invalid token',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(statusCode.Unauthorize).json({
      statusCode: statusCode.Unauthorize,
      response: {},
      message: 'token expire',
    });
  }
};

export default authentication;
