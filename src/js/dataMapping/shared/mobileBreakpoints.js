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

export const getScreenSizeType = (width) => {
    if (width < smallScreen) return 'mobile';
    else if ((smallScreen <= width) && (width < smTabletScreen)) return 'tablet';
    else if ((smTabletScreen <= width) && (width < tabletScreen)) return 'tablet';
    else if ((tabletScreen <= width) && (width < mediumScreen)) return 'desktop';
    else if ((mediumScreen <= width) && (width < largeScreen)) return 'largeDesktop';
    return 'xLargeDesktop';
};
