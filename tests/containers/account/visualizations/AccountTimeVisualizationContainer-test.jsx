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
import { mockBalances, mockReduxAccount, mockQuarters, mockFilteredObligated, mockFilteredObligatedQuarters,
    mockReduxAccountFiltered, mockReduxAccountQuarters, mockReduxAccountQuartersFiltered}
    from '../mockAccount';
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
                allY:
                    [-5505246.42, 201404661.47, 2696684.86, 198707976.61],
                groups: ["2016"],
                loading: false,
                visualizationPeriod: "year",
                xSeries: [["2016"]],
                ySeries: [
                    [{
                        budgetAuthority: parseFloat(mockReduxAccount.totals.budgetAuthority['2016']),
                        obligated: parseFloat(mockReduxAccount.totals.obligated['2016']),
                        outlay: parseFloat(mockReduxAccount.totals.outlay['2016']),
                        unobligated: parseFloat(mockReduxAccount.totals.unobligated['2016'])
                    }]
                ]
            };

            expect(container.state()).toEqual(expectedState);
        });
    });

    describe('parseBalancesQuarters', () => {
        it('should parse the API responses and update the container state with series data', () => {
            const container = shallow(<AccountTimeVisualizationSectionContainer
                reduxFilters={defaultFilters}
                account={mockReduxAccount} />);

            container.instance().setState({
                visualizationPeriod: "quarter"
            });

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
                    data: mockQuarters.outlay
                },
                {
                    data: mockQuarters.budgetAuthority
                },
                {
                    data: mockQuarters.obligated
                },
                {
                    data: mockQuarters.unobligated
                }
            ]);

            const expectedState = {
                allY:
                    [-5505246.42, -4413237.11, 201404661.47, 101905442.35, 2696684.86, 3851752, 198707976.61, 5851779752],
                groups: ["2016 Q1", "2016 Q2"],
                loading: false,
                visualizationPeriod: "quarter",
                xSeries: [["2016 Q1"], ["2016 Q2"]],
                ySeries: [
                    [{
                        budgetAuthority: parseFloat(mockReduxAccountQuarters.totals.budgetAuthority['2016 Q1']),
                        obligated: parseFloat(mockReduxAccountQuarters.totals.obligated['2016 Q1']),
                        outlay: parseFloat(mockReduxAccountQuarters.totals.outlay['2016 Q1']),
                        unobligated: parseFloat(mockReduxAccountQuarters.totals.unobligated['2016 Q1'])
                    }],
                    [{
                        budgetAuthority: parseFloat(mockReduxAccountQuarters.totals.budgetAuthority['2016 Q2']),
                        obligated: parseFloat(mockReduxAccountQuarters.totals.obligated['2016 Q2']),
                        outlay: parseFloat(mockReduxAccountQuarters.totals.outlay['2016 Q2']),
                        unobligated: parseFloat(mockReduxAccountQuarters.totals.unobligated['2016 Q2'])
                    }]
                ]
            };

            expect(container.state()).toEqual(expectedState);
        });
    });

    describe('parseBalancesFiltered', () => {
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
                    type: 'obligatedFiltered'
                },
                {
                    type: 'unobligated'
                }
            ];

            container.instance().parseBalances([
                {
                    data: mockFilteredObligated.outlay
                },
                {
                    data: mockFilteredObligated.budgetAuthority
                },
                {
                    data: mockFilteredObligated.obligatedFiltered
                },
                {
                    data: mockFilteredObligated.unobligated
                }
            ]);

            const expectedState = {
                allY:
                    [-5505246.42, 201404661.47, 2696684.86, 198707976.61],
                groups: ["2016"],
                loading: false,
                visualizationPeriod: "year",
                xSeries: [["2016"]],
                ySeries: [
                    [{
                        budgetAuthority: parseFloat(mockReduxAccountFiltered.totals.budgetAuthority['2016']),
                        obligatedFiltered: parseFloat(mockReduxAccountFiltered.totals.obligatedFiltered['2016']),
                        outlay: parseFloat(mockReduxAccountFiltered.totals.outlay['2016']),
                        unobligated: parseFloat(mockReduxAccountFiltered.totals.unobligated['2016'])
                    }]
                ]
            };

            expect(container.state()).toEqual(expectedState);
        });
    });

    describe('parseBalancesQuartersFiltered', () => {
        it('should parse the API responses and update the container state with series data', () => {
            const container = shallow(<AccountTimeVisualizationSectionContainer
                reduxFilters={defaultFilters}
                account={mockReduxAccount} />);

            container.instance().setState({
                visualizationPeriod: "quarter"
            });

            container.instance().balanceRequests = [
                {
                    type: 'outlay'
                },
                {
                    type: 'budgetAuthority'
                },
                {
                    type: 'obligatedFiltered'
                },
                {
                    type: 'unobligated'
                }
            ];

            container.instance().parseBalances([
                {
                    data: mockFilteredObligatedQuarters.outlay
                },
                {
                    data: mockFilteredObligatedQuarters.budgetAuthority
                },
                {
                    data: mockFilteredObligatedQuarters.obligatedFiltered
                },
                {
                    data: mockFilteredObligatedQuarters.unobligated
                }
            ]);

            const expectedState = {
                allY:
                    [-5505246.42, -4413237.11, 201404661.47, 101905442.35, 2696684.86, 3851752, 198707976.61, 5851779752],
                groups: ["2016 Q1", "2016 Q2"],
                loading: false,
                visualizationPeriod: "quarter",
                xSeries: [["2016 Q1"], ["2016 Q2"]],
                ySeries: [
                    [{
                        budgetAuthority: parseFloat(mockReduxAccountQuartersFiltered.totals.budgetAuthority['2016 Q1']),
                        obligatedFiltered: parseFloat(mockReduxAccountQuartersFiltered.totals.obligatedFiltered['2016 Q1']),
                        outlay: parseFloat(mockReduxAccountQuartersFiltered.totals.outlay['2016 Q1']),
                        unobligated: parseFloat(mockReduxAccountQuartersFiltered.totals.unobligated['2016 Q1'])
                    }],
                    [{
                        budgetAuthority: parseFloat(mockReduxAccountQuartersFiltered.totals.budgetAuthority['2016 Q2']),
                        obligatedFiltered: parseFloat(mockReduxAccountQuartersFiltered.totals.obligatedFiltered['2016 Q2']),
                        outlay: parseFloat(mockReduxAccountQuartersFiltered.totals.outlay['2016 Q2']),
                        unobligated: parseFloat(mockReduxAccountQuartersFiltered.totals.unobligated['2016 Q2'])
                    }]
                ]
            };

            expect(container.state()).toEqual(expectedState);
        });
    });
});
