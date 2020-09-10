import { appendCellForDataOutsideTree } from '../../src/js/helpers/explorerHelper';;

describe('appendCellForDataOutsideTree', () => {
    it('appends an object to the existing array correctly representing the difference between overall total and the total for the tree', () => {
        const dataForTree = [{ amount: 1 }, { amount: 2 }];
        const dataForTreeWithAppendedCell = appendCellForDataOutsideTree(dataForTree, 10, 'award');
        expect(dataForTreeWithAppendedCell[0].amount).toEqual(7);
        expect(dataForTreeWithAppendedCell[0].name).toEqual('Sum of all Awards after Top 500');
    });
});
