/**
 * @jest-environment jsdom
 */
import {
    appendCellForDataOutsideTree,
    truncateDataForTreemap
} from '../../src/js/helpers/explorerHelper';

describe('explorerHelper', () => {
    describe('appendCellForDataOutsideTree', () => {
        it('appends an object to the existing array correctly representing the difference between overall total and the total for the tree', () => {
            const dataForTree = [{ amount: 1 }, { amount: 2 }];
            const dataForTreeWithAppendedCell = appendCellForDataOutsideTree(dataForTree, 10, 'award');
            expect(dataForTreeWithAppendedCell[0].amount).toEqual(7);
            expect(dataForTreeWithAppendedCell[0].name).toEqual('Sum of all Awards after Top 500');
        });
    });
    describe('pluralizeSubdivision', () => {
        it('returns pluralized subdivision string', () => {
            const dataForTree = [{ amount: 1 }, { amount: 2 }];
            const dataForTreeWithAppendedCell = appendCellForDataOutsideTree(dataForTree, 10, 'object_class');
            expect(dataForTreeWithAppendedCell[0].name).toEqual('Sum of all Object Classes after Top 500');
        });
    });
    describe('truncateDataForTreemap', () => {
        it('returns an array of maximum 500 items, sorted on the amount property, with no negative values', () => {
            const dataForTree = new Array(1000).fill().map((item, i) => ({ amount: Math.random(i) }));
            const truncatedData = truncateDataForTreemap(dataForTree);
            const isInDescendingOrder = (
                truncatedData[100].amount > truncatedData[101].amount &&
                truncatedData[50].amount > truncatedData[51].amount &&
                truncatedData[498].amount > truncatedData[499].amount
            );

            expect(isInDescendingOrder).toEqual(true);
            expect(truncatedData.length).toEqual(500);
        });
    });
});

