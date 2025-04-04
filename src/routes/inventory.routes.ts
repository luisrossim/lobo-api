import { Router } from 'express';
import { InventoryController } from '@/controllers/inventory.controller.js';

const router = Router();
const inventoryController = new InventoryController();


router.get('/', async (req, res) => { 
    await inventoryController.findAll(req, res)
});


export default router;
