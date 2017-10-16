/**
 * ExplorerTableContainer.jsx
 * Created by Lizzie Salita 10/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { orderBy, range } from 'lodash';

import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as explorerActions from 'redux/actions/explorer/explorerActions';

import ExplorerTableFields from 'dataMapping/explorer/explorerTableFields';

import ExplorerTable from 'components/explorer/detail/visualization/table/ExplorerTable';

const propTypes = {
    order: PropTypes.object,
    pageNumber: PropTypes.number,
    setExplorerTablePage: PropTypes.func,
    results: PropTypes.object,
    goDeeper: PropTypes.func,
    total: PropTypes.number
};

export class ExplorerTableContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [],
            results: [],
            pageOfItems: [],
            pager: {}
        };

        this.onChangePage = this.onChangePage.bind(this);
    }

    componentDidMount() {
        this.showColumns();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.results !== this.props.results) {
            this.parseResults(nextProps.results);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.order !== prevProps.order) {
            // table sort changed
            this.orderResults();
        }
        if (this.props.pageNumber !== prevProps.pageNumber) {
            // page number changed
            this.setPageOfItems();
        }
    }

    onChangePage(pageNumber, inRange) {
        // Change page number in Redux state
        if (inRange) {
            this.props.setExplorerTablePage(pageNumber);
        }
    }

    getPager(totalItems, currentPage, pageSize) {
        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage;
        let endPage;
        let prevEllipses = (<span className="pagination-ellipsis">...</span>);
        let nextEllipses = (<span className="pagination-ellipsis">...</span>);
        let firstButton = (
            <li>
                <button onClick={() => this.onChangePage(1, true)}>{1}</button>
            </li>
        );
        let lastButton = (
            <li>
                <button onClick={() => this.onChangePage(totalPages, true)}>{totalPages}</button>
            </li>
        );
        if (totalPages < 5) {
            // less than 5 total pages so show all
            startPage = 1;
            endPage = totalPages;
            prevEllipses = '';
            nextEllipses = '';
            firstButton = '';
            lastButton = '';
        }
        else {
            if (currentPage === 1) {
                startPage = currentPage;
                endPage = currentPage + 2;
            }
            else if (currentPage === totalPages) {
                startPage = currentPage - 2;
                endPage = currentPage;
            }
            else {
                startPage = currentPage - 1;
                endPage = currentPage + 1;
            }

            if (currentPage < 4) {
                prevEllipses = '';
                firstButton = '';
            }
            else if (currentPage > (totalPages - 3)) {
                nextEllipses = '';
                lastButton = '';
            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + (pageSize - 1), (totalItems - 1));

        // create an array of pages to repeat in the pager control
        const pages = range(startPage, endPage + 1);

        // return object with all pager properties
        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages,
            prevEllipses,
            nextEllipses,
            firstButton,
            lastButton
        };
    }

    setPageOfItems() {
        const page = this.props.pageNumber;
        const results = this.state.results;

        // Get new pager object for specified page
        const pager = this.getPager(results.length, page, 20);

        // Get new page of items from results
        const pageOfItems = results.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({
            pager,
            pageOfItems
        });
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

        this.setState({
            results
        }, () => {
            this.setPageOfItems();
        });
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

        this.setState({
            columns
        }, () => {
            this.parseResults(this.props.results);
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

    render() {
        return (
            <ExplorerTable
                results={this.state.pageOfItems}
                columns={this.state.columns}
                order={this.props.order}
                total={this.props.total}
                goDeeper={this.props.goDeeper}
                onChangePage={this.onChangePage}
                pager={this.state.pager} />
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
