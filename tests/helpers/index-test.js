
/**
 * @jest-environment jsdom
 *
 * index-test.js
 * Created by Max Kendall 04/26/2021
* */
import { act, renderHook } from '@testing-library/react-hooks';
import useStateWithPrevious from "../../src/js/hooks/useStateWithPrevious";
import { waitFor } from "@testing-library/react";

test('useStateWithPrevious correctly maintains state and previous state', async () => {
    const { result } = renderHook(() => useStateWithPrevious(1));
    expect(result.current[0]).toEqual(1);

    act(() => {
        result.current[2](2);
    });

    await waitFor(() => expect(result.current[1]).toEqual(2));
    await waitFor(() => expect(result.current[0]).toEqual(1));

    act(() => {
        result.current[2](200);
    });

    await waitFor(() => expect(result.current[1]).toEqual(200));
    await waitFor(() => expect(result.current[0]).toEqual(1));
});
