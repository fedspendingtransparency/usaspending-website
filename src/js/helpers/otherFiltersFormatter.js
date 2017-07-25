/**
 * otherFiltersFormatter.js
 * Created by Emily Gullo on 07/10/2017
 */

import { startCase, toLower } from 'lodash';

export const formatCFDA = (cfda, description) => {
    let displayValue = `${cfda}`;

    if (description !== null) {
        displayValue += ` | ${startCase(toLower(description))}`;
    }

    return displayValue;
};

export const formatNAICS = (naics, description) => {
    let displayValue = `${naics}`;

    if (description !== null) {
        displayValue += ` | ${startCase(toLower(description))}`;
    }

    return displayValue;
};

export const formatPSC = (psc) => {
    const displayValue = `${psc}`;

    return displayValue;
};
