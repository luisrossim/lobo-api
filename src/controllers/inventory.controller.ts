import { Request, Response } from 'express';
import { InventoryService } from '../services/inventory.service.js';;
import { ContagemEstoque } from '../models/inventory.js';
import { ContagemItem } from '../models/schemas/contagem.schema.js';


export class InventoryController {
  private inventoryService: InventoryService;


  constructor() {
    this.inventoryService = new InventoryService();
  }


  async findAll(req: Request, res: Response): Promise<Response> {
    const contagens: ContagemEstoque[] = await this.inventoryService.findAll();

    if(contagens.length === 0){
      return res.status(204).send();
    }

    return res.status(200).json(contagens);
  }


  async createAll(req: Request, res: Response): Promise<Response> {
    const contagens: ContagemItem[] = req.body;
    
    await this.inventoryService.createAll(contagens);
    
    return res.status(201).send();
  }

}
