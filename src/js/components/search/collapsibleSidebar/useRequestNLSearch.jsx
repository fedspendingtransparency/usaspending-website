import { useEffect } from 'react';
import { useQuery, experimental_streamedQuery as streamedQuery, useQueryClient } from "@tanstack/react-query";
import GlobalConstants from 'GlobalConstants';
import { setIsNLSearchComplete } from '../../../redux/actions/sidebar/sidebarActions';
import { useDispatch } from 'react-redux';

const headers = {
    'Content-Type': 'application/json',
    'X-LLM-API-Key': GlobalConstants?.LLM?.HEADER_VALUE
};

const LLM_API = GlobalConstants?.LLM?.API ? GlobalConstants?.LLM?.API + 'v2/llm/filter-search/' : '/v2/llm/filter-search/';

const useRequestNLSearch = (prompt) => {
    const dispatch = useDispatch();

    const requestHeader = GlobalConstants?.LLM?.HEADER_VALUE ?
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

    const { data, refetch, status, isFetching } = useQuery({
        queryKey: ['nl-search-stream'],
        enabled: false,
        queryFn: streamedQuery({
            streamFn: async function* () {
                const request = await fetch(LLM_API, requestHeader);

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

    // allow cancel api request
    const queryClient = useQueryClient();

    const cancelQuery = () => {
        queryClient.cancelQueries({queryKey: ['nl-search-stream']})
    };

    return { data, refetch, status, cancelQuery, isFetching};
}

export default useRequestNLSearch;