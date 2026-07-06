/**
 * AwardDataArchiveForm.jsx
 * Created by Lizzie Salita 12/13/17
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { currentFiscalYear, earliestFiscalYear } from "helpers/fiscalYearHelper";
import ComboBox from "components/sharedComponents/ComboBox";
import ArchiveTypeFilter from './filters/TypeFilter';
import FilterSelectionTitle from "../FilterSelectionTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

    const agenciesOptions = agenciesArray.map(({
        name,
        toptier_agency_id: id,
        toptier_code: code
    }) => (
        { text: name, value: code ? id.toString() : `${id}-disabled`, fedCode: code }
    ));

    const onAgencySelect = (e) => {
        e.preventDefault();
        const target = e.target;
        updateFilter('agency', {
            id: target.value,
            name: target.name
        });
    };

    const onFYSelect = (e) => {
        e.preventDefault();
        const target = e.target;
        updateFilter('fy', target.value);
    };

    const onAwardTypeSelect = (e) => {
        e.preventDefault();
        const target = e.target;
        updateFilter('type', {
            name: target.value,
            display: target.name
        });
    }

    return (
        <>
            <FilterSelectionTitle type="agencyFy" />
            <form className="archive-form" onSubmit={handleSubmit}>
                <div className="award-data-archive-form">
                    <ComboBox
                        optionsArray={agenciesOptions}
                        onSelect={onAgencySelect}
                        label={"Agency"}
                        placeholder={"Select an Agency"}
                        defaultValue={"All"} />
                    <ComboBox
                        optionsArray={fyOptions}
                        onSelect={onFYSelect}
                        label={"Fiscal Year (FY)"}
                        placeholder={"Select a Fiscal Year"}
                        defaultValue={`FY ${currentFY}`} />
                </div>
                <div className="award-type__container">
                    View Award Type:
                    <div className="award-type__buttons">
                        <button
                            className={`view-button${
                                filters.type.name === "contracts" ? " active" : ""
                            }`}
                            value={"contracts"}
                            title={"Contracts"}
                            aria-label={"Contracts"}
                            name={"Contracts"}
                            onClick={onAwardTypeSelect}>
                            Contracts
                        </button>
                        <button
                            className={`view-button${
                                filters.type.name === "assistance" ? " active" : ""
                            }`}
                            value={"assistance"}
                            title={"Financial Assistance"}
                            aria-label={"Financial Assistance"}
                            name={"Financial Assistance"}
                            onClick={onAwardTypeSelect}>
                            Financial Assistance
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

AwardDataArchiveForm.propTypes = propTypes;
export default AwardDataArchiveForm;
