import { z } from 'zod';

export const AuthSchema = z.object({
  login: z.string().email(),
  password: z.string().min(6)
});

export type AuthType = z.infer<typeof AuthSchema>;