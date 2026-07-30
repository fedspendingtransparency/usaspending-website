/**
 * AwardDataArchiveTable.jsx
 * Created by Lizzie Salita 12/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'data-transparency-ui';
import TableRow from './TableRow';

const columns = [
    {
        title: 'agency',
        displayName: 'Agency'
    },
    {
        title: 'fileName',
        displayName: 'Archive File'
    },
    {
        title: 'fy',
        displayName: 'Fiscal Year'
    },
    {
        title: 'date',
        displayName: 'Data As Of'
    }
];

const propTypes = { results: PropTypes.array };

const AwardDataArchiveTable = ({ results }) => {
    let noResultsClass = '';

    // remove duplicated bottom border
    if (results.length === 0) noResultsClass = ' no-results';

    // const rows = results.map((file, index) => (
    //     <TableRow
    //         key={file.url}
    //         file={file}
    //         rowIndex={index}
    //         columns={columns} />
    // ));

    const rows = results.map((file) => ([
        file.agency,
        file.fileName,
        file.fy,
        file.date
    ]))

    console.log({ rows, results })

    return (
        // <div className={`award-data-archive-table${noResultsClass}`}>
        //     <table>
        //         <thead><tr>{headers}</tr></thead>
        //         <tbody>{rows}</tbody>
        //     </table>
        // </div>
        <Table
            classNames={`award-data-archive-table${noResultsClass}`}
            columns={columns}
            rows={rows} />
    );
}

AwardDataArchiveTable.propTypes = propTypes;
export default AwardDataArchiveTable;
