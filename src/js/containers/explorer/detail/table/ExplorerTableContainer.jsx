/**
 * ExplorerTableContainer.jsx
 * Created by Lizzie Salita 10/16/17
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { orderBy } from 'lodash-es';

import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as explorerActions from 'redux/actions/explorer/explorerActions';

import ExplorerTableFields from 'dataMapping/explorer/explorerTableFields';

import ExplorerTable from 'components/explorer/detail/visualization/table/ExplorerTable';
import { Table } from "data-transparency-ui";

const propTypes = {
    isLoading: PropTypes.bool,
    results: PropTypes.object,
    goDeeper: PropTypes.func,
    total: PropTypes.number,
    goToUnreported: PropTypes.func
};

const ExplorerTableContainer = ({
    isLoading,
    results,
    total,
    goDeeper,
    goToUnreported
}) => {
    // const [results, setResults] = useState([]);
    const [sort, setSort] = useState({ field: 'obligated_amount', direction: 'desc' });
    const [pageOfItems, setPageOfItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(20);

    // componentDidMount() {
    //     this.buildVirtualTable();
    // }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.results !== this.props.results) {
    //         this.buildVirtualTable();
    //     }
    //     if (this.props.order !== prevProps.order) {
    //         // table sort changed
    //         this.buildVirtualTable();
    //     }
    //     if (this.props.pageNumber !== prevProps.pageNumber) {
    //         // page number changed
    //         this.buildVirtualTable();
    //     }
    // }

    const onChangePage = (pageNumber) => {
    // Change page number in Redux state
        const totalPages = Math.ceil(totalItems / pageSize);
        const inRange = (pageNumber > 0) && (pageNumber <= totalPages);
        // TODO: figure out if this even does anything
        if (inRange) {
            // setExplorerTablePage(pageNumber);
        }
    };

    const setPage = (r) => {
        // calculate start and end item indexes
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = Math.min(startIndex + (pageSize - 1), (r.length - 1));

        // Get new page of items from results
        return r.slice(startIndex, endIndex + 1);
    };

    const parseResults = (data) => {
        const resultsArray = [];

        data.forEach((item) => {
            // Format obligated amount
            const formattedCurrency =
                MoneyFormatter.formatMoneyWithPrecision(item.amount, 0);

            const percentageValue = (item.amount / total);

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
                },
                link: item.link
            };
            resultsArray.push(result);
        });

        // TODO: Figure out if this is even being used frfr
        return orderBy(
            resultsArray,
            [order.field],
            [order.direction]
        );
    };

    const buildVirtualTable = () => {
        const orderedResults = parseResults(results);
        const page = setPage(orderedResults);

        setPageOfItems(page);
        setTotalItems(orderedResults.length);
    };

    const orderResults = () => {
        // sort the results by the appropriate table column and direction
        const orderedResults = orderBy(
            results,
            [order.field],
            [order.direction]
        );

        this.setState({
            results: orderedResults
        }, () => {
            setPage();
        });
    };

    const updateSort = (field, direction) => {
        // setExplorerTableOrder({
        //     field,
        //     direction
        // });
        setSort({ field, direction });
    };

    return (
        <Table
            classNames={`explorer-table${results.length === 0 ? ' no-results' : ''}`}
            columns={ExplorerTableFields.columns}
            rows={rows}
            onClickHandler={onClickHandler}
            isMobile={isMobile}
            atMaxLevel={atMaxLevel}
            currentSort={sort}
            isStacked
            newMobileView />
    );
};

ExplorerTableContainer.propTypes = propTypes;
export default connect(
    (state) => ({
        order: state.explorer.table.order,
        pageNumber: state.explorer.table.pageNumber
    }),
    (dispatch) => bindActionCreators(explorerActions, dispatch)
)(ExplorerTableContainer);
