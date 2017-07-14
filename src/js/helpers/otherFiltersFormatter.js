/**
 * otherFiltersFormatter.js
 * Created by Emily Gullo on 07/10/2017
 */

import { startCase, toLower } from 'lodash';

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

export const formatNAICS = (naics) => {
    let displayValue = '';

    if (naics.place_type !== null) {
        displayValue = `${startCase(toLower(naics.place_type))} | `;
    }

    displayValue += `${naics.place}`;

    if (naics.parent !== null &&
        (naics.place_type !== null && naics.place_type !== 'COUNTRY')) {
        displayValue += `, ${naics.parent}`;
    }

    return displayValue;
};

export const formatPSC = (psc) => {
    let displayValue = '';

    if (psc.place_type !== null) {
        displayValue = `${startCase(toLower(psc.place_type))} | `;
    }

    displayValue += `${psc.place}`;

    if (psc.parent !== null &&
        (psc.place_type !== null && psc.place_type !== 'COUNTRY')) {
        displayValue += `, ${psc.parent}`;
    }

    return displayValue;
};
