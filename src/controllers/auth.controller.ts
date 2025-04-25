import { Request, Response } from 'express';
import { AuthRequest, AuthResponse } from '../models/auth.js';
import { AuthService } from '../services/auth.service.js';


export class AuthController {
  private authService: AuthService;
  private accessTokenMaxAge: number = 24 * 60 * 60 * 1000;
  private refreshTokenMaxAge: number = 6 * 30 * 24 * 60 * 60 * 1000;

  constructor() {
    this.authService = new AuthService();
  }


  async login(req: Request, res: Response) {
    const authRequest: AuthRequest = req.body;

    const authResponse: AuthResponse = await this.authService.autenticar(authRequest);

    res.cookie('accessToken', authResponse.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: this.accessTokenMaxAge
    });

    res.cookie('refreshToken', authResponse.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: this.refreshTokenMaxAge
    });

    res.status(200).send();
    return;
  }


  async refreshAccess(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token inexistente.' });
    }

    const updatedAuthData = await this.authService.accessTokenRecover(refreshToken);

    res.cookie('accessToken', updatedAuthData.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: this.accessTokenMaxAge
    });

    res.cookie('refreshToken', updatedAuthData.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: this.refreshTokenMaxAge
    });
    
    res.status(200).send();
    return;
  }


  async logoutAndClearCookies(req: Request, res: Response) {
    res.clearCookie('accessToken', { httpOnly: true, secure: false, path: '/' });
    res.clearCookie('refreshToken', { httpOnly: true, secure: false, path: '/' });
    res.status(200).send();
    return;
  }


  async checkAccess(req: Request, res: Response) {
    return res.status(200).json({ message: 'Sessão válida.' });
  }
}
