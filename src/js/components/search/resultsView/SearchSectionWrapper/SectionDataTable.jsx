/**
 * SectionDataTable.jsx
 *  Created by Andrea Blackwell 04/29/2024
 *  */

import React, { useState, useEffect } from 'react';
import { Pagination, Table } from "data-transparency-ui";
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { throttle } from "lodash-es";
import CategoriesPagination from '../categories/CategoriesPagination';

const SectionDataTable = (props) => {
    const { sortDirection, activeField } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);

    const pageSize = 10;
    const maxRows = props.rows;
    const columns = props.columns;

    // derive the visible page from the props so re-sorted or new data always shows up
    const rows = props.manualSort ?
        maxRows.slice((currentPage - 1) * pageSize, currentPage * pageSize) :
        [];

    const changePage = (page) => {
        if (props.manualSort) {
            setCurrentPage(page);
        }
    };

    const updateSort = (field, direction) => {
        setCurrentPage(1);
        props.sortBy(field, direction);
    };

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < mediumScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    return (
        <>
            <Table
                classNames="table-for-new-search-page award-results-table-dtui"
                currentSort={{ direction: sortDirection, field: activeField }}
                updateSort={updateSort}
                columns={columns}
                isMobile={isMobile}
                isStacked
                newResultsView
                rows={rows} />
            {props.sectionName === 'categories' ?
                (
                    <CategoriesPagination
                        nextPage={props.nextPage}
                        previousPage={props.previousPage}
                        hasNextPage={props.hasNextPage}
                        hasPreviousPage={props.hasPreviousPage} />
                ) :
                (
                    <Pagination
                        resultsText
                        totalItems={maxRows.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        changePage={changePage} />
                )}
        </>
    );
};

export default SectionDataTable;
