import { executeQuery, salvarContagemEmLote } from "../config/database.js";
import { ContagemEstoque } from "../models/inventory.js";
import { CustomError } from "../exceptions/custom-error.js";
import { format } from "date-fns/format";
import { ContagemItem } from "../models/schemas/contagem.schema.js";


export class InventoryService {

	constructor(){}

 
	async findAll(): Promise<ContagemEstoque[]> {
		const query = `
			SELECT 
				ICE.ID, 
				ICE.DATA_CONTAGEM, 
				ICE.QUANTIDADE,
				P.COD_PRO,
				P.NOME_PRO,
				P.ESTOQUE_MINIMO_PRO,
				UNM.DESCRICAO AS UNIDADE_MEDIDA
			FROM 
				INDUSTRIA_CONTAGEM_ESTOQUE ICE
			JOIN 
				PRODUTO P ON (ICE.CODIGO_PRODUTO = P.COD_PRO)
			JOIN
				UNIDADE_MEDIDA UNM ON (UNM.CODIGO = P.CODIGO_UNIDADE_ENTRADA)
			WHERE
				ICE.DATA_CONTAGEM >= CURRENT_DATE - 28
			ORDER BY 
				P.NOME_PRO ASC, ICE.DATA_CONTAGEM ASC
		`

		const historico = await executeQuery<ContagemEstoque[]>(query);

		if(!historico){
			throw new CustomError('Erro ao buscar histórico de contagem do estoque.');
		}

		return historico;
	}


	async createAll(contagens: ContagemItem[]): Promise<void> {
		const todayDate = new Date();
		const todayString = format(todayDate, "yyyy-MM-dd");

		return await salvarContagemEmLote(contagens, todayString);
	}

}
