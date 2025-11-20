import { useEffect, useState } from 'react';
import {
    smallScreen,
    smTabletScreen,
    tabletScreen,
    mediumScreen,
    largeScreen,
    mLargeScreen,
    xLargeScreen, getScreenSize, getScreenSizeFalse
} from "../dataMapping/shared/mobileBreakpoints";

/**
 * useIsMobile
 * - a custom hook for checking whether your window is below a specific window size or not
 * @param {number} [breakPoint=768] - screen size to check as a pixel width
 * @returns {boolean} `true` if window width is less than breakPoint, `false` if greater than
 */
const useIsMobile = () => {
    const [breakPoints, setBreakPoints] = useState({
        isSmall: false,
        isSmTablet: false,
        isTablet: false,
        isMedium: false,
        isLarge: false,
        isMLarge: false,
        isXLarge: false,
        isXXLarge: false
    });

    useEffect(() => {
        let isMounted = true;

        const smallMatchMedia = window.matchMedia(`(max-width: ${smallScreen}px)`);
        const smTabletMatchMedia = window.matchMedia(`(max-width: ${smTabletScreen}px)`);
        const tabletMatchMedia = window.matchMedia(`(max-width: ${tabletScreen}px)`);
        const mediumMatchMedia = window.matchMedia(`(max-width: ${mediumScreen}px)`);
        const largeMatchMedia = window.matchMedia(`(max-width: ${largeScreen}px)`);
        const mLargeMatchMedia = window.matchMedia(`(max-width: ${mLargeScreen}px)`);
        const xLargeMatchMedia = window.matchMedia(`(max-width: ${xLargeScreen}px)`);

        const onChange = ({ matches }, screenSize) => {
            if (!isMounted) return;

            let newBreakPoints;

            if (matches) {
                newBreakPoints = Object.fromEntries(
                    Object.entries(breakPoints)
                        .map(([key]) => [key, key === screenSize])
                );
            }
            else {
                const screenSizeFalse = getScreenSizeFalse(screenSize);
                newBreakPoints = Object.fromEntries(
                    Object.entries(breakPoints)
                        .map(([key]) => [key, key === screenSizeFalse])
                );
            }

            setBreakPoints(newBreakPoints);
        };

        smallMatchMedia.addEventListener('change', (e) => onChange(e, 'isSmall'));
        smTabletMatchMedia.addEventListener('change', (e) => onChange(e, 'isSmTablet'));
        tabletMatchMedia.addEventListener('change', (e) => onChange(e, 'isTablet'));
        mediumMatchMedia.addEventListener('change', (e) => onChange(e, 'isMedium'));
        largeMatchMedia.addEventListener('change', (e) => onChange(e, 'isLarge'));
        mLargeMatchMedia.addEventListener('change', (e) => onChange(e, 'isMLarge'));
        xLargeMatchMedia.addEventListener('change', (e) => onChange(e, 'isXLarge'));

        onChange({ matches: true }, getScreenSize(window.innerWidth));

        return () => {
            isMounted = false;
            smallMatchMedia.removeEventListener('change', (e) => onChange(e, 'isSmall'));
            smTabletMatchMedia.removeEventListener('change', (e) => onChange(e, 'isSmTablet'));
            tabletMatchMedia.removeEventListener('change', (e) => onChange(e, 'isTablet'));
            mediumMatchMedia.removeEventListener('change', (e) => onChange(e, 'isMedium'));
            largeMatchMedia.removeEventListener('change', (e) => onChange(e, 'isLarge'));
            mLargeMatchMedia.removeEventListener('change', (e) => onChange(e, 'isMLarge'));
            xLargeMatchMedia.removeEventListener('change', (e) => onChange(e, 'isXLarge'));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return breakPoints;
};

export default useIsMobile;
