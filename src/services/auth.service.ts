import { User } from "@/models/user.js";
import { executeQuery } from "../config/database.js";
import { AuthRequest, AuthResponse, RefreshAuthResponse } from "../models/auth.js";
import { comparePassword } from "./security/bcrypt.service.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "./security/jwt.service.js";


export class AuthService {

    async autenticar(credenciais: AuthRequest): Promise<AuthResponse> {
        let query = `SELECT * FROM USUARIO_APP WHERE login = ?`;

        try {
            const result = await executeQuery<User[]>(query, [credenciais.login]);

            if(!result || result.length <= 0) {
                throw new Error('Usuário não encontrado.');
            }

            const passwordIsValid = await comparePassword(credenciais.password, result[0].password);

            if(!passwordIsValid) {
                throw new Error('Credenciais incorretas.');
            }

            const accessToken = generateAccessToken(credenciais.login);
            const refreshToken = generateRefreshToken(credenciais.login);

            const authResponse: AuthResponse = {
                login: credenciais.login,
                accessToken: accessToken,
                refreshToken: refreshToken
            }

            return authResponse;

        } catch (err: any) {
            throw new Error(err.message);
        }
    }


    async accessTokenRecover(refreshToken: string): Promise<RefreshAuthResponse> {
        try {
            const decoded = verifyRefreshToken(refreshToken);

            if(!decoded){
                throw new Error('Refresh token inválido.')
            }

            const newAccessToken = generateAccessToken(decoded.login)
            
            const updatedAuthData: RefreshAuthResponse = {
                login: decoded.login,
                accessToken: newAccessToken,
                refreshToken: refreshToken
            }

            return updatedAuthData;

        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}