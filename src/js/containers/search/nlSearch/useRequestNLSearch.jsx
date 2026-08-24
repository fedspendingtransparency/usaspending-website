import { useQuery } from "@tanstack/react-query";
import { fetchNLSearch } from "../../../apis/search";

const useRequestNLSearch = (prompt) => {
    const chatQueryOptions = queryOptions({
        queryFn: streamedQuery({
            streamFn: fetchNLSearch(prompt),
            // Optional configuration
            refetchMode: 'replace', // Determines chunk handling on manual refetch ('append' | 'reset' | 'replace')
            initialValue: '',       // The initial accumulator value passed to the reducer
            reducer: (accumulator, chunk) => accumulator + chunk, // Custom chunk combinations
        }),
    });

    const { data, status, fetchStatus } = useQuery(chatQueryOptions);

    console.log(data);

    return {
        data, status, fetchStatus
    }
}

export default useRequestNLSearch;