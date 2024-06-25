/**
 * SectionDataTable.jsx
 *  Created by Andrea Blackwell 04/29/2024
 *  */

import React, { useState, useEffect } from 'react';
import { Pagination, Table } from "data-transparency-ui";

const SectionDataTable = (props) => {
    const { sortDirection, activeField } = props;
    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activateRightFade, setActivateRightFade] = useState(false);

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

    const checkToAddRightFade = (isScrolledLeft, isScrolledRight) => {
        if (!isScrolledLeft) {
            setActivateRightFade(true);
        }
        if (isScrolledRight) {
            setActivateRightFade(false);
        }
    };

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
            <div className={`advanced-search__table-wrapper ${activateRightFade ? 'activate-right-fade' : ''}`} >
                <Table
                    classNames="table-for-new-search-page award-results-table-dtui"
                    currentSort={{ direction: sortDirection, field: activeField }}
                    updateSort={updateSort}
                    columns={columns}
                    stickyFirstColumn
                    checkToAddRightFade={checkToAddRightFade}
                    rows={rows} />
            </div>
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
