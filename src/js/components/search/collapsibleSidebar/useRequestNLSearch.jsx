import { useQuery, experimental_streamedQuery as streamedQuery } from "@tanstack/react-query";
import GlobalConstants from 'GlobalConstants';

const LLM_KEY = GlobalConstants?.LLM?.HEADER_KEY;
const LLM_VALUE = GlobalConstants?.LLM?.HEADER_VALUE;

console.log(LLM_KEY, LLM_VALUE);

const useRequestNLSearch = function () {
    const prompt = "Show me all contracts greater than $3M in California for IT services in 2023";
    const { data, refetch, status } = useQuery({
        queryKey: ['nl-search-stream', prompt],
        enabled: false,
        queryFn: streamedQuery({
            streamFn: async function* () {
                const request = await fetch(GlobalConstants.LLM.API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-LLM-API-Key': LLM_VALUE
                    },
                    body: JSON.stringify({'query': "Show me all contracts greater than $3M in California for IT services in 2023"})
                });

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