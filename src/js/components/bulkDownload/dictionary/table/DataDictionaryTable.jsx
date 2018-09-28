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
        return this.props.sections.map((section, i) => (
            <th
                key={section.section}
                className={`dictionary-table__head-cell section-${i}`}
                colSpan={section.colspan}>
                {section.section}
            </th>
        ));
    }

    generateColumnHeadings() {
        const columns = [];
        let start = 0;
        this.props.sections.forEach((section, i) => {
            const sectionColumns = this.props.columns.slice(start, start + section.colspan);
            columns.push(sectionColumns.map((col) => (
                <th
                    key={col.raw}
                    className={`dictionary-table__head-cell section-${i}-col`}>
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
            )));
            start += section.colspan;
        });
        return columns;
    }

    generateBody() {
        if (this.props.loading) {
            return (
                <div className="dictionary-table__message">
                    Loading...
                </div>
            );
        }
        if (this.props.error) {
            return (
                <div className="dictionary-table__message">
                    There was an error loading your results.
                </div>
            );
        }

        const rows = [];
        this.props.rows.forEach((row, i) => {
            rows.push(
                <tr
                    className="dictionary-table__body-row"
                    key={`row-${i}`}>
                    {this.generateRow(row)}
                </tr>
            );
        });
        return (
            <tbody className="dictionary-table__body">
                {rows}
            </tbody>
        );
    }

    generateRow(row) {
        const cells = [];
        let start = 0;
        this.props.sections.forEach((section, i) => {
            const sectionCells = row.slice(start, start + section.colspan);
            let rowClass = '';
            if (this.props.searchTerm) {
                const rowMatch = sectionCells.find((data) => data.toLowerCase().match(this.props.searchTerm.toLowerCase()));
                if (rowMatch) {
                    rowClass = 'dictionary-table__body-cell_highlight-row';
                }
            }
            cells.push(sectionCells.map((data) => {
                let cellClass = '';
                if (this.props.searchTerm && data.toLowerCase().match(this.props.searchTerm.toLowerCase())) {
                    cellClass = 'dictionary-table__body-cell_highlight-cell';
                }
                return (
                    <td className={`dictionary-table__body-cell section-${i}-cell ${rowClass} ${cellClass}`}>
                        {data}
                    </td>
                );
            }));
            start += section.colspan;
        });
        return cells;
    }

    render() {
        return (
            <table className="dictionary-table">
                <thead className="dictionary-table__head">
                    <tr className="dictionary-table__head-row">
                        {this.generateSectionHeadings()}
                    </tr>
                    <tr className="dictionary-table__head-row">
                        {this.generateColumnHeadings()}
                    </tr>
                </thead>
                {this.generateBody()}
            </table>
        );
    }
}

DataDictionaryTable.propTypes = propTypes;
