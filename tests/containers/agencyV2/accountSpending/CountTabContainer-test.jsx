/*
 * CountTabContainer-test
 * Created by Max Kendall 04/21/2021
*/
import React from 'react';
import { render, waitFor } from 'test-utils';

import * as apis from 'apis/agencyV2';
import CountTabContainer from 'containers/agencyV2/accountSpending/CountTabContainer';

const mockResponse = {
    toptier_code: "012",
    fiscal_year: 2020,
    budget_function_count: 9,
    budget_sub_function_count: 17,
    messages: []
};

const defaultProps = {
    fy: '2020',
    agencyId: '012',
    type: 'budget_function',
    subHeading: 'test',
    label: 'test',
    setActiveTab: () => {},
    active: true,
    countField: 'test',
    subCountField: 'test'
};

test('no duplicate API Requests 👌👌👌👌', () => {
    const spy = jest.spyOn(apis, 'fetchSpendingCount').mockReturnValue({
        promise: Promise.resolve({ data: mockResponse }),
        cancel: jest.fn()
    });
    const { rerender } = render(<CountTabContainer {...defaultProps} fy="" />);
    rerender(<CountTabContainer {...defaultProps} />);
    return waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).not.toHaveBeenCalledTimes(2);
    });
});
