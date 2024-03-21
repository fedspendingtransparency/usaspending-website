/**
 * TempSearchSectionWrapper.jsx
 * Created by Josue Aguilar 3/19/2024
 */

import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import NewPicker from "../sharedComponents/dropdowns/NewPicker";
import Accordion from "../sharedComponents/accordion/Accordion";
import ChartTableToggle from "../sharedComponents/buttons/ChartTableToggle";

const propTypes = {
    sectionTitle: PropTypes.string,
    dropdownOptions: PropTypes.array,
    selectedDropdownOption: PropTypes.number,
    viewType: PropTypes.string,
    setViewType: PropTypes.func,
    chart: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.object]),
    table: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.object]),
    dsmContent: PropTypes.string
};

const TempSearchSectionWrapper = ({
    sectionTitle,
    dropdownOptions,
    selectedDropdownOption,
    viewType,
    setViewType,
    chart,
    table,
    dsmContent
}) => {
    const [selectedDropdown, setSelectedDropdown] = useState(selectedDropdownOption);
    const [open, setOpen] = useState(false);

    const onClick = (e) => {
        setSelectedDropdown(e);
    };

    const sortFn = () => dropdownOptions;

    const changeView = (label) => {
        setViewType(label);
    };

    useEffect(() => {
        dropdownOptions.forEach((opt) => {
            opt.onClick = onClick;
        });
    }, [dropdownOptions]);

    return (
        <div className="search-results-wrapper temp-search__section-wrapper">
            <div className="temp-search__section-wrapper-header">
                <NewPicker
                    leftIcon=""
                    size="md"
                    label={sectionTitle}
                    options={dropdownOptions}
                    selectedOption={dropdownOptions.length
                        ? dropdownOptions.find((obj) => obj.value === selectedDropdown).name
                        : `${selectedDropdown}`}
                    sortFn={sortFn} />
                <ChartTableToggle activeType={viewType} changeView={changeView} />
            </div>
            <div className="temp-search__section-wrapper-content">
                {viewType === 'chart' ? (chart) : (table)}
            </div>
            <Accordion
                setOpen={setOpen}
                closedIcon="chevron-down"
                openIcon="chevron-up"
                title="Data sources and methodology" />
            {open && <div>{dsmContent}</div>}
        </div>
    );
};

TempSearchSectionWrapper.propTypes = propTypes;

export default TempSearchSectionWrapper;
