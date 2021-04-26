import React from 'react';
import { render, waitFor } from 'test-utils';
import * as agencyV2 from 'apis/agencyV2';
import AccountSpending from 'components/agencyV2/accountSpending/AccountSpending';

const defaultProps = {
    agencyId: '012',
    fy: '2020'
};

const mockData = {
    data: []
};

let fetchBudgetaryResourcesSpy;
let fetchSpendingCountSpy;
let fetchSpendingByCategorySpy;

beforeEach(() => {
    fetchBudgetaryResourcesSpy = jest.spyOn(agencyV2, 'fetchBudgetaryResources').mockReturnValue({
        promise: new Promise((resolve) => process.nextTick(() => (resolve(mockData)))),
        cancel: jest.fn()
    }).mockClear();
    fetchSpendingCountSpy = jest.spyOn(agencyV2, 'fetchSpendingCount').mockReturnValue({
        promise: new Promise((resolve) => process.nextTick(() => (resolve(mockData)))),
        cancel: jest.fn()
    }).mockClear();
    fetchSpendingByCategorySpy = jest.spyOn(agencyV2, 'fetchSpendingByCategory').mockReturnValue({
        promise: new Promise((resolve) => process.nextTick(() => (resolve({
            data: {
                page_metadata: {
                    total: 1
                },
                results: []
            }
        })))),
        cancel: jest.fn()
    }).mockClear();
});

test('should fetch the data on first render ', () => {
    render(<AccountSpending {...defaultProps} />);
    return waitFor(() => {
        expect(fetchBudgetaryResourcesSpy).toHaveBeenCalledTimes(1);
        expect(fetchBudgetaryResourcesSpy).toHaveBeenCalledWith(defaultProps.agencyId, defaultProps.fy);
        // expect(fetchSpendingCountSpy).toHaveBeenCalledTimes(1);
        // expect(fetchSpendingCountSpy).toHaveBeenCalledWith(defaultProps.agencyId, defaultProps.fy, 'budget_function');
        // expect(fetchSpendingByCategorySpy).toHaveBeenCalledTimes(1);
        // expect(fetchSpendingByCategorySpy).toHaveBeenCalledWith(defaultProps.agencyId, 'budget_function', {
        //     fiscal_year: defaultProps.fy,
        //     limit: 10,
        //     page: 1,
        //     sort: 'obligatedAmount',
        //     order: 'desc'
        // });
    });
});

test('should fetch the data again when fy changes ', () => {
    const { rerender } = render(<AccountSpending {...defaultProps} />);
    rerender(<AccountSpending {...defaultProps} fy="2021" />);
    return waitFor(() => {
        expect(fetchBudgetaryResourcesSpy).toHaveBeenCalledTimes(2);
        expect(fetchBudgetaryResourcesSpy).toHaveBeenCalledWith(defaultProps.agencyId, "2021");
    });
});
