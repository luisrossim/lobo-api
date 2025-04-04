import { Request, Response } from 'express';
import logger from '@/config/logger.js';
import { ItemService } from '@/services/item.service.js';
import { Item } from '@/models/item.js';
import { Utils } from '@/utils/utils.service.js';


export class ItemController {
  private itemService: ItemService;


  constructor(){
    this.itemService = new ItemService();
  }


  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const idNumber = Utils.parseParamToValidNumber(id);
      const item = await this.itemService.findById(idNumber);

      if (!item) {
        return res.status(404).json({ message: "Item não encontrado." });
      }
  
      return res.status(200).json(item);

    } catch (err: any) {
      logger.error("Erro interno ao buscar estoque.");
      return res.status(500).json({ message: err.message });
    }
  }


  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const itens = await this.itemService.findAll();

      if (itens.length === 0) {
        return res.status(204).send();
      }

      return res.status(200).json(itens);

    } catch (err: any) {
      logger.error("Erro interno ao buscar estoque.");
      return res.status(500).json({ message: err.message });
    }
  }

}
