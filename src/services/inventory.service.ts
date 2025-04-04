import { InventoryHistory } from "../models/inventory.js";
import { inventoryHistoryMock } from "@/tests/mock/inventory.mock.js"


export class InventoryService {

	async findAll(): Promise<InventoryHistory[]> {
		try {
			const mock = inventoryHistoryMock;
			return mock;
		
		} catch (err: any) {
			throw new Error(`Erro ao buscar estoque. ${err.message}`);
		}
	}

}
