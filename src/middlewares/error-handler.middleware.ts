import logger from '@/config/logger.js';
import { HttpException } from '@/exceptions/http-exception.js';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof HttpException) {
		res.status(err.status).json({ message: err.message });
		return;
	}

	logger.error(`Erro interno do servidor: ${err.message}`);
	res.status(500).json({ message: 'Erro interno do servidor.' });
}