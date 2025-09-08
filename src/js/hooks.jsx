import { useCallback, useEffect, useRef, useState } from "react";

// useEventListener: https://usehooks-ts.com/react-hook/use-event-listener
export const useEventListener = (
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

// useUnmount: https://usehooks-ts.com/react-hook/use-unmount
export const useUnmount = (func) => {
    const funcRef = useRef(func);

    funcRef.current = func;

    useEffect(
        () => () => {
            funcRef.current();
        },
        []
    );
};

// useIsMounted: https://usehooks-ts.com/react-hook/use-is-mounted
export const useIsMounted = () => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, []);

    return useCallback(() => isMounted.current, []);
};


// useResizeObserver: https://usehooks-ts.com/react-hook/use-resize-observer
const initialSize = {
    width: undefined,
    height: undefined
};

const extractSize = (entry, box, sizeType) => {
    if (!entry[box]) {
        if (box === 'contentBoxSize') {
            return entry.contentRect[sizeType === 'inlineSize' ? 'width' : 'height'];
        }
        return undefined;
    }

    return Array.isArray(entry[box]) ?
        entry[box][0][sizeType] :
        (entry[box][sizeType]);
};

export const useResizeObserver = (options) => {
    const { ref, box = 'content-box' } = options;

    const [{ width, height }, setSize] = useState(initialSize);
    const isMounted = useIsMounted();
    const previousSize = useRef({ ...initialSize });
    const onResize = useRef(undefined);

    onResize.current = options.onResize;

    useEffect(() => {
        if (!ref?.current) return;

        if (typeof window === 'undefined' || !('ResizeObserver' in window)) return;

        // eslint-disable-next-line no-undef
        const observer = new ResizeObserver(([entry]) => {
            let boxProp;

            // this is for .observe() options
            // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe
            switch (box) {
                case 'border-box':
                    boxProp = 'borderBoxSize';
                    break;
                case 'device-pixel-content-box':
                    boxProp = 'devicePixelContentBoxSize';
                    break;
                default: boxProp = 'contentBoxSize';
            }

            const newWidth = extractSize(entry, boxProp, 'inlineSize');
            const newHeight = extractSize(entry, boxProp, 'blockSize');

            const hasChanged =
                previousSize.current.width !== newWidth ||
                previousSize.current.height !== newHeight;

            if (hasChanged) {
                const newSize = { width: newWidth, height: newHeight };
                previousSize.current.width = newWidth;
                previousSize.current.height = newHeight;

                if (onResize.current) {
                    onResize.current(newSize);
                }
                else if (isMounted()) {
                    setSize(newSize);
                }
            }
        });

        observer.observe(ref.current, { box });

        // eslint-disable-next-line consistent-return
        return () => {
            observer.disconnect();
        };
    }, [box, ref, isMounted]);

    return { width, height };
};
