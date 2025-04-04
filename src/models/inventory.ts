import { Item } from "./item.js"

export interface InventoryHistory {
    id: number
    item: Item
    quantidade: number
    criado_em: string
}
