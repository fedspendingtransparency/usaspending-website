/**
 * AccountRankVisualizationContainer-test.jsx
 * Created by Kevin Li 3/27/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';


import { AccountRankVisualizationContainer } from
    'containers/account/visualizations/AccountRankVisualizationContainer';

import * as AccountHelper from 'helpers/accountHelper';
import { mockCategories, mockReduxAccount } from '../mockAccount';
import { defaultFilters } from '../defaultFilters';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

const fetchDataSpy = sinon.spy(AccountRankVisualizationContainer.prototype, 'fetchData');

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/account/visualizations/rank/AccountRankVisualizationSection', () =>
    jest.fn(() => null));

const mockAccountHelper = (functionName, event, expectedResponse) => {
    jest.useFakeTimers();
    // override the specified function
    AccountHelper[functionName] = jest.fn(() => {
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

const unmockAccountHelper = () => {
    jest.useRealTimers();
    jest.unmock('helpers/accountHelper');
};

describe('AccountRankVisualizationContainer', () => {
    it('should load data on mount', () => {
        mockAccountHelper('fetchTasCategoryTotals', 'resolve', mockCategories);

        mount(<AccountRankVisualizationContainer
            reduxFilters={defaultFilters}
            account={mockReduxAccount} />);

        jest.runAllTicks();

        expect(fetchDataSpy.callCount).toEqual(1);
        fetchDataSpy.reset();
    });

    it('should reload data when the filters change', () => {
        mockAccountHelper('fetchTasCategoryTotals', 'resolve', mockCategories);

        const container = mount(<AccountRankVisualizationContainer
            reduxFilters={defaultFilters}
            account={mockReduxAccount} />);

        jest.runAllTicks();

        expect(fetchDataSpy.callCount).toEqual(1);

        container.setProps({
            reduxFilters: Object.assign({}, defaultFilters, {
                dateType: 'dr'
            })
        });

        jest.runAllTicks();

        expect(fetchDataSpy.callCount).toEqual(2);
        fetchDataSpy.reset();
    });

    describe('parseData', () => {
        it('should parse the API response and update the container state with series data', () => {
            const container = shallow(<AccountRankVisualizationContainer
                reduxFilters={defaultFilters}
                account={mockReduxAccount} />);

            container.instance().parseData(mockCategories);

            const expectedState = {
                labelSeries: ['Program Name'],
                dataSeries: [2696684.86],
                descriptions: ['Obligated balance for Program Name: $2,696,685'],
                loading: false,
                next: 'blerg',
                previous: 'blerg',
                hasNextPage: true,
                hasPreviousPage: false,
                page: 1,
                categoryScope: 'programActivity'
            };

            expect(container.state()).toEqual(expectedState);
        });
    });

    describe('changeScope', () => {
        it('should reset the page number and update the state', () => {
            const container = shallow(<AccountRankVisualizationContainer
                reduxFilters={defaultFilters}
                account={mockReduxAccount} />);

            container.setState({
                page: 5
            });

            expect(container.state().page).toEqual(5);

            container.instance().changeScope('objectClass');

            expect(container.state().categoryScope).toEqual('objectClass');
            expect(container.state().page).toEqual(1);
        });
    });

    describe('newSearch', () => {
        it('should reset the page and total page numbers', () => {
            mockAccountHelper('fetchTasCategoryTotals', 'resolve', mockCategories);
            const container = shallow(<AccountRankVisualizationContainer
                reduxFilters={defaultFilters}
                account={mockReduxAccount} />);

            container.setState({
                page: 5,
                hasNextPage: true
            });

            expect(container.state().page).toEqual(5);
            expect(container.state().hasNextPage).toEqual(true);

            container.instance().newSearch();
            expect(container.state().page).toEqual(1);
            expect(container.state().hasNextPage).toEqual(false);
        });
    });

    describe('nextPage', () => {
        it('should load the next page, if available', () => {
            mockAccountHelper('fetchTasCategoryTotals', 'resolve', mockCategories);
            const container = shallow(<AccountRankVisualizationContainer
                reduxFilters={defaultFilters}
                account={mockReduxAccount} />);

            container.setState({
                page: 2,
                hasNextPage: true
            });

            container.instance().nextPage();
            expect(container.state().page).toEqual(3);
        });
        it('should not load the next page, if the current page is the last page', () => {
            mockAccountHelper('fetchTasCategoryTotals', 'resolve', mockCategories);
            const container = shallow(<AccountRankVisualizationContainer
                reduxFilters={defaultFilters}
                account={mockReduxAccount} />);

            container.setState({
                page: 5,
                hasNextPage: false
            });

            container.instance().nextPage();
            expect(container.state().page).toEqual(5);
        });
    });

    describe('previousPage', () => {
        it('should load the previous page, if available', () => {
            mockAccountHelper('fetchTasCategoryTotals', 'resolve', mockCategories);
            const container = shallow(<AccountRankVisualizationContainer
                reduxFilters={defaultFilters}
                account={mockReduxAccount} />);

            container.setState({
                page: 2,
                hasPreviousPage: true
            });

            container.instance().previousPage();
            expect(container.state().page).toEqual(1);
        });
        it('should not load the previous page, if the current page is the first page', () => {
            mockAccountHelper('fetchTasCategoryTotals', 'resolve', mockCategories);
            const container = shallow(<AccountRankVisualizationContainer
                reduxFilters={defaultFilters}
                account={mockReduxAccount} />);

            container.setState({
                page: 1,
                hasPreviousPage: false
            });

            container.instance().previousPage();
            expect(container.state().page).toEqual(1);
        });
    });
});
