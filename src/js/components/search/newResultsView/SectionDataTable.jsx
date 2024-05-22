/**
 * SectionDataTable.jsx
 *  Created by Andrea Blackwell 04/29/2024
 *  */

import React, { useState, useEffect } from 'react';
import { Pagination, Table } from "data-transparency-ui";

const SectionDataTable = (props) => {
    const [sortDirection, setSortDirection] = useState('asc');
    const [activeField, setActiveField] = useState('aggregated_amount');
    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    // const [pageSize, setPageSize] = useState(10);

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
        console.log(field);
        setSortDirection(direction);
        setActiveField(field);
        setCurrentPage(1);
        props.sortBy(field, direction);
        // make an api call to get sorted data or use the internal sort function
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
                classNames="search-results"
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
