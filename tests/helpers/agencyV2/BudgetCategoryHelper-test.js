import { parseRows } from 'helpers/agencyV2/BudgetCategoryHelper';
import BaseAccountSpendingRow from 'models/v2/agency/BaseAccountSpendingRow';
import { mockResponse } from '../../containers/agencyV2/accountSpending/TableContainer-test';

const mockData = mockResponse.results;

describe('parseRows', () => {
    test('the returned objects have BaseAccountSpendingRow in their prototype chain', () => {
        const result = parseRows(mockData, 4000);
        expect(Object.getPrototypeOf(result[0])).toEqual(BaseAccountSpendingRow);
    });

    test('the returned nested / child objects have BaseAccountSpendingRow in their prototype chain', () => {
        const result = parseRows(mockData, 4000);
        expect(Object.getPrototypeOf(result[0].children[0])).toEqual(BaseAccountSpendingRow);
    });

    test('adds agency obligated amount to each result', () => {
        const result = parseRows(mockData, 4000);
        expect(result[0]._totalObligatedAmount).toEqual(4000);
    });

    test('adds agency obligated amount to each nested / child result', () => {
        const result = parseRows(mockData, 4000);
        expect(result[0].children[0]._totalObligatedAmount).toEqual(4000);
    });
});
