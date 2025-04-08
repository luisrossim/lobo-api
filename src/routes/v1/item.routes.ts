import { ItemController } from '../../controllers/item.controller.js';
import { Router } from 'express';

const router = Router();
const itemController = new ItemController();


router.get('/:id', async (req, res, next) => {
    await itemController.findById(req, res).catch(next);
});

router.get('/', async (req, res, next) => { 
    await itemController.findAll(req, res).catch(next);
});


export default router;
