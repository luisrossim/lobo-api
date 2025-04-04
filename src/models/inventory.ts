import { Produto } from "./product.js"

export interface InventoryHistory {
    produto: Produto
    quantidade: number
    criadoEm: string
}
