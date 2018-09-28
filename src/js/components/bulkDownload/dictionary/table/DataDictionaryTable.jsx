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
        // TODO - loading, error, no results state
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
        return rows;
    }

    generateRow(row) {
        const cells = [];
        let start = 0;
        this.props.sections.forEach((section, i) => {
            const sectionCells = row.slice(start, start + section.colspan);
            cells.push(sectionCells.map((data) => (
                <td className={`dictionary-table__body-cell section-${i}-cell`}>
                    {data}
                </td>
            )));
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
                <tbody className="dictionary-table__body">
                    {this.generateBody()}
                </tbody>
            </table>
        );
    }
}

DataDictionaryTable.propTypes = propTypes;
