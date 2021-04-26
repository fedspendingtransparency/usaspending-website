/*
 * TableContainer-test
 * Created by Max Kendall 04/21/2021
*/

import React from 'react';
import { render, waitFor } from 'test-utils';

import * as apis from 'apis/agencyV2';
import TableContainer from 'containers/agencyV2/accountSpending/TableContainer';

const mockResponse = {
    toptier_code: "012",
    fiscal_year: 2020,
    page_metadata: {
        page: 1,
        total: 9,
        limit: 10,
        next: null,
        previous: null,
        hasNext: false,
        hasPrevious: false
    },
    results: [
        {
            name: "Income Security",
            children: [
                {
                    name: "Food and nutrition assistance",
                    obligated_amount: 259770934487.36,
                    gross_outlay_amount: 221753730680.75
                },
                {
                    name: "Housing assistance",
                    obligated_amount: 37594348781.1,
                    gross_outlay_amount: 14252288422.25
                },
                {
                    name: "Federal employee retirement and disability",
                    obligated_amount: 0.0,
                    gross_outlay_amount: 3139528.82
                }
            ],
            obligated_amount: 297365283268.46,
            gross_outlay_amount: 236009158631.82
        }
    ]
};

const defaultProps = {
    agencyId: '012',
    fy: '2020',
    type: 'budget_function',
    subHeading: 'test'
};

test('no duplicate API Requests 👌👌👌👌', () => {
    const spy = jest.spyOn(apis, 'fetchSpendingByCategory').mockReturnValue({
        promise: Promise.resolve({ data: mockResponse }),
        cancel: jest.fn()
    });
    const { rerender } = render(<TableContainer {...defaultProps} fy={null} />);
    rerender(<TableContainer {...defaultProps} />);
    return waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).not.toHaveBeenCalledTimes(2);
    });
});
