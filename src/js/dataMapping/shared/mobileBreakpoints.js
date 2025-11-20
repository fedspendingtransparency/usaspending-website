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
    if (windowWidth > xLargeScreen) return 'isXXLarge';
    else if ((windowWidth <= xLargeScreen) && (windowWidth > mLargeScreen)) return 'isXLarge';
    else if ((windowWidth <= mLargeScreen) && (windowWidth > largeScreen)) return 'isMLarge';
    else if ((windowWidth <= largeScreen) && (windowWidth > mediumScreen)) return 'isLarge';
    else if ((windowWidth <= mediumScreen) && (windowWidth > tabletScreen)) return 'isMedium';
    else if ((windowWidth <= tabletScreen) && (windowWidth > smTabletScreen)) return 'isTablet';
    else if ((windowWidth <= smTabletScreen) && (windowWidth > smallScreen)) return 'isSmTablet';
    return 'isSmall';
};

export const getScreenSizeFalse = (screenSize) => {
    switch (screenSize) {
        case 'isXLarge': return 'isXXLarge';
        case 'isMLarge': return 'isXLarge';
        case 'isLarge': return 'isMLarge';
        case 'isMedium': return 'isLarge';
        case 'isTablet': return 'isMedium';
        case 'isSmTablet': return 'isTablet';
        case 'isSmall': return 'isSmTablet';
        default: return 'isSmall';
    }
};
