import { useEffect, useState } from 'react';
import { tabletScreen } from "../dataMapping/shared/mobileBreakpoints";

/**
 * useIsMobile
 * - a custom hook for checking whether your window is below a specific window size or not
 * @param {number} [breakPoint=768] - screen size to check as a pixel width
 * @returns {boolean} `true` if window width is less than breakPoint, `false` if greater than
 */
const useIsMobile = (
    breakPoint = tabletScreen
) => {
    const [isMobile, setIsMobile] = useState(undefined);

    useEffect(() => {
        let isMounted = true;

        const matchMedia = window.matchMedia(
            `(max-width: ${breakPoint - 1}px)`
        );

        const onChange = () => {
            if (isMounted) setIsMobile(window.innerWidth < breakPoint);
        };

        matchMedia.addEventListener('change', onChange);

        setIsMobile(window.innerWidth < breakPoint);

        return () => {
            isMounted = false;
            matchMedia.removeEventListener('change', onChange);
        };
    }, [breakPoint]);

    return isMobile;
};

export default useIsMobile;
