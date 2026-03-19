/**
 * useFetchOverview.jsx
 * Created by Andrea Blackwell 02/15/26
 */

import { useCallback, useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useQuery } from "@tanstack/react-query";
import { fetchStateOverview } from 'apis/state';
import BaseStateProfile from "models/v2/state/BaseStateProfile";

export const useFetchOverview = (stateId, fy) => {
    const [stateProfileData, setStateProfileData] = useState(null);

    const {
        data, isSuccess, isLoading, error
    } = useQuery({
        queryKey: ['stateProfileData'],
        queryFn: () => fetchStateOverview(stateId, fy).promise,
        staleTime: 60000
    });

    const loadStateOverview = useCallback((d) => {
        if (Object.keys(d).length === 0) {
            return;
        }
        const newStateProfile = Object.create(BaseStateProfile);
        newStateProfile.populate(d);
        setStateProfileData(newStateProfile);
    }, []);

    useEffect(() => {
        if (isSuccess && Object.keys(data?.data).length > 0) {
            loadStateOverview(data?.data);
        }
    }, [data, isSuccess]);

    return {
        stateProfileData, isSuccess, isLoading, error
    };
};

export default useFetchOverview;
