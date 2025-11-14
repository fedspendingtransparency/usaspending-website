import { useEffect, useState } from "react";
import { throttle } from "lodash-es";
import PropTypes from "prop-types";

const propTypes = { throttleWait: PropTypes.number };

const useWindowWidth = (throttleWait = 50) => {
    const [windowWidth, setWindowWidth] = useState(0);

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

useWindowWidth.propTypes = propTypes;
export default useWindowWidth;
