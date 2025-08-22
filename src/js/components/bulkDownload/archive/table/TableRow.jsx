/**
 * TableRow.jsx
 * Created by Lizzie Salita 12/15/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash-es';
import Analytics from 'helpers/analytics/Analytics';

const propTypes = {
    columns: PropTypes.array.isRequired,
    file: PropTypes.object,
    rowIndex: PropTypes.number.isRequired
};

const fileFieldsForAnalytics = ['fy', 'agency', 'date'];
const archiveFileDownloadGACategory = 'Download Center - Archive Download';
const getArchiveFileName = (file) => fileFieldsForAnalytics
    .reduce((acc, key, i, arr) => {
        const selection = file[key] !== 'N/A'
            ? file[key]
            : `AllFYs`;
        if (i === 0) return `${selection}_`;
        if (i === arr.length - 1) return `${acc}_${selection}`;
        return `${acc}_${selection}_`;
    }, '');
export default class TableRow extends React.PureComponent {
    constructor(props) {
        super(props);

        this.logArchiveDownload = this.logArchiveDownload.bind(this);
    }

    logArchiveDownload(e, file = this.props.file) {
        Analytics.event({
            event: 'archive_bulk_download',
            category: archiveFileDownloadGACategory,
            action: 'File Download',
            label: `File Name: ${getArchiveFileName(file)}`,
            gtm: true
        });
        fileFieldsForAnalytics
            .forEach((key) => {
                const label = file[key] !== 'N/A'
                    ? file[key]
                    : `AllFYs`;
                Analytics.event({
                    event: 'archive_fields_for_download',
                    category: archiveFileDownloadGACategory,
                    action: `${startCase(key)} Download Criterion`,
                    label,
                    gtm: true
                });
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
