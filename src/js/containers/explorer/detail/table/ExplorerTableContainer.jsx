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

const parseResults = (data, total, sort, goDeeper, goToUnreported) => {
    const resultsArray = [];

    data.forEach((item) => {
        // Format obligated amount
        const obligatedAmount =
            formatMoneyWithPrecision(item.amount, 0);

        // Convert from decimal value to percentage and round to 2 decimal places
        const formattedPercentage = ((item.amount / total) * 100).toFixed(2);

        let percent = `${formattedPercentage}%`;
        if (percent === '0.00%') {
            percent = 'Less than 0.01%';
        }

        const name = item.name !== "Unreported Data" ? item.name : "Unreported Data*";
        const link = item.name !== "Unreported Data" ?
            () => goDeeper(item.id, name) :
            goToUnreported;

        const result = {
            name,
            obligatedAmount,
            percent,
            link
        };
        resultsArray.push(result);
    });

    return orderBy(
        resultsArray,
        [sort.field],
        [sort.direction]
    ).map(
        ({
            name, obligatedAmount, percent, link
        }) => [
            (
                <div className="cell-content">
                    <button
                        className="go-deeper-link"
                        onClick={link} >
                        {name}
                    </button>
                </div>
            ),
            obligatedAmount,
            percent
        ]);
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
        const parsedResults = parseResults(results, total, sort, goDeeper, goToUnreported);

        if (totalItems < pageSize) return parsedResults;

        const endingIndex = (pageNumber * pageSize) - 1;
        const startingIndex = (pageNumber - 1) * pageSize;

        return parsedResults.filter((v, i) => i <= endingIndex && startingIndex <= i);
    }
    , [results, total, sort, goDeeper, goToUnreported, totalItems, pageNumber]);

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
