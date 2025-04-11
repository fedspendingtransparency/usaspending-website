/**
 * SearchSectionWrapper.jsx
 * Created by Josue Aguilar 3/19/2024
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import { throttle } from "lodash";
import { useHistory } from "react-router-dom";
import { useQueryParams, combineQueryParams, getQueryParamString } from 'helpers/queryParams';
import Analytics from 'helpers/analytics/Analytics';
import { ErrorMessage, LoadingMessage, NoResultsMessage } from "data-transparency-ui";
import NewPicker from "../../sharedComponents/dropdowns/NewPicker";
import Accordion from "../../sharedComponents/accordion/Accordion";
import ChartTableToggle from "../../sharedComponents/buttons/ChartTableToggle";
import SectionDataTable from "./SectionDataTable";

const propTypes = {
    sectionTitle: PropTypes.string,
    dropdownOptions: PropTypes.array,
    selectedDropdownOption: PropTypes.string,
    dsmContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    hasNoData: PropTypes.bool,
    fetchData: PropTypes.func,
    columns: PropTypes.array,
    rows: PropTypes.array,
    sortBy: PropTypes.func,
    sortDirection: PropTypes.string,
    activeField: PropTypes.string,
    downloadComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    section: PropTypes.string,
    mapViewType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    setMapViewType: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    children: PropTypes.element,
    table: PropTypes.bool,
    sectionName: PropTypes.string,
    hash: PropTypes.string
};

const SearchSectionWrapper = ({
    sectionTitle,
    dropdownOptions,
    selectedDropdownOption,
    children,
    dsmContent,
    isLoading,
    hasNoData,
    isError,
    columns,
    rows,
    table,
    sortBy,
    sortDirection,
    activeField,
    downloadComponent,
    sectionName,
    mapViewType = false,
    setMapViewType = false,
    hash
}) => {
    const [openAccordion, setOpenAccordion] = useState(false);
    const [viewType, setViewType] = useState('chart');
    const [contentHeight, setContentHeight] = useState(document.querySelector('.search__section-wrapper-content')?.clientHeight);
    const gaRef = useRef(false);

    const query = useQueryParams();

    // Measures content height to set height for dsm content
    const content = document.querySelector(`.search__${sectionName}`)?.clientHeight;
    const wrapperWidth = document.querySelector('.search__section-wrapper-content')?.clientWidth;

    const history = useHistory();

    const params = history.location.search.split("&");
    params.shift();
    const sectionValue = params[0]?.substring(8);
    const sortFn = () => dropdownOptions;

    const changeView = (label) => {
        setViewType(label);

        // for map view loading screen
        if (mapViewType) {
            setMapViewType(label);
        }
    };

    const jumpToSection = (section) => {
        const sections = ['map', 'time', 'categories', 'awards'];
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = sections.find((sec) => sec === section);
        if (!matchedSection) {
            // no matching section
            return;
        }
        // find the section in dom
        const sectionDom = document.querySelector(`.${matchedSection}`);
        if (!sectionDom) {
            return;
        }
        // add section to url
        if (!window.location.href.includes(`section=${section}`)) {
            const newQueryParams = combineQueryParams(query, { section: `${section}` });
            history.replace({
                pathname: ``,
                search: getQueryParamString(newQueryParams)
            });
        }

        let rectTopOffset = 0;
        if (matchedSection === 'categories') {
            rectTopOffset = 820;
        }
        else if (matchedSection === 'time') {
            rectTopOffset = 1680;
        }
        else if (matchedSection === 'map') {
            rectTopOffset = 2240;
        }

        if ((section && sectionValue) && section === sectionValue) {
            window.scrollTo({
                top: rectTopOffset,
                behavior: 'smooth'
            });
        }
    };

    const parseSection = () => {
        if ((params.length === 1 || params.length === 2) && params[0].substring(0, 8) === "section=" && sectionValue) {
            jumpToSection(sectionValue);
        }
    };
    useEffect(throttle(() => {
        setContentHeight(content);
        parseSection();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 500), [content, sectionName]);

    useEffect(() => {
        if (gaRef.current) {
            Analytics.event({
                category: `Section ${sectionName}: ${selectedDropdownOption}`,
                action: `Viewed ${selectedDropdownOption} ${viewType}`,
                label: hash
            });
        }
        else {
            gaRef.current = true;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewType]);

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

    const Content = () => {
        if (table) {
            return table;
        }

        return (<SectionDataTable
            columns={columns}
            rows={rows}
            sortBy={sortBy}
            activeField={activeField}
            sortDirection={sortDirection}
            manualSort />);
    };

    return (
        <div className="search__section-wrapper">
            {selectedDropdownOption ?
                <div className="search__section-wrapper-header">
                    <span className="filter__dropdown-label">{sectionTitle}</span>
                    <NewPicker
                        leftIcon=""
                        size="md"
                        options={dropdownOptions}
                        enabled
                        selectedOption={dropdownOptions?.length
                            ? dropdownOptions?.find((obj) => obj.value === selectedDropdownOption)?.name
                            : `${selectedDropdownOption}`}
                        sortFn={sortFn}
                        classname="advanced-search-dropdown__wrapper"
                        buttonClassname="advanced-search-dropdown__button"
                        parentWidth={wrapperWidth} />
                    <ChartTableToggle activeType={viewType} changeView={changeView} classname="search__chart-table-toggle" />
                </div>
                :
                <div className="search__section-wrapper-header">
                    <span className="filter__dropdown-label">{sectionTitle}</span>
                </div>
            }
            {!openAccordion &&
                <div className={`search__section-wrapper-content new-results-view search__${sectionName}`}>
                    {
                        // eslint-disable-next-line no-nested-ternary
                        isError || isLoading || hasNoData ?
                            <Message />
                            :
                            <>
                                {downloadComponent}
                                {viewType === "table" ?
                                    <Content />
                                    :
                                    children}
                            </>
                    }
                </div>}
            <Accordion
                setOpen={setOpenAccordion}
                closedIcon="chevron-down"
                openIcon="chevron-up"
                title="Data sources and methodology" >
                {openAccordion ? (
                    <div
                        className="search__section-wrapper-dsm"
                        style={{ height: `${contentHeight - 16}px` }}>
                        {dropdownOptions && selectedDropdownOption &&
                            dropdownOptions.find((obj) => obj.value === selectedDropdownOption).dsmContent}
                        { dsmContent || '' }
                    </div>
                ) : (<></>)}
            </Accordion>
        </div>
    );
};

SearchSectionWrapper.propTypes = propTypes;
export default SearchSectionWrapper;
