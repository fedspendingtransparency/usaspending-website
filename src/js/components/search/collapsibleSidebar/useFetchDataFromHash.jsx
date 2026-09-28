/**
 * useFetchDataFromHash.jsx
 * Created by Andrea Blackwell 09/23/26
 */

import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from 'react-redux';

import { fetchStateOverview } from 'apis/state';
import BaseStateProfile from "models/v2/state/BaseStateProfile";
import { setStateOverview } from 'redux/actions/state/stateActions';
import { restoreUrlHash, parseRemoteFilters } from "helpers/searchHelper";

export const useFetchDataFromHash = (nlHash) => {
//     const hash = '90e50821bf552b36f20c74de96262d27';
    const hash = nlHash;

    const dispatch = useDispatch();

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

    return { filterResults: data, hashError: error, loadResultsView: isLoading, loadResultsView: refetch, hashSuccess: isSuccess };

};

export default useFetchDataFromHash;
