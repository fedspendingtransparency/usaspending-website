/**
 * @jest-environment jsdom
 */

import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as accountLandingHelper from 'helpers/accountLandingHelper';
import useFetchAllAccounts from 'containers/accountLanding/useFetchAllAccounts';
import { mockData, mockParsed } from './mockFederalAccounts';

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } }
    });

    // eslint-disable-next-line react/display-name,react/prop-types
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

const renderUseFetchAllAccounts = ({
    sort = { field: 'budgetary_resources', direction: 'desc' },
    page = 1,
    fy,
    keyword = ''
} = {}) =>
    renderHook(
        () => useFetchAllAccounts(sort, page, fy, keyword),
        { wrapper: createWrapper() }
    );

describe('useFetchAllAccounts', () => {
    afterEach(() => jest.restoreAllMocks());

    it('does not fetch when fy is not yet available', () => {
        const fetchSpy = jest.spyOn(accountLandingHelper, 'fetchAllAccounts');

        const { result } = renderUseFetchAllAccounts();

        expect(fetchSpy).not.toHaveBeenCalled();
        expect(result.current.results).toEqual([]);
        expect(result.current.totalItems).toEqual(0);
    });

    it('returns parsed results and totalItems once the request resolves', async () => {
        jest.spyOn(accountLandingHelper, 'fetchAllAccounts')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        const { result } = renderUseFetchAllAccounts({ fy: 2020 });

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.results).toEqual(mockParsed);
        expect(result.current.totalItems).toEqual(mockData.data.count);
    });

    it('builds the request params from sort, page, and fy', () => {
        const fetchSpy = jest.spyOn(accountLandingHelper, 'fetchAllAccounts')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        renderUseFetchAllAccounts({ fy: 2020 });

        expect(fetchSpy.mock.calls[0][0]).toEqual({
            sort: { field: 'budgetary_resources', direction: 'desc' },
            page: 1,
            limit: 50,
            filters: { fy: '2020' }
        });
    });

    it('omits keyword from the request params when no search string is given', () => {
        const fetchSpy = jest.spyOn(accountLandingHelper, 'fetchAllAccounts')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        renderUseFetchAllAccounts({ fy: 2020 });

        expect(fetchSpy.mock.calls[0][0]).not.toHaveProperty('keyword');
    });

    it('includes keyword in the request params when a search string is given', () => {
        const fetchSpy = jest.spyOn(accountLandingHelper, 'fetchAllAccounts')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        renderUseFetchAllAccounts({ fy: 2020, keyword: 'defense' });

        expect(fetchSpy.mock.calls[0][0].keyword).toEqual('defense');
    });

    it('exposes isError and empty results when the request fails', async () => {
        jest.spyOn(accountLandingHelper, 'fetchAllAccounts')
            .mockReturnValue({ promise: Promise.reject(new Error('network error')) });

        const { result } = renderUseFetchAllAccounts({ fy: 2020 });

        await waitFor(() => expect(result.current.isError).toBe(true));

        expect(result.current.results).toEqual([]);
        expect(result.current.totalItems).toEqual(0);
    });
});
