/**
 * AccountTimeVisualizationContainer-test.jsx
 * Created by Kevin Li 3/27/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { AccountTimeVisualizationSectionContainer } from
        'containers/account/visualizations/AccountTimeVisualizationContainer';

import {
    mockBalances, mockReduxAccount, mockQuarters, mockFilteredObligated, mockFilteredObligatedQuarters,
    parsedYearYSeries, parsedQuarterYSeries, parsedYearYSeriesFiltered, parsedQuarterYSeriesFiltered,
    mockIncomplete, parsedIncomplete
}
    from '../mockAccount';
import { defaultFilters } from '../defaultFilters';

const fetchDataSpy = sinon.spy(AccountTimeVisualizationSectionContainer.prototype, 'fetchData');

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/account/visualizations/time/AccountTimeVisualizationSection', () =>
    jest.fn(() => null));

jest.mock('helpers/accountHelper', () => require('../accountHelper'));


describe('AccountTimeVisualizationSectionContainer', () => {
    it('should load data on mount', async () => {
        const container = mount(<AccountTimeVisualizationSectionContainer
            reduxFilters={defaultFilters}
            account={mockReduxAccount} />);

        const promises = container.instance().balanceRequests.map((request) => request.promise);
        await Promise.all(promises);

        expect(fetchDataSpy.callCount).toEqual(1);
        fetchDataSpy.reset();
    });

    it('should reload data when the filters change', async () => {
        const container = mount(<AccountTimeVisualizationSectionContainer
            reduxFilters={defaultFilters}
            account={mockReduxAccount} />);

        const promises = container.instance().balanceRequests.map((request) => request.promise);
        await Promise.all(promises);

        expect(fetchDataSpy.callCount).toEqual(1);

        container.setProps({
            reduxFilters: Object.assign({}, defaultFilters, {
                dateType: 'dr'
            })
        });

        const morePromises = container.instance().balanceRequests.map((request) => request.promise);
        await Promise.all(morePromises);

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
                    [2696684.86, -5505246.42, 201404661.47, 198707976.61],
                xSeries: ["2016"],
                ySeries: [
                    parsedYearYSeries
                ]
            };

            // don't compare the stacks
            const containerState = container.state().data.toJS();
            delete containerState.stacks;

            expect(containerState).toEqual(expectedState);
        });
        it('should order the bar charts chronologically when data is missing', () => {
            const container = shallow(
                <AccountTimeVisualizationSectionContainer
                    reduxFilters={defaultFilters}
                    account={mockReduxAccount} />);

            container.instance().setState({
                visualizationPeriod: "quarter",
                hasFilteredObligated: true
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
                    data: mockIncomplete.outlay // Has 2016 Q2, 2016 Q3
                },
                {
                    data: mockIncomplete.budgetAuthority // Has 2016 Q1, 2016 Q2
                },
                {
                    data: mockIncomplete.obligatedFiltered
                },
                {
                    data: mockIncomplete.unobligated
                }
            ]);

            const containerState = container.state().data.toJS();
            expect(containerState.xSeries).toEqual(['2016 Q1', '2016 Q2', '2016 Q3']);
        });
        it('should default missing values to zero', () => {
            const container = shallow(
                <AccountTimeVisualizationSectionContainer
                    reduxFilters={defaultFilters}
                    account={mockReduxAccount} />);

            container.instance().setState({
                visualizationPeriod: "quarter",
                hasFilteredObligated: true
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
                    data: mockIncomplete.outlay
                },
                {
                    data: mockIncomplete.budgetAuthority
                },
                {
                    data: mockIncomplete.obligatedFiltered
                },
                {
                    data: mockIncomplete.unobligated
                }
            ]);

            const containerState = container.state().data.toJS();
            expect(containerState.allY).toEqual([250, 0, 200, 0, 400, 400, 100, 500, 0, -500, 0, 200]);
        });
    });

    describe('parseBalancesQuarters', () => {
        it('should parse the API responses and update the container state with series data', () => {
            const container = shallow(<AccountTimeVisualizationSectionContainer
                reduxFilters={defaultFilters}
                account={mockReduxAccount} />);

            container.instance().setState({
                visualizationPeriod: "quarter",
                hasFilteredObligated: false
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
                    [2696684.86, -5505246.42, 201404661.47, 198707976.61, 3851752, -4413237.11, 101905442.35, 5851779752],
                xSeries: ["2016 Q1", "2016 Q2"],
                ySeries: parsedQuarterYSeries
            };

            // don't compare the stacks
            const containerState = container.state().data.toJS();
            delete containerState.stacks;

            expect(containerState).toEqual(expectedState);
        });
    });

    describe('parseBalancesFiltered', () => {
        it('should parse the API responses and update the container state with series data', () => {
            const container = shallow(<AccountTimeVisualizationSectionContainer
                reduxFilters={defaultFilters}
                account={mockReduxAccount} />);

            container.instance().setState({
                hasFilteredObligated: true
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
                    [2696684.86, -5505246.42, 201404661.47, 198707976.61],
                xSeries: ["2016"],
                ySeries: [
                    parsedYearYSeriesFiltered
                ]
            };

            // don't compare the stacks
            const containerState = container.state().data.toJS();
            delete containerState.stacks;

            expect(containerState).toEqual(expectedState);
        });
    });

    describe('parseBalancesQuartersFiltered', () => {
        it('should parse the API responses and update the container state with series data', () => {
            const container = shallow(<AccountTimeVisualizationSectionContainer
                reduxFilters={defaultFilters}
                account={mockReduxAccount} />);

            container.instance().setState({
                visualizationPeriod: "quarter",
                hasFilteredObligated: true
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
                    [2696684.86, -5505246.42, 201404661.47, 198707976.61, 3851752, -4413237.11, 101905442.35, 5851779752],
                xSeries: ["2016 Q1", "2016 Q2"],
                ySeries: parsedQuarterYSeriesFiltered
            };

            // don't compare the stacks
            const containerState = container.state().data.toJS();
            delete containerState.stacks;

            expect(containerState).toEqual(expectedState);
        });
    });
});
