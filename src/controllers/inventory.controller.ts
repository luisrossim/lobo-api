import { Request, Response } from 'express';
import { InventoryService } from '../services/inventory.service.js';;
import { Utils } from '../utils/utils.service.js';


export class InventoryController {
  private inventoryService: InventoryService;


  constructor() {
    this.inventoryService = new InventoryService();
  }


  async findAll(req: Request, res: Response): Promise<Response> {
    const inventoryHistory = await this.inventoryService.findAll();

    if(inventoryHistory.length === 0){
      return res.status(204).send();
    }

    return res.status(200).json(inventoryHistory);
  }


  async create(req: Request, res: Response): Promise<Response> {
    const { itemId, quantidade, criadoEm } = req.body;

    const itemIdNumber = Utils.parseParamToValidNumber(itemId);
    const quantidadeNumber = Utils.parseParamToValidNumber(quantidade);
    const criadoEmDate = Utils.parseStringToValidDate(criadoEm); 

    const historicoId = await this.inventoryService.create(itemIdNumber, quantidadeNumber, criadoEmDate);
    
    return res.status(201).json(historicoId);
  }


  async createAll(req: Request, res: Response): Promise<Response> {
    const contagem: { itemId: number, quantidade: number }[] = req.body;
    
    await this.inventoryService.createAll(contagem);
    
    return res.status(201).send();
  }

}
