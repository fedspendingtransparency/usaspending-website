import React from 'react';
import { render, waitFor } from 'test-utils';
import * as apis from 'apis/agencyV2';
import * as actions from 'redux/actions/agencyV2/agencyV2Actions';
import BaseAgencySubagencyCount from 'models/v2/agency/BaseAgencySubagencyCount';
import SubAgencySummaryContainer from 'containers/agencyV2/awardSpending/SubAgencySummaryContainer';
import { defaultState } from '../../../testResources/defaultReduxFilters';

const mockProps = {
    id: '012',
    fy: '1995',
    data: {
        officeCount: 8,
        subagencyCount: 10
    }
};

const summaryData = [
    {
        type: 'subagenciesCount',
        title: 'Number of Sub-Agencies'
    },
    {
        type: 'awardObligations',
        title: 'Award Obligations',
        isMonetary: true
    },
    {
        type: 'numberOfTransactions',
        title: 'Number of Transactions'
    },
    {
        type: 'numberOfAwards',
        title: 'Number of New Awards'
    }
];

// eslint-disable-next-line import/prefer-default-export
export const mockAgencySubagencyCount = {
    subagencyCount: 10,
    officeCount: 5,
    newAwardCount: 100,
    transactionCount: 45,
    obligations: 4040
};

afterEach(() => {
    jest.clearAllMocks();
});

test('makes a new API call when the selected FY changes', () => {
    const spy = jest.spyOn(apis, 'fetchSubagencyCount').mockReturnValue({
        promise: Promise.resolve({ data: mockAgencySubagencyCount }),
        cancel: jest.fn()
    });
    const { rerender } = render(
        <SubAgencySummaryContainer fy="2000" summaryData={summaryData} data={mockProps.data} />,
        { initialState: { ...defaultState, agencyV2: { overview: { toptierCode: '123' } } } }
    );
    rerender(<SubAgencySummaryContainer summaryData={summaryData} {...mockProps} />);
    return waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(2);
    });
});

test('The subagency count action creator is called with the parsed data', () => {
    jest.spyOn(apis, 'fetchSubagencyCount').mockReturnValue({
        promise: Promise.resolve({ data: mockAgencySubagencyCount }),
        cancel: jest.fn()
    });
    const spy = jest.spyOn(actions, 'setSubagencyCount');

    render(
        <SubAgencySummaryContainer summaryData={summaryData} {...mockProps} />,
        { initialState: { ...defaultState, agencyV2: { overview: { toptierCode: '123' } } } }
    );
    const expected = Object.create(BaseAgencySubagencyCount);
    expected.populate(mockAgencySubagencyCount);

    return waitFor(() => {
        expect(spy).toHaveBeenCalledWith(expected);
    });
});
