import { useCallback } from "react";

/**
 * useCallbackRef.jsx
 * - a custom hook for adding and removing event listeners
 * https://usehooks-ts.com/react-hook/use-event-listener
 * @param {function} func - the callback function to be executed (usually a setState)
 * @param {func} -  A callback ref that can be placed on an element
 * */

const useCallbackRef = (func) => {
    return useCallback((node) => {
        const observer = new ResizeObserver(([entry]) => func(entry));

        observer.observe(node);

        return () => observer.disconnect()
    }, [func]);
}

export default useCallbackRef;

// https://tkdodo.eu/blog/avoiding-use-effect-with-callback-refs
// https://tkdodo.eu/blog/ref-callbacks-react-19-and-the-compiler
