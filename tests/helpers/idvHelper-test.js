import {
    getAllNetPositiveIdvFileCDefCodes,
    getChildAwardFileCDetails
} from 'helpers/idvHelper';

const createMockArrayItem = (code, amount) => ({ code, amount });

const mockData = {
    child_account_obligations_by_defc: [
        createMockArrayItem('L', 10)
    ],
    child_account_outlays_by_defc: [
        createMockArrayItem('L', 1)
    ],
    grandchild_account_obligations_by_defc: [
        createMockArrayItem('M', 10)
    ],
    grandchild_account_outlays_by_defc: [
        createMockArrayItem('M', 1)
    ]
};

describe('idvHelper', () => {
    describe('getChildAwardFileCDetails', () => {
        it('returns all child and grand child objects in a single array', () => {
            const result = getChildAwardFileCDetails(mockData);
            expect(result).toEqual([
                createMockArrayItem('L', 10),
                createMockArrayItem('L', 1),
                createMockArrayItem('M', 10),
                createMockArrayItem('M', 1)
            ]);
        });
    });
    describe('getAllNetPositiveIdvFileCDefCodes', () => {
        it('only returns non-zero items & de-dupes items in array', () => {
            const parentIdv = {
                fileC: {
                    obligations: mockData
                        .child_account_obligations_by_defc
                        .concat([createMockArrayItem('N', 0)]),
                    outlays: mockData
                        .child_account_outlays_by_defc
                        .concat([createMockArrayItem('N', 0)])
                }
            };
            const childIdv = {
                child_file_c: [createMockArrayItem('O', 0), createMockArrayItem('O', -1)]
            };
            const result = getAllNetPositiveIdvFileCDefCodes(parentIdv, childIdv);
            console.log('result', result);
            expect(result).toEqual(['L', 'O']);
        });
    });
});
