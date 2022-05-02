/**
 * easingFunctions.js
 * Created by Kevin Li 7/10/17
 * Based on https://github.com/jimjeffers/Easie/blob/master/easie.js
 */

export const easeInOutQuad = (time, start, end, duration) => {
    const change = end - start;

    const progress = (time / (duration / 2));
    if (progress < 1) {
        return ((change / 2) * progress * progress) + start;
    }

    return ((-change / 2) * (((progress - 1) * (progress - 3)) - 1)) + start;
};
