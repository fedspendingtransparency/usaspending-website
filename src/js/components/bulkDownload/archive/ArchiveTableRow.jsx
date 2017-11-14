/**
 * ArchiveTableRow.jsx
 * Created by Kevin Li 11/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    isEven: PropTypes.bool,
    data: PropTypes.object
};

const ArchiveTableRow = (props) => {
    let evenOddClass = '';
    if (props.isEven) {
        evenOddClass = 'even';
    }

    const downloadContracts = () => {
        // start the download
        window.open(props.data.contracts, '_self');
    };

    const downloadAssistance = () => {
        // start the download
        window.open(props.data.assistance, '_self');
    };

    return (
        <tr className={evenOddClass}>
            <td className="year">
                {`FY ${props.data.year}`}
            </td>
            <td>
                <button
                    className="archive-download"
                    title={`Download contracts data for FY ${props.data.year}`}
                    aria-label={`Download contracts data for FY ${props.data.year}`}
                    onClick={downloadContracts}>
                    Download
                </button>
            </td>
            <td>
                <button
                    className="archive-download"
                    title={`Download assistance data for FY ${props.data.year}`}
                    aria-label={`Download assistance data for FY ${props.data.year}`}
                    onClick={downloadAssistance}>
                    Download
                </button>
            </td>
        </tr>
    );
};

ArchiveTableRow.propTypes = propTypes;
export default ArchiveTableRow;
