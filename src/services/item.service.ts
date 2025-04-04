import { executeQuery } from "@/config/database.js";
import { Item } from "@/models/item.js";

export class ItemService {

    async findById(id: number): Promise<Item | null> {
        const query = `
            SELECT *
            FROM ITEM
            WHERE ID = ?
        `

        try {
            const result = await executeQuery<Item[]>(query, [id]);
            return result[0] ?? null;

        } catch (err: any) {
            throw new Error(`Erro ao buscar item ${id}.`)
        }
    }
    

    async findAll(): Promise<Item[]> {
        const query = `
            SELECT *
            FROM ITEM
            WHERE FLAG_CONTROLE = 'S'
        `

        try {
            const result = await executeQuery<Item[]>(query)
            return result;
            
        } catch (err: any) {
            throw new Error('Erro ao buscar itens.')
        }
    }
}