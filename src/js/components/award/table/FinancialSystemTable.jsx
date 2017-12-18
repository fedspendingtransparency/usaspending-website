/**
 * FinancialSystemTable.jsx
 * Created by Kevin Li 3/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import IBTable from 'components/sharedComponents/IBTable/IBTable';

import { measureTableHeader } from 'helpers/textMeasurement';

import tableMapping from 'dataMapping/contracts/financialSystem';

import FinSysHeaderCell from './cells/FinSysHeaderCell';
import FinSysGenericCell from './cells/FinSysGenericCell';
import FinSysAccountCell from './cells/FinSysAccountCell';
import SummaryPageTableMessage from './SummaryPageTableMessage';

const rowHeight = 40;
// setting the table height to a partial row prevents double bottom borders and also clearly
// indicates when there's more data
const tableHeight = 10.5 * rowHeight;

const propTypes = {
    award: PropTypes.object,
    tableWidth: PropTypes.number,
    nextPage: PropTypes.func,
    inFlight: PropTypes.bool
};

export default class FinancialSystemTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            xPos: 0,
            yPos: 0
        };

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
            <FinSysHeaderCell
                column={column}
                label={displayName}
                order={this.props.sort}
                defaultDirection={tableMapping.defaultSortDirection[column]}
                setFinSysSort={this.props.changeSort}
                isLastColumn={isLast} />
        );
    }

    bodyCellRender(columnIndex, rowIndex) {
        const column = tableMapping.table._order[columnIndex];
        const apiKey = tableMapping.table._mapping[column];
        const item = this.props.data[rowIndex];

        const isLast = columnIndex === tableMapping.table._order.length - 1;

        let component = FinSysGenericCell;
        if (column === 'fedAccount') {
            component = FinSysAccountCell;
        }

        return React.createElement(
            component,
            {
                rowIndex,
                column,
                data: item[apiKey],
                isLastColumn: isLast
            }
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

        let inFlightClass = '';
        if (this.props.inFlight) {
            inFlightClass = ' loading';
        }

        let message = null;
        if (this.props.inFlight) {
            message = (<SummaryPageTableMessage
                message="Loading data..." />);
        }
        if (this.props.data.length === 0) {
            // no results
            message = (<SummaryPageTableMessage
                message="No financial system details are available" />);
        }

        return (
            <div className="financial-system-content">
                <div className="disclaimer">
                    NOTE: This is part of new data reported under the DATA Act starting in
                    Q2 of FY 2017.  &nbsp;It comes directly from the audited financial systems of
                    federal agencies.
                </div>
                <div className={`financial-system-table ${inFlightClass}`}>
                    <IBTable
                        rowHeight={rowHeight}
                        rowCount={this.props.data.length}
                        headerHeight={50}
                        contentWidth={tableValues.width}
                        bodyWidth={this.props.tableWidth}
                        bodyHeight={tableHeight}
                        columns={tableValues.columns}
                        onReachedBottom={this.props.loadNextPage}
                        headerCellRender={this.headerCellRender}
                        bodyCellRender={this.bodyCellRender}
                        ref={(table) => {
                            this.tableComponent = table;
                        }} />
                </div>
                {message}
            </div>
        );
    }
}

FinancialSystemTable.propTypes = propTypes;
