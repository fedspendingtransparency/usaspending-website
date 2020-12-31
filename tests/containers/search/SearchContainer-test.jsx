/**
 * SearchContainer-test.jsx
 * Created by Kevin Li 6/2/17
 */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Set } from 'immutable';
import { useParams } from 'react-router-dom';
import * as redux from 'react-redux';

import SearchContainer, { parseRemoteFilters } from 'containers/search/SearchContainer';
import * as appliedFilterActions from 'redux/actions/search/appliedFilterActions';

import { mockFilters, mockRedux } from './mockSearchHashes';
import { restoreUrlHash, generateUrlHash } from './filters/searchHelper';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = jest.requireActual('promise');

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/SearchPage', () => (
    jest.fn(() => null)
));

jest.mock('helpers/searchHelper', () => ({
    ...jest.requireActual('helpers/searchHelper'),
    ...require('./filters/searchHelper')
}));
// jest.mock('helpers/fiscalYearHelper', () => require('./filters/fiscalYearHelper'));
jest.mock('helpers/downloadHelper', () => require('./modals/fullDownload/downloadHelper'));

jest.mock('react-redux', () => {
    const ActualReactRedux = jest.requireActual('react-redux');
    return {
        ...ActualReactRedux,
        useDispatch: jest.fn(() => () => {}),
        useSelector: jest.fn().mockImplementation(() => mockRedux)
    };
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn().mockReturnValue({ urlHash: 'abc' })
}));

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

test('parseRemoteFilters should return null if the versions do not match', () => {
    const mockResponse = Object.assign({}, mockFilters, {
        filter: {
            version: -1000
        }
    });

    expect(parseRemoteFilters(mockResponse)).toEqual(null);
});

test('parseRemoteFilters should return an immutable data structure when versions match', () => {
    const expectedFilter = new Set(['1990']);
    const mock = {
        ...mockFilters,
        filter: {
            ...mockFilters.filter,
            filters: {
                ...mockFilters.filter.filters,
                timePeriodFY: ['1990']
            }
        }
    };
    expect(parseRemoteFilters(mock.filter).timePeriodFY).toEqual(expectedFilter);
});

test('a non-hashed does not make a request to the api', async () => {
    useParams.mockReturnValueOnce({ urlHash: null });
    render(<SearchContainer />, {});
    await waitFor(() => {
        expect(restoreUrlHash).not.toHaveBeenCalled();
        expect(generateUrlHash).not.toHaveBeenCalled();
    });
});

test('a hashed url makes a request to the api & sets loading state', async () => {
    const setLoadingStateFn = jest.spyOn(appliedFilterActions, 'setAppliedFilterEmptiness');
    render(<SearchContainer />, {});
    await waitFor(() => {
        expect(restoreUrlHash).toHaveBeenCalledTimes(1);
        expect(setLoadingStateFn).toHaveBeenCalledWith(false);
        expect(generateUrlHash).not.toHaveBeenCalled();
    });
});

test('when filters change (a) hash is generated, (b) loading is set & (c) url is updated', async () => {
    restoreUrlHash.mockClear();
    useParams.mockReturnValueOnce({ urlHash: null });
    const setLoading = jest.spyOn(appliedFilterActions, 'setAppliedFilterEmptiness');
    const mockReplace = jest.fn();
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        ...mockRedux,
        appliedFilters: {
            filters: {
                ...mockRedux.appliedFilters,
                timePeriodFY: Set(['2020'])
            }
        }
    });

    render(<SearchContainer history={{ replace: mockReplace }} />, {});

    await waitFor(() => {
        expect(generateUrlHash).toHaveBeenCalledTimes(1);
        expect(mockReplace).toHaveBeenCalledTimes(1);
        expect(setLoading).toHaveBeenCalledWith(false);
        expect(restoreUrlHash).not.toHaveBeenCalled();
    });
});

