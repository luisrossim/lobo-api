import { addDays, getUnixTime, isAfter, set } from "date-fns";
import jwt, { JwtPayload } from "jsonwebtoken";

const aSecretKey: string = process.env.JWTSECRET || "dAKT&AiK@TPmQD&f@uKM!FTcG";
const rSecretKey: string = process.env.REFRESHJWTSECRET || "OSJudA%SimFs*LARasAl!ULNw";

export function generateAccessToken(login: string): string {
  const expiresIn = getTimeUntilNext4AM();
  return jwt.sign({ login }, aSecretKey, { expiresIn });
}

export function generateRefreshToken(login: string): string {
  const expiresIn = 6 * 30 * 24 * 60 * 60;
  return jwt.sign({ login }, rSecretKey, { expiresIn }); 
}

export function verifyAccessToken(token: string): JwtPayload  | null {
  try {
    return jwt.verify(token, aSecretKey) as JwtPayload ;
  } catch (error) {
    return null;
  }
}

export function verifyRefreshToken(token: string): JwtPayload  | null {
  try {
    return jwt.verify(token, rSecretKey) as JwtPayload ;
  } catch (error) {
    return null;
  }
}

function getTimeUntilNext4AM(): number {
  const now = new Date();
  
  let next4AM = set(now, { hours: 4, minutes: 0, seconds: 0, milliseconds: 0 });

  if (isAfter(now, next4AM)) {
    next4AM = addDays(next4AM, 1);
  }

  return getUnixTime(next4AM) - getUnixTime(now);
}