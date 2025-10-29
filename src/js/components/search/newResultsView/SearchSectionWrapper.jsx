/**
 * SearchSectionWrapper.jsx
 * Created by Josue Aguilar 3/19/2024
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import { throttle } from "lodash-es";
import Analytics from 'helpers/analytics/Analytics';
import { ErrorMessage, LoadingMessage, NoResultsMessage } from "data-transparency-ui";
import { tabletScreen } from 'dataMapping/shared/mobileBreakpoints';
import SectionDataTable from "./SectionDataTable";
import MobileSort from '../mobile/MobileSort';
import SearchSectionWrapperHeader from "./SearchSectionWrapperHeader";
import SearchSectionWrapperAccordion from "./SearchSectionWrapperAccordion";

const propTypes = {
    sectionTitle: PropTypes.string,
    dropdownOptions: PropTypes.array,
    selectedDropdownOption: PropTypes.string,
    dsmContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    hasNoData: PropTypes.bool,
    columns: PropTypes.array,
    rows: PropTypes.array,
    sortBy: PropTypes.func,
    sortDirection: PropTypes.string,
    setSortDirection: PropTypes.func,
    sort: PropTypes.object,
    setSort: PropTypes.func,
    activeField: PropTypes.string,
    setActiveField: PropTypes.func,
    downloadComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    mapViewType: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    setMapViewType: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    children: PropTypes.element,
    table: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
    sectionName: PropTypes.string,
    hash: PropTypes.string,
    spendingLevel: PropTypes.string,
    onToggle: PropTypes.func,
    showToggle: PropTypes.bool,
    tableColumns: PropTypes.object,
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool,
    nextPage: PropTypes.func,
    previousPage: PropTypes.func
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
    tableColumns,
    rows,
    table,
    sortBy,
    sortDirection,
    activeField,
    setActiveField,
    downloadComponent,
    sectionName,
    mapViewType = false,
    setMapViewType = false,
    hash,
    spendingLevel,
    onToggle,
    showToggle,
    setSortDirection,
    sort,
    setSort,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage
}) => {
    const [openAccordion, setOpenAccordion] = useState(false);
    const [trackDSMEvent, setTrackDSMEvent] = useState(false);
    const [viewType, setViewType] = useState('chart');
    const [isMobile, setIsMobile] = useState(window.innerWidth < tabletScreen);
    const [windowWidth, setWindowWidth] = useState(0);

    const gaRef = useRef(false);

    const mobileDropdownOptions = [];

    const changeView = (label) => {
        setViewType(label);

        // for map view loading screen
        if (mapViewType) {
            setMapViewType(label);
        }
    };

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

    useEffect(() => {
        const action = openAccordion ? "open DS&M" : "close DS&M";
        let prefix = 'Prime Awards Table';

        switch (sectionName) {
            case 'categories':
                prefix = `Categories ${selectedDropdownOption}`;
                break;
            case 'time':
                prefix = `Time ${selectedDropdownOption}`;
                break;
            case 'map':
                prefix = `Map ${selectedDropdownOption}`;
                break;
            default:
                if (spendingLevel === 'subawards') {
                    prefix = 'Subawards Table';
                    break;
                }
                else if (spendingLevel === 'transactions') {
                    prefix = 'Transactions Table ';
                    break;
                }
                break;
        }

        if (trackDSMEvent) {
            Analytics.event({
                category: 'Advanced Search - Results View DSM',
                action,
                label: `${prefix} DS&M`
            });
        }
        setTrackDSMEvent(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openAccordion]);

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < tabletScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

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
            manualSort
            sectionName={sectionName}
            nextPage={nextPage}
            previousPage={previousPage}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage} />);
    };

    return (
        <div className="search__section-wrapper">
            <SearchSectionWrapperHeader
                selectedDropdownOption={selectedDropdownOption}
                sectionTitle={sectionTitle}
                dropdownOptions={dropdownOptions}
                viewType={viewType}
                showToggle={showToggle}
                onToggle={onToggle}
                changeView={changeView} />
            {!openAccordion &&
                <div
                    className={
                        `search__section-wrapper-content new-results-view search__${sectionName}`
                    }>
                    {
                        // eslint-disable-next-line no-nested-ternary
                        isError || isLoading || hasNoData ?
                            <Message />
                            :
                            <>
                                {((viewType === "table" || sectionName === "table") && isMobile) ?
                                    <MobileSort
                                        columns={columns}
                                        options={mobileDropdownOptions}
                                        sortDirection={sortDirection}
                                        setSortDirection={setSortDirection}
                                        activeField={activeField}
                                        field={sort?.field}
                                        setActiveField={setActiveField}
                                        sortBy={sortBy}
                                        sort={sort}
                                        tableColumns={tableColumns?.data}
                                        setSort={setSort} /> : null}
                                {downloadComponent}
                                {viewType === "table" ?
                                    <Content />
                                    :
                                    children}
                            </>
                    }
                </div>}
            <SearchSectionWrapperAccordion
                openAccordion={openAccordion}
                setOpenAccordion={setOpenAccordion}
                dropdownOptions={dropdownOptions}
                selectedDropdownOption={selectedDropdownOption}
                dsmContent={dsmContent}
                sectionName={sectionName} />
        </div>
    );
};
SearchSectionWrapper.propTypes = propTypes;
export default SearchSectionWrapper;
