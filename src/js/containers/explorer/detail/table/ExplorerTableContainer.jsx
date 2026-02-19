/**
 * ExplorerTableContainer.jsx
 * Created by Lizzie Salita 10/16/17
 */

import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash-es';
import { Pagination, Table } from "data-transparency-ui";

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
    ).map(
        ({ display }) => [display.name, display.obligated_amount, display.percent_of_total]);
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
    const [sort, setSort] = useState({ field: 'obligated_amount', direction: 'desc' });
    const [pageNumber, setPageNumber] = useState(1);

    const pageSize = 20;
    const totalItems = results.size;

    const onChangePage = (p) => {
        const totalPages = Math.ceil(totalItems / pageSize);
        const inRange = (p > 0) && (p <= totalPages);

        if (inRange) setPageNumber(p);
    };

    const rows = useMemo(() => {
        const parsedResults = parseResults(results, total, sort);

        if (totalItems < pageSize) return parsedResults;

        const endingIndex = (pageNumber * pageSize) - 1;
        const startingIndex = (pageNumber - 1) * pageSize;


        return parsedResults.filter((v, i) => i <= endingIndex && startingIndex <= i);
    }
    , [pageNumber, results, total, sort, totalItems]);

    const updateSort = (field, direction) => setSort({ field, direction });

    return (
        <div className={`explorer-table${results.length === 0 ? ' no-results' : ''}`}>
            <Pagination
                resultsText
                changePage={onChangePage}
                currentPage={pageNumber}
                totalItems={totalItems}
                pageSize={pageSize} />
            <Table
                columns={columns}
                rows={rows}
                // onClickHandler={onClickHandler}
                // isMobile={isMobile}
                // atMaxLevel={atMaxLevel}
                currentSort={sort}
                updateSort={updateSort}
                isStacked
                newMobileView />
            <Pagination
                resultsText
                changePage={onChangePage}
                currentPage={pageNumber}
                totalItems={totalItems}
                pageSize={pageSize} />
        </div>
    );
};

ExplorerTableContainer.propTypes = propTypes;
export default ExplorerTableContainer;
