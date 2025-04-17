import { ContagemEstoque } from '../../models/inventory.js';
import { Item } from '../../models/item.js';

const produtosMock: Item[] = Array.from({ length: 10 }, (_, i) => ({
    COD_PRO: i + 1,
    NOME_PRO: `Produto ${i + 1}`,
    ESTOQUE_MINIMO_PRO: (Math.floor(Math.random() * 50) + 10),
    UNIDADE_MEDIDA: "UN"
}));

const datas = [
    '2024-04-04T00:00:00Z',
    '2024-03-26T00:00:00Z',
    '2024-03-19T00:00:00Z',
    '2024-03-12T00:00:00Z'
];

const inventoryHistoryMock: ContagemEstoque[] = produtosMock.flatMap((item, index) =>
    datas.map(data => ({
        ID: index,
        COD_PRO: item.COD_PRO,
        QUANTIDADE: Math.floor(Math.random() * 100) + 1,
        DATA_CONTAGEM: data,
        NOME_PRO: item.NOME_PRO,
        ESTOQUE_MINIMO_PRO: item.ESTOQUE_MINIMO_PRO,
        UNIDADE_MEDIDA: item.UNIDADE_MEDIDA
    }))
);

export { inventoryHistoryMock };
