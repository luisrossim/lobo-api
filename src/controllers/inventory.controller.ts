import { Request, Response } from 'express';
import { InventoryService } from '@/services/inventory.service.js';
import { InventoryHistory } from '@/models/inventory.js';
import logger from '@/config/logger.js';


export class InventoryController {
  private inventoryService: InventoryService

  constructor() {
    this.inventoryService = new InventoryService();
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const inventory: InventoryHistory[] = await this.inventoryService.findAll();
      return res.status(200).json(inventory);

    } catch (err: any) {
      logger.error("Erro ao buscar estoque.");
      return res.status(500).json({ message: err.message });
    }
  }

}
