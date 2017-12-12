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
import ResultsTableAwardIdCell from './cells/ResultsTableAwardIdCell';

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

        this.loadNextPage = this.loadNextPage.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tableInstance !== this.props.tableInstance) {
            // table type has changed, reset the scroll
            if (this.tableComponent) {
                this.tableComponent.scrollTo(0, 0);
                this.tableComponent.updateRows();
            }
        }
    }

    loadNextPage() {
        this.props.loadNextPage();
    }

    prepareTable() {
        let totalWidth = 0;

        const columnOrder = this.props.columns.visibleOrder.toJS();
        const columns = columnOrder.map((columnTitle, i) => {
            const column = this.props.columns.data.get(columnTitle);
            const columnX = totalWidth;
            totalWidth += column.width;

            return {
                x: columnX,
                width: column.width,
                header: () => {
                    const isLast = (i + 1) === columnOrder.length;
                    const isActive = this.props.sort.field === column.columnName;
                    return {
                        headerClass: ResultsTableHeaderCell,
                        additionalProps: {
                            isLast,
                            isActive,
                            title: column.columnName,
                            defaultDirection: column.defaultDirection,
                            currentSort: this.props.sort,
                            updateSort: this.props.updateSort
                        }
                    };
                },
                cell: (rowIndex) => {
                    let cellClass = ResultsTableFormattedCell;
                    const additionalProps = {
                        rowIndex,
                        value: this.props.results[rowIndex][columnTitle],
                        dataType: awardTableColumnTypes[columnTitle]
                    };

                    if (column.columnName === 'Award ID') {
                        cellClass = ResultsTableAwardIdCell;
                        additionalProps.id = this.props.results[rowIndex].internal_id;
                    }

                    return {
                        cellClass,
                        additionalProps
                    };
                }
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
                    onReachedBottom={this.loadNextPage}
                    ref={(table) => {
                        this.tableComponent = table;
                    }} />
            </div>
        );
    }
}

ResultsTable.propTypes = propTypes;
