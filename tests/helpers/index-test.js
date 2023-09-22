
/**
 * @jest-environment jsdom
 * 
 * index-test.js
 * Created by Max Kendall 04/26/2021
* */
import { act, renderHook } from '@testing-library/react-hooks';
import { useStateWithPrevious } from 'helpers';

test('useStateWithPrevious correctly maintains state and previous state', () => {
    const { result } = renderHook(() => useStateWithPrevious(1));
    expect(result.current[0]).toEqual(1);

    act(() => {
        result.current[2](2);
    });

    expect(result.current[1]).toEqual(2);
    expect(result.current[0]).toEqual(1);

    act(() => {
        result.current[2](200);
    });

    expect(result.current[1]).toEqual(200);
    expect(result.current[0]).toEqual(2);
});
