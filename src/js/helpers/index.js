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

// https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};
