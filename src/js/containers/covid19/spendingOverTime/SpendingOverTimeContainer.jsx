/**
 * SpendingOverTimeContainer.jsx
 * Created by Lizzie Salita 6/10/20
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'data-transparency-ui';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { awardTypeGroupLabels } from 'dataMapping/search/awardType';
import { fetchSpendingOverTime } from 'helpers/covid19RequestsHelper';
import { convertPeriodToDate } from 'helpers/monthHelper';
import { formatMoney } from 'helpers/moneyFormatter';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';

const propTypes = {
    activeTab: PropTypes.string.isRequired
};

const awardTypes = Object.keys(awardTypeGroupLabels);

export const parseRows = (rows, amountColumns) => (
    rows.map((row) => {
        const date = convertPeriodToDate(row.time_period.period, row.time_period.fiscal_year);
        const amounts = amountColumns.map((col) => (
            formatMoney(row.amounts[col.title])
        ));
        return [date].concat(amounts);
    })
);

const SpendingOverTimeContainer = ({ activeTab }) => {
    const [currentPage, changeCurrentPage] = useState(1);
    const [pageSize, changePageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Generate a column for each award type
    const columns = awardTypes.map((awardType) => (
        {
            displayName: `${awardTypeGroupLabels[awardType]}`,
            title: awardType,
            right: true // text-align right for dollar values
        }
    ));
    // TODO - Add a column for all awards
    columns.unshift(
        {
            displayName: 'All Awards',
            title: 'total',
            right: true
        }
    );
    // Add a column for the time period
    columns.unshift(
        {
            displayName: 'Month',
            title: 'period'
        }
    );

    const fetchSpendingOverTimeCallback = useCallback(() => {
        setLoading(true);
        const params = {
            filter: {
                // TODO: remove hard-coded values after integration with v2/references/def_codes/ API
                def_codes: ['L', 'M', 'N', 'O', 'P'],
                fiscal_year: 2020
            },
            limit: pageSize,
            page: currentPage,
            group: 'period',
            spending_type: activeTab
        };
        const request = fetchSpendingOverTime(params);
        request.promise
            .then((res) => {
                const amountColumns = columns.slice(1);
                const rows = parseRows(res.data.results, amountColumns);
                setResults(rows);
                setTotalItems(res.data.page_metadata.total);
                setLoading(false);
                setError(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    });

    useEffect(() => {
        // Reset to the first page
        changeCurrentPage(1);
        fetchSpendingOverTimeCallback();
    }, [activeTab, pageSize]);

    useEffect(() => {
        fetchSpendingOverTimeCallback();
    }, [currentPage]);

    let message = null;
    if (loading) {
        message = (
            <div className="results-table-message-container">
                <ResultsTableLoadingMessage />
            </div>
        );
    } else if (error) {
        message = (
            <div className="results-table-message-container">
                <ResultsTableErrorMessage />
            </div>
        );
    }

    if (message) {
        return (
            <>
                <CSSTransitionGroup
                    transitionName="table-message-fade"
                    transitionLeaveTimeout={225}
                    transitionEnterTimeout={195}
                    transitionLeave>
                    {message}
                </CSSTransitionGroup>
                <Pagination
                    currentPage={currentPage}
                    changePage={changeCurrentPage}
                    changeLimit={changePageSize}
                    limitSelector
                    resultsText
                    pageSize={pageSize}
                    totalItems={totalItems} />
            </>
        );
    }

    return (
        <>
            <Table
                columns={columns}
                rows={results} />
            <Pagination
                currentPage={currentPage}
                changePage={changeCurrentPage}
                changeLimit={changePageSize}
                limitSelector
                resultsText
                pageSize={pageSize}
                totalItems={totalItems} />
        </>
    );
};

SpendingOverTimeContainer.propTypes = propTypes;
export default SpendingOverTimeContainer;
