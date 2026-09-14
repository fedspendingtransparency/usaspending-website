import { useQuery, experimental_streamedQuery as streamedQuery } from "@tanstack/react-query";
import GlobalConstants from 'GlobalConstants';

const headers = {
    'Content-Type': 'application/json',
    'X-LLM-API-Key': GlobalConstants?.LLM?.HEADER_VALUE
};

const LLM_API = GlobalConstants?.LLM?.API ? GlobalConstants?.LLM?.API + 'v2/llm/filter-search/' : '/v2/llm/filter-search/';

// const sample = "Show me all contracts greater than $3M in California for IT services in 2023";

const useRequestNLSearch = (prompt) => {
    const requestHeader = GlobalConstants?.LLM?.API ?
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({'query': prompt})
        }
    :
        {
            method: 'POST',
            body: JSON.stringify({'query': prompt})
        }
    ;

    const { data, refetch, status } = useQuery({
        queryKey: ['nl-search-stream'],
        enabled: false,
        queryFn: streamedQuery({
            streamFn: async function* () {
                const request = fetch(LLM_API, requestHeader);

                const reader = request.body.getReader();
                const decoder = new TextDecoder();

                while (true) {
                    const {value, done} = await reader.read();

                    if (done) break;

                    yield decoder.decode(value);
                }
            },
            reducer: (acc, chunk) => acc + chunk,
            initialValue: ''
        })
    });

    return { data, refetch, status };
}

export default useRequestNLSearch;