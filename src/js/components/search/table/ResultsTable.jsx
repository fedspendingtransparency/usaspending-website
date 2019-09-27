/**
  * ResultsTable.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

import { awardTableColumnTypes } from 'dataMapping/search/awardTableColumnTypes';

import IBTable from 'components/sharedComponents/IBTable/IBTable';

import ResultsTableHeaderCell from './cells/ResultsTableHeaderCell';
import ResultsTableFormattedCell from './cells/ResultsTableFormattedCell';
import ResultsTableLinkCell from './cells/ResultsTableLinkCell';

const propTypes = {
    results: PropTypes.array,
    columns: PropTypes.object,
    visibleWidth: PropTypes.number,
    loadNextPage: PropTypes.func,
    currentType: PropTypes.string,
    tableInstance: PropTypes.string,
    sort: PropTypes.object,
    updateSort: PropTypes.func
};

const rowHeight = 40;
// setting the table height to a partial row prevents double bottom borders and also clearly
// indicates when there's more data
const tableHeight = 29.5 * rowHeight;

export default class ResultsTable extends React.Component {
    constructor(props) {
        super(props);

        this.headerCellRender = this.headerCellRender.bind(this);
        this.bodyCellRender = this.bodyCellRender.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.tableInstance !== this.props.tableInstance) {
            // table type has changed, reset the scroll
            if (this.tableComponent) {
                this.tableComponent.reloadTable();
            }
        }
    }

    headerCellRender(columnIndex) {
        const columnId = this.props.columns.visibleOrder[columnIndex];
        const column = this.props.columns.data[columnId];
        const isLast = (columnIndex + 1) === this.props.columns.visibleOrder.length;
        const isActive = this.props.sort.field === column.columnName;
        return (
            <ResultsTableHeaderCell
                isLast={isLast}
                isActive={isActive}
                title={column.columnName}
                displayName={column.displayName}
                defaultDirection={column.defaultDirection}
                currentSort={this.props.sort}
                updateSort={this.props.updateSort} />
        );
    }

    bodyCellRender(columnIndex, rowIndex) {
        const columnId = this.props.columns.visibleOrder[columnIndex];
        const column = this.props.columns.data[columnId];
        let cellClass = ResultsTableFormattedCell;
        const props = {
            rowIndex,
            columnIndex,
            value: this.props.results[rowIndex][columnId],
            dataType: awardTableColumnTypes[columnId]
        };

        if (column.columnName === 'Award ID') {
            cellClass = ResultsTableLinkCell;
            props.id = this.props.results[rowIndex].internal_id;
            props.column = 'award';
        }
        else if (column.columnName === 'Recipient Name' && this.props.results[rowIndex].recipient_id) {
            cellClass = ResultsTableLinkCell;
            props.id = this.props.results[rowIndex].recipient_id;
            props.column = 'recipient';
        }
        else if (column.columnName === 'Prime Recipient Name' && this.props.results[rowIndex].prime_award_recipient_id) {
            // for Sub-Awards
            cellClass = ResultsTableLinkCell;
            props.id = this.props.results[rowIndex].prime_award_recipient_id;
            props.column = 'recipient';
        }

        return React.createElement(
            cellClass,
            props
        );
    }

    prepareTable() {
        let totalWidth = 0;

        const columnOrder = this.props.columns.visibleOrder;
        const columns = columnOrder.map((columnTitle) => {
            const column = this.props.columns.data[columnTitle];
            const columnX = totalWidth;
            totalWidth += column.width;

            return {
                x: columnX,
                width: column.width
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

        const variableBodyHeight = Math.min(tableHeight, rowHeight * this.props.results.length);

        return (
            <div className={`award-results-table${noResultsClass}`}>
                <IBTable
                    rowHeight={rowHeight}
                    rowCount={this.props.results.length}
                    headerHeight={50}
                    contentWidth={calculatedValues.width}
                    bodyWidth={this.props.visibleWidth}
                    bodyHeight={variableBodyHeight}
                    columns={calculatedValues.columns}
                    headerCellRender={this.headerCellRender}
                    bodyCellRender={this.bodyCellRender}
                    onReachedBottom={this.props.loadNextPage}
                    ref={(table) => {
                        this.tableComponent = table;
                    }} />
            </div>
        );
    }
}

ResultsTable.propTypes = propTypes;
