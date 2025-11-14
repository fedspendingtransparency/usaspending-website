import { useEffect, useState } from 'react';
import { tabletScreen } from "../dataMapping/shared/mobileBreakpoints";

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
