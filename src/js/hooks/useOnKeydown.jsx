/**
 * useOnKeydown.jsx
 * Created on 12/10/2025 by Josue Aguilar
 */

import { useRef } from "react";
import useEventListener from "./useEventListener";

/**
 * useOnKeydown
 * - a custom hook for adding an event listener to a keydown event.
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
