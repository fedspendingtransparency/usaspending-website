/**
 * SpendingByCFDAContainer.jsx
 * Created by Lizzie Salita 6/24/20
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Pagination } from 'data-transparency-ui';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import BaseSpendingByCfdaRow from 'models/v2/covid19/BaseSpendingByCfdaRow';
import { spendingTableSortFields } from 'dataMapping/covid19/covid19';
import { fetchSpendingByCfda, fetchCfdaLoans } from 'helpers/disasterHelper';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';

const propTypes = {
    onRedirectModalClick: PropTypes.func.isRequired,
    activeTab: PropTypes.string.isRequired
};

const columns = [
    {
        title: 'assistanceListing',
        displayName: (
            <>
                <div>CFDA Program</div>
                <div>(Assistance Listing)</div>
            </>
        )
    },
    {
        title: 'obligation',
        displayName: 'Award Obligations',
        right: true
    },
    {
        title: 'outlay',
        displayName: 'Award Outlays',
        right: true
    },
    {
        title: 'count',
        displayName: (
            <>
                <div>Number</div>
                <div>of Awards</div>
            </>
        ),
        right: true
    }
];

const loanColumns = [
    {
        title: 'assistanceListing',
        displayName: (
            <>
                <div>CFDA Program</div>
                <div>(Assistance Listing)</div>
            </>
        )
    },
    {
        title: 'faceValue',
        displayName: (
            <>
                <div>Face Value</div>
                <div>of Loans</div>
            </>
        )
    },
    {
        title: 'obligation',
        displayName: (
            <>
                <div>Award Obligations</div>
                <div>(Loan Subsidy Cost)</div>
            </>
        ),
        right: true
    },
    {
        title: 'outlay',
        displayName: (
            <>
                <div>Award Outlays</div>
                <div>(Loan Subsidy Cost)</div>
            </>
        ),
        right: true
    },
    {
        title: 'count',
        displayName: (
            <>
                <div>Number</div>
                <div>of Awards</div>
            </>
        ),
        right: true
    }
];

export const parseRows = (rows, onRedirectModalClick, activeTab) => (
    rows.map((row) => {
        const rowData = Object.create(BaseSpendingByCfdaRow);
        rowData.populate(row);
        let link = rowData.name;
        if (rowData._link) {
            link = (
                <button
                    className="assistance-listing__button"
                    value={rowData._link}
                    onClick={onRedirectModalClick}>
                    {rowData.name}<FontAwesomeIcon icon="external-link-alt" />
                </button>
            );
        }
        if (activeTab === 'loans') {
            return [
                link,
                rowData.faceValue,
                rowData.obligation,
                rowData.outlay,
                rowData.count
            ];
        }
        return [
            link,
            rowData.obligation,
            rowData.outlay,
            rowData.count
        ];
    })
);

const SpendingByCFDAContainer = ({ onRedirectModalClick, activeTab }) => {
    const [currentPage, changeCurrentPage] = useState(1);
    const [pageSize, changePageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [sort, setSort] = useState('obligation');
    const [order, setOrder] = useState('desc');
    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };
    const defCodes = useSelector((state) => state.covid19.defCodes);

    const fetchSpendingByCfdaCallback = useCallback(() => {
        setLoading(true);
        if (defCodes && defCodes.length > 0) {
            const params = {
                filter: {
                    def_codes: defCodes.map((defc) => defc.code)
                },
                spending_type: 'award',
                pagination: {
                    limit: pageSize,
                    page: currentPage,
                    sort: spendingTableSortFields[sort],
                    order
                }
            };
            if (activeTab !== 'all') {
                params.filter.award_type_codes = awardTypeGroups[activeTab];
            }
            let request = fetchSpendingByCfda(params);
            if (activeTab === 'loans') {
                request = fetchCfdaLoans(params);
            }
            request.promise
                .then((res) => {
                    const rows = parseRows(res.data.results, onRedirectModalClick, activeTab);
                    setResults(rows);
                    setTotalItems(res.data.page_metadata.total);
                    setLoading(false);
                    setError(false);
                }).catch((err) => {
                    setError(true);
                    setLoading(false);
                    console.error(err);
                });
        }
    });

    useEffect(() => {
        // Reset to the first page
        changeCurrentPage(1);
        fetchSpendingByCfdaCallback();
    }, [pageSize, defCodes, sort, order, activeTab]);

    useEffect(() => {
        fetchSpendingByCfdaCallback();
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
            <CSSTransitionGroup
                transitionName="table-message-fade"
                transitionLeaveTimeout={225}
                transitionEnterTimeout={195}
                transitionLeave>
                {message}
            </CSSTransitionGroup>
        );
    }

    return (
        <>
            <div className="table-wrapper">
                <Table
                    columns={activeTab === 'loans' ? loanColumns : columns}
                    rows={results}
                    updateSort={updateSort}
                    currentSort={{ field: sort, direction: order }} />
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

SpendingByCFDAContainer.propTypes = propTypes;
export default SpendingByCFDAContainer;
