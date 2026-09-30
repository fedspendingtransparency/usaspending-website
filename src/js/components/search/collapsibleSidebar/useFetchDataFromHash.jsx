/**
 * useFetchDataFromHash.jsx
 * Created by Andrea Blackwell 09/23/26
 */

import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

import { restoreUrlHash, parseRemoteFilters } from "helpers/searchHelper";

export const useFetchDataFromHash = (nlHash) => {
    const hash = nlHash;

    const parseFilters = useCallback((d) => {
        const filtersInImmutableStructure = parseRemoteFilters(d.data.filter);
        if (Object.keys(filtersInImmutableStructure).length > 0) {
            return filtersInImmutableStructure;
        }
        else {
            return {};
        }
    }, []);

    const { data, error, isLoading, refetch, isSuccess } = useQuery({
        queryKey: [`hash-${hash}`],
        queryFn: () => restoreUrlHash({ hash: hash }).promise,
        enabled: false,
        select: parseFilters
    });

    return { filterResults: data, hashError: error, isLoadingFilters: isLoading, loadResultsView: refetch, hashSuccess: isSuccess };

};

export default useFetchDataFromHash;
