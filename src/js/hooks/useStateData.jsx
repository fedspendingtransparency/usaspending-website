/**
 * useStateData.jsx
 * Created on 9/3/26 Nick Torres
 */

import { useQuery } from "@tanstack/react-query";
import { fetchStateList } from "../helpers/mapHelper";

const useStateData = () => {
    const { results } = useQuery({
        queryKey: ['fetchStateList'],
        queryFn: () => fetchStateList().promise,
        staleTime: Infinity
    })

    return { results };
}

export default useStateData;
