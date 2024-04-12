/**
 * SearchSectionWrapper.jsx
 * Created by Josue Aguilar 3/19/2024
 */

import React, { useState } from 'react';
import PropTypes from "prop-types";
import { ErrorMessage, LoadingMessage, NoResultsMessage } from "data-transparency-ui";
import NewPicker from "../../sharedComponents/dropdowns/NewPicker";
import Accordion from "../../sharedComponents/accordion/Accordion";
import ChartTableToggle from "../../sharedComponents/buttons/ChartTableToggle";
import SectionDataTable from "./sectionDataTable";

const propTypes = {
    sectionTitle: PropTypes.string,
    dropdownOptions: PropTypes.array,
    selectedDropdownOption: PropTypes.string,
    viewType: PropTypes.string,
    setViewType: PropTypes.func,
    chart: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    table: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    dsmContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    hasNoData: PropTypes.bool
};

const SearchSectionWrapper = ({
    sectionTitle,
    dropdownOptions,
    selectedDropdownOption,
    children,
    dsmContent,
    isLoading,
    hasNoData,
    isError
}) => {
    const [openAccordion, setOpenAccordion] = useState(false);
    const [viewType, setViewType] = useState('chart');

    console.log(selectedDropdownOption);
    console.log(dropdownOptions);

    const sortFn = () => dropdownOptions;

    const changeView = (label) => {
        setViewType(label);
    };

    // Measures content height to set height for dsm content
    const content = document.querySelector('.temp-search__section-wrapper-content')?.clientHeight;

    const Message = () => {
        if (isLoading) {
            return <LoadingMessage />;
        }
        else if (isError) {
            return <ErrorMessage />;
        }
        else if (hasNoData) {
            return <NoResultsMessage />;
        }

        return <></>;
    };

    return (
        <div className="search-results-wrapper temp-search__section-wrapper">
            <div className="temp-search__section-wrapper-header">
                {selectedDropdownOption ?
                    <>
                        <NewPicker
                            leftIcon=""
                            size="md"
                            label={sectionTitle}
                            options={dropdownOptions}
                            enabled="true"
                            selectedOption={dropdownOptions?.length
                                ? dropdownOptions?.find((obj) => obj.value === selectedDropdownOption)?.name
                                : `${selectedDropdownOption}`}
                            sortFn={sortFn} />
                        <ChartTableToggle activeType={viewType} changeView={changeView} />
                    </>
                    :
                    sectionTitle
                }
            </div>
            {isError || isLoading || hasNoData ?
                <Message />
                :
                !openAccordion && (
                    <div className="temp-search__section-wrapper-content">
                        {viewType === 'chart' ? children : <SectionDataTable />}
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
                        {dropdownOptions && selectedDropdownOption &&
                            dropdownOptions.find((obj) => obj.value === selectedDropdownOption).dsmContent}
                        { dsmContent || '' }
                    </div>
                )}
            </Accordion>
        </div>
    );
};

SearchSectionWrapper.propTypes = propTypes;

export default SearchSectionWrapper;
