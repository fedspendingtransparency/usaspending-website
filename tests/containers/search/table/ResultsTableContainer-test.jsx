/**
 * ResultsTableContainer-test.jsx
 * Created by Kevin Li 5/11/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import * as SearchHelper from 'helpers/searchHelper';
import { ResultsTableContainer } from 'containers/search/table/ResultsTableContainer';

import { MetaRecord } from 'redux/reducers/resultsMeta/resultsMetaReducer';
import { OrderRecord } from 'redux/reducers/search/searchOrderReducer';
import { VisibilityRecord } from 'redux/reducers/search/columnVisibilityReducer';
import { mockActions, mockRedux, mockApi, mockTabCount } from './mockAwards';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const autoTabSpy = sinon.spy(ResultsTableContainer.prototype, 'pickDefaultTab');
const searchSpy = sinon.spy(ResultsTableContainer.prototype, 'performSearch');

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

describe('ResultsTableContainer', () => {
    it('should pick a default tab for awards on mount', () => {
        mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);
        mockSearchHelper('performPagedSearch', 'resolve', mockApi);

        mount(<ResultsTableContainer
            {...mockActions}
            {...mockRedux} />);

        jest.runAllTicks();

        expect(autoTabSpy.callCount).toEqual(1);
        autoTabSpy.reset();
    });

    it('should pick a default tab whenever the Redux filters change', () => {
        mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);
        mockSearchHelper('performPagedSearch', 'resolve', mockApi);

        const container = mount(<ResultsTableContainer
            {...mockActions}
            {...mockRedux} />);

        jest.runAllTicks();

        expect(autoTabSpy.callCount).toEqual(1);

        // update the filters
        const newFilters = Object.assign({}, mockRedux.filters, {
            keyword: 'blah blah'
        });

        container.setProps({
            filters: newFilters
        });

        jest.runAllTicks();

        // this should trigger a new API call
        expect(autoTabSpy.callCount).toEqual(2);
        autoTabSpy.reset();
    });

    it('should make an API call whenever the Redux table type value changes', () => {
        mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);
        mockSearchHelper('performPagedSearch', 'resolve', mockApi);

        searchSpy.reset();

        const container = mount(<ResultsTableContainer
            {...mockActions}
            {...mockRedux} />);

        jest.runAllTicks();

        expect(searchSpy.callCount).toEqual(1);

        // update the table type
        const metaData = Object.assign({}, mockRedux.meta.toJS(), {
            tableType: 'loans'
        });

        container.setProps({
            meta: new MetaRecord(metaData)
        });

        jest.runAllTicks();

        // this should trigger a new API call
        expect(searchSpy.callCount).toEqual(2);
        searchSpy.reset();
    });

    it('should make an API call when the Redux sort order changes', () => {
        mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);
        mockSearchHelper('performPagedSearch', 'resolve', mockApi);

        const container = mount(<ResultsTableContainer
            {...mockActions}
            {...mockRedux} />);

        jest.runAllTicks();

        expect(searchSpy.callCount).toEqual(1);

        // update the sort order
        const orderData = Object.assign({}, mockRedux.searchOrder.toJS(), {
            direction: 'asc'
        });

        container.setProps({
            searchOrder: new OrderRecord(orderData)
        });

        jest.runAllTicks();

        // this should trigger a new API call
        expect(searchSpy.callCount).toEqual(2);
        searchSpy.reset();
    });

    it('should make an API call when the Redux page number changes', () => {
        mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);
        mockSearchHelper('performPagedSearch', 'resolve', mockApi);

        const container = mount(<ResultsTableContainer
            {...mockActions}
            {...mockRedux} />);

        jest.runAllTicks();

        expect(searchSpy.callCount).toEqual(1);

        // update the page number
        const metaData = Object.assign({}, mockRedux.meta.toJS(), {
            page: {
                page_number: 5
            }
        });

        container.setProps({
            meta: new MetaRecord(metaData)
        });

        jest.runAllTicks();

        // this should trigger a new API call
        expect(searchSpy.callCount).toEqual(2);
        searchSpy.reset();
    });

    it('should make an API call when columns are added or removed', () => {
        mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);
        mockSearchHelper('performPagedSearch', 'resolve', mockApi);

        const container = mount(<ResultsTableContainer
            {...mockActions}
            {...mockRedux} />);

        jest.runAllTicks();

        expect(searchSpy.callCount).toEqual(1);

        // update the column visibility
        const columnVisibilityData = Object.assign({}, mockRedux.columnVisibility.toJS(), {
            column: 'total_obligation',
            tableType: 'contracts'
        });

        container.setProps({
            searchOrder: new VisibilityRecord(columnVisibilityData)
        });

        jest.runAllTicks();

        // this should trigger a new API call
        expect(searchSpy.callCount).toEqual(2);
        searchSpy.reset();
    });

    describe('updateFilters', () => {
        it('should reset the page number to 1', () => {
            mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);
            mockSearchHelper('performPagedSearch', 'resolve', mockApi);

            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);

            jest.runAllTicks();

            container.setState({
                page: 5
            });
            container.instance().updateFilters();
            expect(container.state().page).toEqual(1);
        });

        it('should save a SearchObject object to state', () => {
            mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);
            mockSearchHelper('performPagedSearch', 'resolve', mockApi);

            const customFilters = Object.assign({}, mockRedux.filters, {
                keyword: 'blah blah'
            });

            const redux = Object.assign({}, mockRedux, {
                filters: customFilters
            });

            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...redux} />);

            container.instance().updateFilters();
            expect(container.state().searchParams.keyword).toEqual('blah blah');
        });

        it('will trigger an API call', () => {
            mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);
            mockSearchHelper('performPagedSearch', 'resolve', mockApi);

            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);

            searchSpy.reset();
            container.instance().updateFilters();
            jest.runAllTicks();

            expect(searchSpy.callCount).toEqual(1);
            searchSpy.reset();
        });
    });

    describe('parseData', () => {
        it('should parse the API response into an array of award objects', () => {
            mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);
            mockSearchHelper('performPagedSearch', 'resolve', mockApi);

            const insertAction = jest.fn();

            const actions = Object.assign({}, mockActions, {
                bulkInsertRecordSet: insertAction
            });

            const container = shallow(<ResultsTableContainer
                {...actions}
                {...mockRedux} />);

            container.instance().parseData(mockApi.results);

            expect(insertAction).toHaveBeenCalledTimes(1);
            expect(insertAction.mock.calls[0][0].type).toEqual('awards');
            expect(insertAction.mock.calls[0][0].data).toHaveLength(1);
        });
    });

    describe('switchTab', () => {
        it('should change the Redux table type', () => {
            mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);
            mockSearchHelper('performPagedSearch', 'resolve', mockApi);

            const tableTypeAction = jest.fn();

            const actions = Object.assign({}, mockActions, {
                setSearchTableType: tableTypeAction
            });

            const container = shallow(<ResultsTableContainer
                {...actions}
                {...mockRedux} />);

            container.instance().switchTab('loans');

            expect(tableTypeAction).toHaveBeenCalledTimes(1);
            expect(tableTypeAction.mock.calls[0][0]).toEqual('loans');
        });
    });

    describe('loadNextPage', () => {
        it('should load the next page if available', () => {
            mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);
            mockSearchHelper('performPagedSearch', 'resolve', mockApi);

            const pageNumber = jest.fn();

            const actions = Object.assign({}, mockActions, {
                setSearchPageNumber: pageNumber
            });

            const page = Object.assign({}, mockRedux.meta.page, {
                has_next_page: true,
                page: 5
            });

            const redux = Object.assign({}, mockRedux, {
                meta: new MetaRecord({
                    page
                })
            });

            const container = shallow(<ResultsTableContainer
                {...actions}
                {...redux} />);

            container.instance().loadNextPage();

            expect(pageNumber).toHaveBeenCalledTimes(1);
            expect(pageNumber.mock.calls[0][0]).toEqual(6);
        });
        it('should do nothing if there are no more pages', () => {
            mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);
            mockSearchHelper('performPagedSearch', 'resolve', mockApi);

            const pageNumber = jest.fn();

            const actions = Object.assign({}, mockActions, {
                setSearchPageNumber: pageNumber
            });

            const page = Object.assign({}, mockRedux.meta.page, {
                has_next_page: false,
                page: 5
            });

            const redux = Object.assign({}, mockRedux, {
                meta: new MetaRecord({
                    page
                })
            });

            const container = shallow(<ResultsTableContainer
                {...actions}
                {...redux} />);

            container.instance().loadNextPage();

            expect(pageNumber).toHaveBeenCalledTimes(0);
        });
    });

    describe('parseTabCounts', () => {
        it('should select the first tab (left to right) with a non-zero aggregate value', () => {
            mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);
            mockSearchHelper('performPagedSearch', 'resolve', mockApi);

            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);

            const mockSwitchTab = jest.fn();
            container.instance().switchTab = mockSwitchTab;

            container.instance().parseTabCounts(mockTabCount);

            expect(mockSwitchTab).toHaveBeenLastCalledWith('contracts');

            // now check a second response
            const secondMock = Object.assign({}, mockTabCount, {
                results: [
                    {
                        type: 'A',
                        aggregate: '0'
                    },
                    {
                        type: 'B',
                        aggregate: '0'
                    },
                    {
                        type: 'C',
                        aggregate: '0'
                    },
                    {
                        type: 'D',
                        aggregate: '0'
                    },
                    {
                        type: '02',
                        aggregate: '1'
                    },
                    {
                        type: '03',
                        aggregate: '1'
                    }
                ]
            });

            container.instance().parseTabCounts(secondMock);
            expect(mockSwitchTab).toHaveBeenLastCalledWith('grants');
        });

        it('should trigger an API call for awards', () => {
            mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);
            mockSearchHelper('performPagedSearch', 'resolve', mockApi);

            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);

            searchSpy.reset();
            expect(searchSpy.callCount).toEqual(0);
            container.instance().parseTabCounts(mockTabCount);

            jest.runAllTicks();
            expect(searchSpy.callCount).toEqual(1);
            searchSpy.reset();
        });
    });

    describe('toggleColumnVisibility', () => {
        it('should change the Redux column visibility', () => {
            mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);
            mockSearchHelper('performPagedSearch', 'resolve', mockApi);

            const columnVisibilityAction = jest.fn();

            const actions = Object.assign({}, mockActions, {
                toggleColumnVisibility: columnVisibilityAction
            });

            const container = shallow(<ResultsTableContainer
                {...actions}
                {...mockRedux} />);

            container.instance().toggleColumnVisibility('recipient_name');

            expect(columnVisibilityAction).toHaveBeenCalledTimes(1);
            expect(columnVisibilityAction.mock.calls[0][0]).toEqual({
                column: "recipient_name", tableType: "contracts"
            });
        });
    });

    describe('reorderColumns', () => {
        it('should change the order of the visible columns', () => {
            mockSearchHelper('fetchAwardCounts', 'resolve', mockTabCount);
            mockSearchHelper('performPagedSearch', 'resolve', mockApi);

            const columnVisibilityAction = jest.fn();

            const actions = Object.assign({}, mockActions, {
                reorderColumns: columnVisibilityAction
            });

            const container = shallow(<ResultsTableContainer
                {...actions}
                {...mockRedux} />);

            container.instance().reorderColumns(5, 2);

            expect(columnVisibilityAction).toHaveBeenCalledTimes(1);
            expect(columnVisibilityAction.mock.calls[0][0]).toEqual({
                tableType: "contracts", dragIndex: 5, hoverIndex: 2
            });
        });
    });
});
