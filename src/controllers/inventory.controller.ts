import { Request, Response } from 'express';
import { InventoryService } from '@/services/inventory.service.js';
import { InventoryHistory } from '@/models/inventory.js';
import logger from '@/config/logger.js';
import { Utils } from '@/utils/utils.service.js';
import { NotFoundException } from '@/exceptions/not-found.js';


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

  async create(req: Request, res: Response): Promise<Response> {
    const { itemId, quantidade, criadoEm } = req.body;

    const itemIdNumber = Utils.parseParamToValidNumber(itemId);
    const quantidadeNumber = Utils.parseParamToValidNumber(quantidade);
    const criadoEmDate = Utils.parseStringToValidDate(criadoEm); 

    const historicoId = await this.inventoryService.create(itemIdNumber, quantidadeNumber, criadoEmDate);
    return res.status(201).json(historicoId);
  }

}
