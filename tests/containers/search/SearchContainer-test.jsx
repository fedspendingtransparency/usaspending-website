/**
 * SearchContainer-test.jsx
 * Created by Kevin Li 6/2/17
 */
import React from 'react';
import { render, screen } from 'test-utils';
import { Set } from 'immutable';

import { initialState } from 'redux/reducers/search/searchFiltersReducer';
import SearchContainer, { parseRemoteFilters } from 'containers/search/SearchContainer';

import { mockFilters, mockRedux } from './mockSearchHashes';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = jest.requireActual('promise');

// mock the child component by replacing it with a function that returns a null element
// jest.mock('components/search/SearchPage', () => (
//     jest.fn(() => null)
// ));

jest.mock('helpers/searchHelper', () => require('./filters/searchHelper'));
// jest.mock('helpers/fiscalYearHelper', () => require('./filters/fiscalYearHelper'));
jest.mock('helpers/downloadHelper', () => require('./modals/fullDownload/downloadHelper'));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn().mockReturnValue({ hash: '123' })
}));

jest.mock('react-redux', () => {
    const ActualReactRedux = jest.requireActual('react-redux');
    return {
        ...ActualReactRedux,
        useDispatch: jest.fn(),
        useSelector: jest.fn().mockImplementation(() => {
            return mockRedux;
        })
    };
});

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('SearchContainer', () => {
    describe('parseRemoteFilters', () => {
        it('should return null if the versions do not match', () => {
            const mockResponse = Object.assign({}, mockFilters, {
                filter: {
                    version: -1000
                }
            });

            expect(parseRemoteFilters(mockResponse)).toEqual(null);
        });
        it('should return an immutable data structure when versions match', () => {
            const expectedFilter = new Set(['1990']);
            expect(parseRemoteFilters(mockFilters.filter).timePeriodFY).toEqual(expectedFilter);
        });
    });
    // it('applied filters show a confirmation pill', () => {
    //     const withAppliedFilters = {
    //         ...mockRedux.appliedFilters,
    //         timePeriodFY: new Set(["2021"])
    //     };
    //     render(<SearchContainer {...mockRedux} appliedFilters={withAppliedFilters} />);
    //     expect(screen.queryByRole('listitem')).toBeFalsy();
    // });
    // condition x: url hash exists
    // html exists showing confirmation pill
    
    // describe('a hashed url renders results and a confirmation pill', () => {

    // });
});

