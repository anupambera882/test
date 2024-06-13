import { Request, Response, Router } from 'express';
import { AuthService } from '../service/auth.service';
import { validationMiddleware } from '../middleware/validation.middleware';
import { loginSchema, registerSchema } from '../share/validationSchemaAndType';
import authentication from '../middleware/auth.middleware';
import { AuthRequest } from '../share/interface';
const authRouter = Router();

authRouter.post(
  '/register',
  [validationMiddleware(registerSchema)],
  (req: Request, res: Response) => {
    return AuthService.register(req.body, res);
  },
);

authRouter.post(
  '/login',
  [validationMiddleware(loginSchema)],
  (req: Request, res: Response) => {
    return AuthService.login(req.body, res);
  },
);

authRouter.get(
  '/get-me',
  [authentication],
  (req: AuthRequest, res: Response) => {
    return AuthService.getMe(res, req?.user?.id);
  },
);

export default authRouter;
