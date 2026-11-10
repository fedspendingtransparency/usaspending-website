/**
 * useFetchSearchFilters.jsx
 * Created by Trey Morgan 11/5/2026
 */

import { useQuery } from '@tanstack/react-query';
import { restoreUrlHash, parseRemoteFilters } from 'helpers/searchHelper';

// Stable reference so tanstack query does not re-run select on every render
const parseFilters = (res) => parseRemoteFilters(res.data.filter);

const fetchFilters = (hash) => ({ signal }) => {
    const { promise, cancel } = restoreUrlHash({ hash });
    // apiRequest uses axios cancel tokens; tie tanstack query AbortSignal to it
    signal?.addEventListener('abort', cancel);
    return promise;
};

const useFetchSearchFilters = (hash, enabled = true) => {
    const { data, error, isLoading, isSuccess } = useQuery({
        queryKey: ['search-filters-from-hash', hash],
        queryFn: fetchFilters(hash),
        enabled: Boolean(hash) && enabled,
        staleTime: Infinity, // a hash always maps to the same saved filters so there is never a need to refetch
        retry: false,
        select: parseFilters
    });

    return {
        filters: data,
        isCorrupt: isSuccess && !data,
        error,
        isLoading,
        isSuccess
    };
};

export default useFetchSearchFilters;
