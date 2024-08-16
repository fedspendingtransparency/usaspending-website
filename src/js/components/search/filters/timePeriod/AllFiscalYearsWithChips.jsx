/**
 * AllFiscalYearsWithChips.jsx
 * Created by Brian Petway 08/14/24
 **/

import React from 'react';
import PropTypes from 'prop-types';

import FiscalYearChip from "./FiscalYearChip";

const propTypes = {
    timePeriods: PropTypes.array,
    selectedFY: PropTypes.object,
    updateFilter: PropTypes.func
};

const AllFiscalYearsWithChips = ({ timePeriods, selectedFY, updateFilter }) => {
    const saveSelectedYear = (year) => {
        let newYears;

        // check if we are adding or removing
        if (selectedFY.has(year)) {
            // the year already exists in the set so we are removing
            newYears = selectedFY.delete(year);
        }
        else {
            // the year does not yet exist in the set so we are adding
            newYears = selectedFY.add(year);
        }

        updateFilter({
            fy: newYears
        });
    };

    return (
        <div className="fiscal-years-with-chips">
            {timePeriods.map((year) => (
                <FiscalYearChip
                    selectedFY={selectedFY}
                    year={year}
                    key={`filter-fy-${year}`}
                    saveSelectedYear={saveSelectedYear} />
            ))}
        </div>
    );
};

AllFiscalYearsWithChips.propTypes = propTypes;
export default AllFiscalYearsWithChips;
