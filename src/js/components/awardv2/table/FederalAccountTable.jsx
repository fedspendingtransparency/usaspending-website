/**
 * FedAccountTable.jsx
 * Created by Kwadwo Opoku-Debrah 02/15/2019
 */

import React from 'react';
import PropTypes from 'prop-types';

import tableMapping from 'dataMapping/awardsv2/federalAccountFunding';
import { measureTableHeader } from 'helpers/textMeasurement';

import ResultsTableNoResults from 'components/search/table/ResultsTableNoResults';
import IBTable from 'components/sharedComponents/IBTable/IBTable';
import FederalAccountTableHeaderCell from './cells/FederalAccountTableHeaderCell';
import FederalAccountTableGenericCell from './cells/FederalAccountTableGenericCell';

const rowHeight = 40;
// setting the table height to a partial row prevents double bottom borders and also clearly
// indicates when there's more data
const tableHeight = 10.5 * rowHeight;

const propTypes = {
    fundingResults: PropTypes.array,
    tableInstance: PropTypes.string,
    tableWidth: PropTypes.number,
    inFlight: PropTypes.bool,
    sort: PropTypes.object,
    nextPage: PropTypes.func.isRequired,
    changeSort: PropTypes.func.isRequired
};

export default class FedAccountTable extends React.Component {
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

    headerCellRender(columnIndex) {
        const column = tableMapping.table._order[columnIndex];
        const displayName = tableMapping.table[column];

        const isLast = columnIndex === tableMapping.table._order.length - 1;

        return (
            <FederalAccountTableHeaderCell
                column={column}
                label={displayName}
                order={this.props.sort}
                defaultDirection={tableMapping.defaultSortDirection[column]}
                setTransactionSort={this.props.changeSort}
                isLastColumn={isLast} />
        );
    }

    bodyCellRender(columnIndex, rowIndex) {
        const column = tableMapping.table._order[columnIndex];
        const item = this.props.fundingResults[rowIndex];

        const isLast = columnIndex === tableMapping.table._order.length - 1;
        let isLink;

        if (column === 'id') {
            isLink = item.awardId && `#/award/${item.awardId}`;
        }
        if (column === 'agency') {
            isLink = item.fundingAgencyId && `#/agency/${item.fundingAgencyId}`;
        }
        if (column === 'fedAccount') {
            isLink = item.accountNumber && `#/federal_account/${item.accountNumber}`;
        }
        if (column === 'awardingAgencyName') {
            isLink = item.awardingAgencyId && `#/agency/${item.awardingAgencyId}`;
        }
        return (
            <FederalAccountTableGenericCell
                rowIndex={rowIndex}
                data={item[column]}
                link={isLink}
                isLastColumn={isLast} />
        );
    }

    buildTable() {
        let totalWidth = 0;

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
        let message = null;
        if (this.props.inFlight) {
            loadingClass = 'loading';
        }
        else if (this.props.fundingResults.length === 0) {
            message = (<ResultsTableNoResults />);
        }

        return (
            <div
                className={`transactions-table ${loadingClass}`}
                ref={(div) => {
                    this.wrapperDiv = div;
                }}>
                <IBTable
                    rowHeight={rowHeight}
                    rowCount={this.props.fundingResults.length}
                    headerHeight={50}
                    contentWidth={tableValues.width}
                    bodyWidth={this.props.tableWidth}
                    bodyHeight={tableHeight}
                    columns={tableValues.columns}
                    onReachedBottom={this.props.nextPage}
                    headerCellRender={this.headerCellRender}
                    bodyCellRender={this.bodyCellRender}
                    ref={(table) => {
                        this.tableComponent = table;
                    }} />
                <div className="results-table-message-container">
                    {message}
                </div>
            </div>
        );
    }
}

FedAccountTable.propTypes = propTypes;
