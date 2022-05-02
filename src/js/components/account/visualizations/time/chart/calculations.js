/**
 * calculations.js
 * Created by Kevin Li 7/26/17
 */

import { min, max } from 'lodash';

export const buildYRange = (allY) => {
    const yRange = [];
    let yMin = min(allY);
    if (yMin > 0) {
    // set the minimum to zero if there are no negative values
        yMin = 0;
    }

    yRange.push(yMin);

    const rawMax = max(allY);

    if (rawMax > 0) {
    //  the max should the be max Y value, but only if it is positive
        yRange.push(rawMax);
    }
    else if (rawMax < 0) {
    // if the entire data set is negative, then use 0 as the max
        yRange.push(0);
    }
    else if (rawMax === 0) {
    // in the event that that the max value is 0, use an arbitrary $1,000 as the max
        yRange.push(1000);
    }

    return yRange;
};

