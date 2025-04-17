import { JWTAuth } from '../../middlewares/jwt.middleware.js';
import { ItemController } from '../../controllers/item.controller.js';
import { Router } from 'express';

const router = Router();
const itemController = new ItemController();


router.get('/:id', JWTAuth, async (req, res, next) => {
    await itemController.findById(req, res).catch(next);
});

router.get('/', JWTAuth, async (req, res, next) => { 
    await itemController.findAll(req, res).catch(next);
});


export default router;
