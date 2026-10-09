/**
 * useFetchOverview.jsx
 * Created by Andrea Blackwell 02/15/26
 */

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from 'react-redux';

import { fetchStateOverview } from 'apis/state';
import BaseStateProfile from "models/v2/state/BaseStateProfile";
import { setStateOverview } from 'redux/actions/state/stateActions';

export const useFetchOverview = (stateId, fy) => {
    const dispatch = useDispatch();

    const { data, isLoading, error } = useQuery({
        queryKey: [`stateProfileData${stateId}${fy}`],
        queryFn: () => fetchStateOverview(stateId, fy).promise,
        enabled: !!stateId && !!fy,
        refetchOnWindowFocus: false,
        staleTime: Infinity
    });

    useEffect(() => {
        const overviewData = data?.data;
        if (!overviewData || Object.keys(overviewData).length === 0) {
            return;
        }
        const newStateProfile = Object.create(BaseStateProfile);
        newStateProfile.populate(overviewData);
        dispatch(setStateOverview(newStateProfile));
    }, [data, dispatch]);

    return { isLoading, error };
};

export default useFetchOverview;
