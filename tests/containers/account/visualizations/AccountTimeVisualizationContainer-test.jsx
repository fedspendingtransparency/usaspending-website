/**
 * AccountTimeVisualizationContainer-test.jsx
 * Created by Kevin Li 3/27/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';


import { AccountTimeVisualizationSectionContainer } from
    'containers/account/visualizations/AccountTimeVisualizationContainer';

import * as AccountHelper from 'helpers/accountHelper';
import { mockBalances, mockReduxAccount } from '../mockAccount';
import { defaultFilters } from '../defaultFilters';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

const fetchDataSpy = sinon.spy(AccountTimeVisualizationSectionContainer.prototype, 'fetchData');

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/account/visualizations/time/AccountTimeVisualizationSection', () =>
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

describe('AccountTimeVisualizationSectionContainer', () => {
    it('should load data on mount', () => {
        mockAccountHelper('fetchTasBalanceTotals', 'resolve', mockBalances.outlay);

        mount(<AccountTimeVisualizationSectionContainer
            reduxFilters={defaultFilters}
            account={mockReduxAccount} />);

        jest.runAllTicks();

        expect(fetchDataSpy.callCount).toEqual(1);
        fetchDataSpy.reset();
    });

    it('should reload data when the filters change', () => {
        mockAccountHelper('fetchTasBalanceTotals', 'resolve', mockBalances.outlay);

        const container = mount(<AccountTimeVisualizationSectionContainer
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

    describe('parseBalances', () => {
        it('should parse the API responses and update the container state with series data', () => {
            const container = shallow(<AccountTimeVisualizationSectionContainer
                reduxFilters={defaultFilters}
                account={mockReduxAccount} />);

            container.instance().balanceRequests = [
                {
                    type: 'outlay'
                },
                {
                    type: 'budgetAuthority'
                },
                {
                    type: 'obligated'
                },
                {
                    type: 'unobligated'
                }
            ];

            container.instance().parseBalances([
                {
                    data: mockBalances.outlay
                },
                {
                    data: mockBalances.budgetAuthority
                },
                {
                    data: mockBalances.obligated
                },
                {
                    data: mockBalances.unobligated
                }
            ]);

            const expectedState = {
                "allY":
                    [-5505246.42, 201404661.47, 2696684.86, 198707976.61],
                "groups": ["2016"],
                "hasFilteredObligated": false,
                "loading": false,
                "visualizationPeriod": "year",
                "xSeries": [["2016"]],
                "ySeries": [
                    [{
                        "budgetAuthority": parseFloat(mockReduxAccount.totals.budgetAuthority['2016']),
                        "obligated": parseFloat(mockReduxAccount.totals.obligated['2016']),
                        "outlay": parseFloat(mockReduxAccount.totals.outlay['2016']),
                        "unobligated": parseFloat(mockReduxAccount.totals.unobligated['2016'])
                    }]
                ]
            };

            expect(container.state()).toEqual(expectedState);
        });
    });
});
