import { Request, Response, Router } from 'express';
import { validationMiddleware } from '../middleware/validation.middleware';
import { loginSchema, registerSchema } from '../share/validationSchemaAndType';
import { chatService } from '../service/chat.service';
const chatRouter = Router();

chatRouter.post(
  '/register',
  [validationMiddleware(registerSchema)],
  (req: Request, res: Response) => {
    return chatService.d(req.body, res);
  },
);

chatRouter.post(
  '/login',
  [validationMiddleware(loginSchema)],
  (req: Request, res: Response) => {
    return chatService.h(req.body, res);
  },
);

export default chatRouter;
