import { experimental_streamedQuery as streamedQuery } from "@tanstack/react-query";
import { fetchNLSearch } from "apis/search";

const useRequestNLSearch = (prompt) => {
    const { data, status, refetch } = streamedQuery({
        queryKey: ['nl-search-stream', prompt],
        streamFn: () => fetchNLSearch(prompt).promise,
        enabled: false,
        reducer: (acc, chunk) => acc + chunk,
        initialValue: ''
    });

    return {
        data, status, refetch
    }
}

export default useRequestNLSearch;