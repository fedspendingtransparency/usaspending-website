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

const renderUseFetchAllAccounts = (fy, keyword = '') =>
    renderHook(
        () => useFetchAllAccounts({ field: 'budgetary_resources', direction: 'desc' }, 1, fy, keyword),
        { wrapper: createWrapper() }
    );

describe('useFetchAllAccounts', () => {
    afterEach(() => jest.restoreAllMocks());

    it('does not fetch when fy is not yet available', () => {
        const fetchSpy = jest.spyOn(accountLandingHelper, 'fetchAllAccounts');

        const { result } = renderUseFetchAllAccounts(undefined);

        expect(fetchSpy).not.toHaveBeenCalled();
        expect(result.current.results).toEqual([]);
        expect(result.current.totalItems).toEqual(0);
    });

    it('returns parsed results and totalItems once the request resolves', async () => {
        jest.spyOn(accountLandingHelper, 'fetchAllAccounts')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        const { result } = renderUseFetchAllAccounts(2020);

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.results).toEqual(mockParsed);
        expect(result.current.totalItems).toEqual(mockData.data.count);
    });

    it('omits keyword from the request params when no search string is given', () => {
        const fetchSpy = jest.spyOn(accountLandingHelper, 'fetchAllAccounts')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        renderUseFetchAllAccounts(2020);

        expect(fetchSpy.mock.calls[0][0]).not.toHaveProperty('keyword');
    });

    it('includes keyword in the request params when a search string is given', () => {
        const fetchSpy = jest.spyOn(accountLandingHelper, 'fetchAllAccounts')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        renderUseFetchAllAccounts(2020, 'defense');

        expect(fetchSpy.mock.calls[0][0].keyword).toEqual('defense');
    });

    it('exposes isError and empty results when the request fails', async () => {
        jest.spyOn(accountLandingHelper, 'fetchAllAccounts')
            .mockReturnValue({ promise: Promise.reject(new Error('network error')) });

        const { result } = renderUseFetchAllAccounts(2020);

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.results).toEqual([]);
        expect(result.current.totalItems).toEqual(0);
    });
});

// Why these cases specifically

// - The enabled: !!fy gate is the one real branch of custom logic in this hook — easy to silently break (e.g. if someone
// changes !!fy to !!page), so it gets its own explicit test rather than being implied by the happy path.
// - The conditional keyword param (if (keyword) params.keyword = keyword;) is the other branch — asserting on
// fetchSpy.mock.calls[0][0] directly checks the params object the hook builds, which is cheap and precise.
// - Parsed output vs. raw mockData confirms the BaseFederalAccountLandingRow.parse wiring inside the useMemo still produces
// the expected shape — this is exactly what the old (deleted) container test tried to check via parseAccounts, just now
// testable without mounting a component.
// - Skipped: asserting react-query's own caching/refetch-on-key-change behavior — that's library behavior, not something this
// hook adds, so testing it would mostly be testing @tanstack/react-query itself.
//     One naming note: jest.spyOn(accountLandingHelper, 'fetchAllAccounts') requires that import to be a live binding — since
// accountLandingHelper.js exports via export const fetchAllAccounts = ..., Babel's ESM transform makes this spyable the same
// way useStateData-test.js spies on apiRequest, so no jest.mock() boilerplate needed.
