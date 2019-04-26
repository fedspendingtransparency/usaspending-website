/**
 * SearchContainer-test.jsx
 * Created by Kevin Li 6/2/17
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Set } from 'immutable';

import { SearchContainer } from 'containers/search/SearchContainer';
import * as SearchHelper from 'helpers/searchHelper';
import { initialState } from 'redux/reducers/search/searchFiltersReducer';
import { initialState as initialApplied } from 'redux/reducers/search/appliedFiltersReducer';

import { mockHash, mockFilters, mockRedux, mockActions } from './mockSearchHashes';
import Router from './mockRouter';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/SearchPage', () =>
    jest.fn(() => null));

jest.mock('helpers/searchHelper', () => require('./filters/searchHelper'));
jest.mock('helpers/fiscalYearHelper', () => require('./filters/fiscalYearHelper'));
jest.mock('helpers/downloadHelper', () => require('./modals/fullDownload/downloadHelper'));
jest.mock('containers/router/Router', () => require('./mockRouter'));

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('SearchContainer', () => {
    it('should try to resolve the current URL hash on mount', () => {
        const container = shallow(<SearchContainer
            {...mockActions}
            {...mockRedux} />);

        const handleInitialUrl = jest.fn();
        container.instance().handleInitialUrl = handleInitialUrl;

        container.instance().componentDidMount();

        expect(handleInitialUrl).toHaveBeenCalledTimes(1);
    });

    it('should try to resolve the URL hash when new inbound hashes are passed in the URL', () => {
        const container = shallow(<SearchContainer
            {...mockActions}
            {...mockRedux} />);

        container.setState({
            hash: '22222'
        });

        const receiveHash = jest.fn();
        container.instance().receiveHash = receiveHash;

        container.instance().componentWillReceiveProps({
            params: {
                hash: '11111'
            }
        });

        expect(receiveHash).toHaveBeenCalledTimes(1);
    });

    it('should not try to resolve the URL hash again when the URL changes programmatically', () => {
        const container = shallow(<SearchContainer
            {...mockActions}
            {...mockRedux} />);

        container.setState({
            hash: '11111'
        });

        const receiveHash = jest.fn();
        container.instance().receiveHash = receiveHash;

        container.instance().componentWillReceiveProps(Object.assign({}, mockActions, mockRedux, {
            params: {
                hash: '11111'
            }
        }));

        expect(receiveHash).toHaveBeenCalledTimes(0);
    });

    it('should try to generate a new URL hash when the Redux filters change', () => {
        const container = shallow(<SearchContainer
            {...mockActions}
            {...mockRedux} />);

        container.setState({
            hash: '',
            hashState: 'ready'
        });

        const nextFilters = Object.assign({}, initialState, {
            timePeriodFY: new Set(['1987'])
        });

        const nextProps = Object.assign({}, mockRedux, mockActions, {
            appliedFilters: Object.assign({}, initialApplied, {
                filters: nextFilters
            })
        });

        const generateHash = jest.fn();
        container.instance().generateHash = generateHash;

        container.instance().componentWillReceiveProps(nextProps);

        expect(generateHash).toHaveBeenCalledTimes(1);
    });

    describe('handleInitialUrl', () => {
        it('should attempt to generate a hash from the existing Redux filters if no URL hash is found', () => {
            const container = shallow(<SearchContainer
                {...mockActions}
                {...mockRedux} />);

            const generateInitialHash = jest.fn();
            container.instance().generateInitialHash = generateInitialHash;

            container.instance().handleInitialUrl('');

            expect(generateInitialHash).toHaveBeenCalledTimes(1);
        });
        it('should attempt to restore the filter set based on the current URL hash', () => {
            const container = shallow(<SearchContainer
                {...mockActions}
                {...mockRedux} />);

            const requestFilters = jest.fn();
            container.instance().requestFilters = requestFilters;

            container.instance().handleInitialUrl('2222');

            expect(requestFilters).toHaveBeenCalledTimes(1);
        });
    });

    describe('generateInitialHash', () => {
        it('should use a hashless search URL if no filters are applied', () => {
            const container = shallow(<SearchContainer
                {...mockActions}
                {...mockRedux} />);

            const generateHash = jest.fn();
            container.instance().generateHash = generateHash;

            container.instance().generateInitialHash();
            expect(Router.history.replace).toHaveBeenLastCalledWith('/search');

            expect(generateHash).toHaveBeenCalledTimes(0);
        });

        it('should generate a hash if there are filters applied', () => {
            const filters = Object.assign({}, initialState, {
                timePeriodFY: new Set(['1987'])
            });

            const redux = Object.assign({}, mockRedux, {
                appliedFilters: {
                    filters
                }
            });

            const container = shallow(<SearchContainer
                {...mockActions}
                {...redux} />);

            const generateHash = jest.fn();
            container.instance().generateHash = generateHash;

            container.instance().generateInitialHash();

            expect(generateHash).toHaveBeenCalledTimes(1);
        });
    });

    describe('receiveHash', () => {
        it('should request filters for the given hash', () => {
            const container = shallow(<SearchContainer
                {...mockActions}
                {...mockRedux} />);

            const requestFilters = jest.fn();
            container.instance().requestFilters = requestFilters;

            container.instance().receiveHash('222');

            expect(requestFilters).toHaveBeenCalledTimes(1);
        });

        it('should do nothing if no hash is provided', () => {
            const container = shallow(<SearchContainer
                {...mockActions}
                {...mockRedux} />);

            const requestFilters = jest.fn();
            container.instance().requestFilters = requestFilters;

            container.instance().receiveHash('');

            expect(requestFilters).toHaveBeenCalledTimes(0);
        });
    });

    describe('provideHash', () => {
        it('should update the URL to the given hash', () => {
            const container = shallow(<SearchContainer
                {...mockActions}
                {...mockRedux} />);

            container.instance().provideHash('12345');
            expect(Router.history.replace).toHaveBeenLastCalledWith('/search/12345');

            expect(container.state().hash).toEqual('12345');
        });
    });

    describe('applyFilters', () => {
        it('should stop if the versions do not match', () => {
            const container = shallow(<SearchContainer
                {...mockActions}
                {...mockRedux} />);

            const mockResponse = Object.assign({}, mockFilters, {
                filter: {
                    version: -1000
                }
            });

            container.setState({
                hashState: 'inbound'
            });
            container.instance().applyFilters(mockResponse.filter);

            expect(container.state().hashState).toEqual('inbound');
        });

        it('should trigger a Redux action to apply the filters', () => {
            const populateAction = jest.fn();

            const actions = Object.assign({}, mockActions, {
                restoreHashedFilters: populateAction
            });

            const container = shallow(<SearchContainer
                {...actions}
                {...mockRedux} />);

            container.setState({
                hashState: 'inbound'
            });
            container.instance().applyFilters(mockFilters.filter);

            const expectedFilters = Object.assign({}, initialState, {
                timePeriodFY: new Set(['1990'])
            });

            expect(populateAction).toHaveBeenCalledTimes(1);
            expect(populateAction).toHaveBeenCalledWith(expectedFilters);
            expect(container.state().hashState).toEqual('ready');
        });
    });

    describe('determineIfUnfiltered', () => {
        it('should return true if no filters are applied', () => {
            const container = shallow(<SearchContainer
                {...mockActions}
                {...mockRedux} />);

            const unfiltered = container.instance().determineIfUnfiltered(initialState);
            expect(unfiltered).toBeTruthy();
        });
        it('should return false if filters have been applied', () => {
            const container = shallow(<SearchContainer
                {...mockActions}
                {...mockRedux} />);

            const modifiedState = Object.assign({}, initialState, {
                timePeriodFY: new Set(['1987'])
            });

            const unfiltered = container.instance().determineIfUnfiltered(modifiedState);
            expect(unfiltered).toBeFalsy();
        });
    });

    describe('parseUpdateDate', () => {
        it('should format the API response correctly and set the state', () => {
            const container = shallow(<SearchContainer
                {...mockActions}
                {...mockRedux} />);

            container.instance().parseUpdateDate('01/01/1984');
            expect(container.state().lastUpdate).toEqual('January 1, 1984');
        });
    });

    describe('requestDownloadAvailability', () => {
        it('should not make an API requets if the applied filter state equals the initial blank filter state', () => {
            const blankFilters = Object.assign({}, initialState);
            const container = shallow(<SearchContainer
                {...mockActions}
                {...mockRedux} />);

            const mockParse = jest.fn();
            container.instance().parseDownloadAvailability = mockParse;

            container.setState({
                downloadAvailable: true
            });

            container.instance().requestDownloadAvailability(blankFilters);

            expect(mockParse).toHaveBeenCalledTimes(0);
            expect(container.state().downloadAvailable).toBeFalsy();            
        });
        it('should make an API request for how many transaction rows will be returned', async () => {
            const newFilters = Object.assign({}, initialState, {
                timePeriodFY: new Set(['1990'])
            });

            const container = shallow(<SearchContainer
                {...mockActions}
                {...mockRedux} />);

            const mockParse = jest.fn();
            container.instance().parseDownloadAvailability = mockParse;

            container.instance().requestDownloadAvailability(newFilters);
            await container.instance().downloadRequest.promise;

            expect(mockParse).toHaveBeenCalledWith({
                transaction_rows_gt_limit: false
            });
        });
    });

    describe('parseDownloadAvailability', () => {
        it('should set the downloadAvailable state to false if there are more than 500,000 rows', () => {
            const container = shallow(<SearchContainer
                {...mockActions}
                {...mockRedux} />);

            container.setState({
                downloadAvailable: true
            });

            container.instance().parseDownloadAvailability({
                transaction_rows_gt_limit: true
            });

            expect(container.state().downloadAvailable).toBeFalsy();
        });

        it('should set the downloadAvailable state to true if there are no more than 500,000 rows', () => {
            const container = shallow(<SearchContainer
                {...mockActions}
                {...mockRedux} />);

            container.setState({
                downloadAvailable: true
            });

            container.instance().parseDownloadAvailability({
                transaction_rows_gt_limit: false
            });

            expect(container.state().downloadAvailable).toBeTruthy();
        });
    });
});
