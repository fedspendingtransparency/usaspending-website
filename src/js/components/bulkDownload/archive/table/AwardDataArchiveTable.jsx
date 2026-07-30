/**
 * AwardDataArchiveTable.jsx
 * Created by Lizzie Salita 12/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';

const propTypes = { results: PropTypes.array, columns: PropTypes.array };

const AwardDataArchiveTable = ({ results, columns }) => {
    let noResultsClass = '';

    // remove duplicated bottom border
    if (results.length === 0) noResultsClass = ' no-results';

    const headers = columns.map((column) => (
        <th key={column.columnName}>
            {column.displayName}
        </th>
    ));

    const rows = results.map((file, index) => (
        <TableRow
            key={file.url}
            file={file}
            rowIndex={index}
            columns={columns} />
    ));

    return (
        <div className={`award-data-archive-table${noResultsClass}`}>
            <table>
                <thead><tr>{headers}</tr></thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}

AwardDataArchiveTable.propTypes = propTypes;
export default AwardDataArchiveTable;
