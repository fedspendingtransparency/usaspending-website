/**
 * ResultsTableContainer-test.jsx
 * Created by Kevin Li 5/11/17
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import * as SearchHelper from 'helpers/searchHelper';
import { ResultsTableContainer } from 'containers/search/table/ResultsTableContainer';

import SearchOperation from 'models/search/SearchOperation';

import { MetaRecord } from 'redux/reducers/resultsMeta/resultsMetaReducer';
import { OrderRecord } from 'redux/reducers/search/searchOrderReducer';
import { mockActions, mockRedux, mockApi } from './mockAwards';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const searchSpy = sinon.spy(ResultsTableContainer.prototype, 'performSearch');

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/table/ResultsTableSection', () =>
    jest.fn(() => null));

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
    it('should make an API call for awards on mount', () => {
        mockSearchHelper('performPagedSearch', 'resolve', mockApi);

        mount(<ResultsTableContainer
            {...mockActions}
            {...mockRedux} />);

        jest.runAllTicks();

        expect(searchSpy.callCount).toEqual(1);
        searchSpy.reset();
    });

    it('should make an API call whenever the Redux filters change', () => {
        mockSearchHelper('performPagedSearch', 'resolve', mockApi);

        const container = mount(<ResultsTableContainer
            {...mockActions}
            {...mockRedux} />);

        jest.runAllTicks();

        expect(searchSpy.callCount).toEqual(1);

        // update the filters
        const newFilters = Object.assign({}, mockRedux.filters, {
            keyword: 'blah blah'
        });

        container.setProps({
            filters: newFilters
        });

        jest.runAllTicks();

        // this should trigger a new API call
        expect(searchSpy.callCount).toEqual(2);
        searchSpy.reset();
    });

    it('should make an API call whenever the Redux table type value changes', () => {
        mockSearchHelper('performPagedSearch', 'resolve', mockApi);

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

    describe('updateFilters', () => {
        it('should reset the page number to 1', () => {
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
});
