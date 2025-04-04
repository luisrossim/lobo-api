import { InventoryHistory } from '@/models/inventory.js';
import { Produto } from '@/models/product.js';

const produtosMock: Produto[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    descricao: `Produto ${i + 1}`,
    estoqueMinimo: (Math.floor(Math.random() * 50) + 10).toString()
}));

const datas = [
    '2024-04-04T00:00:00Z',
    '2024-03-26T00:00:00Z',
    '2024-03-19T00:00:00Z',
    '2024-03-12T00:00:00Z'
];

const inventoryHistoryMock: InventoryHistory[] = produtosMock.flatMap(produto =>
    datas.map(data => ({
        produto,
        quantidade: Math.floor(Math.random() * 100) + 1,
        criadoEm: data
    }))
);

export { inventoryHistoryMock };
