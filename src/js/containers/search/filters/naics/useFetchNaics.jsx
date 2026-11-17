/**
 * useFetchNaics.jsx
 * Created by JD House 11/09/2026
*/

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { naicsRequest } from 'helpers/searchHelper';
import { cleanNaicsData } from 'helpers/naicsHelper';

// pure: select only shapes the response
const parseNaicsData = (res) => cleanNaicsData(res.data.results);

export const useFetchNaics = (queryParam, isSearch, enabled = true) => {
    const {
        data: naicsNodes, isSuccess, isLoading, isError, error
    } = useQuery({
        queryKey: ['naics', queryParam],
        queryFn: () => naicsRequest(queryParam).promise,
        select: parseNaicsData,
        enabled: enabled && queryParam !== undefined
    });

    const noResults = enabled && isSuccess && !!isSearch && naicsNodes?.length === 0;

    useEffect(() => {
        if (isError) console.log('error fetching NAICS', error);
    }, [isError, error]);

    return { naicsNodes, noResults, isSuccess, isLoading, isError, error };
};

export default useFetchNaics;
