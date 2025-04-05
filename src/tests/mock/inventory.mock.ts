import { InventoryHistory } from '@/models/inventory.js';
import { Item } from '@/models/item.js';

const produtosMock: Item[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    descricao: `Produto ${i + 1}`,
    estoque_minimo: (Math.floor(Math.random() * 50) + 10),
    un_medida: "UN",
    flag_controle: "S"
}));

const datas = [
    '2024-04-04T00:00:00Z',
    '2024-03-26T00:00:00Z',
    '2024-03-19T00:00:00Z',
    '2024-03-12T00:00:00Z'
];

const inventoryHistoryMock: InventoryHistory[] = produtosMock.flatMap((item, index) =>
    datas.map(data => ({
        id: index,
        item,
        quantidade: Math.floor(Math.random() * 100) + 1,
        criado_em: data
    }))
);

export { inventoryHistoryMock };
