import { Request, Response } from 'express';
import { AuthRequest, AuthResponse } from '../models/auth.js';
import { AuthService } from '../services/auth.service.js';


export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }


  async login(req: Request, res: Response) {
    const authRequest: AuthRequest = req.body;

    try {
      const authResponse: AuthResponse = await this.authService.autenticar(authRequest);
      return res.status(200).json(authResponse);

    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  async refreshAccess(req: Request, res: Response) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token não fornecido.' });
    }

    try {
      const updatedAuthData = await this.authService.accessTokenRecover(refreshToken);
      return res.status(200).json(updatedAuthData);

    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  async checkAccess(req: Request, res: Response) {
    return res.status(200).json({ message: 'Sessão válida.' });
  }
}
