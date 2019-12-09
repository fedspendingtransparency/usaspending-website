/**
 * TableRow.jsx
 * Created by Lizzie Salita 12/15/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import Analytics from 'helpers/analytics/Analytics';

const propTypes = {
    columns: PropTypes.array.isRequired,
    file: PropTypes.object,
    rowIndex: PropTypes.number.isRequired
};

const fileFieldsForAnalytics = ['fy', 'agency', 'date'];

export default class TableRow extends React.PureComponent {
    constructor(props) {
        super(props);

        this.logArchiveDownload = this.logArchiveDownload.bind(this);
    }

    logArchiveDownload(e, file = this.props.file) {
        const label = fileFieldsForAnalytics
            .reduce((acc, key, i, arr) => {
                const selection = file[key] !== 'N/A'
                    ? file[key]
                    : `AllFYs`;
                if (i === 0) return `${key}_${selection}_`;
                if (i === arr.length - 1) return `${acc}_${key}_${selection}`;
                return `${acc}_${key}_${selection}_`;
            }, '');

        Analytics.event({
            category: 'Download Center - Archive Download',
            action: 'File Download',
            label
        });
    }

    render() {
        let rowClass = 'row-even';
        if (this.props.rowIndex % 2 === 0) {
            rowClass = 'row-odd';
        }
        const cells = this.props.columns.map((column) => {
            if (column.columnName === 'fileName') {
                // link to the file
                return (
                    <td
                        className={rowClass}
                        key={`${column.columnName}-${this.props.file.url}`}>
                        <a
                            href={this.props.file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={this.logArchiveDownload}>
                            {this.props.file.fileName}
                        </a>
                    </td>
                );
            }
            return (
                <td
                    className={rowClass}
                    key={`${column.columnName}-${this.props.file.url}`}>
                    {this.props.file[column.columnName]}
                </td>
            );
        });

        return (
            <tr>
                {cells}
            </tr>
        );
    }
}

TableRow.propTypes = propTypes;
