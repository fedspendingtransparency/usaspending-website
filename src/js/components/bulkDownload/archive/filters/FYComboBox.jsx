import React from 'react';
import PropTypes from "prop-types";
import { currentFiscalYear, earliestFiscalYear } from "helpers/fiscalYearHelper";
import ComboBox from "components/sharedComponents/ComboBox";

const currentFY = currentFiscalYear();
const fyOptions = [];

for (let year = currentFY; year >= earliestFiscalYear; year--) {
    fyOptions.push({ value: year, text: `FY ${year}` });
}

const propTypes = { updateFilter: PropTypes.func }

const FYComboBox = ({ updateFilter }) => {
    const onSelect = (e) => {
        e.preventDefault();
        const target = e.target;
        updateFilter('fy', target.value);
    };

    return (
        <ComboBox
            optionsArray={fyOptions}
            onSelect={onSelect}
            label={"Fiscal Year (FY)"}
            placeholder={"Select a Fiscal Year"}
            defaultValue={`FY ${currentFY}`} />
    )
}

FYComboBox.propTypes = propTypes;
export default FYComboBox;
