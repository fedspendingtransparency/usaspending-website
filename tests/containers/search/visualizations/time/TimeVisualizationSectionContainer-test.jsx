/**
 * TimeVisualizationSectionContainer-test.jsx
 * Created by Kevin Li 1/27/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';

import { Set } from 'immutable';

import { TimeVisualizationSectionContainer } from
    'containers/search/visualizations/time/TimeVisualizationSectionContainer';
import * as SearchHelper from 'helpers/searchHelper';

import { defaultFilters } from '../../../../testResources/defaultReduxFilters';
import { mockActions, mockApi, mockQuarters, mockMonths } from './mockData';

jest.mock('helpers/searchHelper', () => require('./mockSearchHelper'));

jest.mock('components/search/visualizations/time/TimeVisualizationSection', () =>
    jest.fn(() => null));

describe('TimeVisualizationSectionContainer', () => {
    it('should make an API request on mount', () => {
        // mount the container
        const container = shallow(<TimeVisualizationSectionContainer
                reduxFilters={defaultFilters}
                {...mockActions} />);
        container.instance().fetchAwards = jest.fn();

        container.instance().componentDidMount();

        // everything should be updated now
        expect(container.instance().fetchAwards).toHaveBeenCalledTimes(1);
    });

    it('should make an API request when the Redux filters change', () => {
        const mockFilters = Object.assign({}, defaultFilters, {
            timePeriodType: 'fy',
            timePeriodFY: new Set(['2014', '2015'])
        });

        // mount the container
        const container =
            mount(<TimeVisualizationSectionContainer
                reduxFilters={defaultFilters}
                {...mockActions} />);
        container.instance().fetchAwards = jest.fn();

        expect(container.instance().fetchAwards).toHaveBeenCalledTimes(0);

        container.setProps({
            reduxFilters: mockFilters
        });

        expect(container.instance().fetchAwards).toHaveBeenCalledTimes(1);   
    });

    describe('parseData', () => {
        it('should properly restructure the API data for the spending over time chart for fiscal year series', () => {
            // mount the container
            const container =
                shallow(<TimeVisualizationSectionContainer
                    {...mockActions}
                    reduxFilters={defaultFilters} />);

            container.instance().parseData(mockApi, 'fiscal_year');


            // validate the state contains the correctly parsed values
            const expectedState = {
                loading: false,
                error: false,
                visualizationPeriod: "fiscal_year",
                groups: ['1979', '1980'],
                xSeries: [['1979'], ['1980']],
                ySeries: [[123], [234]],
                rawLabels:[{period: null, year:'1979'},{period: null, year:'1980'}]
            };

            expect(container.state()).toEqual(expectedState);
        });
        it('should properly restructure the API data for the spending over time chart for quarterly series', () => {
            // mount the container
            const container =
                shallow(<TimeVisualizationSectionContainer
                    {...mockActions}
                    reduxFilters={defaultFilters} />);

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
                rawLabels:[{period: 'Q1', year:'1979'},{period: 'Q2', year:'1979'}]
            };

            expect(container.state()).toEqual(expectedState);
        });

        it('should properly restructure the API data for the spending over time chart for monthly series', () => {
            // mount the container
            const container =
                shallow(<TimeVisualizationSectionContainer
                    {...mockActions}
                    reduxFilters={defaultFilters} />);

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
                rawLabels:[{period: 'Oct', year:'1978'},{period: 'Nov', year:'1978'}]
            };

            expect(container.state()).toEqual(expectedState);
        });
    });
});
