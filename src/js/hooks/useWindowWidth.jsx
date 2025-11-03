import { useEffect, useState } from 'react';
import { throttle } from "lodash-es";
import { tabletScreen } from "../dataMapping/shared/mobileBreakpoints";

const useWindowWidth = (
    screenSize = tabletScreen,
    throttleWait = 50
) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState(window.innerWidth < screenSize);

    useEffect(() => {
        let isMounted = true;

        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;

            if (windowWidth !== newWidth && isMounted) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < screenSize);
            }

        }, throttleWait);

        window.addEventListener('resize', handleResize);

        return () => {
            isMounted = false;
            window.removeEventListener('resize', handleResize);
        }
    }, [windowWidth]);

    return { windowWidth, isMobile };
}

export default useWindowWidth;
