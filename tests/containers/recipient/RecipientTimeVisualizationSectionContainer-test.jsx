/**
 * RecipientTimeVisualizationSectionContainer-test.jsx
 * Created by Lizzie Salita 7/20/18
 */

import React from 'react';
import { mount, shallow } from 'enzyme';

import { RecipientTimeVisualizationSectionContainer } from
        'containers/recipient/RecipientTimeVisualizationSectionContainer';

import { mockActions, mockRedux, mockTimes, mockYears, mockQuarters, mockMonths, mockTrendline } from './mockData';

jest.mock('helpers/searchHelper', () => require('./mockSearchHelper'));
jest.mock('helpers/recipientHelper', () => require('./mockRecipientHelper'));


describe('RecipientTimeVisualizationSectionContainer', () => {
    it('should make an API call for the selected recipient on mount', async () => {
        const container = mount(<RecipientTimeVisualizationSectionContainer
            {...mockRedux}
            {...mockActions} />);

        const fetchData = jest.fn();
        container.instance().fetchData = fetchData;

        container.instance().componentDidMount();
        await container.instance().request.promise;

        expect(fetchData).toHaveBeenCalledTimes(1);
    });

    it('should make an API call for the new awards data on mount', async () => {
        const container = mount(<RecipientTimeVisualizationSectionContainer
            {...mockRedux}
            {...mockActions} />);

        const fetchTrendlineData = jest.fn();
        container.instance().fetchTrendlineData = fetchTrendlineData;

        container.instance().componentDidMount();
        await container.instance().trendlineRequest.promise;

        expect(fetchTrendlineData).toHaveBeenCalledTimes(1);
    });

    describe('parseData', () => {
        it('should properly restructure the API data for the awards over time chart for fiscal year series', () => {
            // mount the container
            const container =
                shallow(<RecipientTimeVisualizationSectionContainer
                    {...mockRedux}
                    {...mockActions} />);

            container.instance().parseData(mockYears, 'fiscal_year');


            // validate the state contains the correctly parsed values
            const expectedState = {
                loading: false,
                error: false,
                visualizationPeriod: "fiscal_year",
                groups: ['FY 1979', 'FY 1980'],
                xSeries: [['FY 1979'], ['FY 1980']],
                ySeries: [[400.25], [350.5]],
                zSeries: [], // zSeries is updated by parseTrendlineData
                rawLabels: [{ period: null, year: 'FY 1979' }, { period: null, year: 'FY 1980' }]
            };

            expect(container.state()).toEqual(expectedState);
        });
        it('should properly restructure the API data for the awards over time chart for quarterly series', () => {
            // mount the container
            const container =
                shallow(<RecipientTimeVisualizationSectionContainer
                    {...mockRedux}
                    {...mockActions} />);

            container.setState({
                visualizationPeriod: 'quarter'
            });

            container.instance().parseData(mockQuarters, 'quarter');


            // validate the state contains the correctly parsed values
            const expectedState = {
                loading: false,
                error: false,
                visualizationPeriod: "quarter",
                groups: ['Q3 1979', 'Q4 1979', 'Q1 1980'],
                xSeries: [['Q3 1979'], ['Q4 1979'], ['Q1 1980']],
                ySeries: [[-100.25], [125], [350.5]],
                zSeries: [], // zSeries is updated by parseTrendlineData
                rawLabels: [
                    { period: 'Q3', year: '1979' },
                    { period: 'Q4', year: '1979' },
                    {period: 'Q1', year: '1980'}
                ]
            };

            expect(container.state()).toEqual(expectedState);
        });

        it('should properly restructure the API data for the awards over time chart for monthly series', () => {
            // mount the container
            const container =
                shallow(<RecipientTimeVisualizationSectionContainer
                    {...mockRedux}
                    {...mockActions} />);

            container.setState({
                visualizationPeriod: 'month'
            });

            container.instance().parseData(mockMonths, 'month');

            // validate the state contains the correctly parsed values
            const expectedState = {
                loading: false,
                error: false,
                visualizationPeriod: "month",
                groups: ['Apr 1979', 'May 1979', 'Jun 1979'],
                xSeries: [['Apr 1979'], ['May 1979'], ['Jun 1979']],
                ySeries: [[45], [12], [10]],
                zSeries: [], // zSeries is updated by parseTrendlineData
                rawLabels: [
                    { period: 'Apr', year: '1979' },
                    { period: 'May', year: '1979' },
                    { period: 'Jun', year: '1979' }
                ]
            };

            expect(container.state()).toEqual(expectedState);
        });
    });

    describe('parseTrendlineData', () => {
       it('should set the state to the returned new award count values', () => {
           // mount the container
           const container =
               shallow(<RecipientTimeVisualizationSectionContainer
                   {...mockRedux}
                   {...mockActions} />);

           container.instance().parseTrendlineData(mockTrendline);

           // validate the state contains the correctly parsed values
           const expected = [25, 45, 15];

           expect(container.state().zSeries).toEqual(expected);
       });
    });

    describe('generateTime', () => {
        it('should return a fiscal year when fiscal year is selected and the type is label', () => {
            const container = shallow(<RecipientTimeVisualizationSectionContainer
                {...mockRedux}
                {...mockActions} />);

            // validates a valid label is generated
            const timeLabel = container.instance().generateTime('fiscal_year', mockTimes, 'label');

            const expectedValue = 'FY 2017';

            expect(timeLabel).toEqual(expectedValue);
        });
        it('should return an object with a null period a year that matches the fiscal year when fiscal year is selected and the type is raw', () => {
            const container = shallow(<RecipientTimeVisualizationSectionContainer
                {...mockRedux}
                {...mockActions} />);

            // validates a valid label is generated
            const timeLabel = container.instance().generateTime('fiscal_year', mockTimes, 'raw');

            const expectedValue = {
                period: null,
                year: 'FY 2017'
            };

            expect(timeLabel).toEqual(expectedValue);
        });
        it('should return a quarter with fiscal year when quarter is selected and the type is label', () => {
            const container = shallow(<RecipientTimeVisualizationSectionContainer
                {...mockRedux}
                {...mockActions} />);

            // validates a valid label is generated
            const timeLabel = container.instance().generateTime('quarter', mockTimes, 'label');

            const expectedValue = 'Q4 2017';

            expect(timeLabel).toEqual(expectedValue);
        });
        it('should return an object with the given quarter and a fiscal year when quarter is selected and the type is raw', () => {
            const container = shallow(<RecipientTimeVisualizationSectionContainer
                {...mockRedux}
                {...mockActions} />);

            // validates a valid label is generated
            const timeLabel = container.instance().generateTime('quarter', mockTimes, 'raw');

            const expectedValue = {
                period: 'Q4',
                year: '2017'
            };

            expect(timeLabel).toEqual(expectedValue);
        });
        it('should return a short month and fiscal year when month is selected and the type is label', () => {
            const container = shallow(<RecipientTimeVisualizationSectionContainer
                {...mockRedux}
                {...mockActions} />);

            // validates a valid label is generated
            const timeLabel = container.instance().generateTime('month', mockTimes, 'label');

            const expectedValue = 'Jan 2017';

            expect(timeLabel).toEqual(expectedValue);
        });
        it('should return a short month and fiscal year object when month is selected and the type is raw', () => {
            const container = shallow(<RecipientTimeVisualizationSectionContainer
                {...mockRedux}
                {...mockActions} />);

            // validates a valid label is generated
            const timeLabel = container.instance().generateTime('month', mockTimes, 'raw');

            const expectedValue = {
                period: 'Jan',
                year: '2017'
            };

            expect(timeLabel).toEqual(expectedValue);
        });
    });
});
