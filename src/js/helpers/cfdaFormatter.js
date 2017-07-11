/**
 * cfdaFormatter.js
 * Created by Emily Gullo on 07/10/2017
 */

import { startCase, toLower } from 'lodash';

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other helpers
export const formatCFDA = (cfda) => {
    let displayValue = '';

    if (cfda.place_type !== null) {
        displayValue = `${startCase(toLower(cfda.place_type))} | `;
    }

    displayValue += `${cfda.place}`;

    if (cfda.parent !== null &&
        (cfda.place_type !== null && cfda.place_type !== 'COUNTRY')) {
        displayValue += `, ${cfda.parent}`;
    }

    return displayValue;
};
/* eslint-enable import/prefer-default-export */
