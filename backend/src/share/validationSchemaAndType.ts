import { z } from 'zod';
import { AuthProvider } from '../db';

export const registerSchema = z.object({
  name: z.string().readonly(),
  email: z.string().readonly(),
  password: z.string().readonly(),
  provider: z
    .enum(Object.values(AuthProvider) as [string, ...string[]])
    .readonly(),
});
export type registerType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().readonly(),
  password: z.string().readonly(),
});
export type loginType = z.infer<typeof loginSchema>;
