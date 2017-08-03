/**
 * AgencyLandingTable.jsx
 * Created by Lizzie Salita 7/7/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import HeaderRow from './HeaderRow';
import TableRow from './TableRow';
import AgencyLinkCell from './cells/AgencyLinkCell';
import GenericCell from './cells/GenericCell';

const propTypes = {
    batch: PropTypes.object,
    results: PropTypes.array,
    columns: PropTypes.array,
    headerCellClass: PropTypes.func.isRequired,
    visibleWidth: PropTypes.number,
    searchHash: PropTypes.string
};

export default class AgencyLandingTable extends React.PureComponent {
    shouldComponentUpdate(nextProps) {
        if (!Immutable.is(nextProps.batch, this.props.batch)) {
            return true;
        }
        else if (nextProps.visibleWidth !== this.props.visibleWidth) {
            // re-render if the window size changed
            return true;
        }
        else if (nextProps.searchHash !== this.props.searchHash) {
            return true;
        }
        return false;
    }

    prepareTable() {
        let totalWidth = 0;

        const HeaderCell = this.props.headerCellClass;

        const columns = this.props.columns.map((column) => {
            // For this table, make each column's width a percentage of the visible width
            const adjustedWidth = (this.props.visibleWidth * column.width);
            totalWidth += adjustedWidth;
            let cellName = null;
            if (column.columnName === 'agency_name') {
                cellName = (index) => (
                    <AgencyLinkCell
                        key={`cell-${column.columnName}-${index}`}
                        rowIndex={index}
                        name={this.props.results[index][column.columnName]}
                        id={this.props.results[index].agency_id}
                        column={column.columnName} />
                );
            }
            else {
                cellName = (index) => (
                    <GenericCell
                        key={`cell-${column.columnName}-${index}`}
                        rowIndex={index}
                        data={this.props.results[index][column.columnName]}
                        column={column.columnName} />
                );
            }
            return {
                width: adjustedWidth,
                name: column.columnName,
                columnId: `${column.columnName}`,
                header: (
                    <HeaderCell
                        label={column.displayName}
                        column={column.columnName}
                        defaultDirection={column.defaultDirection} />
                ),
                cell: cellName
            };
        });

        return {
            columns,
            width: totalWidth
        };
    }

    render() {
        const calculatedValues = this.prepareTable();

        let noResultsClass = '';
        if (this.props.results.length === 0) {
            // remove duplicated bottom border
            noResultsClass = ' no-results';
        }

        const rowCount = this.props.results.length;
        const rows = [];
        for (let i = 0; i <= (rowCount - 1); i++) {
            const row = (<TableRow
                dataHash={`${this.props.batch.searchId}-${this.props.searchHash}`}
                columns={calculatedValues.columns}
                rowIndex={i}
                key={`row-${i}`} />);
            rows.push(row);
        }

        return (
            <div className={`agency-landing-results-table${noResultsClass}`}>
                <table width={this.props.visibleWidth}>
                    <thead>
                        <HeaderRow
                            maxWidth={this.props.visibleWidth}
                            width={this.props.visibleWidth}
                            columns={calculatedValues.columns} />
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

AgencyLandingTable.propTypes = propTypes;
