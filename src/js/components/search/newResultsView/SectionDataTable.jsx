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

    const pageSize = 10;

    const maxRows = props.rows ? props.rows : [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    const columns = props.columns ? props.columns : [
        {
            title: 'type',
            displayName: 'Award Types'
        },
        {
            title: 'obligations',
            displayName: ["Award", <br />, "Obligations"],
            right: true
        },
        {
            title: 'percent',
            displayName: ["% of", <br />, "Total"],
            right: true
        }
    ];

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
                classNames="table-for-new-search-page"
                currentSort={{ direction: sortDirection, field: activeField }}
                updateSort={updateSort}
                columns={columns}
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
