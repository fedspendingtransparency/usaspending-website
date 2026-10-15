/**
 * @jest-environment jsdom
 */

import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as redux from 'react-redux';

import * as agencyLandingHelper from 'helpers/agencyLandingHelper';
import useFetchAllAgencies from 'containers/agencyLanding/useFetchAllAgencies';
import { mockData, mockPopulated } from './mockToptierAgencies';

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } }
    });

    // eslint-disable-next-line react/display-name,react/prop-types
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

const renderUseFetchAllAgencies = (searchString = '') =>
    renderHook(
        () => useFetchAllAgencies(searchString),
        { wrapper: createWrapper() }
    );

describe('useFetchAllAgencies', () => {
    beforeEach(() => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValue({ field: 'percentage_of_total_budget_authority', direction: 'desc' });
    });

    afterEach(() => jest.restoreAllMocks());

    it('returns an empty, loading state before the request resolves', () => {
        jest.spyOn(agencyLandingHelper, 'fetchAllAgencies')
            .mockReturnValue({ promise: new Promise(() => {}) });

        const { result } = renderUseFetchAllAgencies();

        expect(result.current.isLoading).toBe(true);
        expect(result.current.results).toEqual([]);
        expect(result.current.resultsText).toEqual('0 results');
    });

    it('returns parsed, formatted results and resultsText once the request resolves', async () => {
        jest.spyOn(agencyLandingHelper, 'fetchAllAgencies')
            .mockReturnValue({ promise: Promise.resolve({ data: mockData }) });

        const { result } = renderUseFetchAllAgencies();

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.results).toEqual(mockPopulated);
        expect(result.current.resultsText).toEqual('3 results');
    });

    it('uses singular resultsText when exactly one result is returned', async () => {
        jest.spyOn(agencyLandingHelper, 'fetchAllAgencies')
            .mockReturnValue({ promise: Promise.resolve({ data: { results: [mockData.results[0]] } }) });

        const { result } = renderUseFetchAllAgencies();

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.resultsText).toEqual('1 result');
    });

    it('sorts results according to the field/direction provided by redux', async () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValue({ field: 'budget_authority_amount', direction: 'asc' });
        jest.spyOn(agencyLandingHelper, 'fetchAllAgencies')
            .mockReturnValue({ promise: Promise.resolve({ data: mockData }) });

        const { result } = renderUseFetchAllAgencies();

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.results.map((agency) => agency.agency_id)).toEqual([3, 1, 2]);
    });

    it('filters results to those matching the search string', async () => {
        jest.spyOn(agencyLandingHelper, 'fetchAllAgencies')
            .mockReturnValue({ promise: Promise.resolve({ data: mockData }) });

        const { result } = renderUseFetchAllAgencies('Agency 2');

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.results.map((agency) => agency.agency_id)).toEqual([2]);
    });

    it('omits the parenthetical abbreviation when abbreviation is null', async () => {
        const item = { ...mockData.results[0], abbreviation: null };
        jest.spyOn(agencyLandingHelper, 'fetchAllAgencies')
            .mockReturnValue({ promise: Promise.resolve({ data: { results: [item] } }) });

        const { result } = renderUseFetchAllAgencies();

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.results[0].agency_name).toEqual('Agency 1');
        expect(result.current.results[0].display.agency_name).toEqual('Agency 1');
    });

    it('falls back to not available when the congressional justification url is invalid', async () => {
        const item = { ...mockData.results[0], congressional_justification_url: 'not-a-url' };
        jest.spyOn(agencyLandingHelper, 'fetchAllAgencies')
            .mockReturnValue({ promise: Promise.resolve({ data: { results: [item] } }) });

        const { result } = renderUseFetchAllAgencies();

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.results[0].display.congressional_justification_url).toEqual('not available');
    });
});
