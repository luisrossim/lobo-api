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

    const authResponse: AuthResponse = await this.authService.autenticar(authRequest);
    return res.status(200).json(authResponse);
  }


  async refreshAccess(req: Request, res: Response) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token não fornecido.' });
    }

    const updatedAuthData = await this.authService.accessTokenRecover(refreshToken);
    
    return res.status(200).json(updatedAuthData);
  }


  async checkAccess(req: Request, res: Response) {
    return res.status(200).json({ message: 'Sessão válida.' });
  }
}
