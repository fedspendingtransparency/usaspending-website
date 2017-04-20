/**
 * MapVisualizationContainer-test.jsx
 * Created by Emily Gullo 04/06/2017
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { MapVisualizationContainer } from
    'containers/homepage/MapVisualizationContainer';
import * as SearchHelper from 'helpers/searchHelper';

import { defaultFilters } from '../../testResources/defaultReduxFilters';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/homepage/visualizations/geo/MapVisualization', () =>
    jest.fn(() => null));


// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const fetchDataSpy = sinon.spy(MapVisualizationContainer.prototype, 'fetchData');

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

describe('MapVisualizationContainer', () => {
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
            ]
        };

        // mock the search helper to resolve with the mocked response
        mockSearchHelper('performTransactionsTotalSearch', 'resolve', apiResponse);

        // mount the container
        mount(<MapVisualizationContainer
            reduxFilters={defaultFilters} />);

        // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
        jest.runAllTicks();

        // everything should be updated now
        expect(fetchDataSpy.callCount).toEqual(1);

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
                ]
            };

            // mock the search helper to resolve with the mocked response
            mockSearchHelper('performTransactionsTotalSearch', 'resolve', apiResponse);

            // mount the container
            const container = mount(<MapVisualizationContainer
                reduxFilters={defaultFilters} />);

            // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
            jest.runAllTicks();

            const expectedState = {
                data: {
                    values: [123.12, 345.56],
                    states: ['AK', 'AL'],
                    total: 468.68
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
});
