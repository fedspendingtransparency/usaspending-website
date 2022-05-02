/**
 * fiscalYearDropdown.js
 * Created by Maxwell Kendall 01/21/2020
 */

import moment from 'moment';
import { currentFiscalYear, earliestFiscalYear } from "helpers/fiscalYearHelper";

const earliestFY = moment(`10-01-${earliestFiscalYear}`);
const currentFY = moment(`10-01-${currentFiscalYear()}`);
const dropdownLabels = ['Trailing 12 Months', 'All Fiscal Years'];

// eslint-disable-next-line import/prefer-default-export
export const getDropdownLabelsByApiValue = () => {
    const yearsSinceEarliestFY = currentFY.diff(earliestFY, 'y');

    for (let i = 0; i <= yearsSinceEarliestFY; i++) {
        const nextFY = earliestFiscalYear + i;
        dropdownLabels.push(`FY ${nextFY}`);
    }

    return dropdownLabels
        .reduce((acc, label) => {
            if (label === 'Trailing 12 Months') {
                return {
                    ...acc,
                    latest: label
                };
            }
            else if (label === 'All Fiscal Years') {
                return {
                    ...acc,
                    all: label
                };
            }

            return {
                ...acc,
                [label.split(" ")[1]]: label
            };
        }, {});
};
