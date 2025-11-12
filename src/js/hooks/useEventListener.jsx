import { useEffect } from "react";

// useEventListener: https://usehooks-ts.com/react-hook/use-event-listener
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
