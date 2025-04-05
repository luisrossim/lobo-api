import logger from '@/config/logger.js';
import { HttpException } from '@/exceptions/http-exception.js';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof HttpException) {
		logger.error(err.message);
		res.status(err.status).json({ message: err.message });
		return;
	}

	const internalErrorMessage = "Erro interno do servidor."
	
	logger.error(`${internalErrorMessage} ${err}`);
	res.status(500).json({ message: internalErrorMessage });
}