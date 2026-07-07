/**
 * AwardDataArchiveForm.jsx
 * Created by Lizzie Salita 12/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { currentFiscalYear, earliestFiscalYear } from "helpers/fiscalYearHelper";
import ComboBox from "components/sharedComponents/ComboBox";
import FilterSelectionTitle from "../FilterSelectionTitle";
import AwardTypeToggle from "./filters/AwardTypeToggle";
import AgencyComboBox from "./filters/AgencyComboBox";

const currentFY = currentFiscalYear();
const fyOptions = [];

for (let year = currentFY; year >= earliestFiscalYear; year--) {
    fyOptions.push({ value: year, text: `FY ${year}` });
}

const propTypes = {
    filters: PropTypes.object,
    updateFilter: PropTypes.func,
    agencies: PropTypes.object,
    requestResults: PropTypes.func
};

const AwardDataArchiveForm = ({
    filters,
    updateFilter,
    agencies,
    requestResults
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        requestResults();
    };

    const onFYSelect = (e) => {
        e.preventDefault();
        const target = e.target;
        updateFilter('fy', target.value);
    };

    return (
        <>
            <FilterSelectionTitle type="agencyFy" />
            <form className="archive-form" onSubmit={handleSubmit}>
                <div className="award-data-archive-form">
                    <AgencyComboBox agencies={agencies} updateFilter={updateFilter} />
                    <ComboBox
                        optionsArray={fyOptions}
                        onSelect={onFYSelect}
                        label={"Fiscal Year (FY)"}
                        placeholder={"Select a Fiscal Year"}
                        defaultValue={`FY ${currentFY}`} />
                </div>
                <AwardTypeToggle filters={filters} updateFilter={updateFilter} />
            </form>
        </>
    );
}

AwardDataArchiveForm.propTypes = propTypes;
export default AwardDataArchiveForm;
