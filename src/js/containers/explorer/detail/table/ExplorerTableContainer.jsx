/**
 * ExplorerTableContainer.jsx
 * Created by Lizzie Salita 10/16/17
 */

import React, { memo, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Pagination, Table } from "data-transparency-ui";

import IsMobileContext from "context/IsMobileContext";
import { columns } from 'dataMapping/explorer/explorerTableFields';
import parseResults from "../helpers/parseResults";

const propTypes = {
    isLoading: PropTypes.bool,
    results: PropTypes.object,
    goDeeper: PropTypes.func,
    total: PropTypes.number,
    goToUnreported: PropTypes.func
};

// eslint-disable-next-line prefer-arrow-callback
const ExplorerTableContainer = memo(function ExplorerTableContainer({
    isLoading,
    results,
    total,
    goDeeper,
    goToUnreported
}) {
    const { isTablet } = useContext(IsMobileContext);
    const [sort, setSort] = useState({ field: 'Obligated Amount', direction: 'desc' });
    const [pageNumber, setPageNumber] = useState(1);

    const pageSize = 20;
    const totalItems = results.size;

    const onChangePage = (p) => {
        const totalPages = Math.ceil(totalItems / pageSize);
        const inRange = (p > 0) && (p <= totalPages);

        if (inRange) setPageNumber(p);
    };

    const parsedData = useMemo(() => {
        const parsedResults = parseResults(results, total, sort, goDeeper, goToUnreported);

        if (totalItems < pageSize) return parsedResults;

        const endingIndex = (pageNumber * pageSize) - 1;
        const startingIndex = (pageNumber - 1) * pageSize;

        return parsedResults.filter((v, i) => i <= endingIndex && startingIndex <= i);
    }
    , [results, total, sort, goDeeper, goToUnreported, totalItems, pageNumber]);

    const rows = parsedData.map(
        ({
            Name: name, "Obligated Amount": obligatedAmount, "Percent of Total": percent, link
        }) => [
            (
                <div className="explorer-link-cell">
                    <div className="cell-content">
                        <button
                            className="go-deeper-link"
                            onClick={link} >
                            {name}
                        </button>
                    </div>
                </div>
            ),
            obligatedAmount,
            percent
        ]);

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
                isMobile={isTablet}
                currentSort={sort}
                updateSort={updateSort}
                loading={isLoading}
                atMaxLevel
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
});

ExplorerTableContainer.propTypes = propTypes;
export default ExplorerTableContainer;
