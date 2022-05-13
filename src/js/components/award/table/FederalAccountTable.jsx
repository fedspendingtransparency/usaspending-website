/**
 * FedAccountTable.jsx
 * Created by Kwadwo Opoku-Debrah 02/15/2019
 */

import React from 'react';
import PropTypes from 'prop-types';

import { idvTableMapping, nonIdvTableMapping } from 'dataMapping/award/federalAccountFunding';
import { measureTableHeader } from 'helpers/textMeasurement';

import ResultsTableNoResults from 'components/search/table/ResultsTableNoResults';
import IBTable from 'components/sharedComponents/IBTable/IBTable';
import FederalAccountTableHeaderCell from './cells/FederalAccountTableHeaderCell';
import FederalAccountTableGenericCell from './cells/FederalAccountTableGenericCell';
import { AWARD_TYPE_PROPS } from '../../../propTypes';
import ResultsTableErrorMessage from '../../search/table/ResultsTableErrorMessage';

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
    changeSort: PropTypes.func.isRequired,
    category: AWARD_TYPE_PROPS,
    error: PropTypes.bool
};

export default class FedAccountTable extends React.Component {
    constructor(props) {
        super(props);

        this.headerCellRender = this.headerCellRender.bind(this);
        this.bodyCellRender = this.bodyCellRender.bind(this);
        this.tableMapping = nonIdvTableMapping;
    }

    componentDidMount() {
        if (this.props.category === 'idv') {
            this.tableMapping = idvTableMapping;
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tableInstance !== this.props.tableInstance) {
            if (this.tableComponent) {
                this.tableComponent.reloadTable();
            }
        }
    }

    headerCellRender(columnIndex) {
        const column = this.tableMapping.table._order[columnIndex];
        const displayName = this.tableMapping.table[column];

        const isLast = columnIndex === this.tableMapping.table._order.length - 1;

        return (
            <FederalAccountTableHeaderCell
                tableMapping={this.tableMapping}
                column={column}
                label={displayName}
                order={this.props.sort}
                defaultDirection={this.tableMapping.defaultSortDirection[column]}
                setTransactionSort={this.props.changeSort}
                isLastColumn={isLast} />
        );
    }

    bodyCellRender(columnIndex, rowIndex, category = this.props.category) {
        const column = this.tableMapping.table._order[columnIndex];
        const item = this.props.fundingResults[rowIndex];

        const isLast = columnIndex === this.tableMapping.table._order.length - 1;
        let link;
        if (column === 'id') {
            link = item.generatedId ? `award/${item.generatedId}` : null;
        }
        if (column === 'agency') {
            link = item.fundingAgencySlug ? `agency/${item.fundingAgencySlug}` : null;
        }
        if (column === 'fedAccount') {
            if (category === 'idv') {
                link = item.accountNumber ? `federal_account/${item.accountNumber}` : null;
            }
            else {
                link = item.federalAccountCode ? `federal_account/${item.federalAccountCode}` : null;
            }
        }
        if (column === 'awardingAgencyName') {
            link = item.awardingAgencySlug ? `agency/${item.awardingAgencySlug}` : null;
        }
        return (
            <FederalAccountTableGenericCell
                rowIndex={rowIndex}
                data={item[column]}
                link={link}
                isLastColumn={isLast} />
        );
    }

    buildTable() {
        let totalWidth = 0;

        const columns = this.tableMapping.table._order.map((column, i) => {
            const columnX = totalWidth;
            const isLast = i === this.tableMapping.table._order.length - 1;

            const displayName = this.tableMapping.table[column];
            let columnWidth = Math.max(measureTableHeader(displayName),
                this.tableMapping.columnWidths[column]);
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
            if (this.props.error) {
                message = <ResultsTableErrorMessage />;
            }
            else {
                message = (<ResultsTableNoResults />);
            }
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
