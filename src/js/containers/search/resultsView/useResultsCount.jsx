// eslint-disable-next-line no-unused-vars
import React from "react";
import { useQuery } from "@tanstack/react-query";

import { performSpendingByAwardTabCountSearch } from "helpers/searchHelper";
import SearchAwardsOperation from 'models/v1/search/SearchAwardsOperation';

const useResultsCount = (filters, spendingLevel) => {
    const searchFilters = new SearchAwardsOperation();
    searchFilters.fromState(filters);

    // if subawards is true, newAwardsOnly cannot be true, so we remove dateType for this request
    // also has to be done for the main request, in performSearch
    if (spendingLevel === "subAward" && searchFilters.dateType) {
        delete searchFilters.dateType;
    }

    const request = performSpendingByAwardTabCountSearch({
        filters: searchFilters.toParams(),
        spending_level: spendingLevel,
        auditTrail: 'Award Table - Tab Counts'
    });

    const {
        data, isSuccess, isLoading, error
    } = useQuery({
        queryKey: ['resultsCount', filters, spendingLevel],
        queryFn: () => request.promise,
        staleTime: 60000
    });

    const counts = data?.data ? data?.data.results : {};

    return {
        counts,
        isSuccessCount: isSuccess,
        isLoadingCount: isLoading,
        errorCount: error
    };
};

export default useResultsCount;
