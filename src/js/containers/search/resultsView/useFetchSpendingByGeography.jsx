import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { isCancel } from 'axios';

import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';
import { performSpendingByGeographySearch } from 'apis/search';

export const apiScopes = {
    country: 'country',
    state: 'state',
    county: 'county',
    congressionalDistrict: 'district'
};

// TODO: replace getSpendingLevel with just spendingLevel once ready to release transactions
const getSpendingLevel = (spendingLevel) => {
    if (spendingLevel === 'subawards') {
        return spendingLevel;
    }
    return 'transactions';
};

const useFetchSpendingByGeography = (
    scope,
    mapLayer,
    geoLayerFilters,
    reduxFilters,
    spendingLevel,
    visibleEntities,
    setAppliedFilterCompletion
) => {
    // the in-flight request handle has to live outside render state so a newer
    // fetch can cancel a slower, older one before it resolves
    const apiRequestRef = useRef(null);
    // only true once a fetch was actually attempted and found nothing visible -
    // the mutation itself has no notion of "we chose not to fetch"
    const [noData, setNoData] = useState(false);

    const geographySearchMutation = useMutation({
        mutationFn: (apiParams) => {
            if (apiRequestRef.current) {
                apiRequestRef.current.cancel();
            }

            apiRequestRef.current = performSpendingByGeographySearch(apiParams);
            return apiRequestRef.current.promise;
        },
        onSuccess: () => {
            apiRequestRef.current = null;
        },
        onError: (err) => {
            if (!isCancel(err)) {
                console.log(err);
                apiRequestRef.current = null;

                setAppliedFilterCompletion(true);
            }
        }
    });

    const fetchData = () => {
        // if no entities are visible, don't make an API request because nothing in the US is visible
        if (visibleEntities.length === 0) {
            setNoData(true);
            return;
        }

        // build a new search operation from the Redux state, but create a transaction-based search
        // operation instead of an award-based one
        const operation = new SearchAwardsOperation();
        operation.fromState(reduxFilters);

        // if subawards is true, newAwardsOnly cannot be true, so we remove
        // dateType for this request
        if (spendingLevel === 'subawards' && operation.dateType) {
            delete operation.dateType;
        }

        const searchParams = operation.toParams();

        // generate the API parameters
        const apiParams = {
            scope,
            geo_layer: apiScopes[mapLayer],
            geo_layer_filters: geoLayerFilters,
            filters: searchParams,
            auditTrail: 'Map Visualization',
            spending_level: getSpendingLevel(spendingLevel)
        };

        setAppliedFilterCompletion(false);
        geographySearchMutation.mutate(apiParams);
    };

    return {
        rawAPIData: geographySearchMutation.data?.data.results ?? [],
        hasFetched: geographySearchMutation.isSuccess,
        loading: !noData && !geographySearchMutation.isSuccess && !geographySearchMutation.isError,
        error: geographySearchMutation.isError,
        noData,
        fetchData
    };
};

export default useFetchSpendingByGeography;
