/**
 * GeoVisualizationSectionContainer-test.jsx
 * Created by Kevin Li 2/24/17
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { Set } from 'immutable';

import { GeoVisualizationSectionContainer } from
    'containers/search/visualizations/geo/GeoVisualizationSectionContainer';
import * as SearchHelper from 'helpers/searchHelper';

import { defaultFilters } from '../../../../testResources/defaultReduxFilters';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/visualizations/geo/GeoVisualizationSection', () =>
    jest.fn(() => null));


// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const fetchDataSpy = sinon.spy(GeoVisualizationSectionContainer.prototype, 'fetchData');

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

const mockedReduxMeta = {
    visualization: {
        transaction_sum: 50000
    }
};

describe('GeoVisualizationSectionContainer', () => {
    it('should make an API request on mount', () => {
        const apiResponse = {
            results: [
                {
                    item: 'AK',
                    aggregate: '123.12'
                },
                {
                    item: 'AL',
                    aggregate: '345.56'
                }
            ],
            total_metadata: {
                count: 2
            },
            page_metadata: {
                page_number: 1,
                count: 2,
                num_pages: 1
            }
        };

        // mock the search helper to resolve with the mocked response
        mockSearchHelper('performTransactionsTotalSearch', 'resolve', apiResponse);

        // mount the container
        mount(<GeoVisualizationSectionContainer
            reduxFilters={defaultFilters}
            resultsMeta={mockedReduxMeta} />);

        // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
        jest.runAllTicks();

        // everything should be updated now
        expect(fetchDataSpy.callCount).toEqual(1);

        // reset the mocks and spies
        unmockSearchHelper();
        fetchDataSpy.reset();
    });

    it('should make an API request when the Redux filters change', () => {
        const apiResponse = {
            results: [
                {
                    item: 'AK',
                    aggregate: '123.12'
                },
                {
                    item: 'AL',
                    aggregate: '345.56'
                }
            ],
            total_metadata: {
                count: 2
            },
            page_metadata: {
                page_number: 1,
                count: 2,
                num_pages: 1
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
        const container =
            mount(<GeoVisualizationSectionContainer
                reduxFilters={initialFilters}
                resultsMeta={mockedReduxMeta} />);

        // wait for the first SearchHelper call to finish
        jest.runAllTicks();

        // the first API call should have been called
        expect(fetchDataSpy.callCount).toEqual(1);

        // now update the props
        container.setProps({
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
        it('should properly resture the API response for the map visualization', () => {
            const apiResponse = {
                results: [
                    {
                        item: 'AK',
                        aggregate: '123.12'
                    },
                    {
                        item: 'AL',
                        aggregate: '345.56'
                    }
                ],
                total_metadata: {
                    count: 2
                },
                page_metadata: {
                    page_number: 1,
                    count: 2,
                    num_pages: 1
                }
            };

            // mock the search helper to resolve with the mocked response
            mockSearchHelper('performTransactionsTotalSearch', 'resolve', apiResponse);

            // mount the container
            const container = mount(<GeoVisualizationSectionContainer
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);

            // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
            jest.runAllTicks();

            const expectedState = {
                data: {
                    values: [123.12, 345.56],
                    states: ['AK', 'AL']
                },
                loading: false
            };

            const actualState = container.state();
            // remove some keys (especially since renderHash is not known)
            delete actualState.scope;
            delete actualState.renderHash;

            expect(actualState).toEqual(expectedState);
        });
    });

    describe('changeScope', () => {
        it('should set the scope to place of performance when requested', () => {
             // mount the container
            const container = mount(<GeoVisualizationSectionContainer
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);

            // toggle it back and forth from recipient to pop
            container.instance().changeScope('recipient');
            container.instance().changeScope('pop');
            expect(container.state().scope).toEqual('pop');
        });

        it('should set the scope to recipient when requested', () => {
             // mount the container
            const container = mount(<GeoVisualizationSectionContainer
                reduxFilters={defaultFilters}
                resultsMeta={mockedReduxMeta} />);

            // toggle it back and forth from recipient to pop
            container.instance().changeScope('pop');
            container.instance().changeScope('recipient');
            expect(container.state().scope).toEqual('recipient');
        });
    });
});
