/**
 * FiscalYearChip.jsx
 * Created by Brian Petway 08/14/24
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "data-transparency-ui";

const propTypes = {
    year: PropTypes.string,
    saveSelectedYear: PropTypes.func,
    checked: PropTypes.bool,
    saveAllYears: PropTypes.func
};

const defaultProps = {
    checked: false
};

const FiscalYearChip = ({
    year, saveSelectedYear, checked, saveAllYears
}) => {
    const saveYear = () => {
        saveSelectedYear(year);
    };

    // const allYears = () => {
    //     saveAllYears();
    // };

    // todo - use checked prop to determine the style, for bg color
    return (
        <div className="fy-chip-container">
            <Button
                copy={year}
                buttonTitle={year}
                buttonSize="sm"
                buttonType="tertiary"
                backgroundColor="light"
                onClick={saveYear} />
        </div>
    );
};

FiscalYearChip.propTypes = propTypes;
FiscalYearChip.defaultProps = defaultProps;
export default FiscalYearChip;
