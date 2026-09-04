import { useQuery, experimental_streamedQuery as streamedQuery } from "@tanstack/react-query";

const useRequestNLSearch = function () {
    const prompt = "Show me all contracts greater than $3M in California for IT services in 2023";
    const { data, refetch, status } = useQuery({
        queryKey: ['nl-search-stream', prompt],
        enabled: false,
        queryFn: streamedQuery({
            streamFn: async function* () {
                const request = await fetch('https://usaspending-api.dev01.dtas.ts.aws.frb.pvt/api/v2/llm/filter-search/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-LLM-API-Key': 'eae262ce-9ff8-416c-8965-84fdbb9034bf'
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