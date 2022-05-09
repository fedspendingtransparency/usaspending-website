/**
 * DataDictionaryTable.jsx
 * Created by Lizzie Salita 9/14/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { ErrorMessage, LoadingMessage } from 'data-transparency-ui';
import ReadMore from 'components/sharedComponents/ReadMore';
import DataDictionaryTableSorter from './DataDictionaryTableSorter';

const propTypes = {
    searchTerm: PropTypes.string,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    sections: PropTypes.array,
    columns: PropTypes.array,
    rows: PropTypes.array,
    sort: PropTypes.object,
    changeSort: PropTypes.func
};

export default class DataDictionaryTable extends React.Component {
    scrollRightTop(e) {
        const topBar = document.getElementById("topBar");
        const bottomBar = document.getElementById("bottomBar");
        const headerDiv = document.getElementById("headerDiv");
        bottomBar.scrollLeft = topBar.scrollLeft;
        headerDiv.scrollLeft = e.target.scrollLeft;
    }
    scrollRightBottom(e) {
        const topBar = document.getElementById("topBar");
        const bottomBar = document.getElementById("bottomBar");
        const headerDiv = document.getElementById("headerDiv");
        topBar.scrollLeft = bottomBar.scrollLeft;
        headerDiv.scrollLeft = e.target.scrollLeft;
    }

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
        let rows = [];
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

        if (rows.length === 0 && this.props.searchTerm) {
            rows = (
                <tr className="dictionary-table__body-row">
                    <td
                        className="dictionary-table__body-cell dictionary-table__body-cell_message"
                        colSpan={this.props.columns.length}>
                        No terms matched your search.
                    </td>
                </tr>
            );
        }

        return rows;
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
                    <td
                        key={uniqueId()}
                        className={`dictionary-table__body-cell section-${i}-cell ${highlightClass} ${cellClass}`}>
                        <ReadMore
                            text={data}
                            limit={205}
                            initiallyExpanded={!!this.props.searchTerm} />
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
        let scrollVisible = false;

        if (this.props.inFlight) {
            message = (<LoadingMessage />);
        }
        else if (this.props.error) {
            message = (<ErrorMessage />);
        }

        else {
            scrollVisible = true;
            table = (
                <div className="dictionary-table__container">
                    <div className="dictionary-table__headers" id="headerDiv">
                        <table className="dictionary-table__headers-table">
                            <thead>
                                <tr className="dictionary-table__headers-row">
                                    {this.generateSectionHeadings()}
                                </tr>
                                <tr className="dictionary-table__headers-row">
                                    {this.generateColumnHeadings()}
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="dictionary-table__content" id="bottomBar" onScroll={this.scrollRightBottom}>
                        <table className="dictionary-table__content-table" id="dictionary-table__content-table">
                            <tbody className="dictionary-table__content-body">
                                {this.generateRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        const innerTable = document.getElementById("dictionary-table__content-table");
        let width = 0;
        if (innerTable) {
            width = `${innerTable.offsetWidth}px`;
        }

        const style = {
            width
        };

        return (
            <div className="dictionary-table">
                <div className={`dictionary-table__above-scroller ${scrollVisible ? '' : 'dictionary-table__above-scroller-hidden'}`} id="topBar" onScroll={this.scrollRightTop}>
                    <div className="dictionary-table__scroller" style={style} />
                </div>
                {message || table}
            </div>
        );
    }
}

DataDictionaryTable.propTypes = propTypes;
