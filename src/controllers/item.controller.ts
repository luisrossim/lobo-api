import { Request, Response } from 'express';
import { ItemService } from '@/services/item.service.js';
import { Utils } from '@/utils/utils.service.js';


export class ItemController {
  private itemService: ItemService;


  constructor(){
    this.itemService = new ItemService();
  }


  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const idNumber = Utils.parseParamToValidNumber(id);
    const item = await this.itemService.findById(idNumber);

    return res.status(200).json(item);
  }


  async findAll(req: Request, res: Response): Promise<Response> {
    const itens = await this.itemService.findAll();

    if (itens.length === 0) {
      return res.status(204).send();
    }

    return res.status(200).json(itens);
  }

}
