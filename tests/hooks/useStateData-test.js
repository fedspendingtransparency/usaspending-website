/**
 * @jest-environment jsdom
 *
 * useStateData-test.js
 * Created on 9/4/26 Nick Torres
 */

import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import * as mapHelper from 'helpers/mapHelper';
import {
    useStateList,
    useStateFIPSByAbbreviation,
    useStateNameByFipsId,
    useFipsIdByStateName,
    useCodeByStateName,
    useStatebyCode,
    useStateNameFromFips,
    useStateAbbreviationFromFips
} from '../../src/js/hooks/useStateData';

const mockStateData = {
    data: {
        results: [
            {
                code: 'AL',
                fips: '01',
                name: 'Alabama'
            },
            {
                code: 'AK',
                fips: '02',
                name: 'Alaska'
            },
            {
                code: 'CA',
                fips: '06',
                name: 'California'
            }
        ]
    }
};

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                cacheTime: Infinity,
                staleTime: Infinity
            }
        }
    });

    // eslint-disable-next-line react/display-name
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

describe('useStateData hooks', () => {
    beforeEach(() => {
        jest.spyOn(mapHelper, 'fetchStateList').mockReturnValue({
            promise: Promise.resolve(mockStateData)
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('useStateList', () => {
        it('should return the state list results', async () => {
            const { result } = renderHook(() => useStateList(), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toEqual(mockStateData.data.results);
            });
        });

        it('should return undefined when data is not loaded', async () => {
            jest.spyOn(mapHelper, 'fetchStateList').mockReturnValue({
                promise: Promise.resolve({})
            });

            const { result } = renderHook(() => useStateList(), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toBeUndefined();
            });
        });
    });

    describe('useStateFIPSByAbbreviation', () => {
        it('should return an object mapping state code to FIPS', async () => {
            const { result } = renderHook(() => useStateFIPSByAbbreviation(), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toEqual({
                    'AL': '01',
                    'AK': '02',
                    'CA': '06'
                });
            });
        });

        it('should return undefined when results are not available', async () => {
            jest.spyOn(mapHelper, 'fetchStateList').mockReturnValue({
                promise: Promise.resolve({})
            });

            const { result } = renderHook(() => useStateFIPSByAbbreviation(), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toBeUndefined();
            });
        });
    });

    describe('useStateNameByFipsId', () => {
        it('should return an object mapping FIPS to state name', async () => {
            const { result } = renderHook(() => useStateNameByFipsId(), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toEqual({
                    '01': 'Alabama',
                    '02': 'Alaska',
                    '06': 'California'
                });
            });
        });

        it('should return undefined when results are not available', async () => {
            jest.spyOn(mapHelper, 'fetchStateList').mockReturnValue({
                promise: Promise.resolve({})
            });

            const { result } = renderHook(() => useStateNameByFipsId(), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toBeUndefined();
            });
        });
    });

    describe('useFipsIdByStateName', () => {
        it('should return an object mapping lowercase state name to FIPS', async () => {
            const { result } = renderHook(() => useFipsIdByStateName(), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toEqual({
                    'alabama': '01',
                    'alaska': '02',
                    'california': '06'
                });
            });
        });

        it('should return undefined when results are not available', async () => {
            jest.spyOn(mapHelper, 'fetchStateList').mockReturnValue({
                promise: Promise.resolve({})
            });

            const { result } = renderHook(() => useFipsIdByStateName(), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toBeUndefined();
            });
        });
    });

    describe('useCodeByStateName', () => {
        it('should return an object mapping state name to code', async () => {
            const { result } = renderHook(() => useCodeByStateName(), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toEqual({
                    'Alabama': 'AL',
                    'Alaska': 'AK',
                    'California': 'CA'
                });
            });
        });

        it('should return undefined when results are not available', async () => {
            jest.spyOn(mapHelper, 'fetchStateList').mockReturnValue({
                promise: Promise.resolve({})
            });

            const { result } = renderHook(() => useCodeByStateName(), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toBeUndefined();
            });
        });
    });

    describe('useStatebyCode', () => {
        it('should return an object mapping state code to name', async () => {
            const { result } = renderHook(() => useStatebyCode(), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toEqual({
                    'AL': 'Alabama',
                    'AK': 'Alaska',
                    'CA': 'California'
                });
            });
        });

        it('should return undefined when results are not available', async () => {
            jest.spyOn(mapHelper, 'fetchStateList').mockReturnValue({
                promise: Promise.resolve({})
            });

            const { result } = renderHook(() => useStatebyCode(), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toBeUndefined();
            });
        });
    });

    describe('useStateNameFromFips', () => {
        it('should return state name for valid FIPS code', async () => {
            const { result } = renderHook(() => useStateNameFromFips('01'), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toBe('Alabama');
            });
        });

        it('should return state name for lowercase FIPS code', async () => {
            const { result } = renderHook(() => useStateNameFromFips('06'), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toBe('California');
            });
        });

        it('should return empty array for invalid FIPS code', async () => {
            const { result } = renderHook(() => useStateNameFromFips('99'), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toEqual([]);
            });
        });

        it('should return empty array when FIPS is null', async () => {
            const { result } = renderHook(() => useStateNameFromFips(null), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toEqual([]);
            });
        });

        it('should return empty array when stateNameByFipsId is undefined', async () => {
            jest.spyOn(mapHelper, 'fetchStateList').mockReturnValue({
                promise: Promise.resolve({})
            });

            const { result } = renderHook(() => useStateNameFromFips('01'), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toEqual([]);
            });
        });
    });

    describe('useStateAbbreviationFromFips', () => {
        it('should return state abbreviation for valid FIPS code', async () => {
            const { result } = renderHook(() => useStateAbbreviationFromFips('01'), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toBe('AL');
            });
        });

        it('should return state abbreviation for another valid FIPS code', async () => {
            const { result } = renderHook(() => useStateAbbreviationFromFips('06'), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toBe('CA');
            });
        });

        it('should return null for invalid FIPS code', async () => {
            const { result } = renderHook(() => useStateAbbreviationFromFips('99'), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toBeNull();
            });
        });

        it('should return null when FIPS is null', async () => {
            const { result } = renderHook(() => useStateAbbreviationFromFips(null), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toBeNull();
            });
        });

        it('should return null when stateFIPSByAbbreviation is undefined', async () => {
            jest.spyOn(mapHelper, 'fetchStateList').mockReturnValue({
                promise: Promise.resolve({})
            });

            const { result } = renderHook(() => useStateAbbreviationFromFips('01'), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(result.current).toBeNull();
            });
        });
    });
});
