import React, { useEffect, useState } from 'react';
import { ErrorMessage, LoadingMessage, NoResultsMessage } from "data-transparency-ui";
import { throttle } from "lodash-es";
import PropTypes from "prop-types";

import MobileSort from "../mobile/MobileSort";
import SectionDataTable from "./SectionDataTable";
import { tabletScreen } from "../../../dataMapping/shared/mobileBreakpoints";

const propTypes = {
    openAccordion: PropTypes.bool,
    sectionName: PropTypes.string,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    hasNoData: PropTypes.bool,
    viewType: PropTypes.string,
    table: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
    columns: PropTypes.array,
    rows: PropTypes.array,
    nextPage: PropTypes.func,
    previousPage: PropTypes.func,
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool,
    mobileDropdownOptions: PropTypes.array,
    sortDirection: PropTypes.string,
    setSortDirection: PropTypes.func,
    activeField: PropTypes.string,
    setActiveField: PropTypes.func,
    sort: PropTypes.object,
    setSort: PropTypes.func,
    sortBy: PropTypes.func,
    tableColumns: PropTypes.object,
    downloadComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    children: PropTypes.element
};

const SearchSectionWrapperContent = ({
    openAccordion,
    sectionName,
    isError,
    isLoading,
    hasNoData,
    viewType,
    table,
    columns,
    rows,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
    mobileDropdownOptions,
    sortDirection,
    setSortDirection,
    activeField,
    setActiveField,
    sort,
    setSort,
    sortBy,
    tableColumns,
    downloadComponent,
    children
}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < tabletScreen);
    const [windowWidth, setWindowWidth] = useState(0);

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

    // TODO: turn the below useEffect into a custom hook (since it seems to be duplicated elsewhere)
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

    return (
        <>
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
        </>
    );
};

SearchSectionWrapperContent.propTypes = propTypes;
export default SearchSectionWrapperContent;
