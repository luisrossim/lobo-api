import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../services/security/jwt.service.js";
import logger from "../config/logger.js";

export function JWTAuth(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip?.replace(/^::ffff:/, '');

  const token = req.cookies.accessToken;

  if (!token) {
    logger.warn(`Acesso não autorizado (token inexistente) [IP: ${ip}].`)
    res.status(401).json({ message: "Acesso expirado/inválido." });
    return;
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    logger.warn(`Acesso não autorizado (token inválido) [IP: ${ip}].`)
    res.status(401).json({ message: "Acesso expirado/inválido." });
    return;
  }

  (req as any).user = decoded;
  next();
}
