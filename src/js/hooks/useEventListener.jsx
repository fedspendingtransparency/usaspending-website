import { useEffect } from "react";

/* eslint-disable max-len */
/**
 * useEventListener
 * - a custom hook for adding and removing event listeners
 * https://usehooks-ts.com/react-hook/use-event-listener
 * @param {string} eventName - name of the event to listen for
 * @param {function} handler - event handler function
 * @param {element} [element=window] - DOM element or media query list to attach the event listener to, defaults to window
 * @param {Object} [options=null] - An options object that specifies characteristics about the event listener
 */
/* eslint-enable max-len */

const useEventListener = (
    eventName,
    handler,
    element,
    options
) => {
    useEffect(() => {
        // check to see if there is a target element provided, if not use window
        const targetElement = element?.current ?? window;

        // if there is no target element or if it already has an event listener, return
        if (!(targetElement && targetElement.addEventListener)) return {};

        targetElement.addEventListener(eventName, handler, options);

        return () => {
            targetElement.removeEventListener(eventName, handler, options);
        };
    }, [handler, eventName, element, options]);
};

export default useEventListener;
