/**
 * @jest-environment jsdom
 */
import {
    requestQueryAssistant,
    ANSWERABLE_FALLBACK
} from 'components/search/collapsibleSidebar/useQueryAssistant';

const mockFetch = (impl) => {
    global.fetch = jest.fn(impl);
};

const jsonResponse = (body, ok = true) => Promise.resolve({ ok, json: () => Promise.resolve(body) });

describe('requestQueryAssistant', () => {
    afterEach(() => {
        delete global.fetch;
    });

    it('posts the query and returns the decision', async () => {
        const decision = { verdict: 'out_of_scope', reason_code: 'no_matching_data', message: 'No.', suggestions: [] };
        mockFetch(() => jsonResponse(decision));

        await expect(requestQueryAssistant('billionaires')).resolves.toEqual(decision);

        const [url, options] = global.fetch.mock.calls[0];
        expect(url).toContain('v2/llm/query-assistant/');
        expect(JSON.parse(options.body)).toEqual({ query: 'billionaires' });
    });

    it('falls back to answerable when the request fails', async () => {
        mockFetch(() => Promise.reject(new Error('network')));
        await expect(requestQueryAssistant('x')).resolves.toEqual(ANSWERABLE_FALLBACK);
    });

    it('falls back to answerable on a non-ok response', async () => {
        mockFetch(() => jsonResponse({}, false));
        await expect(requestQueryAssistant('x')).resolves.toEqual(ANSWERABLE_FALLBACK);
    });

    it('falls back to answerable on an unknown verdict', async () => {
        mockFetch(() => jsonResponse({ verdict: 'something_else' }));
        await expect(requestQueryAssistant('x')).resolves.toEqual(ANSWERABLE_FALLBACK);
    });

    it('falls back to answerable when a rewrite has no rewritten query', async () => {
        mockFetch(() => jsonResponse({ verdict: 'answerable_after_rephrase', rewritten_query: null }));
        await expect(requestQueryAssistant('x')).resolves.toEqual(ANSWERABLE_FALLBACK);
    });

    it('rethrows an abort so the caller can ignore a replaced check', async () => {
        const abort = Object.assign(new Error('aborted'), { name: 'AbortError' });
        mockFetch(() => Promise.reject(abort));
        await expect(requestQueryAssistant('x')).rejects.toBe(abort);
    });
});
