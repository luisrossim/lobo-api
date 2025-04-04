import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { JWTAuth } from '../middlewares/jwt.middleware.js';
import { requestLimiter } from '../middlewares/rate-limit.middleware.js';

const router = Router();
const authController = new AuthController();

router.post('/login', requestLimiter, async (req, res) => { 
    await authController.login(req, res) 
});

router.post('/refresh-access', requestLimiter, async (req, res) => { 
    await authController.refreshAccess(req, res)
});

router.get('/check-access', JWTAuth, async (req, res) => { 
    await authController.checkAccess(req, res) 
});


export default router;
