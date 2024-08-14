/**
 * AllFiscalYearsWithChips.jsx
 * Created by Brian Petway 08/14/24
 **/

import React from 'react';
import PropTypes from 'prop-types';
// import { Set } from 'immutable';

import FiscalYearChip from "./FiscalYearChip";

const propTypes = {
    timePeriods: PropTypes.array,
    selectedFY: PropTypes.object,
    updateFilter: PropTypes.func
};

const AllFiscalYearsWithChips = ({ timePeriods, selectedFY, updateFilter }) => {
    // const [allFY, setAllFY] = useState(true);

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

    // todo - only needed if we have an option to select all
    // const saveAllYears = () => {
    //     let newYears;
    //
    //     if (allFY) {
    //         // all the years are already selected, so this is an operation to unselect everything
    //         newYears = new Set([]);
    //     }
    //     else {
    //         // we need to select all the years
    //         newYears = new Set(timePeriods);
    //     }
    //
    //     updateFilter({
    //         fy: newYears
    //     });
    // };

    // todo - this is only needed of we have an option to select all fy, which is not in the first mock
    // useEffect(() => {
    //     if (timePeriods.length === selectedFY.count()) {
    //         setAllFY(true);
    //     }
    // }, [timePeriods, selectedFY]);

    return (
        <>
            {timePeriods.map((year) => (
                <FiscalYearChip
                    year={year}
                    key={`filter-fy-${year}`}
                    saveSelectedYear={saveSelectedYear} />
            ))}
        </>
    );
};

AllFiscalYearsWithChips.propTypes = propTypes;
export default AllFiscalYearsWithChips;
