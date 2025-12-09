import { useRef } from "react";
import useEventListener from "./useEventListener";

/**
 * useWindowWidth
 * - a custom hook for returning the current window width, throttled
 * @param {function} onKeydown - the function triggered on event change or enter keydown
 * @returns {object} ref used to tie event listener to an element
 */
const useOnKeydown = (onKeydown) => {
    const ref = useRef(null);
    const onKeydownEvent = (e) => {
        e.stopPropagation();
        if (e.type === 'change' || e?.key === 'Enter') {
            onKeydown();
        }
    };

    useEventListener('keydown', onKeydownEvent, ref);

    return ref;
};

export default useOnKeydown;
