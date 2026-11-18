/**
 * useGenerateSearchHash.jsx
 */

import { useCallback, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { isCancel } from 'axios';
import { generateUrlHash } from 'helpers/searchHelper';

/* Counterpart to useFetchSearchFilters: saves a set of filters and returns the hash that restores them */
const useGenerateSearchHash = ({ onSuccess, onError } = {}) => {
    const cancelRef = useRef(null);

    const postFilters = useCallback(({ filters, version }) => {
        const { promise, cancel } = generateUrlHash({ filters, version });
        cancelRef.current = cancel;
        return promise;
    }, []);

    const { mutate, isPending } = useMutation({
        mutationKey: ['generate-search-hash'],
        mutationFn: postFilters,
        onSuccess: (res) => onSuccess?.(res.data.hash),
        onError: (err) => {
            if (!isCancel(err)) onError?.(err);
        }
    });

    // mutations have no abort signal, so cancel the request on unmount so a late
    // response can't fire onSuccess (e.g. navigate) after the caller is gone
    useEffect(() => () => cancelRef.current?.(), []);

    // generateHash({ filters, version })
    return { generateHash: mutate, isGenerating: isPending };
};

export default useGenerateSearchHash;
