import { useEffect, useState } from 'react';
import {
    smTabletScreen,
    tabletScreen,
    mediumScreen,
    getScreenSize,
    getScreenSizeFalse, getScreenSizeTrue
} from "../dataMapping/shared/mobileBreakpoints";

/* eslint-disable max-len */
/**
 * An object with the different breakpoint states
 * @typedef {Object} breakPoints
 * @property {boolean} isMobile - `true` if window is less than 576px, `false` if greater than or equal to
 * @property {boolean} isTablet - `true` if window is less than 768px, `false` if greater than or equal to
 * @property {boolean} isMedium - `true` if window is less than 992px, `false` if greater than or equal to
 * @property {boolean} isDesktop - `false` if window is less than 992px, `true` if greater than or equal to
 */

/**
 * useIsMobile
 * - a custom hook for checking whether the window is below or above the standard project breakpoints
 * @returns {breakPoints} breakpoints - An object with the different breakpoint states, i.e., isMobile, isTablet, isMedium, & isDesktop
 *
 */
const useIsMobile = () => {
    /* eslint-enable max-len */
    const [breakPoints, setBreakPoints] = useState({
        isMobile: false,
        isTablet: false,
        isMedium: false,
        isDesktop: false
    });

    useEffect(() => {
        let isMounted = true;

        const smTabletMatchMedia = window.matchMedia(`(max-width: ${smTabletScreen - 1}px)`);
        const tabletMatchMedia = window.matchMedia(`(max-width: ${tabletScreen - 1}px)`);
        const mediumMatchMedia = window.matchMedia(`(max-width: ${mediumScreen - 1}px)`);

        const onChange = ({ matches }, screenSize) => {
            if (!isMounted) return;

            let newBreakPoints;

            if (matches) {
                newBreakPoints = getScreenSizeTrue(screenSize);
            }
            else {
                newBreakPoints = getScreenSizeFalse(screenSize);
            }

            setBreakPoints(newBreakPoints);
        };

        smTabletMatchMedia.addEventListener('change', (e) => onChange(e, 'isMobile'));
        tabletMatchMedia.addEventListener('change', (e) => onChange(e, 'isTablet'));
        mediumMatchMedia.addEventListener('change', (e) => onChange(e, 'isMedium'));

        onChange({ matches: true }, getScreenSize(window.innerWidth));

        return () => {
            isMounted = false;
            smTabletMatchMedia.removeEventListener('change', (e) => onChange(e, 'isMobile'));
            tabletMatchMedia.removeEventListener('change', (e) => onChange(e, 'isTablet'));
            mediumMatchMedia.removeEventListener('change', (e) => onChange(e, 'isMedium'));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return breakPoints;
};

export default useIsMobile;
