import { useEffect, useRef, useState } from "react";

/**
 * useIntersectionObserver
 * -  that tracks the intersection of a DOM element with its containing element or the viewport using the Intersection Observer API
 * https://usehooks-ts.com/react-hook/use-intersection-observer
 * @param {Object} parameters - parameters for configuring the Intersection Observer
 * @param {boolean} [parameters.threshold=false] - If `true`, freezes the intersection state once the element becomes visible
 * @param {boolean} [parameters.initialIsIntersecting=false] - The initial state of the intersection
 * @param {function} [parameters.root] - event handler function
 * @param {element} [element=window] - DOM element or media query list to attach the event listener to, defaults to window
 * @param {Object} [options] - An options object that specifies characteristics about the event listener
 */
const useIntersectionObserver = ({
    threshold = 0,
    initialIsIntersecting = false,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
    onChange
}) => {
    const [ref, setRef] = useState(null);

    const [state, setState] = useState(() => ({
        isIntersecting: initialIsIntersecting,
        entry: undefined
    }));

    const callbackRef = useRef();

    callbackRef.current = onChange;

    const frozen = state.entry?.isIntersecting && freezeOnceVisible;

    useEffect(() => {
        // Ensure we have a ref to observe
        if (!ref) return;

        // Ensure the browser supports the Intersection Observer API
        if (!('IntersectionObserver' in window)) return;

        // Skip if frozen
        if (frozen) return;

        let unobserve;

        // eslint-disable-next-line no-undef
        const observer = new IntersectionObserver(
            (entries) => {
                const thresholds = Array.isArray(observer.thresholds)
                    ? observer.thresholds
                    : [observer.thresholds];

                entries.forEach((entry) => {
                    const isIntersecting =
                        entry.isIntersecting &&
                        thresholds.some((th) => entry.intersectionRatio >= th);

                    setState({ isIntersecting, entry });

                    if (callbackRef.current) {
                        callbackRef.current(isIntersecting, entry);
                    }

                    if (isIntersecting && freezeOnceVisible && unobserve) {
                        unobserve();
                        unobserve = undefined;
                    }
                });
            },
            { threshold, root, rootMargin }
        );

        observer.observe(ref);

        // eslint-disable-next-line consistent-return
        return () => {
            observer.disconnect();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        ref,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        JSON.stringify(threshold),
        root,
        rootMargin,
        frozen,
        freezeOnceVisible
    ]);

    // ensures that if the observed element changes, the intersection observer is reinitialized
    const prevRef = useRef(null);

    useEffect(() => {
        if (
            !ref &&
            state.entry?.target &&
            !freezeOnceVisible &&
            !frozen &&
            prevRef.current !== state.entry.target
        ) {
            prevRef.current = state.entry.target;
            setState({ isIntersecting: initialIsIntersecting, entry: undefined });
        }
    }, [ref, state.entry, freezeOnceVisible, frozen, initialIsIntersecting]);

    const result = [
        setRef,
        !!state.isIntersecting,
        state.entry
    ];

    // Support object destructuring, by adding the specific values.
    result.ref = result[0];
    result.isIntersecting = result[1];
    result.entry = result[2];

    return result;
};

export default useIntersectionObserver;
