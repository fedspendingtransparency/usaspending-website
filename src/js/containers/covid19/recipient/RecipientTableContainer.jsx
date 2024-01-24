/**
 * RecipientTableContainer.jsx
 * Created by Lizzie Salita 7/8/20
 */

import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isCancel } from 'axios';
import replaceString from 'helpers/replaceString';
import { Table, Pagination, SearchBar } from 'data-transparency-ui';
import { Link } from 'react-router-dom';

import { awardTypeGroups } from 'dataMapping/search/awardType';
import BaseSpendingByRecipientRow from 'models/v2/covid19/BaseSpendingByRecipientRow';
import { spendingTableSortFields } from 'dataMapping/covid19/covid19';
import { fetchDisasterSpending, fetchLoanSpending } from 'apis/disaster';
import Note from 'components/sharedComponents/Note';
import noteText from 'dataMapping/covid19/recipient/recipient';
import TableDownloadLink from 'containers/covid19/TableDownloadLink';
import Analytics from 'helpers/analytics/Analytics';
import { calculateUnlinkedTotals } from 'helpers/covid19Helper';
import { useStateWithPrevious, usePrevious } from 'helpers';

const propTypes = {
    activeTab: PropTypes.string.isRequired,
    prevActiveTab: PropTypes.string,
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
            <div className="table-header-label__title">
                <div>Number</div>
                <div>of Awards</div>
            </div>
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
            <div className="table-header-label__title">
                <div>Award Obligations</div>
                <div>(Loan Subsidy Cost)</div>
            </div>
        ),
        right: true
    },
    {
        title: 'outlay',
        displayName: (
            <div className="table-header-label__title">
                <div>Award Outlays</div>
                <div>(Loan Subsidy Cost)</div>
            </div>
        ),
        right: true
    },
    {
        title: 'faceValueOfLoan',
        displayName: (
            <div className="table-header-label__title">
                <div>Face Value</div>
                <div>of Loans</div>
            </div>
        ),
        right: true
    },
    {
        title: 'awardCount',
        displayName: (
            <div className="table-header-label__title">
                <div>Number</div>
                <div>of Awards</div>
            </div>
        ),
        right: true
    }
];

const clickedRecipientProfile = (recipientName) => {
    Analytics.event({
        event: 'covid_spending_recipient',
        category: 'COVID-19 - Award Spending by Recipient - Recipients',
        action: 'recipient profile click',
        label: recipientName
    });
};

export const parseRows = (rows, activeTab, query) => (
    rows.map((row) => {
        const rowData = Object.create(BaseSpendingByRecipientRow);
        rowData.populate(row);
        let description = rowData.description;
        let link = description;
        if (query) description = replaceString(description, query, "query-matched");
        if (rowData._childId && rowData._recipientId) {
            // there are two profile pages for this recipient
            const handleClick = () => clickedRecipientProfile(`${description}`);
            link = (
                <>
                    {description}&nbsp;(
                    <Link onClick={handleClick} to={`/recipient/${rowData._childId}/latest`}>
                        as Child
                    </Link>,&nbsp;
                    <Link onClick={handleClick} to={`/recipient/${rowData._recipientId}/latest`}>
                        as Recipient
                    </Link>
                    )
                </>
            );
        }
        else if (rowData._childId || rowData._recipientId) {
            const handleClick = clickedRecipientProfile(`${description}`);
            // there is a single profile page for this recipient
            link = (
                <Link onClick={handleClick} to={`/recipient/${rowData._childId || rowData._recipientId}/latest`}>
                    {description}
                </Link>
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

const RecipientTableContainer = ({ activeTab, prevActiveTab, scrollIntoView }) => {
    const [currentPage, changeCurrentPage] = useState(1);
    const [prevPageSize, pageSize, changePageSize] = useStateWithPrevious(10);
    const [totalItems, setTotalItems] = useState(0);
    const [results, setResults] = useState([]);
    const [parsedRows, setParsedRows] = useState([]); // finalized rows (including Unlinked Data)
    const [resultTotal, setResultTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [prevSort, sort, setSort] = useStateWithPrevious('obligation');
    const [prevOrder, order, setOrder] = useStateWithPrevious('desc');
    const [prevQuery, query, setQuery] = useStateWithPrevious('');
    const tableRef = useRef(null);
    const tableWrapperRef = useRef(null);
    const errorOrLoadingWrapperRef = useRef(null);
    const request = useRef(null);
    const [unlinkedDataClass, setUnlinkedDataClass] = useState(false);
    const { recipientTotals, defcParams } = useSelector((state) => state.covid19);
    const prevDefcParams = usePrevious(defcParams);

    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };

    const addUnlinkedData = (rows = results, totals = resultTotal, totalRecipient = recipientTotals) => {
    // add unlinked data if activeTab is all
        if (activeTab === 'all' && !query && Object.keys(totalRecipient).length > 0) {
            const unlinkedData = calculateUnlinkedTotals(totalRecipient, totals);
            setUnlinkedDataClass(true);
            const unlinkedName = (
                <div className="unlinked-data">
                    Unknown Recipient (Unlinked Data)
                </div>
            );
            const rowData = Object.create(BaseSpendingByRecipientRow);

            rowData.populate({
                obligation: unlinkedData.obligation,
                outlay: unlinkedData.outlay,
                award_count: unlinkedData.award_count
            });

            const rowsWithUnlinked = rows
                .concat([[
                    unlinkedName,
                    rowData.obligation,
                    rowData.outlay,
                    rowData.awardCount
                ]]);
            setParsedRows(rowsWithUnlinked);
        }
        else {
            setParsedRows(rows);
        }
    };

    const fetchSpendingByRecipientCallback = useCallback(() => {
        if (request.current) {
            request.current.cancel();
        }
        setLoading(true);
        if (defcParams && defcParams.length > 0) {
            const params = {
                filter: {
                    def_codes: defcParams
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
            request.current = recipientRequest;
            recipientRequest.promise
                .then((res) => {
                    const rows = parseRows(res.data.results, activeTab, query);
                    const totals = res.data.totals;
                    setResultTotal(totals);
                    setResults(rows);
                    setTotalItems(res.data.page_metadata.total);
                    setLoading(false);
                    setError(false);
                }).catch((err) => {
                    if (!isCancel(err)) {
                        setError(true);
                        setLoading(false);
                        request.current = null;
                        console.error(err);
                    }
                });
        }
    });

    useEffect(() => {
        if (Object.keys(recipientTotals).length && results.length) {
            addUnlinkedData();
        }
    }, [recipientTotals, resultTotal, results]);

    useEffect(() => {
    // Reset to the first page
        if (currentPage !== 1) {
            changeCurrentPage(1);
        }
        else {
            const hasParamChanged = (
                prevOrder !== order ||
                prevSort !== sort ||
                prevPageSize !== pageSize ||
                prevQuery !== query ||
                prevActiveTab !== activeTab ||
                prevDefcParams !== defcParams
            );
            if (hasParamChanged) {
                // when award type changes, if sort was on faceValueOfLoan, make it obligation instead to avoid API error
                if (prevSort === 'faceValueOfLoan' && activeTab !== 'loans') {
                    setSort('obligation');
                    setOrder('desc');
                }
                fetchSpendingByRecipientCallback();
            }
        }
    }, [pageSize, defcParams, sort, order, activeTab, query]);

    useEffect(() => {
        fetchSpendingByRecipientCallback();
    }, [currentPage]);

    useEffect(() => {
        scrollIntoView(loading, error, errorOrLoadingWrapperRef, tableWrapperRef, 130, true);
    }, [loading, error]);

    return (
        <div ref={tableWrapperRef}>
            <div className="table-utility">
                <div className="table-utility__left">
                    <SearchBar onSearch={setQuery} />
                </div>
                {(!error && !loading && results.length > 0) &&
                <div className="table-utility__right">
                    <TableDownloadLink
                        defCodes={defcParams && defcParams.length > 0 && defcParams}
                        awardTypeCodes={awardTypeGroups[activeTab] ? awardTypeGroups[activeTab] : null}
                        query={query} />
                </div>}
            </div>
            {(results.length > 0 || error) && <Pagination
                currentPage={currentPage}
                changePage={changeCurrentPage}
                changeLimit={changePageSize}
                limitSelector
                resultsText
                pageSize={pageSize}
                totalItems={totalItems} />}
            <div ref={tableRef} className={`table-wrapper ${unlinkedDataClass ? 'unlinked-data' : ''}`} >
                <Table
                    columns={activeTab === 'loans' ? loanColumns : columns}
                    rows={parsedRows}
                    updateSort={updateSort}
                    currentSort={{ field: sort, direction: order }}
                    error={error}
                    loading={loading} />
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

RecipientTableContainer.propTypes = propTypes;
export default RecipientTableContainer;
