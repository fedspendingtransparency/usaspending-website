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
    if (windowWidth >= mLargeScreen) return 'isDesktop';
    else if ((windowWidth < mLargeScreen) && (windowWidth >= mediumScreen)) return 'isMedium';
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
