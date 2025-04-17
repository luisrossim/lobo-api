import { z } from 'zod';

export const ContagemItemSchema = z.object({
  itemId: z.number().int().positive(),
  quantidade: z.number().min(0)
});

export const ContagemSchema = z.array(ContagemItemSchema);

export type ContagemItem = z.infer<typeof ContagemItemSchema>;