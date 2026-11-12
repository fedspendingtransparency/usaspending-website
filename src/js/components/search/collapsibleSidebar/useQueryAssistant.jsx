import { useRef, useCallback } from 'react';
import GlobalConstants from 'GlobalConstants';
import { QUERY_ASSISTANT_VERDICT } from './NLConstants';

// If the query assistant cannot be reached or returns something unexpected, let the search run as typed.
export const ANSWERABLE_FALLBACK = {
    verdict: QUERY_ASSISTANT_VERDICT.ANSWERABLE,
    reason_code: 'ok',
    message: '',
    suggestions: []
};

export const requestQueryAssistant = async (query, signal) => {
    try {
        const response = await fetch(`${GlobalConstants?.API}v2/llm/query-assistant/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-LLM-API-Key': GlobalConstants?.LLM_HEADER_VALUE
            },
            body: JSON.stringify({ query }),
            signal
        });

        if (!response.ok) {
            return ANSWERABLE_FALLBACK;
        }

        const data = await response.json();
        const isKnownVerdict = Object.values(QUERY_ASSISTANT_VERDICT).includes(data?.verdict);
        const missingRewrite = data?.verdict === QUERY_ASSISTANT_VERDICT.REPHRASE && !data?.rewritten_query;
        return isKnownVerdict && !missingRewrite ? data : ANSWERABLE_FALLBACK;
    }
    catch (error) {
        if (error?.name === 'AbortError') {
            throw error;
        }
        return ANSWERABLE_FALLBACK;
    }
};

/**
 * First step of Smart Assist. Rejects with an AbortError when a newer check replaces this one, or when
 * cancelCheck is called. Any other failure resolves to ANSWERABLE_FALLBACK.
 */
const useQueryAssistant = () => {
    const controller = useRef(null);

    const cancelCheck = useCallback(() => {
        controller.current?.abort();
        controller.current = null;
    }, []);

    const checkQuery = useCallback((query) => {
        controller.current?.abort();
        controller.current = new AbortController();
        return requestQueryAssistant(query, controller.current.signal);
    }, []);

    return { checkQuery, cancelCheck };
};

export default useQueryAssistant;
