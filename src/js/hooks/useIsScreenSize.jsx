import { useEffect, useState } from 'react';
import { tabletScreen } from "../dataMapping/shared/mobileBreakpoints";

/**
 * useIsScreenSize
 * - a custom hook for checking whether your window is at a specific screen size or not
 * @param {number} screenSize - screen size to check as a pixel width
 * @returns {boolean} `true` if window width is less than screenSize, `false` if greater than
 */
const useIsScreenSize = (
    screenSize = tabletScreen
) => {
    const [isScreenSize, setIsScreenSize] = useState(undefined);

    useEffect(() => {
        let isMounted = true;

        const matchMedia = window.matchMedia(
            `(max-width: ${screenSize - 1}px)`
        );

        const onChange = () => {
            if (isMounted) setIsScreenSize(window.innerWidth < screenSize);
        };

        matchMedia.addEventListener('change', onChange);

        setIsScreenSize(window.innerWidth < screenSize);

        return () => {
            isMounted = false;
            matchMedia.removeEventListener('change', onChange);
        };
    }, [screenSize]);

    return isScreenSize;
};

export default useIsScreenSize;
