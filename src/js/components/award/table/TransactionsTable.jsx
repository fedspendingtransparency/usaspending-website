/**
 * TransactionsTable.jsx
 * Created by Kevin Li 2/25/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import contractMapping from 'dataMapping/contracts/transactionTable';
import assistanceMapping from
    'dataMapping/financialAssistance/financialAssistanceTransactionTable';
import loanMapping from 'dataMapping/financialAssistance/loanTransactionTable';

import { measureTableHeader } from 'helpers/textMeasurement';

import IBTable from 'components/sharedComponents/IBTable/IBTable';
import TransactionTableHeaderCell from './cells/TransactionTableHeaderCell';

import TransactionTableGenericCell from './cells/TransactionTableGenericCell';

const rowHeight = 40;
// setting the table height to a partial row prevents double bottom borders and also clearly
// indicates when there's more data
const tableHeight = 10.5 * rowHeight;

const propTypes = {
    transactions: PropTypes.array,
    tableInstance: PropTypes.string,
    tableWidth: PropTypes.number,
    inFlight: PropTypes.bool,
    sort: PropTypes.object,
    nextTransactionPage: PropTypes.func.isRequired,
    changeSort: PropTypes.func.isRequired,
    category: PropTypes.string
};

export default class TransactionsTable extends React.Component {
    constructor(props) {
        super(props);

        this.headerCellRender = this.headerCellRender.bind(this);
        this.bodyCellRender = this.bodyCellRender.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tableInstance !== this.props.tableInstance) {
            if (this.tableComponent) {
                this.tableComponent.reloadTable();
            }
        }
    }

    tableMapping() {
        let tableMapping = assistanceMapping;
        if (this.props.category === 'contract' || this.props.category === 'idv') {
            tableMapping = contractMapping;
        }
        else if (this.props.category === 'loan') {
            tableMapping = loanMapping;
        }
        return tableMapping;
    }

    headerCellRender(columnIndex) {
        const tableMapping = this.tableMapping();
        const column = tableMapping.table._order[columnIndex];
        const displayName = tableMapping.table[column];

        const isLast = columnIndex === tableMapping.table._order.length - 1;

        return (
            <TransactionTableHeaderCell
                column={column}
                label={displayName}
                order={this.props.sort}
                defaultDirection={tableMapping.defaultSortDirection[column]}
                setTransactionSort={this.props.changeSort}
                isLastColumn={isLast} />
        );
    }

    bodyCellRender(columnIndex, rowIndex) {
        const tableMapping = this.tableMapping();
        const column = tableMapping.table._order[columnIndex];
        const item = this.props.transactions[rowIndex];

        const isLast = columnIndex === tableMapping.table._order.length - 1;

        return (
            <TransactionTableGenericCell
                rowIndex={rowIndex}
                data={item[column]}
                isLastColumn={isLast} />
        );
    }

    buildTable() {
        let totalWidth = 0;

        const tableMapping = this.tableMapping();

        const columns = tableMapping.table._order.map((column, i) => {
            const columnX = totalWidth;
            const isLast = i === tableMapping.table._order.length - 1;

            const displayName = tableMapping.table[column];
            let columnWidth = Math.max(measureTableHeader(displayName),
                tableMapping.columnWidths[column]);
            if (isLast) {
                // make it fill out the remainder of the width necessary
                const remainingSpace = this.props.tableWidth - totalWidth;

                columnWidth = Math.max(remainingSpace, columnWidth);
            }

            totalWidth += columnWidth;

            return {
                x: columnX,
                width: columnWidth
            };
        });

        return {
            columns,
            width: totalWidth
        };
    }

    render() {
        const tableValues = this.buildTable();

        let loadingClass = '';
        if (this.props.inFlight) {
            loadingClass = 'loading';
        }

        return (
            <div
                className={`transactions-table ${loadingClass}`}
                ref={(div) => {
                    this.wrapperDiv = div;
                }}>
                <IBTable
                    rowHeight={rowHeight}
                    rowCount={this.props.transactions.length}
                    headerHeight={50}
                    contentWidth={tableValues.width}
                    bodyWidth={this.props.tableWidth}
                    bodyHeight={tableHeight}
                    columns={tableValues.columns}
                    onReachedBottom={this.props.nextTransactionPage}
                    headerCellRender={this.headerCellRender}
                    bodyCellRender={this.bodyCellRender}
                    ref={(table) => {
                        this.tableComponent = table;
                    }} />
            </div>
        );
    }
}

TransactionsTable.propTypes = propTypes;
