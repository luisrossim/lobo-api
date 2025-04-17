import { Router } from 'express';
import { InventoryController } from '../../controllers/inventory.controller.js';
import { validate } from '../../middlewares/validate-dto.middleware.js';
import { ContagemSchema } from '../../models/schemas/contagem.schema.js';
import { JWTAuth } from '../../middlewares/jwt.middleware.js';

const router = Router();
const inventoryController = new InventoryController();


router.get('/', JWTAuth, async (req, res, next) => { 
    await inventoryController.findAll(req, res).catch(next)
});

router.post('/', JWTAuth, validate(ContagemSchema), async (req, res, next) => { 
    await inventoryController.createAll(req, res).catch(next);
});


export default router;
