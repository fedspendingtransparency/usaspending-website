/**
 * useFetchOverview.jsx
 * Created by Andrea Blackwell 02/15/26
 */

import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStateOverview } from '../../../apis/state';
import BaseStateProfile from "../../../models/v2/state/BaseStateProfile";

export const useFetchOverview = (stateId, fy) => {
    const loadStateOverview = useCallback((d) => {
        if (Object.keys(d?.data).length === 0) {
            return;
        }
        const newStateProfile = Object.create(BaseStateProfile);
        newStateProfile.populate(d.data);
        return newStateProfile;
    }, []);

    const {
        data, isSuccess, isLoading, error
    } = useQuery({
        queryKey: [`stateProfileData${stateId}${fy}`],
        queryFn: () => fetchStateOverview(stateId, fy).promise,
        select: loadStateOverview,
        enabled: !!stateId && !!fy,
        staleTime: Infinity,
        refetchOnWindowRefocus: false
    });

    return {
        stateProfileData: data, isSuccess, isLoading, error
    };
};

export default useFetchOverview;
