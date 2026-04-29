/**
 * useFetchAwardBreakdown.jsx
 * Created by Andrea Blackwell 02/15/26
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { useQuery } from "@tanstack/react-query";
import { fetchAwardBreakdown } from 'apis/state';

export const useFetchAwardBreakdown = (id, fy) => {
    const {
        data, isSuccess, isLoading, error
    } = useQuery({
        queryKey: [`awardBreakdownStateProfile${id}${fy}`],
        queryFn: () => fetchAwardBreakdown(id, fy).promise,
        enabled: !!id,
        staleTime: 60000
    });

    return {
        data, isSuccess, isLoading, error
    };
};

export default useFetchAwardBreakdown;
