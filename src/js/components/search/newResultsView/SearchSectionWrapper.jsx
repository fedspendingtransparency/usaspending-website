/**
 * SearchSectionWrapper.jsx
 * Created by Josue Aguilar 3/19/2024
 */

import React, { useState } from 'react';
import PropTypes from "prop-types";
import NewPicker from "../../sharedComponents/dropdowns/NewPicker";
import Accordion from "../../sharedComponents/accordion/Accordion";
import ChartTableToggle from "../../sharedComponents/buttons/ChartTableToggle";

const propTypes = {
    sectionTitle: PropTypes.string,
    dropdownOptions: PropTypes.array,
    selectedDropdownOption: PropTypes.string,
    viewType: PropTypes.string,
    setViewType: PropTypes.func,
    chart: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    table: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    dsmContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
};

const SearchSectionWrapper = ({
    sectionTitle,
    dropdownOptions,
    selectedDropdownOption,
    viewType,
    setViewType,
    chart,
    table,
    dsmContent,
    children
}) => {
    const [openAccordion, setOpenAccordion] = useState(false);

    const sortFn = () => dropdownOptions;

    const changeView = (label) => {
        setViewType(label);
    };

    // Measures content height to set height for dsm content
    const content = document.querySelector('.temp-search__section-wrapper-content')?.clientHeight;

    return (
        <div className="search-results-wrapper temp-search__section-wrapper">
            <div className="temp-search__section-wrapper-header">
                <NewPicker
                    leftIcon=""
                    size="md"
                    label={sectionTitle}
                    options={dropdownOptions}
                    selectedOption={dropdownOptions.length
                        ? dropdownOptions.find((obj) => obj.value === selectedDropdownOption).name
                        : `${selectedDropdownOption}`}
                    sortFn={sortFn} />
                <ChartTableToggle activeType={viewType} changeView={changeView} />
            </div>
            {!openAccordion && (
                <div className="temp-search__section-wrapper-content">
                    {children}
                    {/*{viewType === 'chart' ? (chart) : (table)}*/}
                </div>
            )}
            <Accordion
                setOpen={setOpenAccordion}
                closedIcon="chevron-down"
                openIcon="chevron-up"
                title="Data sources and methodology" >
                {openAccordion && (
                    <div
                        className="temp-search__section-wrapper-dsm"
                        style={{ height: `${content}px` }}>
                        {dsmContent}
                    </div>
                )}
            </Accordion>
        </div>
    );
};

SearchSectionWrapper.propTypes = propTypes;

export default SearchSectionWrapper;
