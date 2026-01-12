/**
 * IsMobileContext.js
 * Created on 1/5/2026 by Josue Aguilar
 */

import { createContext } from "react";

const IsMobileContext = createContext({
    isMobile: false,
    isTablet: false,
    isMedium: false,
    isDesktopSm: false,
    isDesktopLg: false
});

export default IsMobileContext;
