/**
 * ArchiveTable.jsx
 * Created by Kevin Li 11/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ArchiveTableRow from './ArchiveTableRow';

const propTypes = {
    data: PropTypes.array
};

const ArchiveTable = (props) => {
    const rows = props.data.map((yearData, index) => (
        <ArchiveTableRow
            key={yearData.year}
            isEven={(index + 1) % 2 === 0}
            data={yearData} />
    ));

    return (
        <table className="archive-table">
            <thead>
                <tr>
                    <th className="year">
                        Year
                    </th>
                    <th>
                        Contracts
                    </th>
                    <th>
                        Assistance
                    </th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
};

ArchiveTable.propTypes = propTypes;

export default ArchiveTable;
