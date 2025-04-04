import { ItemController } from '@/controllers/item.controller.js';
import { Router } from 'express';

const router = Router();
const itemController = new ItemController();


router.get('/:id', async (req, res) => {
    await itemController.findById(req, res)
});

router.get('/', async (req, res) => { 
    await itemController.findAll(req, res)
});


export default router;
