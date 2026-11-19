/**
 * @jest-environment jsdom
 */

import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

import * as searchHelper from 'helpers/searchHelper';
import useGenerateSearchHash from 'containers/search/useGenerateSearchHash';

const createWrapper = () => {
    const queryClient = new QueryClient();

    // eslint-disable-next-line react/display-name,react/prop-types
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

const params = { filters: { keyword: 'test' }, version: '2017-11-20' };

const mockRequest = (promise, cancel = jest.fn()) => jest.spyOn(searchHelper, 'generateUrlHash')
    .mockReturnValue({ promise, cancel });

describe('useGenerateSearchHash', () => {
    beforeEach(() => jest.spyOn(console, 'error').mockImplementation(() => {}));
    afterEach(() => jest.restoreAllMocks());

    it('posts the filters and version', async () => {
        const spy = mockRequest(Promise.resolve({ data: { hash: 'abc123' } }));
        const { result } = renderHook(() => useGenerateSearchHash(), { wrapper: createWrapper() });

        act(() => result.current.generateHash(params));

        await waitFor(() => expect(result.current.isGenerating).toBe(false));
        expect(spy).toHaveBeenCalledWith(params);
    });

    it('calls onSuccess with the new hash', async () => {
        mockRequest(Promise.resolve({ data: { hash: 'abc123' } }));
        const onSuccess = jest.fn();
        const { result } = renderHook(
            () => useGenerateSearchHash({ onSuccess }),
            { wrapper: createWrapper() }
        );

        act(() => result.current.generateHash(params));

        await waitFor(() => expect(onSuccess).toHaveBeenCalledWith('abc123'));
    });

    it('reports isGenerating while the request is pending', async () => {
        let resolve;
        mockRequest(new Promise((res) => {
            resolve = res;
        }));
        const { result } = renderHook(() => useGenerateSearchHash(), { wrapper: createWrapper() });

        expect(result.current.isGenerating).toBe(false);

        act(() => result.current.generateHash(params));
        await waitFor(() => expect(result.current.isGenerating).toBe(true));

        await act(async () => resolve({ data: { hash: 'abc123' } }));
        await waitFor(() => expect(result.current.isGenerating).toBe(false));
    });

    it('calls onError when the request fails', async () => {
        const error = new Error('network down');
        mockRequest(Promise.reject(error));
        const onSuccess = jest.fn();
        const onError = jest.fn();
        const { result } = renderHook(
            () => useGenerateSearchHash({ onSuccess, onError }),
            { wrapper: createWrapper() }
        );

        act(() => result.current.generateHash(params));

        await waitFor(() => expect(onError).toHaveBeenCalledWith(error));
        expect(onSuccess).not.toHaveBeenCalled();
    });

    it('does not call onError for a cancelled request', async () => {
        mockRequest(Promise.reject(new axios.Cancel('cancelled')));
        const onError = jest.fn();
        const { result } = renderHook(
            () => useGenerateSearchHash({ onError }),
            { wrapper: createWrapper() }
        );

        act(() => result.current.generateHash(params));

        await waitFor(() => expect(result.current.isGenerating).toBe(false));
        expect(onError).not.toHaveBeenCalled();
    });

    describe('cancelling on unmount', () => {
        it('cancels the request that is still in flight', async () => {
            const cancel = jest.fn();
            const spy = mockRequest(new Promise(() => {}), cancel);
            const { result, unmount } = renderHook(
                () => useGenerateSearchHash(),
                { wrapper: createWrapper() }
            );

            act(() => result.current.generateHash(params));
            // the mutation starts the request asynchronously
            await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));
            unmount();

            expect(cancel).toHaveBeenCalledTimes(1);
        });

        it('cancels every request when more than one is in flight', async () => {
            const cancels = [jest.fn(), jest.fn()];
            const spy = jest.spyOn(searchHelper, 'generateUrlHash')
                .mockReturnValueOnce({ promise: new Promise(() => {}), cancel: cancels[0] })
                .mockReturnValueOnce({ promise: new Promise(() => {}), cancel: cancels[1] });
            const { result, unmount } = renderHook(
                () => useGenerateSearchHash(),
                { wrapper: createWrapper() }
            );

            act(() => {
                result.current.generateHash(params);
                result.current.generateHash(params);
            });
            await waitFor(() => expect(spy).toHaveBeenCalledTimes(2));
            unmount();

            expect(cancels[0]).toHaveBeenCalledTimes(1);
            expect(cancels[1]).toHaveBeenCalledTimes(1);
        });

        it('does not cancel a request that already finished', async () => {
            const cancel = jest.fn();
            mockRequest(Promise.resolve({ data: { hash: 'abc123' } }), cancel);
            const { result, unmount } = renderHook(
                () => useGenerateSearchHash(),
                { wrapper: createWrapper() }
            );

            act(() => result.current.generateHash(params));
            await waitFor(() => expect(result.current.isGenerating).toBe(false));
            unmount();

            expect(cancel).not.toHaveBeenCalled();
        });
    });
});
