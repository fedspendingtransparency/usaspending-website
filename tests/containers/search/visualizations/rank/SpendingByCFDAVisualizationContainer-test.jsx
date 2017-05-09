/**
 * SpendingByCFDAVisualizationContainer-test.jsx
 * Created by Kevin li 5/5/17
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { Set } from 'immutable';

import { SpendingByCFDAVisualizationContainer } from
    'containers/search/visualizations/rank/SpendingByCFDAVisualizationContainer';
import SpendingByCFDASection from
    'components/search/visualizations/rank/sections/SpendingByCFDASection';
import * as SearchHelper from 'helpers/searchHelper';

import { defaultFilters } from '../../../../testResources/defaultReduxFilters';
import { mockComponent, unmockComponent } from '../../../../testResources/mockComponent';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const fetchDataSpy = sinon.spy(SpendingByCFDAVisualizationContainer.prototype,
    'fetchData');

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

describe('SpendingByCFDAVisualizationContainer', () => {
    beforeAll(() => {
        // we need to use mount() on the container to get the lifecycle logic, but enzyme doesn't
        // support the child component's SVG manipulation methods. This replaces all the child
        // component's lifecycle methods with mocked functions to avoid traversal into the SVG
        // components.
        mockComponent(SpendingByCFDASection);
    });

    it('should make an API request on mount', () => {
        // create a mock API response
        const apiResponse = {
            page_metadata: {
                page: 1,
                has_next_page: false,
                has_previous_page: false,
                next: null,
                previous: null
            },
            results: [
                {
                    item: '93.778',
                    aggregate: '66681011412.00',
                    assistance_data__cfda_number: '93.778',
                    assistance_data__cfda_title: 'Medical Assistance Program'
                },
                {
                    item: '93.774',
                    aggregate: '152',
                    assistance_data__cfda_number: '93.774',
                    assistance_data__cfda_title: 'Medicare_Supplementary Medical Insurance'
                }
            ]
        };

        // mock the search helper to resolve with the mocked response
        mockSearchHelper('performTransactionsTotalSearch', 'resolve', apiResponse);

        // mount the container
        const container =
            mount(<SpendingByCFDAVisualizationContainer
                reduxFilters={defaultFilters} />);

        // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
        jest.runAllTicks();

        // everything should be updated now
        expect(fetchDataSpy.callCount).toEqual(1);

        // the page number should be equal to 1
        expect(container.state().page).toEqual(1);

        // reset the mocks and spies
        unmockSearchHelper();
        fetchDataSpy.reset();
    });

    it('should make an API request when the Redux filters change', () => {
        // create a mock API response
        const apiResponse = {
            page_metadata: {
                page: 1,
                has_next_page: false,
                has_previous_page: false,
                next: null,
                previous: null
            },
            results: [
                {
                    item: '93.778',
                    aggregate: '66681011412.00',
                    award__transaction__assistance_data__cfda_number: '93.778',
                    award__transaction__assistance_data__cfda_title: 'Medical Assistance Program'
                },
                {
                    item: '93.774',
                    aggregate: '152',
                    award__transaction__assistance_data__cfda_number: '93.774',
                    award__transaction__assistance_data__cfda_title: 'Medicare_Supplementary Medical Insurance'
                }
            ]
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
            mount(<SpendingByCFDAVisualizationContainer
                reduxFilters={initialFilters} />);

        // wait for the first SearchHelper call to finish
        jest.runAllTicks();

        // the first API call should have been called
        expect(fetchDataSpy.callCount).toEqual(1);

        // the page number should be equal to 1
        expect(container.state().page).toEqual(1);

        // now update the props
        container.setProps({
            reduxFilters: secondFilters
        });

        // wait for the second SearchHelper call to finish
        jest.runAllTicks();
        // the first API call should have been called
        expect(fetchDataSpy.callCount).toEqual(2);

        // the page number should still be equal to 1
        expect(container.state().page).toEqual(1);

        // reset the mocks and spies
        unmockSearchHelper();
        fetchDataSpy.reset();
    });

    describe('parseData', () => {
        it('should properly restructure the API data for the rank visualization', () => {
            // create a mock API response
            const apiResponse = {
                page_metadata: {
                    page: 1,
                    has_next_page: false,
                    has_previous_page: false,
                    next: null,
                    previous: null
                },
                results: [
                    {
                        item: '93.778',
                        aggregate: '66681011412.00',
                        assistance_data__cfda_number: '93.778',
                        assistance_data__cfda_title: 'Medical Assistance Program'
                    },
                    {
                        item: '93.774',
                        aggregate: '152',
                        assistance_data__cfda_number: '93.774',
                        assistance_data__cfda_title: 'Medicare_Supplementary Medical Insurance'
                    }
                ]
            };

            // mock the search helper to resolve with the mocked response
            mockSearchHelper('performTransactionsTotalSearch', 'resolve', apiResponse);
            // mount the container
            const container =
                mount(<SpendingByCFDAVisualizationContainer
                    reduxFilters={defaultFilters} />);

            // wait for the SearchHelper promises to resolve
            jest.runAllTicks();
            // validate the state contains the correctly parsed values
            const expectedState = {
                loading: false,
                labelSeries: ['Medical Assistance Program', 'Medicare_Supplementary Medical Insurance'],
                dataSeries: [66681011412.00, 152],
                descriptions: [
                    'Spending by Medical Assistance Program: $66,681,011,412',
                    'Spending by Medicare_Supplementary Medical Insurance: $152'],
                page: 1,
                hasNextPage: false,
                hasPreviousPage: false,
                next: null,
                previous: null
            };

            expect(container.state()).toEqual(expectedState);
        });
    });

    describe('nextPage', () => {
        it('should trigger a new API call with an incremented page number', () => {
            // create a mock API response
            const apiResponse = {
                page_metadata: {
                    page: 1,
                    has_next_page: true,
                    has_previous_page: false,
                    next: "checksum",
                    previous: null
                },
                results: []
            };

            // mock the search helper to resolve with the mocked response
            mockSearchHelper('performTransactionsTotalSearch', 'resolve', apiResponse);
            // mount the container
            const container =
                mount(<SpendingByCFDAVisualizationContainer
                    reduxFilters={defaultFilters} />);

            // initial state should be page 1
            expect(container.state().page).toEqual(1);

            // Tell container it has a nextPage
            container.state().hasNextPage = true;

            // Attempt to go to the next page
            container.instance().nextPage();

            // updated state should be page 2
            expect(container.state().page).toEqual(2);
        });
    });

    describe('previousPage', () => {
        it('should trigger a new API call with a decremented page number', () => {
            // create a mock API response
            const apiResponse = {
                page_metadata: {
                    page: 1,
                    has_next_page: true,
                    has_previous_page: false,
                    next: "checksum",
                    previous: null
                },
                results: []
            };

            // mock the search helper to resolve with the mocked response
            mockSearchHelper('performTransactionsTotalSearch', 'resolve', apiResponse);
            // mount the container
            const container =
                mount(<SpendingByCFDAVisualizationContainer
                    reduxFilters={defaultFilters} />);
            container.setState({
                page: 5,
                has_previous_page: true,
                previous: "checksum"
            });

            // wait for the SearchHelper promises to resolve

            // we have simulated a starting state of page 5
            expect(container.state().page).toEqual(5);

            container.instance().previousPage();
            // updated state should be one less page
            expect(container.state().page).toEqual(4);
        });

        it('should never use a page number less than 1', () => {
            // create a mock API response
            const apiResponse = {
                page_metadata: {
                    page: 1,
                    has_next_page: true,
                    has_previous_page: false,
                    next: "checksum",
                    previous: null
                },
                results: []
            };

            // mock the search helper to resolve with the mocked response
            mockSearchHelper('performTransactionsTotalSearch', 'resolve', apiResponse);
            // mount the container
            const container =
                mount(<SpendingByCFDAVisualizationContainer
                    reduxFilters={defaultFilters} />);
            container.setState({
                page: 1
            });

            // wait for the SearchHelper promises to resolve

            // we have simulated a starting state of page 5
            expect(container.state().page).toEqual(1);

            container.instance().previousPage();
            // updated state should be 1
            expect(container.state().page).toEqual(1);
        });
    });

    describe('newSearch', () => {
        it('when Redux filters change, the page number should reset to 1', () => {
            const initialFilters = Object.assign({}, defaultFilters);
            const secondFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014', '2015'])
            });

            // mount the container
            const container =
                mount(<SpendingByCFDAVisualizationContainer
                    reduxFilters={initialFilters} />);
            container.setState({
                page: 5,
                has_previous_page: true,
                previous: "checksum"
            });

            // assume we are starting on page 5
            expect(container.state().page).toEqual(5);

            // now update the props
            container.setProps({
                reduxFilters: secondFilters
            });

            // the page number should be reset to 1
            expect(container.state().page).toEqual(1);
        });
    });

    afterAll(() => {
        // restore the mocked component's lifecycle functions
        unmockComponent(SpendingByCFDASection);
    });
});
