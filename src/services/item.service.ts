import { executeQuery } from "../config/database.js";
import { CustomError } from "../exceptions/custom-error.js";
import { NotFoundException } from "../exceptions/not-found.js";
import { Item } from "../models/item.js";

export class ItemService {

    async findById(id: number): Promise<Item> {
        const query = `SELECT * FROM ITEM WHERE ID = ?`

        const result = await executeQuery<Item[]>(query, [id]);

        if (result.length === 0) {
            throw new NotFoundException('Item não encontrado.');
        }

        return result[0];
    }

    async findAll(): Promise<Item[]> {
        const query = `SELECT * FROM ITEM WHERE FLAG_CONTROLE = 'S'`

        const result = await executeQuery<Item[]>(query);

        if (!result) {
            throw new CustomError('Erro ao buscar lista de itens.');
        }

        return result;
    }
}