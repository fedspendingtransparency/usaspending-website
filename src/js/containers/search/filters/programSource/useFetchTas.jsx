import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTas } from 'helpers/searchHelper';
import { cleanTasData } from 'helpers/tasHelper';

// module-level and side-effect-free: select should never do anything but
// shape the response, since it runs synchronously as part of React's render
const parseTasData = (res) => cleanTasData(res.data.results);

export const useFetchTas = (queryParam, isSearch, enabled = true) => {
    const [noResults, setNoResults] = useState(false);

    const {
        data: tasNodes, isSuccess, isLoading, isError, error
    } = useQuery({
        queryKey: ['tas', queryParam],
        queryFn: () => fetchTas(queryParam).promise,
        select: parseTasData,
        enabled: enabled && queryParam !== undefined
    });

    // derive noResults after render commits, never during it
    useEffect(() => {
        if (!enabled) {
            setNoResults(false);
            return;
        }
        if (isSuccess) setNoResults(!!isSearch && tasNodes.length === 0);
    }, [enabled, isSuccess, tasNodes, isSearch]);

    useEffect(() => {
        if (isError) console.log('error fetching TAS', error);
    }, [isError, error]);

    return { tasNodes, noResults, isSuccess, isLoading, isError, error };
};

export default useFetchTas;
