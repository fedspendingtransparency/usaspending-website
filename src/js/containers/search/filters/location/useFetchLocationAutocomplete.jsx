/**
 * useFetchLocationAutocomplete.jsx
 * Created by JD House 11/10/2026
 */

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchLocations } from '../../../../helpers/searchHelper';
import { getParsedLocations } from '../../../../helpers/search/locationAutocompleteHelper';

const MIN_SEARCH_LENGTH = 3;
const LIMIT = 5;

const useFetchLocationAutocomplete = (searchText) => {
    const enabled = searchText.length >= MIN_SEARCH_LENGTH;

    const { data, isFetching } = useQuery({
        queryKey: ['locationAutocomplete', searchText],
        queryFn: ({ signal }) => {
            const request = fetchLocations({ search_text: searchText, limit: LIMIT });
            signal?.addEventListener('abort', () => request.cancel());
            return request.promise.then((res) => res.data);
        },
        enabled
    });

    const noResults = enabled && !isFetching && data?.count === 0;

    const locations = useMemo(() => {
        if (!enabled || !data || data.count === 0) return [];
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
