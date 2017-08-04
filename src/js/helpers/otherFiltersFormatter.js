/**
 * otherFiltersFormatter.js
 * Created by Emily Gullo on 07/10/2017
 */

import { startCase, toLower } from 'lodash';

export const formatValue = (value, description) => {
    let displayValue = `${value}`;

    if (description !== null) {
        displayValue += ` | ${startCase(toLower(description))}`;
    }

    return displayValue;
};
