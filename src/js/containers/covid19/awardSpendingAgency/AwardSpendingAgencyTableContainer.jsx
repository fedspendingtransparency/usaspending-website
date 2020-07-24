/**
 * AwardSpendingAgencyTableContainer.jsx
 * Created by James Lee 6/24/20
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { isCancel } from 'axios';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'data-transparency-ui';
import { spendingTableSortFields } from 'dataMapping/covid19/covid19';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { fetchAwardSpendingByAgency, fetchLoansByAgency } from 'helpers/disasterHelper';
import CoreSpendingTableRow from 'models/v2/covid19/CoreSpendingTableRow';

const propTypes = {
    type: PropTypes.string.isRequired,
    subHeading: PropTypes.string,
    scrollIntoView: PropTypes.func.isRequired
};

const awardSpendingAgencyTableColumns = (type) => {
    if (type === 'loans') {
        return (
            [
                {
                    title: 'name',
                    displayName: 'Agency Name'
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
                    title: 'count',
                    displayName: (
                        <>
                            <div>Number</div>
                            <div>of Awards</div>
                        </>
                    ),
                    right: true
                }
            ]);
    }
    return (
        [
            {
                title: 'name',
                displayName: 'Agency Name'
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
        ]);
};

const AwardSpendingAgencyTableContainer = (props) => {
    const [currentPage, changeCurrentPage] = useState(1);
    const [pageSize, changePageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [sort, setSort] = useState('obligation');
    const [order, setOrder] = useState('desc');
    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const defCodes = useSelector((state) => state.covid19.defCodes);
    const [request, setRequest] = useState(null);
    const tableRef = useRef(null);
    const tableWrapperRef = useRef(null);
    const errorOrLoadingWrapperRef = useRef(null);

    const parseAwardSpendingByAgency = (data) => {
        const parsedData = data.map((item) => {
            const awardSpendingByAgencyRow = Object.create(CoreSpendingTableRow);
            awardSpendingByAgencyRow.populateCore(item);

            let rowChildren = [];
            if (item.children && item.children.length > 0) {
                rowChildren = item.children.map((childItem) => {
                    const awardSpendingByAgencyChildRow = Object.create(CoreSpendingTableRow);
                    awardSpendingByAgencyChildRow.populateCore(childItem);
                    awardSpendingByAgencyChildRow.name = awardSpendingByAgencyChildRow.description;
                    return awardSpendingByAgencyChildRow;
                });
            }

            if (rowChildren && rowChildren.length > 0) {
                Object.defineProperty(awardSpendingByAgencyRow, "children", {
                    value: rowChildren
                });
            }

            let link = awardSpendingByAgencyRow.description;
            const id = awardSpendingByAgencyRow._id;
            if (link && id) {
                link = (
                    <a
                        className="agency-profile__link"
                        href={`#/agency/${id}`}>
                        {awardSpendingByAgencyRow.description}
                    </a>
                );
            }
            return {
                obligation: awardSpendingByAgencyRow.obligation,
                outlay: awardSpendingByAgencyRow.outlay,
                count: awardSpendingByAgencyRow.count,
                faceValueOfLoan: awardSpendingByAgencyRow.faceValueOfLoan,
                ...awardSpendingByAgencyRow,
                children: awardSpendingByAgencyRow.children,
                name: link
            };
        });
        setResults(parsedData);
    };

    const fetchSpendingByCategoryCallback = useCallback(() => {
        if (request) {
            request.cancel();
        }
        setLoading(true);
        if (defCodes && defCodes.length > 0) {
            let params = {};

            // if active tab is all, default to all award type codes
            if (props.type === 'all') {
                params = {
                    filter: {
                        def_codes: defCodes.map((defc) => defc.code),
                        award_type_codes: [].concat(...Object.values(awardTypeGroups))
                    },
                    pagination: {
                        limit: pageSize,
                        page: currentPage,
                        sort: spendingTableSortFields[sort],
                        order
                    },
                    spending_type: 'award'
                };
            } else {
                params = {
                    filter: {
                        def_codes: defCodes.map((defc) => defc.code),
                        award_type_codes: awardTypeGroups[props.type]
                    },
                    pagination: {
                        limit: pageSize,
                        page: currentPage,
                        sort: spendingTableSortFields[sort],
                        order
                    },
                    spending_type: 'award'
                };
            }

            let faceValueOfLoansRequest;
            if (props.type === 'loans') {
                const faceValueOfLoansParams = {
                    filter: {
                        def_codes: defCodes.map((defc) => defc.code),
                        award_type_codes: awardTypeGroups[props.type]
                    },
                    pagination: {
                        limit: pageSize,
                        page: currentPage,
                        sort: spendingTableSortFields[sort],
                        order
                    },
                    spending_type: 'award'
                };
                faceValueOfLoansRequest = fetchLoansByAgency(faceValueOfLoansParams);
            }

            if (faceValueOfLoansRequest) {
                setRequest(faceValueOfLoansRequest);
                faceValueOfLoansRequest.promise
                    .then((res) => {
                        parseAwardSpendingByAgency(res.data.results);
                        setTotalItems(res.data.page_metadata.total);
                        setLoading(false);
                        setError(false);
                    }).catch((err) => {
                        setRequest(null);
                        if (!isCancel(err)) {
                            setError(true);
                            setLoading(false);
                            console.error(err);
                        }
                    });
            } else {
                const awardSpendingAgencyRequest = fetchAwardSpendingByAgency(params);
                setRequest(awardSpendingAgencyRequest);
                awardSpendingAgencyRequest.promise
                    .then((res) => {
                        parseAwardSpendingByAgency(res.data.results);
                        setTotalItems(res.data.page_metadata.total);
                        setLoading(false);
                        setError(false);
                    }).catch((err) => {
                        setRequest(null);
                        if (!isCancel(err)) {
                            setError(true);
                            setLoading(false);
                            console.error(err);
                        }
                    });
            }
        }
    });


    useEffect(() => {
        // Reset to the first page
        changeCurrentPage(1);
        fetchSpendingByCategoryCallback();
    }, [props.type, pageSize, sort, order, defCodes]);

    useEffect(() => {
        if (props.type === 'loans') {
            updateSort('faceValueOfLoan', 'desc');
        } else {
            updateSort('obligation', 'desc');
        }
    }, [props.type]);

    useEffect(() => {
        fetchSpendingByCategoryCallback();
    }, [currentPage]);

    useEffect(() => {
        const startPage = 1;
        const endPage = Math.ceil(totalItems / pageSize);
        props.scrollIntoView(loading, error, errorOrLoadingWrapperRef, tableWrapperRef, 100, true, startPage, endPage, currentPage);
    }, [loading, error]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [document]);

    let message = null;
    if (loading) {
        let tableHeight = null;
        if (tableRef.current) {
            tableHeight = tableRef.current.offsetHeight;
        }
        message = (
            <div className="results-table-message-container" style={{ minHeight: tableHeight }}>
                <ResultsTableLoadingMessage />
            </div>
        );
    } else if (error) {
        let tableHeight = null;
        if (tableRef.current) {
            tableHeight = tableRef.current.offsetHeight;
        }
        message = (
            <div className="results-table-message-container" style={{ minHeight: tableHeight }}>
                <ResultsTableErrorMessage />
            </div>
        );
    }
    if (message) {
        return (
            <div ref={errorOrLoadingWrapperRef}>
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
            </div>
        );
    }

    return (
        <div ref={tableWrapperRef} className="table-wrapper">
            <div ref={tableRef}>
                <Table
                    expandable
                    rows={results}
                    columns={awardSpendingAgencyTableColumns(props.type)}
                    currentSort={{ field: sort, direction: order }}
                    updateSort={updateSort}
                    divider={props.subHeading} />
            </div>
            <Pagination
                currentPage={currentPage}
                changePage={changeCurrentPage}
                changeLimit={changePageSize}
                limitSelector
                resultsText
                pageSize={pageSize}
                totalItems={totalItems} />
        </div>
    );
};

AwardSpendingAgencyTableContainer.propTypes = propTypes;
export default AwardSpendingAgencyTableContainer;
