/**
 * SectionDataTable.jsx
 *  Created by Andrea Blackwell 04/29/2024
 *  */

import React, { useState, useEffect } from 'react';
import { Pagination, Table } from "data-transparency-ui";
import { calculatePageRange } from "helpers/paginationHelper";


const SectionDataTable = (props) => {
    const [sortDirection, setSortDirection] = useState('asc');
    const [activeField, setActiveField] = useState('obligations');
    const [rows, setRows] = useState(props.rows ? props.rows : [[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

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

    const sortBy = (field, direction) => {
        const updatedTable = [];
        for (let i = 0; i < rows?.length; i++) {
            const updatedRow = {};
            for (let j = 0; j < rows[i].length; j++) {
                updatedRow[columns[j].title] = rows[i][j];
            }
            updatedTable.push(updatedRow);
        }

        if (direction === 'desc') {
            updatedTable.sort((a, b) => a[field] - b[field]);
        } else {
            updatedTable.sort((a, b) => b[field] - a[field]);
        }

        const sortedTable = [];
        for (let i = 0; i < updatedTable?.length; i++) {
            const updatedRow = [];
            for (let j = 0; j < Object.keys(updatedTable[i])?.length; j++) {
                updatedRow.push(updatedTable[i][Object.keys(updatedTable[i])[j]]);
            }
            sortedTable.push(updatedRow);
        }

        setRows(sortedTable);
    };

    const changePage = (page) => {
        console.log("change page!", page);
    };

    const updateSort = (field) => {
        const direction = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(direction);
        setActiveField(field);
        sortBy(field, direction);
        // make an api call to get sorted data or use the internal sort function
    };

    useEffect(() => {
        console.log(sortDirection);
    }, [sortDirection]);

    return (
        <>
            <Table
                currentSort={{ direction: sortDirection, field: activeField }}
                updateSort={updateSort}
                columns={columns}
                rows={rows} />
            <Pagination
                resultsText
                totalItems={rows.length}
                pageSize={pageSize}
                currentPage={currentPage}
                changePage={changePage} />
        </>
    );
};

export default SectionDataTable;
