/**
 * SpendingByRecipientContainer.jsx
 * Created by Lizzie Salita 7/8/20
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isCancel } from 'axios';
import reactStringReplace from 'react-string-replace';
import { Table, Pagination } from 'data-transparency-ui';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import BaseSpendingByRecipientRow from 'models/v2/covid19/BaseSpendingByRecipientRow';
import { spendingTableSortFields } from 'dataMapping/covid19/covid19';
import { fetchDisasterSpending, fetchLoanSpending } from 'helpers/disasterHelper';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import ResultsTableNoResults from 'components/search/table/ResultsTableNoResults';
import SearchBar from 'components/covid19/SearchBar';
import Note from 'components/sharedComponents/Note';
import noteText from 'dataMapping/covid19/recipient/recipient';
import TableDownloadLink from 'containers/covid19/TableDownloadLink';


const propTypes = {
    activeTab: PropTypes.string.isRequired,
    scrollIntoView: PropTypes.func.isRequired
};

const columns = [
    {
        title: 'name',
        displayName: 'Recipient'
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
        title: 'awardCount',
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
        title: 'name',
        displayName: 'Recipient'
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
        title: 'faceValueOfLoan',
        displayName: (
            <>
                <div>Face Value</div>
                <div>of Loans</div>
            </>
        ),
        right: true
    },
    {
        title: 'awardCount',
        displayName: (
            <>
                <div>Number</div>
                <div>of Awards</div>
            </>
        ),
        right: true
    }
];

export const parseRows = (rows, activeTab, query) => (
    rows.map((row) => {
        const rowData = Object.create(BaseSpendingByRecipientRow);
        rowData.populate(row);
        let description = rowData.description;
        let link = description;
        if (query) {
            // wrap the part of the recipient name matching the search string
            // with a span for styling
            description = reactStringReplace(description, query, (match, i) => (
                <span
                    className="query-matched"
                    key={match + i}>
                    {match}
                </span>
            ));
        }
        if (rowData._childId && rowData._recipientId) {
            // there are two profile pages for this recipient
            link = (
                <>
                    {description}&nbsp;(
                    <a href={`#/recipient/${rowData._childId}`}>
                        as Child
                    </a>,&nbsp;
                    <a href={`#/recipient/${rowData._recipientId}`}>
                        as Recipient
                    </a>
                    )
                </>
            );
        }
        else if (rowData._childId || rowData._recipientId) {
            // there is a single profile page for this recipient
            link = (
                <a href={`#/recipient/${rowData._childId || rowData._recipientId}`}>
                    {description}
                </a>
            );
        }
        if (activeTab === 'loans') {
            return [
                link,
                rowData.obligation,
                rowData.outlay,
                rowData.faceValueOfLoan,
                rowData.awardCount
            ];
        }
        return [
            link,
            rowData.obligation,
            rowData.outlay,
            rowData.awardCount
        ];
    })
);

const SpendingByRecipientContainer = ({ activeTab, scrollIntoView }) => {
    const [currentPage, changeCurrentPage] = useState(1);
    const [pageSize, changePageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [sort, setSort] = useState('obligation');
    const [order, setOrder] = useState('desc');
    const [query, setQuery] = useState('');
    const [request, setRequest] = useState(null);
    const tableRef = useRef(null);
    const tableWrapperRef = useRef(null);
    const errorOrLoadingWrapperRef = useRef(null);

    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };
    const defCodes = useSelector((state) => state.covid19.defCodes);

    const fetchSpendingByRecipientCallback = useCallback(() => {
        if (request) {
            request.cancel();
        }
        setLoading(true);
        if (defCodes && defCodes.length > 0) {
            const params = {
                filter: {
                    def_codes: defCodes.map((defc) => defc.code)
                },
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
            if (query) {
                params.filter.query = query;
            }
            const recipientRequest = activeTab === 'loans' ? fetchLoanSpending('recipient', params) : fetchDisasterSpending('recipient', params);
            setRequest(recipientRequest);
            recipientRequest.promise
                .then((res) => {
                    const rows = parseRows(res.data.results, activeTab, query);
                    setResults(rows);
                    setTotalItems(res.data.page_metadata.total);
                    setLoading(false);
                    setError(false);
                }).catch((err) => {
                    if (!isCancel(err)) {
                        setError(true);
                        setLoading(false);
                        console.error(err);
                    }
                });
        }
    });

    useEffect(() => {
        // Reset to the first page
        changeCurrentPage(1);
        fetchSpendingByRecipientCallback();
    }, [pageSize, defCodes, sort, order, activeTab, query]);

    useEffect(() => {
        fetchSpendingByRecipientCallback();
    }, [currentPage]);

    useEffect(() => {
        scrollIntoView(loading, error, errorOrLoadingWrapperRef, tableWrapperRef, 130, true);
    }, [loading, error]);

    let message = null;
    if (loading) {
        let tableHeight = 'auto';
        if (tableRef.current) {
            tableHeight = tableRef.current.offsetHeight;
        }
        message = (
            <div className="results-table-message-container" style={{ height: tableHeight }}>
                <ResultsTableLoadingMessage />
            </div>
        );
    } else if (error) {
        let tableHeight = 'auto';
        if (tableRef.current) {
            tableHeight = tableRef.current.offsetHeight;
        }
        message = (
            <div className="results-table-message-container" style={{ height: tableHeight }}>
                <ResultsTableErrorMessage />
            </div>
        );
    } else if (results.length === 0) {
        let tableHeight = 'auto';
        if (tableRef.current) {
            tableHeight = tableRef.current.offsetHeight;
        }
        message = (
            <div className="results-table-message-container" style={{ height: tableHeight }}>
                <ResultsTableNoResults />
            </div>
        );
    }

    if (message) {
        return (
            <>
                <SearchBar setQuery={setQuery} currentSearchTerm={query} />
                {(results.length > 0 || error) && <Pagination
                    currentPage={currentPage}
                    changePage={changeCurrentPage}
                    changeLimit={changePageSize}
                    limitSelector
                    resultsText
                    pageSize={pageSize}
                    totalItems={totalItems} />}
                <CSSTransitionGroup
                    transitionName="table-message-fade"
                    transitionLeaveTimeout={225}
                    transitionEnterTimeout={195}
                    transitionLeave>
                    {message}
                </CSSTransitionGroup>
                {(results.length > 0 || error) && <Pagination
                    currentPage={currentPage}
                    changePage={changeCurrentPage}
                    changeLimit={changePageSize}
                    limitSelector
                    resultsText
                    pageSize={pageSize}
                    totalItems={totalItems} />}
            </>
        );
    }

    return (
        <div ref={tableWrapperRef}>
            <div className="table-utility">
                <div className="table-utility__left">
                    <SearchBar setQuery={setQuery} currentSearchTerm={query} />
                </div>
                <div className="table-utility__right">
                    <TableDownloadLink defCodes={defCodes && defCodes.length > 0 && defCodes.map((defc) => defc.code)} awardTypeCodes={awardTypeGroups[activeTab] ? awardTypeGroups[activeTab] : null} query={query} />
                </div>
            </div>
            {(results.length > 0 || error) && <Pagination
                currentPage={currentPage}
                changePage={changeCurrentPage}
                changeLimit={changePageSize}
                limitSelector
                resultsText
                pageSize={pageSize}
                totalItems={totalItems} />}
            <div ref={tableRef} className="table-wrapper">
                <Table
                    columns={activeTab === 'loans' ? loanColumns : columns}
                    rows={results}
                    updateSort={updateSort}
                    currentSort={{ field: sort, direction: order }} />
            </div>
            {(results.length > 0 || error) && <Pagination
                currentPage={currentPage}
                changePage={changeCurrentPage}
                changeLimit={changePageSize}
                limitSelector
                resultsText
                pageSize={pageSize}
                totalItems={totalItems} />}
            {!loading && !error && results.length > 0 && <Note message={noteText} />}
        </div>
    );
};

SpendingByRecipientContainer.propTypes = propTypes;
export default SpendingByRecipientContainer;
