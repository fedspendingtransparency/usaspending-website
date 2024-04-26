import React, { useState } from 'react';
import { Table } from "data-transparency-ui";


const SectionDataTable = (props) => {
    const [sortDirection, setSortDirection] = useState('asc');
    const [activeField, setActiveField] = useState('obligations');

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

    const rows = props.rows ? props.rows : [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    const updateSort = (field, direction) => {
        setSortDirection(() => {
            if (direction === 'asc') {
                return 'desc';
            }
            return 'asc';
        });

        setActiveField(field);

        // make an api call to get sorted data
    };

    return (
        <Table
            currentSort={{ direction: sortDirection, field: activeField }}
            updateSort={updateSort}
            columns={columns}
            rows={rows} />
    );
};

export default SectionDataTable;
