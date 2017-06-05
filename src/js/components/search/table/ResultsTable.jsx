/**
  * ResultsTable.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import Immutable, { OrderedSet } from 'immutable';

import IBTable from 'components/sharedComponents/IBTable/IBTable';

import ResultsTableGenericCell from './cells/ResultsTableGenericCell';
import ResultsTableAwardIdCell from './cells/ResultsTableAwardIdCell';

const propTypes = {
    results: React.PropTypes.array,
    batch: React.PropTypes.object,
    columns: React.PropTypes.array,
    headerCellClass: React.PropTypes.func.isRequired,
    visibleWidth: React.PropTypes.number,
    loadNextPage: React.PropTypes.func,
    currentType: React.PropTypes.string
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
        const currentType = nextProps.currentType;
        const visibleColumnsSet = new OrderedSet(nextProps.columns);
        // update the data hash
        this.setState({
            dataHash: `${currentType}-${visibleColumnsSet.hashCode()}`
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
        else if (nextProps.columns !== this.props.columns) {
            // re-render if column visibility changed
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

        const HeaderCell = this.props.headerCellClass;

        const columns = this.props.columns.map((column, i) => {
            totalWidth += column.width;
            const isLast = i === this.props.columns.length - 1;
            let cellName = null;
            if (column.columnName === 'award_id') {
                cellName = (index) => (
                    <ResultsTableAwardIdCell
                        key={`cell-${column.columnName}-${index}`}
                        rowIndex={index}
                        id={this.props.results[index].id}
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
                width: column.width,
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
            <div className={`award-results-table${noResultsClass}`}>
                <IBTable
                    dataHash={`${this.state.dataHash}-${this.props.batch.queryId}`}
                    resetHash={this.props.batch.searchId}
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
