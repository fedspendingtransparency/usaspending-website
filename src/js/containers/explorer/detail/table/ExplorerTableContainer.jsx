/**
 * ExplorerTableContainer.jsx
 * Created by Lizzie Salita 10/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { orderBy } from 'lodash';

import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as explorerActions from 'redux/actions/explorer/explorerActions';

import ExplorerTableFields from 'dataMapping/explorer/explorerTableFields';

import ExplorerTable from 'components/explorer/detail/visualization/table/ExplorerTable';

const propTypes = {
    isLoading: PropTypes.bool,
    order: PropTypes.object,
    setExplorerTableOrder: PropTypes.func,
    pageNumber: PropTypes.number,
    setExplorerTablePage: PropTypes.func,
    results: PropTypes.object,
    goDeeper: PropTypes.func,
    total: PropTypes.number,
    goToUnreported: PropTypes.func
};

export class ExplorerTableContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [],
            results: [],
            pageOfItems: [],
            totalItems: 0,
            pageSize: 20
        };

        this.onChangePage = this.onChangePage.bind(this);
        this.buildVirtualTable = this.buildVirtualTable.bind(this);
        this.updateSort = this.updateSort.bind(this);
    }

    componentDidMount() {
        this.buildVirtualTable();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.results !== this.props.results) {
            this.buildVirtualTable();
        }
        if (this.props.order !== prevProps.order) {
            // table sort changed
            this.buildVirtualTable();
        }
        if (this.props.pageNumber !== prevProps.pageNumber) {
            // page number changed
            this.buildVirtualTable();
        }
    }

    onChangePage(pageNumber) {
        // Change page number in Redux state
        const totalPages = Math.ceil(this.state.totalItems / this.state.pageSize);
        const inRange = (pageNumber > 0) && (pageNumber <= totalPages);
        if (inRange) {
            this.props.setExplorerTablePage(pageNumber);
        }
    }

    setPageOfItems(results) {
        // calculate start and end item indexes
        const startIndex = (this.props.pageNumber - 1) * this.state.pageSize;
        const endIndex = Math.min(startIndex + (this.state.pageSize - 1), (results.length - 1));

        // Get new page of items from results
        return results.slice(startIndex, endIndex + 1);
    }

    parseResults(data) {
        const results = [];

        data.forEach((item) => {
            // Format obligated amount
            const formattedCurrency =
                MoneyFormatter.formatMoneyWithPrecision(item.amount, 0);

            const percentageValue = (item.amount / this.props.total);

            // Convert from decimal value to percentage and round to 2 decimal places
            const formattedPercentage = (percentageValue * 100).toFixed(2);

            let percent = `${formattedPercentage}%`;
            if (percent === '0.00%') {
                percent = 'Less than 0.01%';
            }

            const result = {
                name: item.name,
                id: item.id,
                account_number: item.account_number,
                obligated_amount: item.amount,
                percent_of_total: percentageValue,
                display: {
                    name: item.name,
                    obligated_amount: formattedCurrency,
                    percent_of_total: percent
                }
            };
            results.push(result);
        });

        return orderBy(results,
            [this.props.order.field], [this.props.order.direction]);
    }

    showColumns() {
        const columns = [];
        const sortOrder = ExplorerTableFields.defaultSortDirection;

        ExplorerTableFields.order.forEach((col) => {
            const displayName = ExplorerTableFields[col];

            const column = {
                columnName: col,
                displayName,
                defaultDirection: sortOrder[col]
            };
            columns.push(column);
        });

        return columns;
    }

    buildVirtualTable() {
        const columns = this.showColumns();
        const orderedResults = this.parseResults(this.props.results);
        const pageOfItems = this.setPageOfItems(orderedResults);

        this.setState({
            columns,
            pageOfItems,
            totalItems: orderedResults.length
        });
    }

    orderResults() {
        // sort the results by the appropriate table column and direction
        const orderedResults = orderBy(this.state.results,
            [this.props.order.field], [this.props.order.direction]);

        this.setState({
            results: orderedResults
        }, () => {
            this.setPageOfItems();
        });
    }

    updateSort(field, direction) {
        this.props.setExplorerTableOrder({
            field,
            direction
        });
    }

    render() {
        return (
            <ExplorerTable
                isLoading={this.props.isLoading}
                results={this.state.pageOfItems}
                columns={this.state.columns}
                order={this.props.order}
                updateSort={this.updateSort}
                total={this.props.total}
                goDeeper={this.props.goDeeper}
                onChangePage={this.onChangePage}
                pageNumber={this.props.pageNumber}
                totalItems={this.state.totalItems}
                pageSize={this.state.pageSize}
                goToUnreported={this.props.goToUnreported} />
        );
    }
}

ExplorerTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        order: state.explorer.table.order,
        pageNumber: state.explorer.table.pageNumber
    }),
    (dispatch) => bindActionCreators(explorerActions, dispatch)
)(ExplorerTableContainer);
