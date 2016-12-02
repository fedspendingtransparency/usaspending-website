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
    columns: React.PropTypes.array
};


export default class ResultsTable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.rowClassName = this.rowClassName.bind(this);
    }
    shouldComponentUpdate(nextProps) {
        // to reduce the frequency of re-renders, this component will only monitor for
        // batch triggers
        if (!Immutable.is(nextProps.batch, this.props.batch)) {
            return true;
        }
        return false;
    }

    loadNextPage() {
        console.log("next page");
    }

    rowClassName(index) {
        let evenOdd = 'odd';
        if ((index + 1) % 2 === 0) {
            evenOdd = 'even';
        }
        return `award-results-row-${evenOdd}`;
    }

    prepareTable() {
        let totalWidth = 0;

        const columns = this.props.columns.map((column) => {
            totalWidth += column.width;

            return (<Column
                width={column.width}
                key={column.columnName}
                rowClassName={this.rowClassName}
                className="test-class"
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
        console.log("RENDER TABLE");

        const calculatedValues = this.prepareTable();

        return (
            <div className="award-results-table">
                <Table
                    rowHeight={40}
                    rowsCount={this.props.results.length}
                    headerHeight={50}
                    width={calculatedValues.width}
                    maxHeight={13 * 40}
                    rowClassNameGetter={this.rowClassName}>

                    {calculatedValues.columns}

                </Table>
            </div>
        );
    }
}

ResultsTable.propTypes = propTypes;
