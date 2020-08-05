/**
 * CovidHighlights-test.jsx
 * Created by Max Kendall 07/22/2020
 */

import React from 'react';
import { shallow } from 'enzyme';

import { CovidHighlights } from 'containers/covid19/homepage/CovidHighlights';

jest.mock("helpers/disasterHelper", () => ({
    fetchOverview: jest.fn(),
    fetchDisasterSpending: jest.fn(),
    fetchDEFCodes: jest.fn()
}));

const defaultProps = {
    totalSpendingAmount: 0,
    setCovidOverview: () => {},
    setCovidDefCodes: () => {},
    completeIncrement: () => {},
    defCodes: []
};

describe('CovidHighlights', () => {
    describe('componentDidUpdate', () => {
        it('refetches the totals and highlights if the defCodes change', async () => {
            const container = shallow(<CovidHighlights {...defaultProps} defCodes={['1']} />);
            const mockFetchHighlights = jest.fn(() => Promise.resolve());
            const mockFetchTotals = jest.fn(() => Promise.resolve());
            container.instance().fetchHighlights = mockFetchHighlights;
            container.instance().fetchTotals = mockFetchTotals;
            await container.instance().componentDidUpdate({ defCodes: [] });
            expect(mockFetchHighlights).toHaveBeenCalled();
            expect(mockFetchTotals).toHaveBeenCalled();
        });
    });
});
