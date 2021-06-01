import { useState, useRef, useEffect } from 'react';

export const useStateWithPrevious = (initialValue) => {
    const [state, updateState] = useState(initialValue);
    const stateRef = useRef(state);
    const { current: prevState } = stateRef;

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    return [
        prevState,
        state,
        updateState
    ];
};
