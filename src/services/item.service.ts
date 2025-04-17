import { executeQuery } from "../config/database.js";
import { CustomError } from "../exceptions/custom-error.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { Item } from "../models/item.js";

export class ItemService {

    async findById(id: number): Promise<Item> {
        const query = `
            SELECT 
                P.COD_PRO, P.NOME_PRO, P.ESTOQUE_MINIMO_PRO, UNM.DESCRICAO AS UNIDADE_MEDIDA
            FROM 
                PRODUTO P
            JOIN
                UNIDADE_MEDIDA UNM ON (UNM.CODIGO = P.CODIGO_UNIDADE_ENTRADA)
            WHERE 
                COD_PRO = ?
        `

        const result = await executeQuery<Item[]>(query, [id]);

        if (result.length === 0) {
            throw new NotFoundException('Item não encontrado.');
        }

        return result[0];
    }

    async findAll(): Promise<Item[]> {
        const query = `
            SELECT 
                P.COD_PRO, P.NOME_PRO, P.ESTOQUE_MINIMO_PRO, UNM.DESCRICAO AS UNIDADE_MEDIDA
            FROM 
                PRODUTO P
            JOIN
                UNIDADE_MEDIDA UNM ON (UNM.CODIGO = P.CODIGO_UNIDADE_ENTRADA)
            WHERE 
                FLAG_CONTAGEM_ESTOQUE = 'S'
            ORDER BY 
                P.NOME_PRO
        `

        const result = await executeQuery<Item[]>(query);

        if (!result) {
            throw new CustomError('Erro ao buscar lista de itens.');
        }

        return result;
    }
}