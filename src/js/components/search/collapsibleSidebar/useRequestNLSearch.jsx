import { useQuery, experimental_streamedQuery as streamedQuery, useQueryClient } from "@tanstack/react-query";
import GlobalConstants from 'GlobalConstants';

const headers = {
    'Content-Type': 'application/json',
    'X-LLM-API-Key': GlobalConstants?.LLM_HEADER_VALUE
};

const LLM_API = GlobalConstants?.LLM_API + 'v2/llm/filter-search/';

const useRequestNLSearch = (prompt) => {
    const requestHeader = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({'query': prompt})
    };

    const { data, refetch, status, isFetching } = useQuery({
        queryKey: ['nl-search-stream'],
        enabled: false,
        queryFn: streamedQuery({
            streamFn: async function* ({ signal }) {
                const request = await fetch(LLM_API, { ...requestHeader, signal });

                const reader = request.body.getReader();
                const decoder = new TextDecoder();

                while (true) {
                    if (signal.aborted) break;

                    const {value, done} = await reader.read();

                    if (done) break;

                    yield decoder.decode(value);
                }
            },
            reducer: (acc, chunk) => acc + chunk,
            initialValue: ''
        })
    });

    // allow cancel api request
    const queryClient = useQueryClient();

    const cancelQuery = () => {
        queryClient.cancelQueries({queryKey: ['nl-search-stream']})
            .then(() => queryClient.setQueryData(['nl-search-stream'], ''));
    };

    return { data, refetch, status, cancelQuery, isFetching};
}

export default useRequestNLSearch;