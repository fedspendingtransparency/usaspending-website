/**
 * AgencyFilter.jsx
 * Created by Lizzie Salita 11/2/17
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import {
    AngleDown, AngleUp, CheckCircle, ExclamationCircle
} from "components/sharedComponents/icons/Icons";
import { awardDownloadOptions } from "dataMapping/bulkDownload/bulkDownloadOptions";
import ComboBox from "../../../sharedComponents/ComboBox";

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
    const currentSubAgencyName = useSelector((state) => state.bulkDownload.awards.subAgency.name);
    const [showAgencyPicker, setShowAgencyPicker] = useState(false);
    const [showSubAgencyPicker, setShowSubAgencyPicker] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const currentAgencyName = currentAgency.name;
    const valid = currentAgency.id !== '';

    const onChange = (e) => updateFilter('agencyType', e.target.value);

    const toggleSubAgencyPicker = (e) => {
        e.preventDefault();
        // Disable the button if there are no sub-agencies
        if (subAgencies.length > 0) setShowSubAgencyPicker((state) => !state);
    };

    const handleAgencySelect = (e) => {
        e.preventDefault();
        const target = e.target;
        console.log({ target });
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

        setShowSubAgencyPicker(false);
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

    // Create the CFO agencies options
    const cfoAgencies = agencies.cfoAgencies.map((agency) => (
        <li
            className="field-item indent"
            key={`field-${agency.toptier_agency_id}`}>
            <button
                className="item-button"
                title={agency.name}
                aria-label={agency.name}
                value={agency.toptier_agency_id}
                name={agency.name}
                onClick={handleAgencySelect}>
                {agency.name}
            </button>
        </li>
    ));

    // Create the sub-agency options
    const subAgenciesList = subAgencies.map((subAgency, i) => (
        <li
            className="field-item"
            key={`field-${subAgency.subtier_agency_name}-${i}`}>
            <button
                className="item-button"
                title={subAgency.subtier_agency_name}
                aria-label={subAgency.subtier_agency_name}
                value={subAgency.subtier_agency_name}
                onClick={handleSubAgencySelect}>
                {subAgency.subtier_agency_name}
            </button>
        </li>
    ));

    let showSubAgencyClass = ' hide';
    let subAgencyIcon = <AngleDown alt="Pick a sub-agency" />;
    if (showSubAgencyPicker) {
        showSubAgencyClass = '';
        subAgencyIcon = <AngleUp alt="Pick a sub-agency" />;
    }

    let subAgencyDisabledClass = '';
    if (subAgencies.length === 0) {
        subAgencyDisabledClass = 'disabled';
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

    let test = [{ name: 'All', toptier_agency_id: 'all', toptier_code: 'all' }];

    Object.entries(agencies).forEach(([key, value]) => {
        const title = {
            name: key === "cfoAgencies" ? "CFO Agencies" : "Other Agencies",
            toptier_agency_id: key,
            toptier_code: null
        };
        test = [...test, title, ...value];
    });

    const optionsArray = test.map(({
        name,
        toptier_agency_id: id,
        toptier_code: code
    }) => (
        { text: name, value: code ? id.toString() : `${id}-disabled` }
    ));

    return (
        <div className="download-filter">
            <h3 className="download-filter__title">
                {icon} Select an awarding or funding
                <span className="download-filter__title_em"> agency </span>
                and <span>sub-agency</span>.
            </h3>
            <div className="download-filter__content">
                {agencyTypesList}
                <div className="filter-picker">
                    <label
                        className="select-label"
                        htmlFor="agency-select">
                            Agency
                    </label>
                </div>
                <ComboBox
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    optionsArray={optionsArray}
                    onSelect={handleAgencySelect} />
                <div className="filter-picker">
                    <label
                        className="select-label"
                        htmlFor="sub-agency-select"
                        tabIndex={-1}>
                            Sub-Agency
                    </label>
                    <div className="field-picker">
                        <button
                            className={`selected-button ${subAgencyDisabledClass}`}
                            title={currentSubAgencyName}
                            aria-label={currentSubAgencyName}
                            onClick={toggleSubAgencyPicker}
                            disabled={subAgencyDisabledClass === 'disabled'}
                            tabIndex={subAgencyDisabledClass === 'disabled' ? -1 : 0}>
                            <div className="label">
                                {currentSubAgencyName}
                            </div>
                            <div className="arrow-icon">
                                {subAgencyIcon}
                            </div>
                        </button>

                        <div
                            className={`field-list${showSubAgencyClass}`}>
                            <ul>
                                {subAgenciesList}
                            </ul>
                        </div>
                    </div>
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
