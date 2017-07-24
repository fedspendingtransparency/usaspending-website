/**
 * ContractTransactionsTable.jsx
 * Created by Kevin Li 2/25/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import tableMapping from 'dataMapping/contracts/transactionTable';

import { measureTableHeader } from 'helpers/textMeasurement';

import IBTable from 'components/sharedComponents/IBTable/IBTable';
import TransactionTableHeaderCellContainer from
    'containers/award/table/cells/TransactionTableHeaderCellContainer';

import TransactionTableGenericCell from './cells/TransactionTableGenericCell';

const rowHeight = 40;
// setting the table height to a partial row prevents double bottom borders and also clearly
// indicates when there's more data
const tableHeight = 12.5 * rowHeight;

const propTypes = {
    award: PropTypes.object,
    tableWidth: PropTypes.number,
    inFlight: PropTypes.bool,
    nextTransactionPage: PropTypes.func
};

export default class ContractTransactionsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            xPos: 0,
            yPos: 0
        };

        this.rowClassName = this.rowClassName.bind(this);
        this.tableScrolled = this.tableScrolled.bind(this);
    }

    tableScrolled(xPos, yPos) {
        // determine the table position
        const rowNumber = this.rowAtYPosition(yPos);
        if (rowNumber >= this.props.award.transactions.length) {
            // we have reached the bottom of the table, load next page
            this.props.nextTransactionPage();
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
        return `transaction-row-${evenOdd}`;
    }


    buildTable() {
        let totalWidth = 0;

        const columns = tableMapping.table._order.map((column, i) => {
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

            const apiKey = tableMapping.table._mapping[column];
            const defaultSort = tableMapping.defaultSortDirection[column];

            return {
                width: columnWidth,
                name: column,
                columnId: column,
                rowClassName: this.rowClassName,
                header: (<TransactionTableHeaderCellContainer
                    label={displayName}
                    column={column}
                    defaultDirection={defaultSort}
                    isLastColumn={isLast} />),
                cell: (index) => {
                    const item = this.props.award.transactions[index];
                    return (<TransactionTableGenericCell
                        key={`cell-transaction-${column}-${index}`}
                        rowIndex={index}
                        id={item.id}
                        data={item[apiKey]}
                        column={column}
                        isLastColumn={isLast} />);
                }
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
                    dataHash={`${this.props.award.renderHash}-${this.props.tableWidth}`}
                    resetHash={this.props.award.groupHash}
                    rowHeight={rowHeight}
                    rowCount={this.props.award.transactions.length}
                    headerHeight={50}
                    width={tableValues.width}
                    maxWidth={this.props.tableWidth}
                    maxHeight={tableHeight}
                    columns={tableValues.columns}
                    onScrollEnd={this.tableScrolled} />
            </div>
        );
    }
}

ContractTransactionsTable.propTypes = propTypes;
