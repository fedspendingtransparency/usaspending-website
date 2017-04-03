/**
 * AccountRankVisualizationContainer-test.jsx
 * Created by Kevin Li 3/27/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { Set } from 'immutable';
import sinon from 'sinon';


import { AccountRankVisualizationContainer } from
    'containers/account/visualizations/AccountRankVisualizationContainer';

import * as AccountHelper from 'helpers/accountHelper';
import { mockCategories, mockReduxAccount } from '../mockAccount';

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

const defaultFilters = {
    dateType: 'fy',
    fy: new Set(),
    startDate: null,
    endDate: null
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
                labelSeries: ['709'],
                dataSeries: [2696684.86],
                descriptions: ['Obligated balance for 709: $2,696,685'],
                loading: false,
                total: 1,
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
                total: 5
            });

            expect(container.state().page).toEqual(5);
            expect(container.state().total).toEqual(5);

            container.instance().newSearch();
            expect(container.state().page).toEqual(1);
            expect(container.state().total).toEqual(1);
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
                total: 5
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
                total: 5
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
                total: 5
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
                total: 5
            });

            container.instance().previousPage();
            expect(container.state().page).toEqual(1);
        });
    });
});
