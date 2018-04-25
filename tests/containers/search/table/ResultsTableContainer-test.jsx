/**
 * ResultsTableContainer-test.jsx
 * Created by Kevin Li 5/11/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';

import { Set } from 'immutable';
import { ResultsTableContainer } from 'containers/search/table/ResultsTableContainer';
import { initialState } from 'redux/reducers/search/searchFiltersReducer';

import SearchAwardsOperation from 'models/search/SearchAwardsOperation';

import { mockActions, mockRedux, mockApi, mockTabCount } from './mockAwards';

jest.mock('helpers/searchHelper', () => require('../filters/searchHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/table/ResultsTableSection', () =>
    jest.fn(() => null));

// canvas elements are not available in Jest, so mock the text measurement helper
jest.mock('helpers/textMeasurement', () => (
    {
        measureText: jest.fn(() => 100),
        measureTableHeader: jest.fn(() => 220)
    }
));

describe('ResultsTableContainer', () => {
    it('should pick a default tab whenever the Redux filters change', async () => {
        const container = mount(<ResultsTableContainer
            {...mockActions}
            {...mockRedux} />);

        container.instance().parseTabCounts = jest.fn();

        // update the filters
        const newFilters = Object.assign({}, mockRedux.filters, {
            timePeriodFY: new Set(['1987'])
        });
        container.setProps({
            filters: newFilters
        });

        await container.instance().tabCountRequest.promise;

        expect(container.instance().parseTabCounts).toHaveBeenCalledTimes(2);
    });

    it('should pick a default tab whenever the subaward toggle changes', async () => {
        const container = mount(<ResultsTableContainer
            {...mockActions}
            {...mockRedux} />);

        container.instance().parseTabCounts = jest.fn();

        // update the filters
        container.setProps({
            subaward: true
        });

        await container.instance().tabCountRequest.promise;

        expect(container.instance().parseTabCounts).toHaveBeenCalledTimes(2);
    });

    describe('pickDefaultTab', () => {
        it('should call parseTabCounts() after the API responds', async () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);
            container.instance().parseTabCounts = jest.fn();

            container.instance().pickDefaultTab();

            await container.instance().tabCountRequest.promise;

            expect(container.instance().parseTabCounts).toHaveBeenCalledTimes(1);
        });
    });

    describe('parseTabCounts', () => {
        it('should save the counts to state', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);
            container.instance().switchTab = jest.fn();
            container.instance().updateFilters = jest.fn();
            container.instance().parseTabCounts(mockTabCount);

            expect(container.state().counts).toEqual(mockTabCount.results);
        });
        it('should pick the first table type it encounters with a count greater than zero', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);
            container.instance().switchTab = jest.fn();
            container.instance().updateFilters = jest.fn();

            container.instance().parseTabCounts({
                results: {
                    loans: 0,
                    other: 0,
                    direct_payments: 3,
                    contracts: 0,
                    grants: 0
                }
            });

            expect(container.instance().switchTab).toHaveBeenCalledTimes(1);
            expect(container.instance().switchTab).toHaveBeenCalledWith('direct_payments');
        });
        it('should default to contracts if all types return a count of zero', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);
            container.instance().switchTab = jest.fn();
            container.instance().updateFilters = jest.fn();

            container.instance().parseTabCounts({
                results: {
                    loans: 0,
                    other: 0,
                    direct_payments: 0,
                    contracts: 0,
                    grants: 0
                }
            });

            expect(container.instance().switchTab).toHaveBeenCalledTimes(1);
            expect(container.instance().switchTab).toHaveBeenCalledWith('contracts');
        });
        it('should default to contracts if all types return a count of zero', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);
            container.instance().switchTab = jest.fn();
            container.instance().updateFilters = jest.fn();

            container.instance().parseTabCounts({
                results: {
                    loans: 0,
                    other: 0,
                    direct_payments: 0,
                    contracts: 0,
                    grants: 0
                }
            });

            expect(container.instance().switchTab).toHaveBeenCalledTimes(1);
            expect(container.instance().switchTab).toHaveBeenCalledWith('contracts');
        });
        it('should pick a subaward tab when subawards are enabled', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux}
                subaward />);
            container.instance().switchTab = jest.fn();
            container.instance().updateFilters = jest.fn();

            container.instance().parseTabCounts({
                results: {
                    subcontracts: 10,
                    subgrants: 8
                }
            });

            expect(container.instance().switchTab).toHaveBeenCalledTimes(1);
            expect(container.instance().switchTab).toHaveBeenCalledWith('subcontracts');
        });
        it('should pick the first subaward tab with a non-zero number of results when subawards are enabled', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux}
                subaward />);
            container.instance().switchTab = jest.fn();
            container.instance().updateFilters = jest.fn();

            container.instance().parseTabCounts({
                results: {
                    subcontracts: 0,
                    subgrants: 20
                }
            });

            expect(container.instance().switchTab).toHaveBeenCalledTimes(1);
            expect(container.instance().switchTab).toHaveBeenCalledWith('subgrants');
        });
        it('should pick subcontracts when all tabs have 0 results and subawards are enabled', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux}
                subaward />);
            container.instance().switchTab = jest.fn();
            container.instance().updateFilters = jest.fn();

            container.instance().parseTabCounts({
                results: {
                    subcontracts: 0,
                    subgrants: 0
                }
            });

            expect(container.instance().switchTab).toHaveBeenCalledTimes(1);
            expect(container.instance().switchTab).toHaveBeenCalledWith('subcontracts');
        });
    });

    describe('updateFilters', () => {
        it('should retain a version of the search parameters into state', () => {
            const filters = Object.assign({}, initialState, {
                timePeriodFY: new Set(['1778', '1779'])
            });
            const redux = Object.assign({}, mockRedux, {
                filters
            });
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...redux} />);
            container.instance().performSearch = jest.fn();
            container.instance().updateFilters();

            const expectedParams = new SearchAwardsOperation();
            expectedParams.fromState(filters);

            expect(container.state().searchParams).toEqual(expectedParams);
        });
        it('should reset the page to 1', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);
            container.instance().performSearch = jest.fn();
            container.instance().updateFilters();

            expect(container.state().page).toEqual(1);
        });
        it('should trigger a reset search', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);
            container.instance().performSearch = jest.fn();

            container.instance().updateFilters();

            expect(container.instance().performSearch).toHaveBeenCalledTimes(1);
            expect(container.instance().performSearch).toHaveBeenCalledWith(true);
        });
    });

    describe('loadColumns', () => {
        it('should generate a column object in React state for every table type', () => {
            const expectedKeys = ['contracts', 'grants', 'direct_payments', 'loans', 'other', 'subcontracts', 'subgrants'];
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);

            container.instance().loadColumns();
            const columnKeys = Object.keys(container.state().columns);
            expect(
                expectedKeys.every((key) => columnKeys.indexOf(key) > -1) &&
                columnKeys.every((key) => expectedKeys.indexOf(key) > -1)
            ).toBeTruthy();
        });

        it('should generate a column object that contains an array representing the order columns should appear in the table', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);

            container.instance().loadColumns();
            const column = container.state().columns.contracts;
            expect({}.hasOwnProperty.call(column, 'visibleOrder')).toBeTruthy();
        });
    });

    describe('createColumn', () => {
        it('should return a column object', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);

            const output = container.instance().createColumn('Test Column');
            expect(output).toEqual({
                columnName: 'Test Column',
                displayName: 'Test Column',
                width: 220,
                defaultDirection: 'desc'
            });
        });
    });

    describe('performSearch', () => {
        it('should overwrite the existing result state if the page number is 1 or it is a new search', async () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);

            container.setState({
                results: [{}, {}, {}],
                columns: {
                    contracts: {
                        visibleOrder: ['test']
                    }
                }
            });
            expect(container.state().results.length).toEqual(3);

            container.instance().performSearch(true);
            await container.instance().searchRequest.promise;

            expect(container.state().results.length).toEqual(1);
        });
        it('should append the results to the existing result state if the page number is greater than 1', async () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);

            container.setState({
                results: [{}, {}, {}],
                page: 2,
                columns: {
                    contracts: {
                        visibleOrder: ['test']
                    }
                }
            });
            expect(container.state().results.length).toEqual(3);

            container.instance().performSearch(false);
            await container.instance().searchRequest.promise;

            expect(container.state().results.length).toEqual(4);
        });
    });

    describe('loadNextPage', () => {
        it('should increment the page number', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);
            container.setState({
                page: 1,
                lastPage: false,
                inFlight: false
            });
            container.instance().performSearch = jest.fn();
            expect(container.state().page).toEqual(1);

            container.instance().loadNextPage();
            expect(container.state().page).toEqual(2);
        });
        it('should call an appended performSearch', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);
            container.instance().performSearch = jest.fn();
            container.setState({
                page: 1,
                lastPage: false,
                inFlight: false
            });

            container.instance().loadNextPage();
            expect(container.instance().performSearch).toHaveBeenCalledTimes(1);
            expect(container.instance().performSearch).toHaveBeenCalledWith();
        });
        it('should do nothing if it is the last page', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);
            container.instance().performSearch = jest.fn();

            container.setState({
                lastPage: true,
                page: 1,
                inFlight: false
            });

            container.instance().loadNextPage();
            expect(container.instance().performSearch).toHaveBeenCalledTimes(0);
        });
        it('should do nothing if there are existing requests in flight', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);
            container.instance().performSearch = jest.fn();

            container.setState({
                lastPage: false,
                page: 1,
                inFlight: true
            });

            container.instance().loadNextPage();
            expect(container.instance().performSearch).toHaveBeenCalledTimes(0);
        });
    });

    describe('switchTab', () => {
        it('should change the state to the new tab type', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);
            container.setState({
                columns: {
                    loans: {
                        data: {}
                    }
                }
            });
            container.instance().performSearch = jest.fn();
            container.instance().switchTab('loans');

            expect(container.state().tableType).toEqual('loans');
        });
        it('should should call a reset performSearch operation', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);
            container.setState({
                columns: {
                    loans: {
                        data: {}
                    }
                }
            });
            container.instance().performSearch = jest.fn();
            container.instance().switchTab('loans');

            expect(container.instance().performSearch).toHaveBeenCalledTimes(1);
            expect(container.instance().performSearch).toHaveBeenCalledWith(true);
        });

        it('should use the default sort field and sort direction if the new table type doesn\'t have current sort column', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);
            container.setState({
                sort: {
                    field: 'Clinger-Cohen Act Compliant',
                    direction: 'asc'
                },
                columns: {
                    loans: {
                        data: {}
                    }
                }
            });
            container.instance().performSearch = jest.fn();
            container.instance().switchTab('loans');
            expect(container.state().sort).toEqual({
                field: 'Loan Value',
                direction: 'desc'
            });

        });
    });
    
    describe('updateSort', () => {
        it('should set the sort state to the given values', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);
            container.setState({
                sort: {
                    field: 'Clinger-Cohen Act Compliant',
                    direction: 'asc'
                }
            });
            container.instance().performSearch = jest.fn();

            container.instance().updateSort('test', 'desc');
            expect(container.state().sort).toEqual({
                field: 'test',
                direction: 'desc'
            });
        });
        it('should call a reset performSearch operation', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);
            container.instance().performSearch = jest.fn();

            container.instance().updateSort('test', 'desc');
            expect(container.instance().performSearch).toHaveBeenCalledTimes(1);
            expect(container.instance().performSearch).toHaveBeenCalledWith(true);
        });
    });
});
