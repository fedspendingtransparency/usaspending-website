/**
 * ResultsTableContainer-test.jsx
 * Created by Kevin Li 5/11/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { ResultsTableContainer } from 'containers/search/table/ResultsTableContainer';

import { MetaRecord } from 'redux/reducers/resultsMeta/resultsMetaReducer';
import { OrderRecord } from 'redux/reducers/search/searchOrderReducer';
import { VisibilityRecord } from 'redux/reducers/search/columnVisibilityReducer';
import { mockActions, mockRedux, mockApi, mockTabCount } from './mockAwards';

jest.mock('helpers/searchHelper', () => require('../filters/searchHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

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

describe('ResultsTableContainer', () => {
    it('should pick a default tab for awards on mount', async () => {
        const container = mount(<ResultsTableContainer
            {...mockActions}
            {...mockRedux} />);

        container.instance().parseTabCounts = jest.fn();

        await container.instance().tabCountRequest.promise;

        expect(autoTabSpy.callCount).toEqual(1);

        autoTabSpy.reset();
    });

    it('should pick a default tab whenever the Redux filters change', async () => {
        const container = mount(<ResultsTableContainer
            {...mockActions}
            {...mockRedux} />);

        container.instance().parseTabCounts = jest.fn();

        await container.instance().tabCountRequest.promise;

        expect(autoTabSpy.callCount).toEqual(1);

        // update the filters
        const newFilters = Object.assign({}, mockRedux.filters, {
            keyword: 'blah blah'
        });

        container.setProps({
            filters: newFilters
        });

        await container.instance().tabCountRequest.promise;

        // this should trigger a new API call
        expect(autoTabSpy.callCount).toEqual(2);

        autoTabSpy.reset();
    });

    it('should trigger an API call whenever the Redux table type value changes', async () => {
        const container = mount(<ResultsTableContainer
            {...mockActions}
            {...mockRedux} />);
        await container.instance().tabCountRequest.promise;
        await container.instance().searchRequest.promise;

        expect(searchSpy.callCount).toEqual(1);

        // update the table type
        const metaData = Object.assign({}, mockRedux.meta.toJS(), {
            tableType: 'loans'
        });

        container.setProps({
            meta: new MetaRecord(metaData)
        });

        await container.instance().searchRequest.promise;
        expect(searchSpy.callCount).toEqual(2);
        autoTabSpy.reset();
        searchSpy.reset();
    });

    it('should make an API call when the Redux sort order changes', async () => {
        const container = mount(<ResultsTableContainer
            {...mockActions}
            {...mockRedux} />);

        await container.instance().tabCountRequest.promise;
        await container.instance().searchRequest.promise;

        expect(searchSpy.callCount).toEqual(1);

        // update the sort order
        const orderData = Object.assign({}, mockRedux.searchOrder.toJS(), {
            direction: 'asc'
        });

        container.setProps({
            searchOrder: new OrderRecord(orderData)
        });

        await container.instance().tabCountRequest.promise;
        await container.instance().searchRequest.promise;

        // this should trigger a new API call
        expect(searchSpy.callCount).toEqual(2);

        autoTabSpy.reset();
        searchSpy.reset();
    });

    it('should make an API call when the Redux page number changes', async () => {
        const container = mount(<ResultsTableContainer
            {...mockActions}
            {...mockRedux} />);

        await container.instance().tabCountRequest.promise;
        await container.instance().searchRequest.promise;

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

        await container.instance().tabCountRequest.promise;
        await container.instance().searchRequest.promise;

        // this should trigger a new API call
        expect(searchSpy.callCount).toEqual(2);

        autoTabSpy.reset();
        searchSpy.reset();
    });

    it('should make an API call when columns are added or removed', async () => {
        const container = mount(<ResultsTableContainer
            {...mockActions}
            {...mockRedux} />);

        await container.instance().tabCountRequest.promise;
        await container.instance().searchRequest.promise;

        expect(searchSpy.callCount).toEqual(1);

        // update the column visibility
        const columnVisibilityData = Object.assign({}, mockRedux.columnVisibility.toJS(), {
            column: 'total_obligation',
            tableType: 'contracts'
        });

        container.setProps({
            searchOrder: new VisibilityRecord(columnVisibilityData)
        });

        await container.instance().tabCountRequest.promise;
        await container.instance().searchRequest.promise;

        // this should trigger a new API call
        expect(searchSpy.callCount).toEqual(2);

        autoTabSpy.reset();
        searchSpy.reset();
    });

    describe('updateFilters', () => {
        it('should reset the page number to 1', async () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);

            container.setState({
                page: 5
            });
            container.instance().updateFilters();

            await container.instance().searchRequest.promise;

            expect(container.state().page).toEqual(1);

            autoTabSpy.reset();
            searchSpy.reset();
        });

        it('should save a SearchObject object to state', async () => {
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

            await container.instance().searchRequest.promise;

            expect(container.state().searchParams.keyword).toEqual('blah blah');

            autoTabSpy.reset();
            searchSpy.reset();
        });

        it('will trigger an API call', async () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);

            container.instance().updateFilters();

            await container.instance().searchRequest.promise;

            expect(searchSpy.callCount).toEqual(1);

            autoTabSpy.reset();
            searchSpy.reset();
        });
    });

    describe('parseData', () => {
        it('should parse the API response into an array of award objects', () => {
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

            autoTabSpy.reset();
            searchSpy.reset();
        });
    });

    describe('switchTab', () => {
        it('should change the Redux table type', () => {
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

            autoTabSpy.reset();
            searchSpy.reset();
        });
    });

    describe('loadNextPage', () => {
        it('should load the next page if available', () => {
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

            autoTabSpy.reset();
            searchSpy.reset();
        });
        it('should do nothing if there are no more pages', () => {
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

            autoTabSpy.reset();
            searchSpy.reset();
        });
    });

    describe('parseTabCounts', () => {
        it('should select the first tab (left to right) with a non-zero aggregate value', async () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);

            const mockSwitchTab = jest.fn();
            container.instance().switchTab = mockSwitchTab;

            container.instance().parseTabCounts(mockTabCount);

            await container.instance().searchRequest.promise;

            expect(mockSwitchTab).toHaveBeenLastCalledWith('contracts');

            // now check a second response
            const secondMock = Object.assign({}, mockTabCount, {
                results: {
                    grants: 1,
                    loans: 0,
                    contracts: 0,
                    direct_payments: 0,
                    other: 0
                }
            });

            container.instance().parseTabCounts(secondMock);
            expect(mockSwitchTab).toHaveBeenLastCalledWith('grants');

            autoTabSpy.reset();
            searchSpy.reset();
        });

        it('should trigger an API call for awards', async () => {
            const container = shallow(<ResultsTableContainer
                {...mockActions}
                {...mockRedux} />);

            searchSpy.reset();
            expect(searchSpy.callCount).toEqual(0);
            container.instance().parseTabCounts(mockTabCount);

            await container.instance().searchRequest.promise;

            expect(searchSpy.callCount).toEqual(1);

            autoTabSpy.reset();
            searchSpy.reset();
        });
    });

    describe('toggleColumnVisibility', () => {
        it('should change the Redux column visibility', () => {
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

            autoTabSpy.reset();
            searchSpy.reset();
        });
    });

    describe('reorderColumns', () => {
        it('should change the order of the visible columns', () => {
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

            autoTabSpy.reset();
            searchSpy.reset();
        });
    });
});
