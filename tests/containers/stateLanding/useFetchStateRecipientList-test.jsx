/**
 * @jest-environment jsdom
 */

import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as stateApi from 'apis/state';
import useFetchStateRecipientList from 'containers/stateLanding/useFetchStateRecipientList';
import { mockData, mockTotal } from './mockStateRecipientList';

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } }
    });

    // eslint-disable-next-line react/display-name,react/prop-types
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

const renderUseFetchStateRecipientList = (
    { sort = { field: 'name', direction: 'asc' }, searchString = '' } = {}
) =>
    renderHook(
        () => useFetchStateRecipientList(sort, searchString),
        { wrapper: createWrapper() }
    );

describe('useFetchStateRecipientList', () => {
    afterEach(() => jest.restoreAllMocks());

    it('returns an empty, loading state before the request resolves', () => {
        jest.spyOn(stateApi, 'fetchStateList')
            .mockReturnValue({ promise: new Promise(() => {}) });

        const { result } = renderUseFetchStateRecipientList();

        expect(result.current.loading).toBe(true);
        expect(result.current.results).toEqual([]);
        expect(result.current.resultsText).toEqual('0 results');
        expect(result.current.total).toEqual(0);
    });

    it('returns parsed results, result text, and the full dollar total once the request resolves', async () => {
        jest.spyOn(stateApi, 'fetchStateList')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        const { result } = renderUseFetchStateRecipientList();

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.results.map((item) => item.code)).toEqual(['AL', 'DC', 'TX', 'PR']);
        expect(result.current.total).toEqual(mockTotal);
        expect(result.current.resultsText).toEqual('4 results');
    });

    it('sorts territories ahead of states and districts when sorting by name descending', async () => {
        jest.spyOn(stateApi, 'fetchStateList')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        const { result } = renderUseFetchStateRecipientList({ sort: { field: 'name', direction: 'desc' } });

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.results.map((item) => item.code)).toEqual(['PR', 'TX', 'DC', 'AL']);
    });

    it('sorts by amount without separating states and territories', async () => {
        jest.spyOn(stateApi, 'fetchStateList')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        const { result } = renderUseFetchStateRecipientList({ sort: { field: '_amount', direction: 'desc' } });

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.results.map((item) => item.code)).toEqual(['TX', 'AL', 'PR', 'DC']);
    });

    it('filters results to those matching the search string', async () => {
        jest.spyOn(stateApi, 'fetchStateList')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        const { result } = renderUseFetchStateRecipientList({ searchString: 'Texas' });

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.results.map((item) => item.code)).toEqual(['TX']);
    });

    it('keeps the dollar total based on the full data set, unaffected by the search string', async () => {
        jest.spyOn(stateApi, 'fetchStateList')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        const { result } = renderUseFetchStateRecipientList({ searchString: 'Alabama' });

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.total).toEqual(mockTotal);
    });

    it('returns a result text for a singular result', async () => {
        jest.spyOn(stateApi, 'fetchStateList')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        const { result } = renderUseFetchStateRecipientList({ searchString: 'Puerto Rico' });

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.resultsText).toEqual('1 result');
    });

    it('returns an appropriate result, result text, and total for zero results after a successful fetch', async () => {
        jest.spyOn(stateApi, 'fetchStateList')
            .mockReturnValue({ promise: Promise.resolve(mockData) });

        const { result } = renderUseFetchStateRecipientList({ searchString: 'Nonexistent' });

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.results).toEqual([]);
        expect(result.current.resultsText).toEqual('0 results');
        expect(result.current.total).toEqual(mockTotal);
    });

    it('exposes error and empty results when the request fails', async () => {
        jest.spyOn(stateApi, 'fetchStateList')
            .mockReturnValue({ promise: Promise.reject(new Error('network error')) });

        const { result } = renderUseFetchStateRecipientList();

        await waitFor(() => expect(result.current.error).toBe(true));

        expect(result.current.results).toEqual([]);
        expect(result.current.resultsText).toEqual('0 results');
        expect(result.current.total).toEqual(0);
    });
});
