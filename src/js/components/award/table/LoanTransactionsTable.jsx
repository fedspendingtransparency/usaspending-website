/**
 * LoanTransactionsTable.jsx
 * Created by Emily Gullo 04/24/2017
 */

import React from 'react';
import _ from 'lodash';

import tableMapping from 'dataMapping/financialAssistance/loanTransactionTable';

import IBTable from 'components/sharedComponents/IBTable/IBTable';
import LoanTransactionHeaderCellContainer from
    'containers/award/table/cells/LoanTransactionHeaderCellContainer';

import AssistanceTransactionGenericCell from './cells/AssistanceTransactionGenericCell';

const rowHeight = 40;
// setting the table height to a partial row prevents double bottom borders and also clearly
// indicates when there's more data
const tableHeight = 12.5 * rowHeight;

const propTypes = {
    award: React.PropTypes.object,
    tableWidth: React.PropTypes.number,
    inFlight: React.PropTypes.bool,
    nextTransactionPage: React.PropTypes.func
};

export default class LoanTransactionsTable extends React.Component {
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

            let columnWidth = tableMapping.columnWidths[column];
            if (isLast) {
                // make it fill out the remainder of the width necessary
                const remainingSpace = this.props.tableWidth - totalWidth;

                columnWidth = _.max([remainingSpace, columnWidth]);
            }

            totalWidth += columnWidth;

            const apiKey = tableMapping.table._mapping[column];
            const displayName = tableMapping.table[column];
            const defaultSort = tableMapping.defaultSortDirection[column];

            return {
                width: columnWidth,
                name: column,
                columnId: column,
                rowClassName: this.rowClassName,
                header: (<LoanTransactionHeaderCellContainer
                    label={displayName}
                    column={column}
                    defaultDirection={defaultSort}
                    isLastColumn={isLast} />),
                cell: (index) => {
                    const item = this.props.award.transactions[index];
                    return (<AssistanceTransactionGenericCell
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

        let noResultsClass = '';
        if (this.props.inFlight) {
            noResultsClass = 'no-results';
        }

        return (
            <div
                className={`transactions-table ${noResultsClass}`}
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

LoanTransactionsTable.propTypes = propTypes;
