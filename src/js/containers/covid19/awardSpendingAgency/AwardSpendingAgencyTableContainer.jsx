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
                    title: 'awardCount',
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
                title: 'awardCount',
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
    const tableRef = useRef(null);
    const tableWrapperRef = useRef(null);
    const errorOrLoadingWrapperRef = useRef(null);
    const request = useRef(null);

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
                awardCount: awardSpendingByAgencyRow.awardCount,
                faceValueOfLoan: awardSpendingByAgencyRow.faceValueOfLoan,
                ...awardSpendingByAgencyRow,
                children: awardSpendingByAgencyRow.children,
                name: link
            };
        });
        setResults(parsedData);
    };

    const fetchSpendingByCategoryCallback = useCallback(() => {
        if (request.current) {
            request.current.cancel();
        }
        setLoading(true);
        if (defCodes && defCodes.length > 0) {
            let params = {};

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

            if (props.type !== 'all') {
                params.filter.award_type_codes = awardTypeGroups[props.type];
            }

            const awardSpendingAgencyRequest = props.type === 'loans' ? fetchLoansByAgency(params) : fetchAwardSpendingByAgency(params);

            request.current = awardSpendingAgencyRequest;
            awardSpendingAgencyRequest.promise
                .then((res) => {
                    parseAwardSpendingByAgency(res.data.results);
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
        if (props.type === 'loans') {
            if (sort === 'faceValueOfLoan' && order === 'desc') {
                changeCurrentPage(1);
                fetchSpendingByCategoryCallback();
            }
            updateSort('faceValueOfLoan', 'desc');
        } else {
            if (sort === 'obligation' && order === 'desc') {
                changeCurrentPage(1);
                fetchSpendingByCategoryCallback();
            }
            updateSort('obligation', 'desc');
        }
    }, [props.type]);

    useEffect(() => {
        // Reset to the first page
        if (currentPage === 1) {
            fetchSpendingByCategoryCallback();
        }
        changeCurrentPage(1);
    }, [pageSize, sort, order, defCodes]);

    useEffect(() => {
        fetchSpendingByCategoryCallback();
    }, [currentPage]);

    useEffect(() => {
        props.scrollIntoView(loading, error, errorOrLoadingWrapperRef, tableWrapperRef, 100, true);
    }, [loading, error]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [document]);

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
    }
    if (message) {
        return (
            <div ref={errorOrLoadingWrapperRef}>
                <Pagination
                    currentPage={currentPage}
                    changePage={changeCurrentPage}
                    changeLimit={changePageSize}
                    limitSelector
                    resultsText
                    pageSize={pageSize}
                    totalItems={totalItems} />
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
            <Pagination
                currentPage={currentPage}
                changePage={changeCurrentPage}
                changeLimit={changePageSize}
                limitSelector
                resultsText
                pageSize={pageSize}
                totalItems={totalItems} />
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
