/**
 * ResultsTableContainer-test.jsx
 * Created by Lizzie Salita 1/22/18
 */

import React from 'react';
import { mount, shallow } from 'enzyme';

import ResultsTableContainer from 'containers/keyword/table/ResultsTableContainer';

import { mockTabCount, mockTableProps } from '../mockResults';
import { encodedAwardId } from '../../../mockData';

jest.mock('helpers/keywordHelper', () => require('../keywordHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/keyword/table/ResultsTableSection', () =>
    jest.fn(() => null));

// canvas elements are not available in Jest, so mock the text measurement helper
jest.mock('helpers/textMeasurement', () => ({
    measureText: jest.fn(() => 100),
    measureTableHeader: jest.fn(() => 220)
}));

describe('ResultsTableContainer', () => {
    it('should reset the page to 1 when the keyword changes', () => {
        const container = shallow(<ResultsTableContainer
            {...mockTableProps} />);

        container.setProps({
            keyword: 'test'
        });

        expect(container.state().page).toEqual(1);
    });
    it('should pick a default tab when the keyword changes', async () => {
        const container = mount(<ResultsTableContainer
            {...mockTableProps} />);
        container.instance().parseTabCounts = jest.fn();

        container.setProps({
            keyword: 'blah blah'
        });

        await container.instance().tabCountRequest.promise;

        expect(container.instance().parseTabCounts).toHaveBeenCalledTimes(1);
    });

    describe('pickDefaultTab', () => {
        it('should call parseTabCounts() after the API responds', async () => {
            const container = shallow(<ResultsTableContainer
                {...mockTableProps} />);
            container.instance().parseTabCounts = jest.fn();

            container.instance().pickDefaultTab();

            await container.instance().tabCountRequest.promise;

            expect(container.instance().parseTabCounts).toHaveBeenCalledTimes(1);
        });
    });

    describe('parseTabCounts', () => {
        it('should save the counts to state', () => {
            const container = shallow(<ResultsTableContainer
                {...mockTableProps} />);
            container.instance().parseTabCounts(mockTabCount);

            expect(container.state().counts).toEqual(mockTabCount.results);
        });
        it('should pick the first table type it encounters with a count greater than zero', () => {
            const container = shallow(<ResultsTableContainer
                {...mockTableProps} />);
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
                {...mockTableProps} />);
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
                {...mockTableProps} />);
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

    describe('performSearch', () => {
        it('should overwrite the existing result state if the page number is 1 or it is a new search', async () => {
            const container = shallow(<ResultsTableContainer
                {...mockTableProps} />);

            container.setState({
                results: [{}, {}, {}]
            });
            expect(container.state().results.length).toEqual(3);

            container.instance().performSearch(true);
            await container.instance().searchRequest.promise;

            expect(container.state().results.length).toEqual(1);
        });
        it('should append the results to the existing result state if the page number is greater than 1', async () => {
            const container = shallow(<ResultsTableContainer
                {...mockTableProps} />);

            container.setState({
                results: [{}, {}, {}],
                page: 2
            });
            expect(container.state().results.length).toEqual(3);

            container.instance().performSearch(false);
            await container.instance().searchRequest.promise;

            expect(container.state().results.length).toEqual(4);
        });
        it('should encode the award id', async () => {
            const container = shallow(<ResultsTableContainer
                {...mockTableProps} />);

            await container.instance().performSearch(true);
                
            expect(container.state().results[0].generated_internal_id).toEqual(encodedAwardId);
        });
    });

    describe('loadNextPage', () => {
        it('should increment the page number', () => {
            const container = shallow(<ResultsTableContainer
                {...mockTableProps} />);
            container.setState({
                page: 1,
                lastPage: false,
                inFlight: false
            });
            expect(container.state().page).toEqual(1);

            container.instance().loadNextPage();
            expect(container.state().page).toEqual(2);
        });
        it('should call an appended performSearch', () => {
            const container = shallow(<ResultsTableContainer
                {...mockTableProps} />);
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
                {...mockTableProps} />);
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
                {...mockTableProps} />);
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
                {...mockTableProps} />);
            container.instance().switchTab('loans');

            expect(container.state().tableType).toEqual('loans');
        });
        it('should should call a reset performSearch operation if a keyword has been entered', () => {
            const container = shallow(<ResultsTableContainer
                {...mockTableProps} />);
            container.instance().performSearch = jest.fn();
            container.setProps({
                keyword: 'test'
            });
            container.instance().switchTab('loans');

            expect(container.instance().performSearch).toHaveBeenCalledTimes(1);
            expect(container.instance().performSearch).toHaveBeenCalledWith(true);
        });
    });

    describe('updateSort', () => {
        it('should set the sort state to the given values', () => {
            const container = shallow(<ResultsTableContainer
                {...mockTableProps} />);
            container.setState({
                sort: {
                    field: 'Clinger-Cohen Act Compliant',
                    direction: 'asc'
                }
            });

            container.instance().updateSort('test', 'desc');
            expect(container.state().sort).toEqual({
                field: 'test',
                direction: 'desc'
            });
        });
        it('should call a reset performSearch operation', () => {
            const container = shallow(<ResultsTableContainer
                {...mockTableProps} />);
            container.instance().performSearch = jest.fn();

            container.instance().updateSort('test', 'desc');
            expect(container.instance().performSearch).toHaveBeenCalledTimes(1);
            expect(container.instance().performSearch).toHaveBeenCalledWith(true);
        });
    });
});
