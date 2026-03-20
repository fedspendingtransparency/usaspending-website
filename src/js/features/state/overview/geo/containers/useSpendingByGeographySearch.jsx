/**
 * useSpendingByGeographySearch.jsx
 * Created by Andrea Blackwell 03/05/26
 */

import { useCallback, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import BaseStateProfile from "models/v2/state/BaseStateProfile";
import { performSpendingByGeographySearch } from "helpers/searchHelper";

export const useFetchOverview = (params) => {
    const [stateProfileData, setStateProfileData] = useState(null);

    const {
        data, isSuccess, isLoading, error
    } = useQuery({
        queryKey: ['stateProfileData'],
        queryFn: () => performSpendingByGeographySearch(params).promise,
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
    }, [data, isSuccess, loadStateOverview]);

    return {
        stateProfileData, isSuccess, isLoading, error
    };
};

export default useFetchOverview;
