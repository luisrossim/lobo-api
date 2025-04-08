import { executeQuery, salvarContagemEmLote } from "../config/database.js";
import { InventoryContagem, InventoryHistory } from "../models/inventory.js";
import { ItemService } from "./item.service.js";
import { CustomError } from "../exceptions/custom-error.js";
import { format } from "date-fns/format";


export class InventoryService {
	private itemService: ItemService;

	constructor(){
		this.itemService = new ItemService();
	}

 
	async findAll(): Promise<InventoryHistory[]> {
		const query = `
			SELECT 
				IH.ID, 
				I.ID AS ITEM_ID, 
				I.DESCRICAO, 
				I.ESTOQUE_MINIMO, 
				I.UN_MEDIDA, 
				IH.QUANTIDADE, 
				IH.CRIADO_EM 
			FROM 
				INVENTARIO_HISTORICO IH
			JOIN ITEM I
				ON IH.ITEM_ID = I.ID
			WHERE
				CRIADO_EM >= CURRENT_DATE - 28
			ORDER BY 
				IH.ITEM_ID ASC
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


	async createAll(contagem: InventoryContagem[]): Promise<void> {
		const todayDate = new Date();
		const todayString = format(todayDate, "yyyy-MM-dd");

		return await salvarContagemEmLote(contagem, todayString);
	}

}
