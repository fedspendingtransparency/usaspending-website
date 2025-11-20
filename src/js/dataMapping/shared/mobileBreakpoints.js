/**
 * mobileBreakpoints.js
 * Created by Lizzie Salita 3/26/21
 */

// exports our SCSS breakpoint variables for use in JS files
// these values should match scss/core/variables.scss

export const smallScreen = 320; // dnu for custom hook
export const smTabletScreen = 576; // less than is mobile
export const tabletScreen = 768; // not used?
export const mediumScreen = 992; // larger than or equal to is desktop
export const largeScreen = 1200; // dnu for custom hook
export const mLargeScreen = 1400; // dnu for custom hook
export const xLargeScreen = 1640; // dnu for custom hook

export const getScreenSize = (windowWidth) => {
    if (windowWidth >= mediumScreen) return 'isDesktop';
    else if ((windowWidth < mediumScreen) && (windowWidth >= tabletScreen)) return 'isMedium';
    else if ((windowWidth < tabletScreen) && (windowWidth >= smTabletScreen)) return 'isTablet';
    return 'isMobile';
};

export const getScreenSizeTrue = (screenSize) => {
    switch (screenSize) {
        case 'isMedium': return {
            isMobile: false,
            isTablet: false,
            isMedium: true,
            isDesktop: false
        };
        case 'isTablet': return {
            isMobile: false,
            isTablet: true,
            isMedium: true,
            isDesktop: false
        };
        case 'isMobile': return {
            isMobile: true,
            isTablet: true,
            isMedium: true,
            isDesktop: false
        };
        default: return {
            isMobile: false,
            isTablet: false,
            isMedium: false,
            isDesktop: true
        };
    }
};

export const getScreenSizeFalse = (screenSize) => {
    switch (screenSize) {
        case 'isMedium': return {
            isMobile: false,
            isTablet: false,
            isMedium: false,
            isDesktop: true
        };
        case 'isTablet': return {
            isMobile: false,
            isTablet: false,
            isMedium: true,
            isDesktop: false
        };
        case 'isMobile': return {
            isMobile: false,
            isTablet: true,
            isMedium: true,
            isDesktop: false
        };
        default: return {
            isMobile: true,
            isTablet: true,
            isMedium: true,
            isDesktop: false
        };
    }
};
