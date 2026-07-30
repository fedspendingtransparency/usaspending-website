/**
 * AwardDataArchiveTable.jsx
 * Created by Lizzie Salita 12/13/17
 */

import React, { useState } from 'react';
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
    const [selectedFiles, setSelectedFiles] = useState(new Set());

    const onChange = ({ target }) => {
        setSelectedFiles((prevState) => {
            const newState = new Set(prevState);

            newState.has(target.value) ?
                newState.delete(target.value) :
                newState.add(target.value);

            return newState;
        });
    };

    console.log({ selectedFiles })

    const rows = results.map((file) => ([
        (
            <div key={file.agency}>
                <input
                    type="checkbox"
                    aria-label={file.agency}
                    value={file.fileName}
                    name="file-agency"
                    checked={selectedFiles.has(file.fileName)}
                    onChange={onChange}/>
                {file.agency === "All" ? "All Agenices" : file.agency}
            </div>
        ),
        file.fileName.toLowerCase().indexOf("delta") >= 0 ? "Delta Files" : "Full File",
        file.fy,
        file.date
    ]))

    return (
        <Table
            classNames="award-data-archive-table"
            columns={columns}
            rows={rows} />
    );
}

AwardDataArchiveTable.propTypes = propTypes;
export default AwardDataArchiveTable;
