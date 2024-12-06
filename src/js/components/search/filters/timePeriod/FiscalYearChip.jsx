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
    selectedFY: PropTypes.object
};

const FiscalYearChip = ({
    year, saveSelectedYear, selectedFY
}) => {
    const saveYear = () => {
        saveSelectedYear(year);
    };

    return (
        <div className="fy-chip-container">
            <Button
                copy={`FY ${year.toString()}`}
                buttonTitle={`FY ${year.toString()}`}
                buttonSize="sm"
                buttonType="tertiary"
                backgroundColor="light"
                additionalClassnames={selectedFY.has(year) ? 'selected' : ''}
                onClick={saveYear} />
        </div>
    );
};

FiscalYearChip.propTypes = propTypes;

export default FiscalYearChip;
