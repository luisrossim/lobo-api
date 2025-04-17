import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const formatted = result.error.format();

    res.status(400).json({
      message: 'Erro de validação dos dados recebidos.',
      errors: formatted,
    });
    
    return;
  }

  req.body = result.data;
  next();
};
