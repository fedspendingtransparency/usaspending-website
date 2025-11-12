import { useEffect, useState } from 'react';
import { throttle } from "lodash-es";
import { tabletScreen } from "../dataMapping/shared/mobileBreakpoints";

const useWindowWidth = (
    breakPoint = tabletScreen,
    throttleWait = 50
) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isBreakPoint = windowWidth < breakPoint;

    useEffect(() => {
        let isMounted = true;

        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;

            if (windowWidth !== newWidth && isMounted) {
                setWindowWidth(newWidth);
            }
        }, throttleWait);

        window.addEventListener('resize', handleResize);

        return () => {
            isMounted = false;
            window.removeEventListener('resize', handleResize);
        };
    }, [throttleWait, windowWidth]);

    return [isBreakPoint, windowWidth];
};

export default useWindowWidth;
