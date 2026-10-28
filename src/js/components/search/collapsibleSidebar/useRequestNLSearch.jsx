import { useQuery, experimental_streamedQuery as streamedQuery, useQueryClient } from '@tanstack/react-query';
import GlobalConstants from 'GlobalConstants';
import { RESPONSE_TYPE } from './NLConstants';

const headers = {
    'Content-Type': 'application/json',
    'X-LLM-API-Key': GlobalConstants?.LLM_HEADER_VALUE
};

const LLM_API = GlobalConstants?.API + 'v2/llm/filter-search/';

const useRequestNLSearch = (prompt) => {
    const requestHeader = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ query: prompt?.trim() })
    };

    const { data, refetch, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['nl-search-stream'],
        enabled: false,
        retry: false,
        queryFn: streamedQuery({
            streamFn: async function* ({ signal }) {
                const request = await fetch(LLM_API, { ...requestHeader, signal });

                const reader = request.body.getReader();
                const decoder = new TextDecoder();
                let buffer = '';

                while (true) {
                    if (signal.aborted) break;
                    const { value, done } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split('\n');
                    buffer = lines.pop();

                    for (const line of lines) {
                        if (!line.trim()) continue;
                        const parsed = JSON.parse(line);
                        if (parsed.type === RESPONSE_TYPE.SEARCH_ERROR) {
                            yield parsed;
                            throw new Error(parsed.message ?? 'Search failed');
                        }
                        yield parsed;
                    }
                }
            },
            reducer: (acc, parsed) => [...acc, parsed],
            initialValue: []
        })
    });

    // allow cancel api request
    const queryClient = useQueryClient();

    const cancelQuery = () => {
        queryClient.cancelQueries({ queryKey: ['nl-search-stream'] })
            .then(() => queryClient.setQueryData(['nl-search-stream'], []));
    };

    const clearNLCache = () => {
        queryClient.removeQueries({
            queryKey: ['nl-search-stream'],
            exact: true
        });
    };

    return { parsedData: data, fetchNLSearch: refetch, cancelQuery, isFetching, fetchingError: isError, isSuccess, clearNLCache };
};

export default useRequestNLSearch;
