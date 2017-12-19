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
            keyword: 'blah blah'
        });
        container.setProps({
            filters: newFilters
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
            container.instance().parseTabCounts(mockTabCount);

            expect(container.state().counts).toEqual(mockTabCount.results);
        });
        it('should pick the first table type it encounters with a count greater than zero', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);
            container.instance().switchTab = jest.fn();

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

            container.instance().updateFilters();

            const expectedParams = new SearchAwardsOperation();
            expectedParams.fromState(filters);

            expect(container.state().searchParams).toEqual(expectedParams);
        });
        it('should reset the page to 1', () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);

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

    //     const container = mount(<ResultsTableContainer
    //         {...mockActions}
    //         {...mockRedux} />);

    //     await container.instance().tabCountRequest.promise;
    //     await container.instance().searchRequest.promise;

    //     expect(searchSpy.callCount).toEqual(1);

    //     // update the sort order
    //     const orderData = Object.assign({}, mockRedux.searchOrder.toJS(), {
    //         direction: 'asc'
    //     });

    //     container.setProps({
    //         searchOrder: new OrderRecord(orderData)
    //     });

    //     await container.instance().tabCountRequest.promise;
    //     await container.instance().searchRequest.promise;

    //     // this should trigger a new API call
    //     expect(searchSpy.callCount).toEqual(2);

    //     autoTabSpy.reset();
    //     searchSpy.reset();
    // });

    // it('should make an API call when the Redux page number changes', async () => {
    //     const container = mount(<ResultsTableContainer
    //         {...mockActions}
    //         {...mockRedux} />);

    //     await container.instance().tabCountRequest.promise;
    //     await container.instance().searchRequest.promise;

    //     expect(searchSpy.callCount).toEqual(1);

    //     // update the page number
    //     const metaData = Object.assign({}, mockRedux.meta.toJS(), {
    //         page: {
    //             page_number: 5
    //         }
    //     });

    //     container.setProps({
    //         meta: new MetaRecord(metaData)
    //     });

    //     await container.instance().tabCountRequest.promise;
    //     await container.instance().searchRequest.promise;

    //     // this should trigger a new API call
    //     expect(searchSpy.callCount).toEqual(2);

    //     autoTabSpy.reset();
    //     searchSpy.reset();
    // });

    // it('should make an API call when columns are added or removed', async () => {
    //     const container = mount(<ResultsTableContainer
    //         {...mockActions}
    //         {...mockRedux} />);

    //     await container.instance().tabCountRequest.promise;
    //     await container.instance().searchRequest.promise;

    //     expect(searchSpy.callCount).toEqual(1);

    //     // update the column visibility
    //     const columnVisibilityData = Object.assign({}, mockRedux.columnVisibility.toJS(), {
    //         column: 'total_obligation',
    //         tableType: 'contracts'
    //     });

    //     container.setProps({
    //         searchOrder: new VisibilityRecord(columnVisibilityData)
    //     });

    //     await container.instance().tabCountRequest.promise;
    //     await container.instance().searchRequest.promise;

    //     // this should trigger a new API call
    //     expect(searchSpy.callCount).toEqual(2);

    //     autoTabSpy.reset();
    //     searchSpy.reset();
    // });

    // describe('updateFilters', () => {
    //     it('should reset the page number to 1', async () => {
    //         const container = shallow(<ResultsTableContainer
    //             {...mockActions}
    //             {...mockRedux} />);

    //         container.setState({
    //             page: 5
    //         });
    //         container.instance().updateFilters();

    //         await container.instance().searchRequest.promise;

    //         expect(container.state().page).toEqual(1);

    //         autoTabSpy.reset();
    //         searchSpy.reset();
    //     });

    //     it('should save a SearchObject object to state', async () => {
    //         const customFilters = Object.assign({}, mockRedux.filters, {
    //             keyword: 'blah blah'
    //         });

    //         const redux = Object.assign({}, mockRedux, {
    //             filters: customFilters
    //         });

    //         const container = shallow(<ResultsTableContainer
    //             {...mockActions}
    //             {...redux} />);

    //         container.instance().updateFilters();

    //         await container.instance().searchRequest.promise;

    //         expect(container.state().searchParams.keyword).toEqual('blah blah');

    //         autoTabSpy.reset();
    //         searchSpy.reset();
    //     });

    //     it('will trigger an API call', async () => {
    //         const container = shallow(<ResultsTableContainer
    //             {...mockActions}
    //             {...mockRedux} />);

    //         container.instance().updateFilters();

    //         await container.instance().searchRequest.promise;

    //         expect(searchSpy.callCount).toEqual(1);

    //         autoTabSpy.reset();
    //         searchSpy.reset();
    //     });
    // });

    // describe('parseData', () => {
    //     it('should parse the API response into an array of award objects', () => {
    //         const insertAction = jest.fn();

    //         const actions = Object.assign({}, mockActions, {
    //             bulkInsertRecordSet: insertAction
    //         });

    //         const container = shallow(<ResultsTableContainer
    //             {...actions}
    //             {...mockRedux} />);

    //         container.instance().parseData(mockApi.results);

    //         expect(insertAction).toHaveBeenCalledTimes(1);
    //         expect(insertAction.mock.calls[0][0].type).toEqual('awards');
    //         expect(insertAction.mock.calls[0][0].data).toHaveLength(1);

    //         autoTabSpy.reset();
    //         searchSpy.reset();
    //     });
    // });

    // describe('switchTab', () => {
    //     it('should change the Redux table type', () => {
    //         const tableTypeAction = jest.fn();

    //         const actions = Object.assign({}, mockActions, {
    //             setSearchTableType: tableTypeAction
    //         });

    //         const container = shallow(<ResultsTableContainer
    //             {...actions}
    //             {...mockRedux} />);

    //         container.instance().switchTab('loans');

    //         expect(tableTypeAction).toHaveBeenCalledTimes(1);
    //         expect(tableTypeAction.mock.calls[0][0]).toEqual('loans');

    //         autoTabSpy.reset();
    //         searchSpy.reset();
    //     });
    // });

    // describe('loadNextPage', () => {
    //     it('should load the next page if available', () => {
    //         const pageNumber = jest.fn();

    //         const actions = Object.assign({}, mockActions, {
    //             setSearchPageNumber: pageNumber
    //         });

    //         const page = Object.assign({}, mockRedux.meta.page, {
    //             hasNext: true,
    //             page: 5
    //         });

    //         const redux = Object.assign({}, mockRedux, {
    //             meta: new MetaRecord({
    //                 page
    //             })
    //         });

    //         const container = shallow(<ResultsTableContainer
    //             {...actions}
    //             {...redux} />);

    //         container.instance().loadNextPage();

    //         expect(pageNumber).toHaveBeenCalledTimes(1);
    //         expect(pageNumber.mock.calls[0][0]).toEqual(6);

    //         autoTabSpy.reset();
    //         searchSpy.reset();
    //     });
    //     it('should do nothing if there are no more pages', () => {
    //         const pageNumber = jest.fn();

    //         const actions = Object.assign({}, mockActions, {
    //             setSearchPageNumber: pageNumber
    //         });

    //         const page = Object.assign({}, mockRedux.meta.page, {
    //             hasNext: false,
    //             page: 5
    //         });

    //         const redux = Object.assign({}, mockRedux, {
    //             meta: new MetaRecord({
    //                 page
    //             })
    //         });

    //         const container = shallow(<ResultsTableContainer
    //             {...actions}
    //             {...redux} />);

    //         container.instance().loadNextPage();

    //         expect(pageNumber).toHaveBeenCalledTimes(0);

    //         autoTabSpy.reset();
    //         searchSpy.reset();
    //     });
    // });

    // describe('parseTabCounts', () => {
    //     it('should select the first tab (left to right) with a non-zero aggregate value', async () => {
    //         const container = shallow(<ResultsTableContainer
    //             {...mockActions}
    //             {...mockRedux} />);

    //         const mockSwitchTab = jest.fn();
    //         container.instance().switchTab = mockSwitchTab;

    //         container.instance().parseTabCounts(mockTabCount);

    //         await container.instance().searchRequest.promise;

    //         expect(mockSwitchTab).toHaveBeenLastCalledWith('contracts');

    //         // now check a second response
    //         const secondMock = Object.assign({}, mockTabCount, {
    //             results: {
    //                 grants: 1,
    //                 loans: 0,
    //                 contracts: 0,
    //                 direct_payments: 0,
    //                 other: 0
    //             }
    //         });

    //         container.instance().parseTabCounts(secondMock);
    //         expect(mockSwitchTab).toHaveBeenLastCalledWith('grants');

    //         autoTabSpy.reset();
    //         searchSpy.reset();
    //     });

    //     it('should trigger an API call for awards', async () => {
    //         const container = shallow(<ResultsTableContainer
    //             {...mockActions}
    //             {...mockRedux} />);

    //         searchSpy.reset();
    //         expect(searchSpy.callCount).toEqual(0);
    //         container.instance().parseTabCounts(mockTabCount);

    //         await container.instance().searchRequest.promise;

    //         expect(searchSpy.callCount).toEqual(1);

    //         autoTabSpy.reset();
    //         searchSpy.reset();
    //     });
    // });

    // describe('toggleColumnVisibility', () => {
    //     it('should change the Redux column visibility', () => {
    //         const columnVisibilityAction = jest.fn();

    //         const actions = Object.assign({}, mockActions, {
    //             toggleColumnVisibility: columnVisibilityAction
    //         });

    //         const container = shallow(<ResultsTableContainer
    //             {...actions}
    //             {...mockRedux} />);

    //         container.instance().toggleColumnVisibility('recipient_name');

    //         expect(columnVisibilityAction).toHaveBeenCalledTimes(1);
    //         expect(columnVisibilityAction.mock.calls[0][0]).toEqual({
    //             column: "recipient_name", tableType: "contracts"
    //         });

    //         autoTabSpy.reset();
    //         searchSpy.reset();
    //     });
    // });

    // describe('reorderColumns', () => {
    //     it('should change the order of the visible columns', () => {
    //         const columnVisibilityAction = jest.fn();

    //         const actions = Object.assign({}, mockActions, {
    //             reorderColumns: columnVisibilityAction
    //         });

    //         const container = shallow(<ResultsTableContainer
    //             {...actions}
    //             {...mockRedux} />);

    //         container.instance().reorderColumns(5, 2);

    //         expect(columnVisibilityAction).toHaveBeenCalledTimes(1);
    //         expect(columnVisibilityAction.mock.calls[0][0]).toEqual({
    //             tableType: "contracts", dragIndex: 5, hoverIndex: 2
    //         });

    //         autoTabSpy.reset();
    //         searchSpy.reset();
    //     });
    // });

    // describe('loadColumns', () => {
    //     it('should load the available table columns', () => {
    //         const mockPop = jest.fn();
    //         const actions = Object.assign({}, mockActions, {
    //             populateAvailableColumns: mockPop
    //         });

    //         const container = shallow(<ResultsTableContainer
    //             {...actions}
    //             {...mockRedux} />);
    //         container.instance().loadColumns();
    //         expect(mockPop).toHaveBeenCalledTimes(1);

    //         const mockPopArgs = mockPop.mock.calls[0][0];

    //         const types = ['contracts', 'grants', 'direct_payments', 'loans', 'other'];
    //         types.forEach((type) => {
    //             expect(mockPopArgs).toHaveProperty(type);
    //             expect(mockPopArgs[type]).toHaveProperty('visibleOrder');
    //             expect(mockPopArgs[type]).toHaveProperty('hiddenOrder');
    //             expect(mockPopArgs[type]).toHaveProperty('data');
    //         });
    //     });
    // });

    // describe('createColumn', () => {
    //     it('should create a column object that aligns with the legacy column object used by the results table', () => {
    //         const container = shallow(<ResultsTableContainer
    //             {...mockActions}
    //             {...mockRedux} />);
    //         const column = container.instance().createColumn('Award ID');

    //         expect(column).toEqual({
    //             columnName: 'Award ID',
    //             displayName: 'Award ID',
    //             width: 220,
    //             defaultDirection: 'desc'
    //         });
    //     });
    // });
});
