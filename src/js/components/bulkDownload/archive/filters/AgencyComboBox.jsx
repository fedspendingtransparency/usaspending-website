import React from 'react';
import PropTypes from "prop-types";
import ComboBox from "../../../../components/sharedComponents/ComboBox";

const propTypes = {
    updateFilter: PropTypes.func,
    agencies: PropTypes.object
};

const AgencyComboBox = ({ updateFilter, agencies }) => {
    // Agency Options
    let agenciesArray = [{ name: 'All', toptier_agency_id: 'all', toptier_code: 'all' }];

    Object.entries(agencies).forEach(([key, value]) => {
        const title = {
            name: key === "cfoAgencies" ? "CFO AGENCIES" : "OTHER AGENCIES",
            toptier_agency_id: key,
            toptier_code: null
        };
        agenciesArray = [...agenciesArray, title, ...value];
    });

    const optionsArray = agenciesArray.map(({
        name,
        toptier_agency_id: id,
        toptier_code: code
    }) => (
        { text: name, value: code ? id.toString() : `${id}-disabled`, fedCode: code }
    ));

    const onSelect = (e) => {
        e.preventDefault();
        const target = e.target;
        updateFilter('agency', {
            id: target.value,
            name: target.name
        });
    };

    return (
        <ComboBox
            optionsArray={optionsArray}
            onSelect={onSelect}
            label={"Agency"}
            placeholder={"Select an Agency"}
            defaultValue={"All"} />
    )
}

AgencyComboBox.propTypes = propTypes;
export default AgencyComboBox;
