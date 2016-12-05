/**
  * ResultsTable.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import { Table, Column } from 'fixed-data-table';
import Immutable from 'immutable';

import ResultsTableHeaderCell from './cells/ResultsTableHeaderCell';
import ResultsTableGenericCell from './cells/ResultsTableGenericCell';

const propTypes = {
    results: React.PropTypes.array,
    batch: React.PropTypes.object,
    columns: React.PropTypes.array,
    loadNextPage: React.PropTypes.func
};

const rowHeight = 40;
const tableHeight = 13 * rowHeight;

export default class ResultsTable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            yPos: 0,
            xPos: 0
        };

        this.rowClassName = this.rowClassName.bind(this);
        this.tableScrolled = this.tableScrolled.bind(this);
    }
    shouldComponentUpdate(nextProps) {
        // to reduce the frequency of re-renders, this component will only monitor for
        // batch triggers
        if (!Immutable.is(nextProps.batch, this.props.batch)) {
            return true;
        }
        return false;
    }

    tableScrolled(xPos, yPos) {
        // determine the table position
        const rowNumber = this.rowAtYPosition(yPos);

        if (rowNumber >= this.props.results.length) {
            // we have reached the bottom of the table, load next page
            this.props.loadNextPage();
        }

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
        return `award-results-row-${evenOdd}`;
    }

    prepareVisibleCells() {

    }

    prepareTable() {
        let totalWidth = 0;

        const columns = this.props.columns.map((column) => {
            totalWidth += column.width;

            return (<Column
                width={column.width}
                key={column.columnName}
                rowClassName={this.rowClassName}
                allowCellsRecycling
                header={
                    <ResultsTableHeaderCell
                        label={column.displayName}
                        column={column.columnName} />
                }
                cell={
                    <ResultsTableGenericCell
                        data={this.props.results}
                        column={column.columnName} />
                } />);
        });

        return {
            columns,
            width: totalWidth
        };
    }

    render() {
        const calculatedValues = this.prepareTable();

        return (
            <div className="award-results-table">
                <Table
                    rowHeight={rowHeight}
                    rowsCount={this.props.results.length}
                    headerHeight={50}
                    width={calculatedValues.width}
                    maxHeight={tableHeight}
                    rowClassNameGetter={this.rowClassName}
                    onScrollEnd={this.tableScrolled}>

                    {calculatedValues.columns}

                </Table>
            </div>
        );
    }
}

ResultsTable.propTypes = propTypes;
