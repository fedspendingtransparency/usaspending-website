/**
 * @jest-environment jsdom
 *
 * RecipientDistributionContainer-test.jsx
 * Created by Lizzie Salita 7/1/21
 */

import React from 'react';
import { render, waitFor } from 'test-utils';
import * as actions from 'redux/actions/agency/agencyActions';
import * as apis from 'apis/agency';
import BaseAgencyRecipients from 'models/v2/agency/BaseAgencyRecipients';
import RecipientDistributionContainer from 'containers/agency/visualizations/RecipientDistributionContainer';
import { defaultState } from '../../../testResources/defaultReduxFilters';

const mockProps = { fiscalYear: '1995' };

// eslint-disable-next-line import/prefer-default-export
export const mockAgencyRecipientDistribution = {
    count: 654321,
    total_federal_count: 1234567,
    maxRecipients: 117728237755.8,
    minRecipients: 0.01,
    pct25: 19984,
    pct50: 75740,
    pct75: 208522
};

afterEach(() => {
    jest.clearAllMocks();
});

test('makes a new API call when the selected FY changes', () => {
    const spy = jest.spyOn(apis, 'fetchRecipientDistribution').mockReturnValue({
        promise: Promise.resolve({ data: mockAgencyRecipientDistribution }),
        cancel: jest.fn()
    });
    const { rerender } = render(
        <RecipientDistributionContainer fiscalYear="2000" />,
        { initialState: { ...defaultState, agency: { overview: { toptierCode: '123' } } } }
    );
    rerender(<RecipientDistributionContainer {...mockProps} />);
    return waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(2);
    });
});

test('The agency recipients action creator is called with the parsed data', () => {
    jest.spyOn(apis, 'fetchRecipientDistribution').mockReturnValue({
        promise: Promise.resolve({ data: mockAgencyRecipientDistribution }),
        cancel: jest.fn()
    });
    const spy = jest.spyOn(actions, 'setAgencyRecipients');

    render(
        <RecipientDistributionContainer {...mockProps} />,
        { initialState: { ...defaultState, agency: { overview: { toptierCode: '123' } } } }
    );
    const expected = Object.create(BaseAgencyRecipients);
    expected.populate(mockAgencyRecipientDistribution);

    return waitFor(() => {
        expect(spy).toHaveBeenCalledWith(expected);
    });
});
