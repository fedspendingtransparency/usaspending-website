/**
 * SearchContainer-test.jsx
 * Created by Kevin Li 6/2/17
 */
import { Set } from 'immutable';

import { initialState } from 'redux/reducers/search/searchFiltersReducer';
import { parseRemoteFilters, areFiltersBlank } from 'containers/search/SearchContainer';

import { mockFilters, mockRedux } from './mockSearchHashes';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/SearchPage', () =>
    jest.fn(() => null));

jest.mock('helpers/searchHelper', () => require('./filters/searchHelper'));
jest.mock('helpers/fiscalYearHelper', () => require('./filters/fiscalYearHelper'));
jest.mock('helpers/downloadHelper', () => require('./modals/fullDownload/downloadHelper'));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn().mockReturnValue({ environment: 'dev', service: 'fakeService' })
}));

jest.mock('react-redux', () => {
    const ActualReactRedux = require.requireActual('react-redux');
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
    describe('areFiltersBlank', () => {
        it('should return true when selected filters are effectively blank', () => {
            expect(areFiltersBlank(initialState)).toBeTruthy();
        });
        it('should return false when filters are selected', () => {
            expect(areFiltersBlank({
                ...initialState,
                timePeriodFY: new Set(['2020'])
            })).toBeFalsy();
        });
    });
});
