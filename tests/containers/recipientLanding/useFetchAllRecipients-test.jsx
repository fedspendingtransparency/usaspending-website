/**
 * @jest-environment jsdom
 */

import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as recipientLandingHelper from 'helpers/recipientLandingHelper';
import useFetchAllRecipients from 'containers/recipientLanding/useFetchAllRecipients';
import { mockData, mockParsed, mockTotal } from './mockAllRecipients';

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } }
    });

    // eslint-disable-next-line react/display-name,react/prop-types
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

const renderUseFetchAllRecipients = ({
    order = 'desc', sort = 'amount', page = 1, limit = 50, awardType, keyword = ''
} = {}) =>
    renderHook(
        () => useFetchAllRecipients({ order, sort, page, limit, awardType, keyword }),
        { wrapper: createWrapper() }
    );

describe('useFetchAllRecipients', () => {
    afterEach(() => jest.restoreAllMocks());

    it('returns an empty, loading state before the request resolves', () => {
        jest.spyOn(recipientLandingHelper, 'fetchAllRecipients')
            .mockReturnValue({ promise: new Promise(() => {}) });

        const { result } = renderUseFetchAllRecipients();

        expect(result.current.loading).toBe(true);
        expect(result.current.results).toEqual([]);
        expect(result.current.totalItems).toEqual(0);
    });

    it('returns parsed, filtered results once the request resolves', async () => {
        jest.spyOn(recipientLandingHelper, 'fetchAllRecipients')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        const { result } = renderUseFetchAllRecipients();

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.results).toEqual(mockParsed);
    });

    it('reports totalItems from the raw server total, even though a row was filtered out of results', async () => {
        jest.spyOn(recipientLandingHelper, 'fetchAllRecipients')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        const { result } = renderUseFetchAllRecipients();

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.totalItems).toEqual(mockTotal);
        expect(result.current.results.length).toEqual(3);
    });

    it('drops a result whose duns and name are both unset', async () => {
        jest.spyOn(recipientLandingHelper, 'fetchAllRecipients')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        const { result } = renderUseFetchAllRecipients();

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.results.map((recipient) => recipient.id)).not.toContain('R3');
    });

    it('keeps a result when only one of duns/name is unset', async () => {
        jest.spyOn(recipientLandingHelper, 'fetchAllRecipients')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        const { result } = renderUseFetchAllRecipients();

        await waitFor(() => expect(result.current.loading).toBe(false));

        const kept = result.current.results.find((recipient) => recipient.id === 'R4');
        expect(kept).toBeDefined();
        expect(kept.duns).toEqual('DUNS not provided');
    });

    it('builds the request params from order, sort, page, limit, and awardType', () => {
        const fetchSpy = jest.spyOn(recipientLandingHelper, 'fetchAllRecipients')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        renderUseFetchAllRecipients({ awardType: ['contracts'] });

        expect(fetchSpy.mock.calls[0][0]).toEqual({
            order: 'desc',
            sort: 'amount',
            page: 1,
            limit: 50,
            award_type: ['contracts']
        });
    });

    it('omits keyword from the request params when no search string is given', () => {
        const fetchSpy = jest.spyOn(recipientLandingHelper, 'fetchAllRecipients')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        renderUseFetchAllRecipients();

        expect(fetchSpy.mock.calls[0][0]).not.toHaveProperty('keyword');
    });

    it('includes keyword in the request params when a search string is given', () => {
        const fetchSpy = jest.spyOn(recipientLandingHelper, 'fetchAllRecipients')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        renderUseFetchAllRecipients({ keyword: 'alpha' });

        expect(fetchSpy.mock.calls[0][0].keyword).toEqual('alpha');
    });

    it('exposes error and empty results when the request fails', async () => {
        jest.spyOn(recipientLandingHelper, 'fetchAllRecipients')
            .mockReturnValue({ promise: Promise.reject(new Error('network error')) });

        const { result } = renderUseFetchAllRecipients();

        await waitFor(() => expect(result.current.error).toBe(true));

        expect(result.current.results).toEqual([]);
        expect(result.current.totalItems).toEqual(0);
    });
});
