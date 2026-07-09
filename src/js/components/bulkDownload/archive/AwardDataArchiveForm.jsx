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
    agencies: PropTypes.object
};

const AwardDataArchiveForm = ({
    filters,
    updateFilter,
    agencies
}) => (
    <>
        <FilterSelectionTitle type="agencyFy" />
        <form className="archive-form">
            <div className="award-data-archive-form">
                <AgencyComboBox agencies={agencies} updateFilter={updateFilter} />
                <FYComboBox updateFilter={updateFilter} />
            </div>
            <AwardTypeToggle filters={filters} updateFilter={updateFilter} />
        </form>
    </>
);

AwardDataArchiveForm.propTypes = propTypes;
export default AwardDataArchiveForm;
