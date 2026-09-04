// eslint-disable-next-line no-unused-vars
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { areFiltersEqual, performSpendingByAwardTabCountSearch } from "helpers/searchHelper";
import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';

const useResultsCount = (filters, spendingLevel, hash) => {
    const filtersParamsTemp = new SearchAwardsOperation();

    filtersParamsTemp.fromState(filters);

    // if subawards is true, newAwardsOnly cannot be true, so we remove dateType
    if (spendingLevel === 'subawards') {
        delete filtersParamsTemp.dateType;
    }

    const filtersParams = filtersParamsTemp.toParams();

    const { data, error, isLoading } = useQuery({
        queryKey: ['performSpendingByAwardTabCountSearch', filtersParams, spendingLevel],
        queryFn: () => performSpendingByAwardTabCountSearch({
            filters: filtersParams,
            spending_level: spendingLevel,
            auditTrail: 'Results View - Tab Counts'
        }).promise,
        staleTime: 60000,
        refetchOnWindowFocus: false,
        enabled: !areFiltersEqual(filters) || !hash
    });

    return { data, error, isLoading };
};

export default useResultsCount;
