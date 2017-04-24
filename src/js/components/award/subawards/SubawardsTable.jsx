/**
 * SubawardsTable.jsx
 * Created by Kevin Li 4/17/17
 */

import React from 'react';
import _ from 'lodash';

import IBTable from 'components/sharedComponents/IBTable/IBTable';
import SubawardsHeaderCellContainer from
    'containers/award/subawards/cells/SubawardsHeaderCellContainer';

import subawardFields from 'dataMapping/contracts/subawardTable';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import TransactionTableGenericCell from 'components/award/table/cells/TransactionTableGenericCell';
import SummaryPageTableMessage from 'components/award/table/SummaryPageTableMessage';


const rowHeight = 40;
// setting the table height to a partial row prevents double bottom borders and also clearly
// indicates when there's more data
const tableHeight = 12.5 * rowHeight;

const propTypes = {
    inFlight: React.PropTypes.bool,
    tableWidth: React.PropTypes.number,
    award: React.PropTypes.object,
    subawards: React.PropTypes.array,
    meta: React.PropTypes.object,
    loadNextPage: React.PropTypes.func
};

export default class SubawardsTable extends React.Component {
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
        if (rowNumber >= this.props.subawards.length) {
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
        return `transaction-row-${evenOdd}`;
    }


    buildTable() {
        let totalWidth = 0;

        const columns = subawardFields.table._order.map((column, i) => {
            const isLast = i === subawardFields.table._order.length - 1;

            let columnWidth = subawardFields.columnWidths[column];
            if (isLast) {
                // make it fill out the remainder of the width necessary
                const remainingSpace = this.props.tableWidth - totalWidth;

                columnWidth = _.max([remainingSpace, columnWidth]);
            }

            totalWidth += columnWidth;

            const apiKey = subawardFields.table._mapping[column];
            const displayName = subawardFields.table[column];
            const defaultSort = subawardFields.defaultSortDirection[column];

            return {
                width: columnWidth,
                name: column,
                columnId: column,
                rowClassName: this.rowClassName,
                header: (<SubawardsHeaderCellContainer
                    label={displayName}
                    column={column}
                    defaultDirection={defaultSort}
                    isLastColumn={isLast} />),
                cell: (index) => {
                    const item = this.props.subawards[index];
                    return (<TransactionTableGenericCell
                        key={`cell-subaward-${column}-${index}`}
                        rowIndex={index}
                        id={item.id}
                        data={`${item[apiKey]}`}
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

        let totalValue = 0;
        if (this.props.award.total_subaward_amount) {
            totalValue = this.props.award.total_subaward_amount;
        }

        let message = null;
        if (this.props.subawards.length === 0) {
            message = (<SummaryPageTableMessage message="No subawards found" />);
        }

        return (
            <div>
                <div className="subaward-totals">
                    <div className="total-item">
                        <span className="total-label">
                            Total Number of Sub-Awards:&nbsp;
                        </span>
                        <span className="total-value">
                            {this.props.award.subaward_count}
                        </span>
                    </div>
                    <div className="total-item">
                        <span className="total-label">
                            Total Sub-Award Amount:&nbsp;
                        </span>
                        <span className="total-value">
                            {MoneyFormatter.formatMoney(totalValue)}
                        </span>
                    </div>
                </div>
                <div
                    className={`subawards-table ${loadingClass}`}
                    ref={(div) => {
                        this.wrapperDiv = div;
                    }}>
                    <IBTable
                        dataHash={`${this.props.meta.render}-${this.props.tableWidth}`}
                        resetHash={this.props.meta.group}
                        rowHeight={rowHeight}
                        rowCount={this.props.subawards.length}
                        headerHeight={50}
                        width={tableValues.width}
                        maxWidth={this.props.tableWidth}
                        maxHeight={tableHeight}
                        columns={tableValues.columns}
                        onScrollEnd={this.tableScrolled} />
                </div>
                {message}
            </div>
        );
    }
}

SubawardsTable.propTypes = propTypes;
