/**
  * ResultsTable.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import Immutable from 'immutable';

import IBTable from 'components/sharedComponents/IBTable/IBTable';

import ResultsTableHeaderCellContainer from
    'containers/search/table/ResultsTableHeaderCellContainer';
import ResultsTableGenericCell from './cells/ResultsTableGenericCell';

const propTypes = {
    results: React.PropTypes.array,
    batch: React.PropTypes.object,
    columns: React.PropTypes.array,
    visibleWidth: React.PropTypes.number,
    loadNextPage: React.PropTypes.func
};

const rowHeight = 40;
// setting the table height to a partial row prevents double bottom borders and also clearly
// indicates when there's more data
const tableHeight = 12.5 * rowHeight;

export default class ResultsTable extends React.PureComponent {
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

    componentWillReceiveProps(nextProps) {
        // update the data hash
        this.setState({
            dataHash: nextProps.currentType
        });
    }

    shouldComponentUpdate(nextProps) {
        // to reduce the frequency of re-renders, this component will only monitor for
        // batch triggers
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

    prepareTable() {
        let totalWidth = 0;

        const columns = this.props.columns.map((column) => {
            totalWidth += column.width;
            return {
                width: column.width,
                name: column.columnName,
                columnId: `${column.columnName}`,
                rowClassName: this.rowClassName,
                header: (
                    <ResultsTableHeaderCellContainer
                        label={column.displayName}
                        column={column.columnName}
                        defaultDirection={column.defaultDirection} />
                ),
                cell: (index) => (
                    <ResultsTableGenericCell
                        key={`cell-${column.columnName}-${index}`}
                        rowIndex={index}
                        data={this.props.results[index][column.columnName]}
                        dataHash={this.state.dataHash}
                        column={column.columnName} />
                )
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
            <div className={`award-results-table${noResultsClass}`}>
                <IBTable
                    dataHash={`${this.state.dataHash}-${this.props.batch.batchId}`}
                    rowHeight={rowHeight}
                    rowCount={this.props.results.length}
                    headerHeight={50}
                    width={calculatedValues.width}
                    maxWidth={this.props.visibleWidth}
                    maxHeight={tableHeight}
                    columns={calculatedValues.columns}
                    onScrollEnd={this.tableScrolled} />
            </div>
        );
    }
}

ResultsTable.propTypes = propTypes;
