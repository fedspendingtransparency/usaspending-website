import { useEffect, useState } from 'react';
import { throttle } from "lodash-es";
import {
    mediumScreen, smTabletScreen, tabletScreen
} from "../dataMapping/shared/mobileBreakpoints";

const getScreenSizeType = (width) => {
    if (width < smTabletScreen) return 'mobile';
    else if ((smTabletScreen <= width) && (width < tabletScreen)) return 'tablet';
    else if ((tabletScreen <= width) && (width < mediumScreen)) return 'desktop';
    return 'largeDesktop';
};

const useWindowWidth = (
    screenBreakpoint = tabletScreen,
    throttleWait = 50
) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState(window.innerWidth < screenBreakpoint);
    const [screenSize, setScreenSize] = useState(getScreenSizeType(window.innerWidth));

    useEffect(() => {
        let isMounted = true;

        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;

            if (windowWidth !== newWidth && isMounted) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < screenBreakpoint);
                setScreenSize(getScreenSizeType(newWidth));
            }
        }, throttleWait);

        window.addEventListener('resize', handleResize);

        return () => {
            isMounted = false;
            window.removeEventListener('resize', handleResize);
        };
    }, [screenBreakpoint, throttleWait, windowWidth]);

    return { windowWidth, isMobile, screenSize };
};

export default useWindowWidth;
