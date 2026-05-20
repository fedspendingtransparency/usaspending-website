/**
 * useFetchBreakdown.jsx
 * Created by Josue Aguilar on 05/07/2026
 */

import { useEffect, useState } from "react";
import { fetchBreakdown } from "helpers/explorerHelper";
import { useQuery } from "@tanstack/react-query";

const selectRandomIndex = () => Math.floor(Math.random() * 10);

const useFetchBreakdown = (params) => {
    const [randomIndex, setRandomIndex] = useState(0);

    const fy = params.filters?.fy;
    const period = params.filters?.period;

    const { data: res, isLoading, error } = useQuery({
        queryKey: ['fetchBreakdown', fy, period, params],
        queryFn: () => fetchBreakdown(params).promise,
        enabled: !!fy && !!period,
        staleTime: 60000,
        refetchOnWindowFocus: false
    });

    const data = res?.data || { results: [] };
    const total = data?.total || [];

    useEffect(() => {
        if (data) setRandomIndex(selectRandomIndex());
    }, [data]);

    return {
        data, total, randomIndex, error, loading: isLoading
    };
};

export default useFetchBreakdown;
