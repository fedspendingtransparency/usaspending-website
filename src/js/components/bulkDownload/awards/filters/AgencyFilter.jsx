/**
 * AgencyFilter.jsx
 * Created by Lizzie Salita 11/2/17
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

import { awardDownloadOptions } from "dataMapping/bulkDownload/bulkDownloadOptions";
import {
    CheckCircle, ExclamationCircle
} from "components/sharedComponents/icons/Icons";
import ComboBox from "components/sharedComponents/ComboBox";

const propTypes = {
    agencies: PropTypes.object,
    subAgencies: PropTypes.array,
    setSubAgencyList: PropTypes.func,
    updateFilter: PropTypes.func
};

// eslint-disable-next-line prefer-arrow-callback
const AgencyFilter = memo(function AgencyFilter({
    agencies,
    subAgencies,
    setSubAgencyList,
    updateFilter
}) {
    const currentAgencyType = useSelector((state) => state.bulkDownload.awards.agencyType);
    const currentAgency = useSelector((state) => state.bulkDownload.awards.agency);

    const valid = currentAgency.id !== '';

    const onChange = (e) => updateFilter('agencyType', e.target.value);

    const handleAgencySelect = (e) => {
        e.preventDefault();
        const target = e.target;
        updateFilter('agency', {
            id: target.value,
            name: target.name
        });

        if (target.value === 'all') {
            setSubAgencyList('');
        }
        else {
            setSubAgencyList(target.value);
        }
    };

    const handleSubAgencySelect = (e) => {
        e.preventDefault();
        const target = e.target;
        updateFilter('subAgency', {
            name: target.value
        });
    };

    let icon = (
        <div className="icon valid">
            <CheckCircle />
        </div>
    );

    if (!valid) {
        icon = (
            <div className="icon invalid">
                <ExclamationCircle />
            </div>
        );
    }

    const agencyTypesList = awardDownloadOptions.agencyTypes.map((agencyType) => (
        <div
            className="radio"
            key={agencyType.name}>
            <input
                type="radio"
                aria-label={agencyType.name}
                value={agencyType.name}
                name="agencyType"
                checked={currentAgencyType === agencyType.name}
                onChange={onChange} />
            <label
                className="radio-label"
                htmlFor="locationType">
                {agencyType.label}
            </label>
        </div>
    ));

    // data manipulation for combo boxes
    let agenciesArray = [{ name: 'All', toptier_agency_id: 'all', toptier_code: 'all' }];

    Object.entries(agencies).forEach(([key, value]) => {
        const title = {
            name: key === "cfoAgencies" ? "CFO Agencies" : "Other Agencies",
            toptier_agency_id: key,
            toptier_code: null
        };
        agenciesArray = [...agenciesArray, title, ...value];
    });

    const agenciesOptions = agenciesArray.map(({
        name,
        toptier_agency_id: id,
        toptier_code: code
    }) => (
        { text: name, value: code ? id.toString() : `${id}-disabled` }
    ));

    const subAgenciesOptions = subAgencies
        .map(({ subtier_agency_name: name }) => ({ text: name, value: name }));

    return (
        <div className="download-filter">
            <h3 className="download-filter__title">
                {icon} Select an awarding or funding
                <span className="download-filter__title_em"> agency </span>
                and <span>sub-agency</span>.
            </h3>
            <div className="download-filter__content agency">
                {agencyTypesList}
                <div className="combo-box-container">
                    <ComboBox
                        optionsArray={agenciesOptions}
                        onSelect={handleAgencySelect}
                        label={(<>Awarding Agency <span>(Required)</span></>)}
                        placeholder="Select agency"
                        disabled={agenciesOptions.length === 3} />
                    <ComboBox
                        optionsArray={subAgenciesOptions}
                        onSelect={handleSubAgencySelect}
                        label="Sub-agency"
                        placeholder="Select sub-agency"
                        disabled={subAgenciesOptions.length === 0} />
                </div>
                <p className="download-filter__content-note">
                    <span className="download-filter__content-note_bold">Note: </span>
                    Prior to FY19, Financial Assistance awards
                    (grants, direct payments, loans, insurance, and other financial assistance)
                    only sporadically include Funding Agency data.
                </p>
            </div>
        </div>
    );
});

AgencyFilter.propTypes = propTypes;
export default AgencyFilter;
