import { executeQuery } from "@/config/database.js";
import { InventoryHistory } from "../models/inventory.js";
import { ItemService } from "./item.service.js";
import { CustomError } from "@/exceptions/custom-error.js";


export class InventoryService {
	private itemService: ItemService;

	constructor(){
		this.itemService = new ItemService();
	}

 
	async findAll(): Promise<InventoryHistory[]> {
		const query = `
			SELECT * 
			FROM INVENTARIO_HISTORICO
			WHERE CRIADO_EM >= CURRENT_DATE - 28
			ORDER BY CRIADO_EM DESC, ID DESC
		`

		const historico = await executeQuery<InventoryHistory[]>(query);

		if(!historico){
			throw new CustomError('Erro ao buscar histórico do inventário.');
		}

		return historico;
	}


	async create(itemId: number, quantidade: number, criadoEm: Date): Promise<number> {
		const query = `
			INSERT INTO INVENTARIO_HISTORICO (ITEM_ID, QUANTIDADE, CRIADO_EM)
			VALUES (?, ?, ?)
			RETURNING ID
		`
		const itemIsValid = await this.itemService.findById(itemId);
		const historicoId = await executeQuery<number>(query, [itemId, quantidade, criadoEm]);

		if(!historicoId) {
			throw new CustomError('Erro ao salvar histórico no inventário.');
		}

		return historicoId;
	}

}
