/**
 * useFetchSpendingByGeography.jsx
 * Created by JD House 10/21/2026
 */

import { useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import { performSpendingByGeographySearch } from 'apis/search';

export const apiScopes = {
    country: 'country',
    state: 'state',
    county: 'county',
    congressionalDistrict: 'district'
};

// stable reference so memoized consumers don't recompute while there is no data
const emptyResults = [];

// TODO: replace getSpendingLevel with just spendingLevel once ready to release transactions
const getSpendingLevel = (spendingLevel) => {
    if (spendingLevel === 'subawards') {
        return spendingLevel;
    }
    return 'transactions';
};

const buildApiParams = (scope, mapLayer, geoLayerFilters, reduxFilters, spendingLevel) => {
    // build a new search operation from the Redux state, but create a transaction-based search
    // operation instead of an award-based one
    const operation = new SearchAwardsOperation();
    operation.fromState(reduxFilters);

    // if subawards is true, newAwardsOnly cannot be true, so we remove
    // dateType for this request
    if (spendingLevel === 'subawards' && operation.dateType) {
        delete operation.dateType;
    }

    return {
        scope,
        geo_layer: apiScopes[mapLayer],
        geo_layer_filters: geoLayerFilters,
        filters: operation.toParams(),
        auditTrail: 'Map Visualization',
        spending_level: getSpendingLevel(spendingLevel)
    };
};

/**
 * @param {boolean} enabled - whether the caller is ready for a request (e.g. filters applied, map measured)
 */
const useFetchSpendingByGeography = (
    scope,
    mapLayer,
    geoLayerFilters,
    reduxFilters,
    spendingLevel,
    visibleEntities,
    setAppliedFilterCompletion,
    enabled = true
) => {
    // if no entities are visible, don't make an API request because nothing in the US is visible
    const hasVisibleEntities = visibleEntities.length > 0;
    const noData = enabled && !hasVisibleEntities;

    const {
        data, isSuccess, isError, isFetching, isPlaceholderData
    } = useQuery({
        queryKey: [
            'spendingByGeography', scope, mapLayer, geoLayerFilters, reduxFilters, spendingLevel, visibleEntities
        ],
        queryFn: ({ signal }) => {
            const request = performSpendingByGeographySearch(
                buildApiParams(scope, mapLayer, geoLayerFilters, reduxFilters, spendingLevel)
            );
            // cancel the in-flight axios request when a newer query supersedes this one
            signal?.addEventListener('abort', () => request.cancel());
            return request.promise;
        },
        enabled: enabled && hasVisibleEntities,
        // keep showing the last results while a new viewport/filter set loads
        placeholderData: keepPreviousData,
        retry: false
    });

    useEffect(() => {
        if (isFetching) {
            setAppliedFilterCompletion(false);
        }
        else if (isSuccess || isError) {
            setAppliedFilterCompletion(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching, isSuccess, isError]);

    return {
        rawAPIData: data?.data.results ?? emptyResults,
        loading: !noData && !isError && (!isSuccess || isPlaceholderData),
        error: isError,
        noData
    };
};

export default useFetchSpendingByGeography;
