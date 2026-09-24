/**
 * useFetchDataFromHash.jsx
 * Created by Andrea Blackwell 09/23/26
 */

import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from 'react-redux';

import { fetchStateOverview } from 'apis/state';
import BaseStateProfile from "models/v2/state/BaseStateProfile";
import { setStateOverview } from 'redux/actions/state/stateActions';
import { restoreUrlHash, parseRemoteFilters } from "helpers/searchHelper";

export const useFetchDataFromHash = (hash) => {
    console.log("here1");

    const dispatch = useDispatch();
    const [hashError, setHashError] = useState(false);

    const parseFilters = useCallback((d) => {
        console.log("here2");
        const filtersInImmutableStructure = parseRemoteFilters(d.data.filter);

         if (filtersInImmutableStructure) {
             // apply the filters to both the staged and applied stores
             dispatch(restoreHashedFilters(filtersInImmutableStructure));
         }
         else {
             setHashError(true);
         }
    }, []);

    const { data, error, isLoading } = useQuery({
        queryKey: [`hash: ${hash}`],
        queryFn: () => restoreUrlHash({ hash: nlHash }).promise,
        select: parseFilters,
        enabled: !!hash
    });

    return { results: data, error, isLoading, hashError };

};

export default useFetchDataFromHash;
