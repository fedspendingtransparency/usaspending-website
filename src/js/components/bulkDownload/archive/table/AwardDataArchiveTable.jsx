/**
 * AwardDataArchiveTable.jsx
 * Created by Lizzie Salita 12/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import TableRow from './TableRow';

const propTypes = {
    results: PropTypes.array,
    columns: PropTypes.array
};

export default class AwardDataArchiveTable extends React.Component {
    render() {
        let noResultsClass = '';
        if (this.props.results.length === 0) {
            // remove duplicated bottom border
            noResultsClass = ' no-results';
        }

        const headers = this.props.columns.map((column) => (
            <th key={column.columnName}>
                {column.displayName}
            </th>
        ));

        const rows = this.props.results.map((file, index) => (
            <TableRow
                key={file.url}
                file={file}
                rowIndex={index}
                columns={this.props.columns} />
        ));

        return (
            <div className={`award-data-archive-table${noResultsClass}`}>
                <table>
                    <thead>
                        <tr>
                            {headers}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

AwardDataArchiveTable.propTypes = propTypes;
