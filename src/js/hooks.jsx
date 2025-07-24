import { useEffect } from "react";

const useEventListener = (
    eventName,
    handler,
    element,
    options
) => {
    useEffect(() => {
        const targetElement = element?.current ?? window;

        if (!(targetElement && targetElement.addEventListener)) return {};

        targetElement.addEventListener(eventName, handler, options);

        return () => {
            targetElement.removeEventListener(eventName, handler, options);
        };
    }, [handler, eventName, element, options]);
};

export { useEventListener };
