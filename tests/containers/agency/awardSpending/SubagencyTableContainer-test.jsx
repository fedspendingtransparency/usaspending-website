/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, waitFor } from 'test-utils';
import * as redux from 'react-redux';
import * as apis from 'apis/agency';
import * as helpers from 'helpers/agency/AwardSpendingSubagencyHelper';
import SubagencyTableContainer from 'containers/agency/awardSpending/SubagencyTableContainer';

// eslint-disable-next-line import/prefer-default-export
export const mockResponse = {
    toptier_code: "073",
    fiscal_year: 2018,
    page_metadata: {
        page: 1,
        total: 1,
        limit: 2,
        next: 2,
        previous: null,
        hasNext: true,
        hasPrevious: false
    },
    results: [
        {
            name: "Small Business Administration",
            abbreviation: "SBA",
            total_obligations: 553748221.72,
            transaction_count: 14358,
            new_award_count: 13266,
            children: [
                {
                    name: "OFC OF CAPITAL ACCESS",
                    total_obligations: 549195419.92,
                    transaction_count: 13410,
                    new_award_count: 12417
                },
                {
                    name: "OFC OF DISASTER ASSISTANCE",
                    total_obligations: 4577429.17,
                    transaction_count: 943,
                    new_award_count: 576
                }
            ]
        }
    ]
};

const defaultProps = {
    fy: '2020',
    type: 'all',
    subHeading: 'test'
};

jest.spyOn(redux, 'useSelector').mockReturnValue({
    toptierCode: '073'
});

afterEach(() => {
    jest.clearAllMocks();
});

test('no duplicate API Requests on fy change', () => {
    const spy = jest.spyOn(apis, 'fetchSubagencySpendingList').mockReturnValue({
        promise: Promise.resolve({ data: mockResponse }),
        cancel: jest.fn()
    });
    const { rerender } = render(<SubagencyTableContainer {...defaultProps} fy={null} />);
    rerender(<SubagencyTableContainer {...defaultProps} />);
    return waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).not.toHaveBeenCalledTimes(2);
    });
});

test('no duplicate API Requests on type change', () => {
    const spy = jest.spyOn(apis, 'fetchSubagencySpendingList').mockReturnValue({
        promise: Promise.resolve({ data: mockResponse }),
        cancel: jest.fn()
    });
    const { rerender } = render(<SubagencyTableContainer {...defaultProps} />);
    rerender(<SubagencyTableContainer {...defaultProps} type="contracts" />);
    return waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).not.toHaveBeenCalledTimes(2);
    });
});

test('parses data from the API using agency obligated amount from redux state', () => {
    const spy = jest.spyOn(helpers, 'parseRows');
    render(<SubagencyTableContainer {...defaultProps} />);
    return waitFor(() => {
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(mockResponse.results);
    });
});
