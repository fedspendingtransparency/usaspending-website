import { useEffect, useState } from 'react';
import { throttle } from "lodash-es";
import { tabletScreen } from "../dataMapping/shared/mobileBreakpoints";

const useWindowWidth = (
    screenSize = tabletScreen,
    throttleWait = 50
) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < screenSize);

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < screenSize);
            }
        }, throttleWait);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    return { windowWidth, isMobile };
}

export default useWindowWidth;
