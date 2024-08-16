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
    selectedFY: PropTypes.bool
};

const defaultProps = {
    selected: false
};

const FiscalYearChip = ({
    year, saveSelectedYear, selectedFY
}) => {
    const saveYear = () => {
        saveSelectedYear(year);
    };

    // todo - add more required props for Button?
    return (
        <div className="fy-chip-container">
            <Button
                copy={year}
                buttonTitle={year}
                buttonSize="sm"
                buttonType="tertiary"
                backgroundColor="light"
                additionalClassnames={selectedFY.has(year) ? 'selected' : ''}
                onClick={saveYear} />
        </div>
    );
};

FiscalYearChip.propTypes = propTypes;
FiscalYearChip.defaultProps = defaultProps;
export default FiscalYearChip;
