import { Router } from 'express';
import { AuthController } from '../../controllers/auth.controller.js';
import { JWTAuth } from '../../middlewares/jwt.middleware.js';
import { requestLimiter } from '../../middlewares/rate-limit.middleware.js';

const router = Router();
const authController = new AuthController();

router.post('/login', requestLimiter, async (req, res, next) => { 
    await authController.login(req, res).catch(next)
});

router.post('/refresh-access', requestLimiter, async (req, res, next) => { 
    await authController.refreshAccess(req, res).catch(next)
});

router.get('/check-access', JWTAuth, async (req, res, next) => { 
    await authController.checkAccess(req, res).catch(next)
});


export default router;
