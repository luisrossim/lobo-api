import { executeQuery } from "@/config/database.js";
import { InventoryHistory } from "../models/inventory.js";
import { inventoryHistoryMock } from "@/tests/mock/inventory.mock.js"
import { ItemService } from "./item.service.js";
import { CustomError } from "@/exceptions/custom-error.js";


export class InventoryService {
	private itemService: ItemService;

	constructor(){
		this.itemService = new ItemService();
	}

	async findAll(): Promise<InventoryHistory[]> {
		const mock = inventoryHistoryMock;
		return mock;
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
