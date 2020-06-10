/**
 * SpendingOverTimeContainer.jsx
 * Created by Lizzie Salita 6/10/20
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { Table, Pagination } from 'data-transparency-ui';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { awardTypeGroupLabels } from 'dataMapping/search/awardType';
import { fetchSpendingOverTime } from 'helpers/covid19RequestsHelper';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';

const propTypes = {
    activeTab: PropTypes.string.isRequired
};

const mockData = [
    ['March 2020', '$123,456', '$123,456', '$123,456', '$123,456', '$123,456', '$123,456'],
    ['April 2020', '$123,456', '$123,456', '$123,456', '$123,456', '$123,456', '$123,456'],
    ['May 2020', '$123,456', '$123,456', '$123,456', '$123,456', '$123,456', '$123,456']
];

export const parseRows = (rows) => {
    console.log(rows);
};

const SpendingOverTimeContainer = ({ activeTab }) => {
    const [currentPage, changeCurrentPage] = useState(1);
    const [pageSize, changePageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const awardTypes = Object.keys(awardTypeGroupLabels);

    // Generate a column for each award type
    const columns = awardTypes.map((awardType) => (
        {
            displayName: `Total ${startCase(activeTab)} for ${awardTypeGroupLabels[awardType]}`,
            title: awardType
        }
    ));
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
            limit: pageSize,
            page: currentPage,
            group: 'period',
            def_codes: ['L', 'M', 'N', 'O', 'P'],
            spending_type: activeTab
        };
        const request = fetchSpendingOverTime(params);
        request.promise
            .then((res) => {
                parseRows(res.data.results);
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
                rows={mockData} />
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
