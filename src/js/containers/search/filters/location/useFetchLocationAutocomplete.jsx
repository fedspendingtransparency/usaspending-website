/**
 * useFetchLocationAutocomplete.jsx
 * Created by JD House 11/10/2026
 */

import { useEffect, useMemo } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchLocations } from '../../../../helpers/searchHelper';
import { getParsedLocations } from '../../../../helpers/search/locationAutocompleteHelper';

const MIN_SEARCH_LENGTH = 3;
const LIMIT = 5;

const useFetchLocationAutocomplete = (searchText) => {
    const enabled = searchText.length >= MIN_SEARCH_LENGTH;

    const { data, isFetching, isError, error } = useQuery({
        queryKey: ['locationAutocomplete', searchText],
        queryFn: ({ signal }) => {
            const request = fetchLocations({ search_text: searchText, limit: LIMIT });
            signal?.addEventListener('abort', () => request.cancel(), { once: true });
            return request.promise.then((res) => res.data);
        },
        enabled,
        retry: false,
        // keep the previous suggestions while a new term loads, and treat results as fresh so
        // revisiting a cached term doesn't show stale items while it refetches
        placeholderData: keepPreviousData,
        staleTime: 60 * 1000
    });

    useEffect(() => {
        if (isError) console.error(error);
    }, [isError, error]);

    // treat a failed request like an empty result so the user isn't left with a blank dropdown
    const noResults = enabled && !isFetching && (isError || data?.count === 0);

    const locations = useMemo(() => {
        if (!enabled || !data || data.count === 0 || !data.results) return [];
        const {
            countries,
            states,
            counties,
            cities,
            zip_codes: zipCodes,
            districts_current: districtsCurrent,
            districts_original: districtsOriginal
        } = data.results;
        return getParsedLocations(
            countries,
            states,
            counties,
            cities,
            zipCodes,
            districtsCurrent,
            districtsOriginal
        ).slice(0, LIMIT);
    }, [data, enabled]);

    return {
        locations,
        noResults,
        isLoading: isFetching
    };
};

export default useFetchLocationAutocomplete;
