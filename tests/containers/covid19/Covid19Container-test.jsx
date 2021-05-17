/**
 * Covid19Container-test.jsx
 * Created by Lizzie Salita 4/27/21
 */

import React from 'react';
import { render } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';
import { useQueryParams, getQueryParamString } from 'helpers/queryParams';
import Covid19Container from 'containers/covid19/Covid19Container';
import { mockDefCodes } from '../../mockData/helpers/disasterHelper';

// Mock the child component so we can isolate functionality of the container
jest.mock('components/covid19/Covid19Page', () =>
    jest.fn(() => null));

// Set American Rescue Plan release var to true
jest.mock('GlobalConstants', () => ({
    ARP_RELEASED: true
}));

// Mock the custom hook useDEFCodes to prevent making an actual API request
jest.mock('containers/covid19/WithDefCodes', () => ({
    useDefCodes: () => [null, false, mockDefCodes]
}));

// Mock the custom hook useQueryParams
jest.mock('helpers/queryParams', () => ({
    useQueryParams: jest.fn(),
    getQueryParamString: jest.fn().mockImplementation((obj) => {
        return Object.entries(obj).reduce((str, [key, value], i, src) => {
            if (i === src.length - 1) {
                return `${str}${key}=${value}`;
            }
            return `${str}${key}=${value}&`;
        }, '?');
    })
}));

// Mock history.replace()
const mockHistoryReplace = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        replace: mockHistoryReplace
    })
}));

afterEach(() => {
    jest.clearAllMocks();
});

describe('COVID-19 Container', () => {
    it('redirects to all DEFC when the public law query param is invalid', () => {
        useQueryParams.mockImplementation(() => ({ publicLaw: 'blah', section: 'blah-blah' }));
        render((
            <Covid19Container />
        ));
        expect(mockHistoryReplace).toHaveBeenCalledTimes(1);
        expect(mockHistoryReplace).toHaveBeenCalledWith({
            pathname: '',
            search: '?publicLaw=all&section=blah-blah'
        });
    });

    it('redirects if no public law query param is provided', () => {
        useQueryParams.mockImplementation(() => ({ section: 'blah' }));
        render((
            <Covid19Container />
        ));
        expect(mockHistoryReplace).toHaveBeenCalledTimes(1);
        expect(mockHistoryReplace).toHaveBeenCalledWith({
            pathname: '',
            search: '?section=blah&publicLaw=all'
        });
    });

    describe('when a valid public law query param is provided', () => {
        it('does not redirect all DEFC', () => {
            useQueryParams.mockImplementation(() => ({ publicLaw: 'all' }));
            render((
                <Covid19Container />
            ));
            expect(mockHistoryReplace).not.toHaveBeenCalled();
        });
        it('does not redirect American Rescue Plan', () => {
            useQueryParams.mockImplementation(() => ({ publicLaw: 'american-rescue-plan' }));
            render((
                <Covid19Container />
            ));
            expect(mockHistoryReplace).not.toHaveBeenCalled();
        });
    });
});
