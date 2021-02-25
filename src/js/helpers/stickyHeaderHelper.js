import { useState } from 'react';
import { throttle } from 'lodash';
import Cookies from 'js-cookie';
import {
    globalBannerHeight,
    globalCovidBannerCookie
} from 'dataMapping/stickyHeader/stickyHeader';

export const getStickyBreakPointForSidebar = () => {
    const isGlobalBannerHidden = Cookies.get(globalCovidBannerCookie) === 'hide';

    if (isGlobalBannerHidden) {
        return 97;
    }
    return 97 + globalBannerHeight;
};

export const useDynamicStickyClass = (stickyRef, fixedStickyBreakpoint = null) => {
    const [dynamicStickyBreakpoint, setDynamicStickyBreakpoint] = useState(0);
    const [isSticky, setIsSticky] = useState(false);
    return [
        isSticky,
        // scrollPosition at which we apply the sticky-class
        dynamicStickyBreakpoint,
        // setSticky
        setIsSticky,
        // handleScroll
        throttle(() => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            if (fixedStickyBreakpoint && scrollY >= fixedStickyBreakpoint && !isSticky) {
                // we know which y position to apply the sticky class
                setIsSticky(true);
            }
            else if (!fixedStickyBreakpoint && scrollY >= dynamicStickyBreakpoint && !isSticky) {
                // we don't know which y position to apply the sticky class
                setIsSticky(true);
            }
            else if (scrollY < fixedStickyBreakpoint) {
                setIsSticky(false);
            }
            else if (scrollY < dynamicStickyBreakpoint) {
                setIsSticky(false);
            }
        }, 100),
        // measureScreen
        throttle(() => {
            const wrapperY = stickyRef.current
                ? stickyRef.current.offsetTop
                : 0;
            setDynamicStickyBreakpoint(wrapperY);
        }, 100)
    ];
};
