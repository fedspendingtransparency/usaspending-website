/**
 * useOverview.jsx
 * Created by Andrea Blackwell 02/15/26
 */

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStateOverview } from '../stateHelper';

export const useOverview = ({ stateId, fy }) => {
    const {
        data, isSuccess, isLoading, error
    } = useQuery({
        queryKey: ['glossarySearchResults'],
        queryFn: () => fetchStateOverview(stateId, fy).promise,
        staleTime: 60000
    });
    return {
        data, isSuccess, isLoading, error
    };
};
