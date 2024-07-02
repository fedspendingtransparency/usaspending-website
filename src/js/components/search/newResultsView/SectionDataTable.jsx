/**
 * SectionDataTable.jsx
 *  Created by Andrea Blackwell 04/29/2024
 *  */

import React, { useState, useEffect } from 'react';
import { Pagination, Table } from "data-transparency-ui";
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { throttle } from "lodash";

const SectionDataTable = (props) => {
    const { sortDirection, activeField } = props;
    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);

    const pageSize = 10;
    const maxRows = props.rows;
    const columns = props.columns;

    const changePage = (page) => {
        if (props.manualSort) {
            setRows(maxRows.slice((page - 1) * pageSize, page * pageSize));
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
    }, []);

    useEffect(() => {
        if (pageSize) {
            if (props.manualSort) {
                setRows(maxRows.slice(currentPage - 1, pageSize));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Table
                classNames="table-for-new-search-page award-results-table-dtui"
                currentSort={{ direction: sortDirection, field: activeField }}
                updateSort={updateSort}
                columns={columns}
                isMobile={isMobile}
                isStacked
                rows={rows} />
            <Pagination
                resultsText
                totalItems={maxRows.length}
                pageSize={pageSize}
                currentPage={currentPage}
                changePage={changePage} />
        </>
    );
};

export default SectionDataTable;
