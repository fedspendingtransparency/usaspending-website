/**
 * SpendingOverTimeContainer.jsx
 * Created by Lizzie Salita 6/10/20
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Table, Pagination } from 'data-transparency-ui';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
                def_codes: defCodes.map((defc) => defc.code)
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
            def_codes: defCodes.map((defc) => defc.code),
            limit: pageSize,
            page: currentPage,
            group: 'period'
        };
        const request = fetchNewAwardsOverTime(params);
        request.promise
            .then((res) => {
                const amountColumns = columns.slice(1);
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

    if (error || loading) {
        return (
            <>
                <TransitionGroup>
                    <CSSTransition
                        classNames="table-message-fade"
                        timeout={{ exit: 225, enter: 195 }}
                        exit>
                        <div className="results-table-message-container">
                            {error && <ResultsTableErrorMessage />}
                            {loading && <ResultsTableLoadingMessage />}
                        </div>
                    </CSSTransition>
                </TransitionGroup>
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
