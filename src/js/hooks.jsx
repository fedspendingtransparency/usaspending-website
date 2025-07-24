import { useEffect, useRef, useLayoutEffect } from "react";

export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const useEventListener = (
    eventName,
    handler,
    element,
    options
) => {
    const savedHandler = useRef(handler);

    useIsomorphicLayoutEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const targetElement = element?.current ?? window;

        if (!(targetElement && targetElement.addEventListener)) {
            return;
        }

        const listener = savedHandler.current(typeof handler);

        targetElement.addEventListener(eventName, listener, options);

        return () => {
            targetElement.removeEventListener(eventName, listener, options);
        };
    }, [handler, eventName, element, options]);
};

export { useEventListener };
