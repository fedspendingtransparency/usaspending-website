/**
 * useFetchOverview.jsx
 * Created by Andrea Blackwell 02/15/26
 */

import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from 'react-redux';

import { fetchStateOverview } from 'apis/state';
import BaseStateProfile from "models/v2/state/BaseStateProfile";
import { setStateOverview } from 'redux/actions/state/stateActions';

export const useFetchOverview = (stateId, fy) => {
    const dispatch = useDispatch();

    console.log("hello");

    const loadStateOverview = useCallback((d) => {
        const data = d?.data;
        if (Object.keys(data).length === 0) {
            return;
        }
        const newStateProfile = Object.create(BaseStateProfile);
        newStateProfile.populate(data);
        dispatch(setStateOverview(newStateProfile));

        return newStateProfile;
    }, []);

    return useQuery({
        queryKey: [`stateProfileData${stateId}${fy}`],
        queryFn: () => fetchStateOverview(stateId, fy).promise,
        select: loadStateOverview,
        enabled: stateId && fy && !!stateId && !!fy,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });

};

export default useFetchOverview;
