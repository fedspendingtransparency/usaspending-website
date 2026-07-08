/**
 * AwardDataArchiveForm.jsx
 * Created by Lizzie Salita 12/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import FilterSelectionTitle from "../FilterSelectionTitle";
import AwardTypeToggle from "./filters/AwardTypeToggle";
import AgencyComboBox from "./filters/AgencyComboBox";
import FYComboBox from "./filters/FYComboBox";

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

    return (
        <>
            <FilterSelectionTitle type="agencyFy" />
            <form className="archive-form" onSubmit={handleSubmit}>
                <div className="award-data-archive-form">
                    <AgencyComboBox agencies={agencies} updateFilter={updateFilter} />
                    <FYComboBox updateFilter={updateFilter} />
                </div>
                <AwardTypeToggle filters={filters} updateFilter={updateFilter} />
            </form>
        </>
    );
}

AwardDataArchiveForm.propTypes = propTypes;
export default AwardDataArchiveForm;
