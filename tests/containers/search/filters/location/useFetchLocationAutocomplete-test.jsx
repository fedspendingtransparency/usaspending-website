/**
 * @jest-environment jsdom
 *
 * useFetchLocationAutocomplete-test.jsx
 * Created by JD House 11/10/2026
 *
 */

import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import useFetchLocationAutocomplete from 'containers/search/filters/location/useFetchLocationAutocomplete';
import { fetchLocations } from 'helpers/searchHelper';
import { getParsedLocations } from 'helpers/search/locationAutocompleteHelper';

jest.mock('helpers/searchHelper', () => ({
    fetchLocations: jest.fn()
}));

jest.mock('helpers/search/locationAutocompleteHelper', () => ({
    getParsedLocations: jest.fn()
}));

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } }
    });

    // eslint-disable-next-line react/display-name,react/prop-types
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

const mockResponse = (data) => ({
    promise: Promise.resolve({ data }),
    cancel: jest.fn()
});

const mockData = {
    count: 2,
    results: {
        countries: ['c'],
        states: ['s'],
        counties: ['co'],
        cities: ['ci'],
        zip_codes: ['z'],
        districts_current: ['dc'],
        districts_original: ['do']
    }
};

const renderUseFetch = (searchText) =>
    renderHook(() => useFetchLocationAutocomplete(searchText), { wrapper: createWrapper() });

describe('useFetchLocationAutocomplete', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        getParsedLocations.mockReturnValue([{ id: 1 }, { id: 2 }]);
    });

    it('does not fetch when the search text is shorter than 3 characters', () => {
        const { result } = renderUseFetch('ab');

        expect(fetchLocations).not.toHaveBeenCalled();
        expect(result.current.locations).toEqual([]);
        expect(result.current.noResults).toBe(false);
        expect(result.current.isLoading).toBe(false);
    });

    it('fetches with search_text and limit once the text is 3+ characters', async () => {
        fetchLocations.mockReturnValue(mockResponse(mockData));

        const { result } = renderUseFetch('abc');

        await waitFor(() => expect(result.current.locations.length).toBe(2));
        expect(fetchLocations).toHaveBeenCalledWith({ search_text: 'abc', limit: 5 });
    });

    it('reports isLoading while the request is pending', () => {
        fetchLocations.mockReturnValue({ promise: new Promise(() => {}), cancel: jest.fn() });

        const { result } = renderUseFetch('abc');

        expect(result.current.isLoading).toBe(true);
        expect(result.current.locations).toEqual([]);
        expect(result.current.noResults).toBe(false);
    });

    it('passes the response result lists to getParsedLocations in order', async () => {
        fetchLocations.mockReturnValue(mockResponse(mockData));

        const { result } = renderUseFetch('abc');

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(getParsedLocations).toHaveBeenCalledWith(
            ['c'], ['s'], ['co'], ['ci'], ['z'], ['dc'], ['do']
        );
    });

    it('limits parsed locations to 5', async () => {
        getParsedLocations.mockReturnValue([1, 2, 3, 4, 5, 6, 7].map((id) => ({ id })));
        fetchLocations.mockReturnValue(mockResponse(mockData));

        const { result } = renderUseFetch('abc');

        await waitFor(() => expect(result.current.locations.length).toBe(5));
        expect(result.current.locations.map((l) => l.id)).toEqual([1, 2, 3, 4, 5]);
    });

    it('sets noResults and returns no locations when count is 0', async () => {
        fetchLocations.mockReturnValue(mockResponse({ count: 0, results: {} }));

        const { result } = renderUseFetch('abc');

        await waitFor(() => expect(result.current.noResults).toBe(true));
        expect(result.current.locations).toEqual([]);
        expect(getParsedLocations).not.toHaveBeenCalled();
    });

    it('sets noResults and logs the error when the request fails', async () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
        const failure = new Error('boom');
        fetchLocations.mockReturnValue({ promise: Promise.reject(failure), cancel: jest.fn() });

        const { result } = renderUseFetch('abc');

        await waitFor(() => expect(result.current.noResults).toBe(true));
        expect(result.current.locations).toEqual([]);
        expect(consoleError).toHaveBeenCalledWith(failure);
        consoleError.mockRestore();
    });

    it('returns no locations when the response has no results object', async () => {
        fetchLocations.mockReturnValue(mockResponse({ count: 2 }));

        const { result } = renderUseFetch('abc');

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.locations).toEqual([]);
        expect(getParsedLocations).not.toHaveBeenCalled();
    });

    it('clears locations when the search text shrinks below 3 characters', async () => {
        fetchLocations.mockReturnValue(mockResponse(mockData));

        const wrapper = createWrapper();
        const { result, rerender } = renderHook(
            ({ text }) => useFetchLocationAutocomplete(text),
            { wrapper, initialProps: { text: 'abc' } }
        );

        await waitFor(() => expect(result.current.locations.length).toBe(2));

        rerender({ text: 'ab' });

        expect(result.current.locations).toEqual([]);
        expect(result.current.noResults).toBe(false);
        expect(result.current.isLoading).toBe(false);
    });

    it('keeps the previous locations while a new term is loading', async () => {
        fetchLocations.mockReturnValueOnce(mockResponse(mockData));

        const { result, rerender } = renderHook(
            ({ text }) => useFetchLocationAutocomplete(text),
            { wrapper: createWrapper(), initialProps: { text: 'abc' } }
        );
        await waitFor(() => expect(result.current.locations.length).toBe(2));

        fetchLocations.mockReturnValueOnce({ promise: new Promise(() => {}), cancel: jest.fn() });
        rerender({ text: 'abcd' });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.locations.length).toBe(2);
    });

    it('cancels the request when the query is aborted', async () => {
        const cancel = jest.fn();
        fetchLocations.mockReturnValue({ promise: new Promise(() => {}), cancel });

        const { unmount } = renderUseFetch('abc');
        await waitFor(() => expect(fetchLocations).toHaveBeenCalled());
        unmount();

        await waitFor(() => expect(cancel).toHaveBeenCalled());
    });
});
