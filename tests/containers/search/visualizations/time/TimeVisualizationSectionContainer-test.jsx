/**
 * TimeVisualizationSectionContainer-test.jsx
 * Created by Kevin Li 1/27/17
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { Set } from 'immutable';

import { TimeVisualizationSectionContainer } from
    'containers/search/visualizations/time/TimeVisualizationSectionContainer';
import * as SearchHelper from 'helpers/searchHelper';

import { defaultFilters } from '../../../../testResources/defaultReduxFilters';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const fetchDataSpy = sinon.spy(TimeVisualizationSectionContainer.prototype, 'fetchData');

// we don't want to actually hit the API because tests should be fully controlled, so we will mock
// the SearchHelper functions
const mockSearchHelper = (functionName, event, expectedResponse) => {
    jest.useFakeTimers();
    // override the specified function
    SearchHelper[functionName] = jest.fn(() => {
        // Axios normally returns a promise, replicate this, but return the expected result
        const networkCall = new Promise((resolve, reject) => {
            process.nextTick(() => {
                if (event === 'resolve') {
                    resolve({
                        data: expectedResponse
                    });
                }
                else {
                    reject({
                        data: expectedResponse
                    });
                }
            });
        });

        return {
            promise: networkCall,
            cancel: jest.fn()
        };
    });
};

const unmockSearchHelper = () => {
    jest.useRealTimers();
    jest.unmock('helpers/searchHelper');
};

describe('TimeVisualizationSectionContainer', () => {
    it('should make an API request on mount', () => {
        // create a mock API response
        const apiResponse = {
            page_metadata: {
                has_next_page: false,
                has_previous_page: false,
                next: null,
                page: 1,
                previous: null
            },
            results: [{
                item: '2013',
                aggregate: '1234'
            }],
            total_metadata: {
                count: 1
            }
        };

        // mock the search helper to resolve with the mocked response
        mockSearchHelper('performTransactionsTotalSearch', 'resolve', apiResponse);

        // mount the container
        mount(<TimeVisualizationSectionContainer reduxFilters={defaultFilters} />);

        // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
        jest.runAllTicks();

        // everything should be updated now
        expect(fetchDataSpy.callCount).toEqual(1);

        // reset the mocks and spies
        unmockSearchHelper();
        fetchDataSpy.reset();
    });

    it('should make an API request when the Redux filters change', () => {
        // create a mock API response
        const apiResponse = {
            page_metadata: {
                has_next_page: false,
                has_previous_page: false,
                next: null,
                page: 1,
                previous: null
            },
            results: [{
                item: '2013',
                aggregate: '1234'
            }],
            total_metadata: {
                count: 1
            }
        };

        // mock the search helper to resolve with the mocked response
        mockSearchHelper('performTransactionsTotalSearch', 'resolve', apiResponse);

        const initialFilters = Object.assign({}, defaultFilters);
        const secondFilters = Object.assign({}, defaultFilters, {
            timePeriodType: 'fy',
            timePeriodFY: new Set(['2014', '2015'])
        });

        // mount the container
        const timeVisualizationContainer =
            mount(<TimeVisualizationSectionContainer reduxFilters={initialFilters} />);

        // wait for the first SearchHelper call to finish
        jest.runAllTicks();

        // the first API call should have been called
        expect(fetchDataSpy.callCount).toEqual(1);

        // now update the props
        timeVisualizationContainer.setProps({
            reduxFilters: secondFilters
        });

        // wait for the second SearchHelper call to finish
        jest.runAllTicks();
        // the first API call should have been called
        expect(fetchDataSpy.callCount).toEqual(2);

        // reset the mocks and spies
        unmockSearchHelper();
        fetchDataSpy.reset();
    });

    describe('parseData', () => {
        it('should properly restructure the API data for the spending over time chart for ungrouped series', () => {
            // create a mock API response
            const apiResponse = {
                page_metadata: {
                    has_next_page: false,
                    has_previous_page: false,
                    next: null,
                    page: 1,
                    previous: null
                },
                results: [{
                    submission__reporting_fiscal_year: '2013',
                    aggregate: '1234'
                }, {
                    submission__reporting_fiscal_year: '2014',
                    aggregate: '5555'
                }]
            };

            // mock the search helper to resolve with the mocked response
            mockSearchHelper('performBalancesSearch', 'resolve', apiResponse);
            // mount the container
            const timeVisualizationContainer =
                mount(<TimeVisualizationSectionContainer reduxFilters={defaultFilters} />);

            // wait for the SearchHelper promises to resolve
            jest.runAllTicks();
            // validate the state contains the correctly parsed values
            const expectedState = {
                awardFiltersSelected: false,
                budgetFiltersSelected: false,
                loading: false,
                groups: ['2013', '2014'],
                xSeries: [['2013'], ['2014']],
                ySeries: [[1234], [5555]]
            };

            expect(timeVisualizationContainer.state()).toEqual(expectedState);
        });
    });
});
