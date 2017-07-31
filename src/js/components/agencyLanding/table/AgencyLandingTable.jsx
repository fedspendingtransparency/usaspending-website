/**
 * AgencyLandingTable.jsx
 * Created by Lizzie Salita 7/7/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import IBTable from 'components/sharedComponents/IBTable/IBTable';

import ResultsTableGenericCell from 'components/search/table/cells/ResultsTableGenericCell';
import AgencyLinkCell from './cells/AgencyLinkCell';

const propTypes = {
    batch: PropTypes.object,
    results: PropTypes.array,
    columns: PropTypes.array,
    headerCellClass: PropTypes.func.isRequired,
    visibleWidth: PropTypes.number
};

const rowHeight = 50;
// setting the table height to a partial row prevents double bottom borders and also clearly
// indicates when there's more data
const tableHeight = 12.5 * rowHeight;

export default class AgencyLandingTable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            yPos: 0,
            xPos: 0,
            dataHash: null
        };

        this.rowClassName = this.rowClassName.bind(this);
        this.tableScrolled = this.tableScrolled.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        if (!Immutable.is(nextProps.batch, this.props.batch)) {
            return true;
        }
        else if (nextProps.visibleWidth !== this.props.visibleWidth) {
            // re-render if the window size changed
            return true;
        }
        return false;
    }

    tableScrolled(xPos, yPos) {
        // save the scroll position
        this.setState({ xPos, yPos });
    }

    rowAtYPosition(yPos, returnTop = false) {
        // determine the table position
        let yPosition = yPos;
        if (!returnTop) {
            // return the bottom row
            yPosition += tableHeight;
        }
        return Math.floor(yPosition / rowHeight);
    }

    rowClassName(index) {
        let evenOdd = 'odd';
        if ((index + 1) % 2 === 0) {
            evenOdd = 'even';
        }
        return `agency-landing-results-row-${evenOdd}`;
    }

    prepareTable() {
        let totalWidth = 0;

        const HeaderCell = this.props.headerCellClass;

        const columns = this.props.columns.map((column, i) => {
            // For this table, make each column's width a percentage of the visible width
            const adjustedWidth = (this.props.visibleWidth * column.width);
            totalWidth += adjustedWidth;
            const isLast = i === this.props.columns.length - 1;
            let cellName = null;
            if (column.columnName === 'agency_name') {
                cellName = (index) => (
                    <AgencyLinkCell
                        key={`cell-${column.columnName}-${index}`}
                        rowIndex={index}
                        data={this.props.results[index][column.columnName]}
                        dataHash={this.state.dataHash}
                        column={column.columnName}
                        isLastColumn={isLast} />
                );
            }
            else {
                cellName = (index) => (
                    <ResultsTableGenericCell
                        key={`cell-${column.columnName}-${index}`}
                        rowIndex={index}
                        data={this.props.results[index][column.columnName]}
                        dataHash={this.state.dataHash}
                        column={column.columnName}
                        isLastColumn={isLast} />
                );
            }
            return {
                width: adjustedWidth,
                name: column.columnName,
                columnId: `${column.columnName}`,
                rowClassName: this.rowClassName,
                header: (
                    <HeaderCell
                        label={column.displayName}
                        column={column.columnName}
                        defaultDirection={column.defaultDirection}
                        isLastColumn={isLast} />
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

        return (
            <div className={`agency-landing-results-table${noResultsClass}`}>
                <IBTable
                    dataHash={`${this.state.dataHash}-${this.props.batch.queryId}-${this.props.visibleWidth}`}
                    resetHash={this.props.batch.searchId}
                    rowHeight={rowHeight}
                    rowCount={this.props.results.length}
                    headerHeight={50}
                    width={this.props.visibleWidth}
                    maxWidth={this.props.visibleWidth}
                    maxHeight={tableHeight}
                    columns={calculatedValues.columns}
                    onScrollEnd={this.tableScrolled} />
            </div>
        );
    }
}

AgencyLandingTable.propTypes = propTypes;
