import React from 'react';
import { Table } from "data-transparency-ui";


const SectionDataTable = () => {
    const columns = [
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

    const rows = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];


    return (
        <Table
            columns={columns}
            rows={rows} />
    );
};

export default SectionDataTable;
