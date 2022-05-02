/**
 * locationFormatter.js
 * Created by michaelbray on 2/23/17.
 */

import { startCase, toLower } from 'lodash';

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other helpers
export const formatLocation = (location) => {
    let displayValue = '';

    if (location.place_type !== null) {
        displayValue = `${startCase(toLower(location.place_type))} | `;
    }

    displayValue += `${location.place}`;

    if (location.parent !== null &&
        (location.place_type !== null && location.place_type !== 'COUNTRY')) {
        displayValue += `, ${location.parent}`;
    }

    return displayValue;
};
/* eslint-enable import/prefer-default-export */
