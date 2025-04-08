import { Router } from 'express';
import { InventoryController } from '../../controllers/inventory.controller.js';

const router = Router();
const inventoryController = new InventoryController();


router.get('/', async (req, res, next) => { 
    await inventoryController.findAll(req, res).catch(next)
});

router.post('/', async (req, res, next) => { 
    await inventoryController.createAll(req, res).catch(next);
});


export default router;
