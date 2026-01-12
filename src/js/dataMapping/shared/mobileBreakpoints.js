/**
 * mobileBreakpoints.js
 * Created by Lizzie Salita 3/26/21
 */

// exports our SCSS breakpoint variables for use in JS files
// these values should match scss/core/variables.scss

export const smallScreen = 320;
export const smTabletScreen = 576;
export const tabletScreen = 768;
export const mediumScreen = 992;
export const largeScreen = 1200;
export const mLargeScreen = 1400;
export const xLargeScreen = 1640;

export const getScreenSize = (windowWidth) => {
    if (windowWidth >= mLargeScreen) return 'isDesktopLg';
    else if ((windowWidth < mLargeScreen) && (windowWidth >= mediumScreen)) return 'isDesktopSm';
    else if ((windowWidth < mediumScreen) && (windowWidth >= tabletScreen)) return 'isMedium';
    else if ((windowWidth < tabletScreen) && (windowWidth >= smTabletScreen)) return 'isTablet';
    return 'isMobile';
};

export const getScreenSizeTrue = (screenSize) => {
    switch (screenSize) {
        case 'isDesktopSm': return {
            isMobile: false,
            isTablet: false,
            isMedium: false,
            isDesktopSm: true,
            isDesktopLg: false
        };
        case 'isMedium': return {
            isMobile: false,
            isTablet: false,
            isMedium: true,
            isDesktopSm: true,
            isDesktopLg: false
        };
        case 'isTablet': return {
            isMobile: false,
            isTablet: true,
            isMedium: true,
            isDesktopSm: true,
            isDesktopLg: false
        };
        case 'isMobile': return {
            isMobile: true,
            isTablet: true,
            isMedium: true,
            isDesktopSm: true,
            isDesktopLg: false
        };
        default: return {
            isMobile: false,
            isTablet: false,
            isMedium: false,
            isDesktopSm: false,
            isDesktopLg: true
        };
    }
};

export const getScreenSizeFalse = (screenSize) => {
    switch (screenSize) {
        case 'isDesktopSm': return {
            isMobile: false,
            isTablet: false,
            isMedium: false,
            isDesktopSm: false,
            isDesktopLg: true
        };
        case 'isMedium': return {
            isMobile: false,
            isTablet: false,
            isMedium: false,
            isDesktopSm: true,
            isDesktopLg: false
        };
        case 'isTablet': return {
            isMobile: false,
            isTablet: false,
            isMedium: true,
            isDesktopSm: true,
            isDesktopLg: false
        };
        case 'isMobile': return {
            isMobile: false,
            isTablet: true,
            isMedium: true,
            isDesktopSm: true,
            isDesktopLg: false
        };
        default: return {
            isMobile: true,
            isTablet: true,
            isMedium: true,
            isDesktopSm: true,
            isDesktopLg: false
        };
    }
};
