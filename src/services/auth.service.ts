import { User } from "../models/user.js";
import { executeQuery } from "../config/database.js";
import { AuthRequest, AuthResponse } from "../models/auth.js";
import { comparePassword } from "./security/bcrypt.service.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "./security/jwt.service.js";
import { CustomError } from "../exceptions/custom-error.js";


export class AuthService {

    async autenticar(credenciais: AuthRequest): Promise<AuthResponse> {
        let query = `
            SELECT ID, LOGIN_USUARIO, PASSWORD_USUARIO, FLAG_ATIVO
            FROM USUARIOS_APP 
            WHERE LOGIN_USUARIO = ?
        `;

        const result = await executeQuery<User[]>(query, [credenciais.login]);

        if(!result || result.length === 0) {
            throw new CustomError('Usuário não encontrado.');
        }

        const passwordIsValid = await comparePassword(credenciais.password, result[0].PASSWORD_USUARIO);

        if(!passwordIsValid) {
            throw new CustomError('Credenciais incorretas.');
        }

        const accessToken = generateAccessToken(credenciais.login);
        const refreshToken = generateRefreshToken(credenciais.login);

        const authResponse: AuthResponse = {
            login: credenciais.login,
            accessToken: accessToken,
            refreshToken: refreshToken
        }

        return authResponse;
    }


    async accessTokenRecover(refreshToken: string): Promise<AuthResponse> {
        const decoded = verifyRefreshToken(refreshToken);

        if(!decoded){
            throw new CustomError('Refresh token inválido.')
        }

        const newAccessToken = generateAccessToken(decoded.login)
        
        const updatedAuthData: AuthResponse = {
            login: decoded.login,
            accessToken: newAccessToken,
            refreshToken: refreshToken
        }

        return updatedAuthData;
    }
}