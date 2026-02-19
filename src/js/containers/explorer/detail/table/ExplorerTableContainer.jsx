/**
 * ExplorerTableContainer.jsx
 * Created by Lizzie Salita 10/16/17
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash-es';
import { Table } from "data-transparency-ui";

import { formatMoneyWithPrecision } from "helpers/moneyFormatter";
import { columns } from 'dataMapping/explorer/explorerTableFields';

const parseResults = (data, total, sort) => {
    const resultsArray = [];

    data.forEach((item) => {
        // Format obligated amount
        const formattedCurrency =
            formatMoneyWithPrecision(item.amount, 0);

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

    return orderBy(
        resultsArray,
        [sort.field],
        [sort.direction]
    );
};

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
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [pageNumber, setPageNumber] = useState(1);

    const onChangePage = (p) => {
        // Change page number in Redux state
        const totalPages = Math.ceil(totalItems / pageSize);
        const inRange = (p > 0) && (p <= totalPages);
        if (inRange) {
            // setExplorerTablePage(pageNumber);
        }
    };

    const rows = parseResults(results, total, sort).map(
        ({ display }) => [display.name, display.obligated_amount, display.percent_of_total]
    );

    console.log({ rows });

    // const setPage = (r) => {
    //     // calculate start and end item indexes
    //     const startIndex = (pageNumber - 1) * pageSize;
    //     const endIndex = Math.min(startIndex + (pageSize - 1), (r.length - 1));
    //
    //     // Get new page of items from results
    //     return r.slice(startIndex, endIndex + 1);
    // };

    const updateSort = (field, direction) => setSort({ field, direction });

    return (
        <Table
            classNames={`explorer-table${results.length === 0 ? ' no-results' : ''}`}
            columns={columns}
            rows={rows}
            // onClickHandler={onClickHandler}
            // isMobile={isMobile}
            // atMaxLevel={atMaxLevel}
            currentSort={sort}
            updateSort={updateSort}
            isStacked
            newMobileView />
    );
};

ExplorerTableContainer.propTypes = propTypes;
export default ExplorerTableContainer;
