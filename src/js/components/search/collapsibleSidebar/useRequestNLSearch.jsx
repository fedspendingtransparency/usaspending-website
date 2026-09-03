// import { useQuery, experimental_streamedQuery as streamedQuery } from "@tanstack/react-query";
// import { fetchNLSearch } from "apis/search";
// import {isCancel} from "axios";
// import {get} from "lodash-es";

const useRequestNLSearch = async function (prompt) {
    // const { data, status, refetch } = useQuery({
    //     queryKey: ['nl-search-stream', prompt],
    //     enabled: false,
    //     queryFn: streamedQuery({
    //         streamFn: () => fetchNLSearch(prompt).promise,
    //         refetchMode: 'reset',
    //         // reducer: (acc, chunk) => acc + chunk,
    //         // initialValue: ''
    //     })
    // });
    //
    const results = [];

    if (prompt) {
        const request = await fetch('https://usaspending-api.dev01.dtas.ts.aws.frb.pvt/api/v2/llm/filter-search/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-LLM-API-Key': 'eae262ce-9ff8-416c-8965-84fdbb9034bf'
            },
            body: JSON.stringify({
                'query': "Show me all contracts greater than $3M in California for IT services in 2023"
            })
        })
        let buffer ='';

        const reader = request.body.getReader();
        const decoder = new TextDecoder();

        while(true) {
            const { value, done } = await reader.read();

            if (done) break;

            buffer += decoder.decode(value, {stream: true});

            const lines = buffer.split('\n');

            buffer = lines.pop() || '';

            for (const line of lines) {
                if(!line.trim()) continue;

                const obj = JSON.parse(line);

                results.push(obj);
            }
        }

        if (buffer.trim()) {
            results.push(JSON.parse(buffer))
        }
    }

    const data = results;
    console.log(data);

    return data;
}

export default useRequestNLSearch;