/**
 * KeywordContainer-test.jsx
 * Created by Lizzie Salita 1/10/18
 */

import React from 'react';
import { mount, shallow } from 'enzyme';

import { Set } from 'immutable';
import KeywordContainer from 'containers/keyword/KeywordContainer';

import { mockApi, mockSummary } from './mockResults';

jest.mock('helpers/keywordHelper', () => require('./keywordHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/keyword/KeywordPage', () =>
    jest.fn(() => null));

// canvas elements are not available in Jest, so mock the text measurement helper
jest.mock('helpers/textMeasurement', () => (
{
    measureText: jest.fn(() => 100),
    measureTableHeader: jest.fn(() => 220)
}
));

describe('KeywordContainer', () => {
    describe('updateKeyword', () => {
        it('should reset the page to 1', () => {
            const container = shallow(<KeywordContainer />);

            container.instance().updateKeyword();

            expect(container.state().page).toEqual(1);
        });
        it('should trigger a reset search', () => {
            const container = shallow(<KeywordContainer />);
            container.instance().performSearch = jest.fn();

            container.instance().updateKeyword();

            expect(container.instance().performSearch).toHaveBeenCalledTimes(1);
            expect(container.instance().performSearch).toHaveBeenCalledWith(true);
        });
    });

    describe('performSearch', () => {
        it('should overwrite the existing result state if the page number is 1 or it is a new search', async () => {
            const container = shallow(<KeywordContainer />);

            container.setState({
                results: [{}, {}, {}]
            });
            expect(container.state().results.length).toEqual(3);

            container.instance().performSearch(true);
            await container.instance().searchRequest.promise;

            expect(container.state().results.length).toEqual(1);
        });
        it('should append the results to the existing result state if the page number is greater than 1', async () => {
            const container = shallow(<KeywordContainer />);

            container.setState({
                results: [{}, {}, {}],
                page: 2
            });
            expect(container.state().results.length).toEqual(3);

            container.instance().performSearch(false);
            await container.instance().searchRequest.promise;

            expect(container.state().results.length).toEqual(4);
        });
    });

    describe('loadNextPage', () => {
        it('should increment the page number', () => {
            const container = shallow(<KeywordContainer />);
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
            const container = shallow(<KeywordContainer />);
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
            const container = shallow(<KeywordContainer />);
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
            const container = shallow(<KeywordContainer />);
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
            const container = shallow(<KeywordContainer />);
            container.instance().switchTab('loans');

            expect(container.state().tableType).toEqual('loans');
        });
        it('should should call a reset performSearch operation if a keyword has been entered', () => {
            const container = shallow(<KeywordContainer />);
            container.instance().performSearch = jest.fn();
            container.setState({
                keyword: 'test'
            });
            container.instance().switchTab('loans');

            expect(container.instance().performSearch).toHaveBeenCalledTimes(1);
            expect(container.instance().performSearch).toHaveBeenCalledWith(true);
        });
    });

    describe('updateSort', () => {
        it('should set the sort state to the given values', () => {
            const container = shallow(<KeywordContainer />);
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
            const container = shallow(<KeywordContainer />);
            container.instance().performSearch = jest.fn();

            container.instance().updateSort('test', 'desc');
            expect(container.instance().performSearch).toHaveBeenCalledTimes(1);
            expect(container.instance().performSearch).toHaveBeenCalledWith(true);
        });
    });

    describe('fetchSummary', () => {
        it('set the summary state', async () => {
            const container = shallow(<KeywordContainer />);

            const expectedState = {
                primeCount: 111111,
                primeAmount: 222222.22
            };

            expect(container.state().summary).toBeFalsy();

            container.instance().fetchSummary();
            await container.instance().summaryRequest.promise;

            expect(container.state().summary).toEqual(expectedState);
        });
    });
});
