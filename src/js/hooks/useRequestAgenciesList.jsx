import { useQuery } from "@tanstack/react-query";
import { requestAgenciesList } from "../helpers/bulkDownloadHelper";

// TODO: replace the requestAgenciesList calls in
//      * AwardDataContainer.jsx
//      * AccountDataContainer.jsx

const useRequestAgenciesList = (type, agency = 0) => {
    const { data, isSuccess, isLoading, error } = useQuery({
        queryKey: ['requestAgenciesList', type, agency],
        queryFn: () => requestAgenciesList({ type, agency }).promise,
        staleTime: Infinity
    })

    return { data, isSuccess, isLoading, error }
}

export default useRequestAgenciesList;
