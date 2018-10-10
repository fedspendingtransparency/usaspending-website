/**
 * DataDictionaryTable.jsx
 * Created by Lizzie Salita 9/14/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import DataDictionaryTableSorter from './DataDictionaryTableSorter';

const propTypes = {
    searchTerm: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    sections: PropTypes.array,
    columns: PropTypes.array,
    rows: PropTypes.array,
    sort: PropTypes.object,
    changeSort: PropTypes.func
};

export default class DataDictionaryTable extends React.Component {
    generateSectionHeadings() {
        return this.props.sections.map((section, i) => {
            let cellClass = '';
            if (i === 0) {
                cellClass = 'dictionary-table__head-cell_first';
            }
            else if (i === this.props.sections.length - 1) {
                cellClass = 'dictionary-table__head-cell_last';
            }
            return (
                <th
                    key={section.section}
                    className={`dictionary-table__head-cell section-${i} ${cellClass}`}
                    colSpan={section.colspan}>
                    {section.section}
                </th>
            );
        });
    }

    generateColumnHeadings() {
        const columns = [];
        let start = 0;
        this.props.sections.forEach((section, i) => {
            const sectionColumns = this.props.columns.slice(start, start + section.colspan);
            columns.push(sectionColumns.map((col, j) => {
                let cellClass = '';
                if (i === 0 && j === 0) {
                    // first cell in the row
                    cellClass = 'dictionary-table__head-cell_first';
                }
                else if ((i === this.props.sections.length - 1) && (j === section.colspan - 1)) {
                    // last cell in the row
                    cellClass = 'dictionary-table__head-cell_last';
                }
                return (
                    <th
                        key={col.raw}
                        className={`dictionary-table__head-cell section-${i}-col ${cellClass}`}>
                        <div className="header-cell">
                            <div className="header-cell__text">
                                <div className="header-cell__title">
                                    {col.display}
                                </div>
                            </div>
                            <DataDictionaryTableSorter
                                field={col.raw}
                                label={col.display}
                                active={this.props.sort}
                                changeSort={this.props.changeSort} />
                        </div>
                    </th>
                );
            }));
            start += section.colspan;
        });
        return columns;
    }

    generateRows() {
        const rows = [];
        let noMatch = false;
        this.props.rows.forEach((row, i) => {
            if (this.props.searchTerm) {
                const rowMatch = row.find((data) => data.toLowerCase().match(this.props.searchTerm.toLowerCase()));
                if (rowMatch) {
                    rows.push(
                        <tr
                            className="dictionary-table__body-row"
                            key={`row-${i}`}>
                            {this.generateRow(row)}
                        </tr>
                    );
                }
                else {
                    noMatch = true;
                }
            }
            else {
                rows.push(
                    <tr
                        className="dictionary-table__body-row"
                        key={`row-${i}`}>
                        {this.generateRow(row)}
                    </tr>
                );
            }
        });

        let result = rows;
        if (noMatch) {
            result = (
                <tr className="dictionary-table__body-row">
                    <td
                        className="dictionary-table__body-cell dictionary-table__body-cell_message"
                        colSpan={this.props.columns.length}>
                        No terms matched your search.
                    </td>
                </tr>
            );
        }

        return result;
    }

    generateRow(row) {
        const cells = [];
        let start = 0;
        this.props.sections.forEach((section, i) => {
            const sectionCells = row.slice(start, start + section.colspan);
            cells.push(sectionCells.map((data, j) => {
                let highlightClass = '';
                if (this.props.searchTerm && data.toLowerCase().match(this.props.searchTerm.toLowerCase())) {
                    highlightClass = 'dictionary-table__body-cell_highlight-cell';
                }
                let cellClass = '';
                if (i === 0 && j === 0) {
                    // first cell in the row
                    cellClass = 'dictionary-table__body-cell_first';
                }
                else if ((i === this.props.sections.length - 1) && (j === section.colspan - 1)) {
                    // last cell in the row
                    cellClass = 'dictionary-table__body-cell_last';
                }
                return (
                    <td className={`dictionary-table__body-cell section-${i}-cell ${highlightClass} ${cellClass}`}>
                        {data}
                    </td>
                );
            }));
            start += section.colspan;
        });
        return cells;
    }

    render() {
        let message = null;
        let table = null;

        if (this.props.loading) {
            message = (
                <div className="dictionary-table__message">
                    Loading...
                </div>
            );
        }

        else if (this.props.error) {
            message = (
                <div className="dictionary-table__message">
                    There was an error loading your results.
                </div>
            );
        }

        else {
            table = (
                <table className="dictionary-table__content">
                    <thead className="dictionary-table__head">
                        <tr className="dictionary-table__head-row">
                            {this.generateSectionHeadings()}
                        </tr>
                        <tr className="dictionary-table__head-row">
                            {this.generateColumnHeadings()}
                        </tr>
                    </thead>
                    <tbody className="dictionary-table__body">
                        {this.generateRows()}
                    </tbody>
                </table>
            );
        }

        return (
            <div className="dictionary-table">
                {message || table}
            </div>
        );
    }
}

DataDictionaryTable.propTypes = propTypes;
