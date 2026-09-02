import { useQuery, queryOptions, experimental_streamedQuery as streamedQuery } from "@tanstack/react-query";
import { fetchNLSearch } from "apis/search";

const useRequestNLSearch = (prompt, isSearching) => {
    const chatQueryOptions = queryOptions({
        queryKey: ['data'],
        queryFn: () => fetchNLSearch(prompt).promise,
        enabled: !!prompt && !!isSearching
        // Optional configuration
        // refetchMode: 'replace', // Determines chunk handling on manual refetch ('append' | 'reset' | 'replace')
        // initialValue: '',       // The initial accumulator value passed to the reducer
        // reducer: (accumulator, chunk) => accumulator + chunk, // Custom chunk combinations
    });

    const { data, status, fetchStatus } = useQuery(chatQueryOptions);

    return {
        data, status, fetchStatus
    }
}

export default useRequestNLSearch;