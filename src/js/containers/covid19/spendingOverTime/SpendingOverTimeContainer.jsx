/**
 * SpendingOverTimeContainer.jsx
 * Created by Lizzie Salita 6/10/20
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Table, Pagination } from 'data-transparency-ui';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { awardTypeGroupLabels } from 'dataMapping/search/awardType';
import { fetchSpendingOverTime, fetchNewAwardsOverTime } from 'helpers/disasterHelper';
import { convertPeriodToDate } from 'helpers/monthHelper';
import { formatMoney, formatNumber } from 'helpers/moneyFormatter';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';

const propTypes = {
    activeTab: PropTypes.string.isRequired
};

const awardTypes = Object.keys(awardTypeGroupLabels);

export const parseRows = (rows, amountColumns, amountType) => (
    rows.map((row) => {
        const date = convertPeriodToDate(row.time_period.period, row.time_period.fiscal_year);
        const amounts = amountColumns.map((col) => {
            if (amountType === 'amounts') {
                return formatMoney(row[amountType][col.title]);
            }
            // amountType === 'counts' (new awards tab)
            return formatNumber(row[amountType][col.title]);
        });
        return [date].concat(amounts);
    })
);

// Generate a column for each award type
const columns = awardTypes.map((awardType) => (
    {
        displayName: `${awardTypeGroupLabels[awardType]}`,
        title: awardType,
        right: true // text-align right for dollar values
    }
));
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

const SpendingOverTimeContainer = ({ activeTab }) => {
    const [currentPage, changeCurrentPage] = useState(1);
    const [pageSize, changePageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const defCodes = useSelector((state) => state.covid19.defCodes);

    const fetchSpendingOverTimeCallback = useCallback(() => {
        setLoading(true);
        const params = {
            filter: {
                def_codes: defCodes.map((defc) => defc.code),
                fiscal_year: 2020
            },
            group: 'period',
            spending_type: activeTab,
            limit: pageSize,
            page: currentPage
        };
        const request = fetchSpendingOverTime(params);
        request.promise
            .then((res) => {
                const amountColumns = columns.slice(1);
                const rows = parseRows(res.data.results, amountColumns, 'amounts');
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

    const fetchNewAwardsCallback = useCallback(() => {
        setLoading(true);
        const params = {
            // TODO: remove hard-coded values after integration with v2/references/def_codes/ API
            def_codes: ['L', 'M', 'N', 'O', 'P'],
            limit: pageSize,
            page: currentPage,
            group: 'period'
        };
        const request = fetchNewAwardsOverTime(params);
        request.promise
            .then((res) => {
                const amountColumns = columns.slice(1);
                console.log('new awards over time', res.data.results);
                const rows = parseRows(res.data.results, amountColumns, 'counts');
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
        if (activeTab !== 'newAwards') {
            fetchSpendingOverTimeCallback();
        }
        else {
            fetchNewAwardsCallback();
        }
    }, [activeTab, pageSize, defCodes]);

    useEffect(() => {
        if (activeTab !== 'newAwards') {
            fetchSpendingOverTimeCallback();
        }
        else {
            fetchNewAwardsCallback();
        }
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
            <div className="table-wrapper">
                <Table columns={columns} rows={results} />
            </div>
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
