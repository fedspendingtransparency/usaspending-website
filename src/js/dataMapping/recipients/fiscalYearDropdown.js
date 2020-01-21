/**
 * fiscalYearDropdown.js
 * Created by Maxwell Kendall 01/21/2020
 */

import moment from 'moment';
import { currentFiscalYear, earliestFiscalYear } from "helpers/fiscalYearHelper";

const earliestFY = moment(`10-01-${earliestFiscalYear}`);
const currentFY = moment(`10-01-${currentFiscalYear()}`);

// eslint-disable-next-line import/prefer-default-export
export const dropdownOptions = () => {
    const options = ['Trailing 12 Months', 'All Fiscal Years'];
    const yearsSinceEarliestFY = currentFY.diff(earliestFY, 'y');

    for (let i = 0; i < yearsSinceEarliestFY; i++) {
        const nextFY = earliestFiscalYear + i;
        options.push(`FY ${nextFY}`);
    }

    return options;
};

export const urlSelections = dropdownOptions()
    .map((option) => option
        .split(" ")
        .map((word) => word.toLowerCase())
        .join("_")
    );
