/**
 * StateTimeVisualizationSectionContainer-test.jsx
 * Created by David Trinh 5/18/18
 */

import React from 'react';
import { mount, shallow } from 'enzyme';

import { StateTimeVisualizationSectionContainer } from
    'containers/state/StateTimeVisualizationSectionContainer';

import { mockActions, mockRedux, mockTimes, mockYears, mockQuarters, mockMonths } from './mockData';

jest.mock('helpers/searchHelper', () => require('./mockSearchHelper'));


describe('StateTimeVisualizationSectionContainer', () => {
    it('should make an API call for the selected state on mount', async () => {
        const container = mount(<StateTimeVisualizationSectionContainer
            {...mockRedux}
            {...mockActions} />);

        const fetchData = jest.fn();
        container.instance().fetchData = fetchData;

        container.instance().componentDidMount();
        await container.instance().apiRequest.promise;

        expect(fetchData).toHaveBeenCalledTimes(1);
    });

    describe('parseData', () => {
        it('should properly restructure the API data for the awards over time chart for fiscal year series', () => {
            // mount the container
            const container =
                shallow(<StateTimeVisualizationSectionContainer
                    {...mockRedux}
                    {...mockActions} />);

            container.instance().parseData(mockYears, 'fiscal_year');


            // validate the state contains the correctly parsed values
            const expectedState = {
                loading: false,
                error: false,
                visualizationPeriod: "fiscal_year",
                groups: ['1979', '1980'],
                xSeries: [['1979'], ['1980']],
                ySeries: [[123], [234]],
                rawLabels: [{ period: null, year: '1979' }, { period: null, year: '1980' }]
            };

            expect(container.state()).toEqual(expectedState);
        });
        it('should properly restructure the API data for the awards over time chart for quarterly series', () => {
            // mount the container
            const container =
                shallow(<StateTimeVisualizationSectionContainer
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
                groups: ['Q1 1979', 'Q2 1979'],
                xSeries: [['Q1 1979'], ['Q2 1979']],
                ySeries: [[1234], [5555]],
                rawLabels: [{ period: 'Q1', year: '1979' }, { period: 'Q2', year: '1979' }]
            };

            expect(container.state()).toEqual(expectedState);
        });

        it('should properly restructure the API data for the awards over time chart for monthly series', () => {
            // mount the container
            const container =
                shallow(<StateTimeVisualizationSectionContainer
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
                groups: ['Oct 1978', 'Nov 1978'],
                xSeries: [['Oct 1978'], ['Nov 1978']],
                ySeries: [[1234], [5555]],
                rawLabels: [{ period: 'Oct', year: '1978' }, { period: 'Nov', year: '1978' }]
            };

            expect(container.state()).toEqual(expectedState);
        });
    });
    describe('generateTime', () => {
        it('should return a fiscal year when fiscal year is selected and the type is label', () => {
            const container = shallow(<StateTimeVisualizationSectionContainer
                {...mockRedux}
                {...mockActions} />);

            // validates a valid label is generated
            const timeLabel = container.instance().generateTime('fiscal_year', mockTimes, 'label');

            const expectedValue = '2017';


            expect(timeLabel).toEqual(expectedValue);
        });
        it('should return an object with a null period a year that matches the fiscal year when fiscal year is selected and the type is raw', () => {
            const container = shallow(<StateTimeVisualizationSectionContainer
                {...mockRedux}
                {...mockActions} />);

            // validates a valid label is generated
            const timeLabel = container.instance().generateTime('fiscal_year', mockTimes, 'raw');

            const expectedValue = {
                period: null,
                year: '2017'
            };


            expect(timeLabel).toEqual(expectedValue);
        });
        it('should return a quarter with fiscal year when quarter is selected and the type is label', () => {
            const container = shallow(<StateTimeVisualizationSectionContainer
                {...mockRedux}
                {...mockActions} />);

            // validates a valid label is generated
            const timeLabel = container.instance().generateTime('quarter', mockTimes, 'label');

            const expectedValue = 'Q4 2017';


            expect(timeLabel).toEqual(expectedValue);
        });
        it('should return an object with the given quarter and a fiscal year when quarter is selected and the type is raw', () => {
            const container = shallow(<StateTimeVisualizationSectionContainer
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
            const container = shallow(<StateTimeVisualizationSectionContainer
                {...mockRedux}
                {...mockActions} />);

            // validates a valid label is generated
            const timeLabel = container.instance().generateTime('month', mockTimes, 'label');

            const expectedValue = 'Jan 2017';


            expect(timeLabel).toEqual(expectedValue);
        });
        it('should return a short month and fiscal year object when month is selected and the type is raw', () => {
            const container = shallow(<StateTimeVisualizationSectionContainer
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
