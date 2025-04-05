import { executeQuery } from "@/config/database.js";
import { InventoryHistory } from "../models/inventory.js";
import { inventoryHistoryMock } from "@/tests/mock/inventory.mock.js"
import { ItemService } from "./item.service.js";
import { NotFoundException } from "@/exceptions/not-found.js";


export class InventoryService {
	private itemService: ItemService;

	constructor(){
		this.itemService = new ItemService();
	}

	async findAll(): Promise<InventoryHistory[]> {
		try {
			const mock = inventoryHistoryMock;
			return mock;
		
		} catch (err: any) {
			throw new Error(`Erro ao buscar estoque. ${err.message}`);
		}
	}

	async create(itemId: number, quantidade: number, criadoEm: Date): Promise<number> {
		const query = `
			INSERT INTO INVENTARIO_HISTORICO (ITEM_ID, QUANTIDADE, CRIADO_EM)
			VALUES (?, ?, ?)
			RETURNING ID
		`
		const itemEntity = await this.itemService.findById(itemId);

		if (!itemEntity){
			throw new NotFoundException('Item não encontrado.');
		}

		const historicoId = await executeQuery<number>(query, [itemId, quantidade, criadoEm]);
		return historicoId;
	}

}
