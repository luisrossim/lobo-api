import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../services/security/jwt.service.js";
import logger from "../config/logger.js";

export function JWTAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const ip = req.ip?.replace(/^::ffff:/, '');

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    logger.warn(`Acesso não autorizado (token inexistente) [IP: ${ip}].`)
    res.status(401).json({ message: "Acesso não autorizado." });
    return;
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    logger.warn(`Acesso negado (token inválido) [IP: ${ip}].`)
    res.status(401).json({ message: "Acesso negado." });
    return;
  }

  (req as any).user = decoded;
  next();
}
