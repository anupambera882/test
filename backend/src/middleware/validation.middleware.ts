import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { statusCode } from '../share/enum';

export function validationMiddleware(
  schema: z.ZodObject<{}, 'strip', z.ZodTypeAny, {}, {}>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { success,error } = schema.safeParse(req.body);

    if (!success) {
      return res.status(statusCode.BadRequest).json({
        statusCode: statusCode.BadRequest,
        response: error,
        message: 'Invalid input',
      });
    }

    next();
  };
}
