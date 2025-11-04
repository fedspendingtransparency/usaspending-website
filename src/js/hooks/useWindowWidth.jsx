import { useEffect, useState } from 'react';
import { throttle } from "lodash-es";

const useWindowWidth = (
    throttleWait = 50
) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

    return windowWidth;
};

export default useWindowWidth;
