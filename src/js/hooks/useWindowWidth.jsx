import { useEffect, useState } from 'react';
import { tabletScreen } from "../dataMapping/shared/mobileBreakpoints";

const useWindowWidth = (
    breakPoint = tabletScreen,
    throttleWait = 50
) => {
    const [isBreakPoint, setIsBreakPoint] = useState(undefined);

    useEffect(() => {
        let isMounted = true;

        const matchMedia = window.matchMedia(
            `(max-width: ${breakPoint - 1}px)`
        );

        const onChange = () => {
            if (isMounted) setIsBreakPoint(window.innerWidth < breakPoint);
        };

        matchMedia.addEventListener('change', onChange);

        setIsBreakPoint(window.innerWidth < breakPoint);

        return () => {
            isMounted = false;
            matchMedia.removeEventListener('change', onChange);
        };
    }, [breakPoint, throttleWait]);

    return isBreakPoint;
};

export default useWindowWidth;
