/**
 * useFetchCheckboxTree.jsx
 * Created by JD House 11/05/2026
*/

import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

/**
 * Generic TanStack Query hook for lazily-loaded checkbox trees (TAS, PSC, ...).
 *
 * @param {Object} config
 * @param {string} config.queryKeyPrefix - first segment of the query key, e.g. 'tas'
 * @param {Function} config.fetchFn - helper returning `{ promise, cancel }` (see apiRequest)
 * @param {Function} config.cleanFn - module-level function shaping `results` into tree nodes
 * @param {string} [config.queryParam] - id path or search query string; the query is
 *   disabled while undefined
 * @param {boolean} [config.isSearch] - whether queryParam is a search request
 * @param {boolean} [config.enabled]
 */
export const useFetchCheckboxTree = ({
    queryKeyPrefix, fetchFn, cleanFn, queryParam, isSearch, enabled = true
}) => {
    const [noResults, setNoResults] = useState(false);

    // select should never do anything but shape the response, since it runs
    // synchronously as part of React's render
    const select = useCallback((res) => cleanFn(res.data.results), [cleanFn]);

    const {
        data: nodes, isSuccess, isLoading, isError, error
    } = useQuery({
        queryKey: [queryKeyPrefix, queryParam],
        queryFn: () => fetchFn(queryParam).promise,
        select,
        enabled: enabled && queryParam !== undefined
    });

    // intentional: derive noResults after render commits (never during it,
    // since select runs synchronously as part of render) in response to the
    // query settling or being disabled
    useEffect(() => {
        if (!enabled) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setNoResults(false);
            return;
        }
        if (isSuccess) setNoResults(!!isSearch && nodes.length === 0);
    }, [enabled, isSuccess, nodes, isSearch]);

    useEffect(() => {
        if (isError) console.log(`error fetching ${queryKeyPrefix}`, error);
    }, [isError, error, queryKeyPrefix]);

    return { nodes, noResults, isSuccess, isLoading, isError, error };
};

export default useFetchCheckboxTree;
