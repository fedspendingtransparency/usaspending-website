import { useEffect, useState } from 'react';
import { tabletScreen } from "../dataMapping/shared/mobileBreakpoints";

/**
 * useIsWindowBreakpoint
 * - a custom hook for checking whether your window is below a specific window size or not
 * @param {number} [breakPoint=768] - screen size to check as a pixel width
 * @returns {boolean} `true` if window width is less than breakPoint, `false` if greater than
 */
const useIsWindowBreakpoint = (
    breakPoint = tabletScreen
) => {
    const [isBreakpoint, setIsBreakpoint] = useState(undefined);

    useEffect(() => {
        let isMounted = true;

        const matchMedia = window.matchMedia(
            `(max-width: ${breakPoint - 1}px)`
        );

        const onChange = () => {
            if (isMounted) setIsBreakpoint(window.innerWidth < breakPoint);
        };

        matchMedia.addEventListener('change', onChange);

        setIsBreakpoint(window.innerWidth < breakPoint);

        return () => {
            isMounted = false;
            matchMedia.removeEventListener('change', onChange);
        };
    }, [breakPoint]);

    return isBreakpoint;
};

export default useIsWindowBreakpoint;
