import rateLimit from 'express-rate-limit';
import logger from '@/config/logger.js';

export const requestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  headers: true,
  handler: (req, res) => {
    const ip = req.ip?.replace(/^::ffff:/, '');
    logger.warn(`Limite de requisições atingido para o IP ${ip}.`);
    res.status(429).json({ message: 'Realizou muitas requisições, tente novamente mais tarde.' });
  }
});
