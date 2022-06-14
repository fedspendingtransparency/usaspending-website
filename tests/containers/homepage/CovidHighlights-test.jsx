/**
 * CovidHighlights-test.jsx
 * Created by Max Kendall 07/22/2020
 */

import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import { CovidHighlights } from 'containers/homepage-unused/CovidHighlights';

jest.mock('apis/disaster', () => ({
    fetchOverview: jest.fn(),
    fetchDisasterSpending: jest.fn(),
    fetchDEFCodes: jest.fn()
}));

const defaultProps = {
    totalSpendingAmount: 0,
    setCovidOverview: () => {},
    setCovidDefCodes: () => {},
    completeIncrement: () => {},
    defCodes: [],
    submissionPeriods: [],
    isFetchLatestFyLoading: false,
    latestSubmissionDate: moment()
};

describe('CovidHighlights', () => {
    describe('componentDidMount', () => {
        it('fetches the totals, highlights, then triggers auto scroll if def codes or submission are defined', async () => {
            const container = shallow(<CovidHighlights {...defaultProps} defCodes={[{ code: "M" }]} submissionPeriods={[{ test: '1' }]} />);
            const mockFetchHighlights = jest.fn(() => Promise.resolve());
            const mockFetchTotals = jest.fn(() => Promise.resolve());
            const mockTriggerAutoScroll = jest.fn(() => Promise.resolve());
            container.instance().fetchHighlights = mockFetchHighlights;
            container.instance().fetchTotals = mockFetchTotals;
            container.instance().triggerAutoScroll = mockTriggerAutoScroll;
            await container.instance().componentDidMount();
            expect(mockFetchHighlights).toHaveBeenCalled();
            expect(mockFetchTotals).toHaveBeenCalled();
            expect(mockTriggerAutoScroll).toHaveBeenCalled();
        });
        it('if no def codes are defined, highlights/totals are not fetched and auto scroll is not triggered', async () => {
            const container = shallow(<CovidHighlights {...defaultProps} submissionPeriods={[{ test: '1' }]} />);
            const mockFetchHighlights = jest.fn(() => Promise.resolve());
            const mockFetchTotals = jest.fn(() => Promise.resolve());
            const mockTriggerAutoScroll = jest.fn(() => Promise.resolve());
            container.instance().fetchHighlights = mockFetchHighlights;
            container.instance().fetchTotals = mockFetchTotals;
            container.instance().triggerAutoScroll = mockTriggerAutoScroll;
            await container.instance().componentDidMount();
            expect(mockFetchHighlights).not.toHaveBeenCalled();
            expect(mockFetchTotals).not.toHaveBeenCalled();
            expect(mockTriggerAutoScroll).not.toHaveBeenCalled();
        });
        it('if no submission periods are defined, highlights/totals are not fetched and auto scroll is not triggered', async () => {
            const container = shallow(<CovidHighlights {...defaultProps} defCodes={[{ code: 'M' }]} />);
            const mockFetchHighlights = jest.fn(() => Promise.resolve());
            const mockFetchTotals = jest.fn(() => Promise.resolve());
            const mockTriggerAutoScroll = jest.fn(() => Promise.resolve());
            container.instance().fetchHighlights = mockFetchHighlights;
            container.instance().fetchTotals = mockFetchTotals;
            container.instance().triggerAutoScroll = mockTriggerAutoScroll;
            await container.instance().componentDidMount();
            expect(mockFetchHighlights).not.toHaveBeenCalled();
            expect(mockFetchTotals).not.toHaveBeenCalled();
            expect(mockTriggerAutoScroll).not.toHaveBeenCalled();
        });
    });
    describe('componentDidUpdate', () => {
        it('when both def codes & submission dates change and are defined, it refetches the totals, highlights, then triggers auto scroll', async () => {
            const container = shallow(<CovidHighlights {...defaultProps} defCodes={[{ code: "M" }]} submissionPeriods={[{ test: '1' }]} />);
            const mockFetchHighlights = jest.fn(() => Promise.resolve());
            const mockFetchTotals = jest.fn(() => Promise.resolve());
            const mockTriggerAutoScroll = jest.fn(() => Promise.resolve());
            container.instance().fetchHighlights = mockFetchHighlights;
            container.instance().fetchTotals = mockFetchTotals;
            container.instance().triggerAutoScroll = mockTriggerAutoScroll;
            await container.instance().componentDidUpdate({ defCodes: [] });
            expect(mockFetchHighlights).toHaveBeenCalled();
            expect(mockFetchTotals).toHaveBeenCalled();
            expect(mockTriggerAutoScroll).toHaveBeenCalled();
        });
        it('when only def codes change and are defined, it does not refetch', async () => {
            const container = shallow(<CovidHighlights {...defaultProps} defCodes={[{ code: "M" }]} />);
            const mockFetchHighlights = jest.fn(() => Promise.resolve());
            const mockFetchTotals = jest.fn(() => Promise.resolve());
            const mockTriggerAutoScroll = jest.fn(() => Promise.resolve());
            container.instance().fetchHighlights = mockFetchHighlights;
            container.instance().fetchTotals = mockFetchTotals;
            container.instance().triggerAutoScroll = mockTriggerAutoScroll;
            await container.instance().componentDidUpdate({ defCodes: [] });
            expect(mockFetchHighlights).not.toHaveBeenCalled();
            expect(mockFetchTotals).not.toHaveBeenCalled();
            expect(mockTriggerAutoScroll).not.toHaveBeenCalled();
        });
        it('when only submissionPeriods change and are defined, it does not refetch', async () => {
            const container = shallow(<CovidHighlights {...defaultProps} submissionPeriods={[{ test: "1" }]} />);
            const mockFetchHighlights = jest.fn(() => Promise.resolve());
            const mockFetchTotals = jest.fn(() => Promise.resolve());
            const mockTriggerAutoScroll = jest.fn(() => Promise.resolve());
            container.instance().fetchHighlights = mockFetchHighlights;
            container.instance().fetchTotals = mockFetchTotals;
            container.instance().triggerAutoScroll = mockTriggerAutoScroll;
            await container.instance().componentDidUpdate({ submissionPeriods: [] });
            expect(mockFetchHighlights).not.toHaveBeenCalled();
            expect(mockFetchTotals).not.toHaveBeenCalled();
            expect(mockTriggerAutoScroll).not.toHaveBeenCalled();
        });
    });
});
