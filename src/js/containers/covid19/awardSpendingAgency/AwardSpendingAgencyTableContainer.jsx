/**
 * AwardSpendingAgencyTableContainer.jsx
 * Created by James Lee 6/24/20
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isCancel } from 'axios';

import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import ResultsTableNoResults from 'components/search/table/ResultsTableNoResults';
import PropTypes from 'prop-types';
import { Table, Pagination, SearchBar } from 'data-transparency-ui';
import replaceString from 'helpers/replaceString';
import { spendingTableSortFields } from 'dataMapping/covid19/covid19';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { fetchAwardSpendingByAgency, fetchLoansByAgency } from 'apis/disaster';
import CoreSpendingTableRow from 'models/v2/covid19/CoreSpendingTableRow';
import Analytics from 'helpers/analytics/Analytics';
import { calculateUnlinkedTotals } from 'helpers/covid19Helper';

const propTypes = {
    type: PropTypes.string.isRequired,
    subHeading: PropTypes.string,
    scrollIntoView: PropTypes.func.isRequired
};

let tableHeight = 'auto';

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
                    <div className="table-header-label__title">
                        <div>Number</div>
                        <div>of Awards</div>
                    </div>
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
    const [resultsTotal, setResultsTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [query, setQuery] = useState('');
    const { defcParams } = useSelector((state) => state.covid19);
    const spendingByAgencyTotals = useSelector((state) => state.covid19.spendingByAgencyTotals);
    const tableRef = useRef(null);
    const tableWrapperRef = useRef(null);
    const errorOrLoadingWrapperRef = useRef(null);
    const request = useRef(null);
    const [unlinkedDataClass, setUnlinkedDataClass] = useState(false);

    const clickedAgencyProfile = (agencyName) => {
        Analytics.event({
            category: `COVID-19 - Total Spending by Agency - ${props.type}`,
            action: 'agency profile click',
            label: agencyName
        });
    };

    const addUnlinkedData = (parsedData, totals = resultsTotal, totalAgencySpending = spendingByAgencyTotals) => {
        if (!parsedData.length) return setResults([]);
        const unlinkedData = calculateUnlinkedTotals(totalAgencySpending, totals);

        const unlinkedName = (props.type === 'all')
            ? 'Unknown Agency (Unlinked Data)'
            : 'Unknown Agency (Linked but Missing Funding Agency)';

        setUnlinkedDataClass(true);
        const unlinkedColumn = (
            <div>
                {unlinkedName}
            </div>
        );
        unlinkedData.name = unlinkedColumn;
        const unlinkedRow = Object.create(CoreSpendingTableRow);
        unlinkedRow.populateCore(unlinkedData);
        const parsedDataWithUnlinked = parsedData
            .filter(({ isUnlinkedRow }) => !isUnlinkedRow)
            .concat([Object.assign(unlinkedRow, { isUnlinkedRow: true })]);
        return setResults(parsedDataWithUnlinked);
    };

    const parseAwardSpendingByAgency = (data, totals) => {
        const parsedData = data.map((item) => {
            const awardSpendingByAgencyRow = Object.create(CoreSpendingTableRow);
            awardSpendingByAgencyRow.populateCore(item);

            let rowChildren = [];
            let expanded = false;
            if (item.children && item.children.length > 0) {
                rowChildren = item.children.map((childItem) => {
                    const awardSpendingByAgencyChildRow = Object.create(CoreSpendingTableRow);
                    awardSpendingByAgencyChildRow.populateCore(childItem);
                    awardSpendingByAgencyChildRow.name = awardSpendingByAgencyChildRow.description;
                    if (query) {
                        awardSpendingByAgencyChildRow.name = replaceString(awardSpendingByAgencyChildRow.name, query, 'query-matched');
                        if (!expanded) {
                            expanded = awardSpendingByAgencyChildRow.name.length > 1;
                        }
                    }
                    return awardSpendingByAgencyChildRow;
                });
            }

            if (rowChildren && rowChildren.length > 0) {
                Object.defineProperty(awardSpendingByAgencyRow, "children", {
                    value: rowChildren
                });
            }

            let link = awardSpendingByAgencyRow.description;
            if (query) link = replaceString(link, query, 'query-matched');
            const id = awardSpendingByAgencyRow._id;
            if (link && id) {
                link = (
                    <Link
                        className="agency-profile__link"
                        onClick={clickedAgencyProfile.bind(null, `${awardSpendingByAgencyRow.description}`)}
                        to={`/agency/${id}`}>
                        {link}
                    </Link>
                );
            }
            return {
                obligation: awardSpendingByAgencyRow.obligation,
                outlay: awardSpendingByAgencyRow.outlay,
                awardCount: awardSpendingByAgencyRow.awardCount,
                faceValueOfLoan: awardSpendingByAgencyRow.faceValueOfLoan,
                ...awardSpendingByAgencyRow,
                children: awardSpendingByAgencyRow.children,
                expanded,
                name: query ? (<span className="query-matched-text">{link}</span>) : link
            };
        });
        if (!parsedData.length) return setResults([]);
        return addUnlinkedData(parsedData, totals);
    };

    const fetchSpendingByCategoryCallback = useCallback(() => {
        if (request.current) {
            request.current.cancel();
        }
        if (error) setError(false);
        setLoading(true);
        if (defcParams && defcParams.length > 0) {
            let params = {};

            params = {
                filter: {
                    def_codes: defcParams,
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
            if (query) params.filter.query = query;

            const awardSpendingAgencyRequest = props.type === 'loans' ? fetchLoansByAgency(params) : fetchAwardSpendingByAgency(params);

            request.current = awardSpendingAgencyRequest;
            awardSpendingAgencyRequest.promise
                .then((res) => {
                    parseAwardSpendingByAgency(res.data.results, res.data.totals);
                    setResultsTotal(res.data.totals);
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
        if (Object.keys(spendingByAgencyTotals).length && resultsTotal) {
            addUnlinkedData(results, resultsTotal, spendingByAgencyTotals);
        }
    }, [spendingByAgencyTotals, resultsTotal]);

    useEffect(() => {
        // when award type changes, sort is on faceValueOfLoan for loans; otherwise, obligation
        if (props.type === 'loans' && sort === 'faceValueOfLoan' && order === 'desc') {
            changeCurrentPage(1);
            fetchSpendingByCategoryCallback();
        }
        else if (props.type === 'loans') {
            updateSort('faceValueOfLoan', 'desc');
        }
        else if (sort === 'obligation' && order === 'desc') {
            changeCurrentPage(1);
            fetchSpendingByCategoryCallback();
        }
        else {
            updateSort('obligation', 'desc');
        }
    }, [props.type]);

    useEffect(() => {
        // Reset to the first page
        if (currentPage === 1) {
            fetchSpendingByCategoryCallback();
        }
        else {
            changeCurrentPage(1);
        }
    }, [pageSize, sort, order, defcParams, query]);

    useEffect(() => {
        fetchSpendingByCategoryCallback();
    }, [currentPage]);

    useEffect(() => {
        props.scrollIntoView(loading, error, errorOrLoadingWrapperRef, tableWrapperRef, 100, true);
    }, [loading, error]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => () => {
        if (request.current) {
            request.current.cancel();
        }
    }, []);

    if (loading) {
        if (tableRef.current) {
            tableHeight = tableRef.current.offsetHeight;
        }
    }
    else if (error) {
        if (tableRef.current) {
            tableHeight = tableRef.current.offsetHeight;
        }
    }
    return (
        <div ref={tableWrapperRef}>
            <SearchBar onSearch={setQuery} />
            <Pagination
                currentPage={currentPage}
                changePage={changeCurrentPage}
                changeLimit={changePageSize}
                limitSelector
                resultsText
                pageSize={pageSize}
                totalItems={totalItems} />
            {(loading || error || results.length === 0) &&
            <TransitionGroup>
                <CSSTransition
                    classNames="table-message-fade"
                    timeout={{ exit: 225, enter: 195 }}
                    exit>
                    <div className="results-table-message-container" style={{ height: tableHeight }}>
                        {error && <ResultsTableErrorMessage />}
                        {loading && <ResultsTableLoadingMessage />}
                        {!loading && !error && results.length === 0 && <ResultsTableNoResults />}
                    </div>
                </CSSTransition>
            </TransitionGroup>}
            {!loading && !error && results.length > 0 &&
            <div ref={tableRef} className={unlinkedDataClass ? 'table-wrapper unlinked-data' : 'table-wrapper'}>
                <Table
                    expandable
                    rows={results}
                    columns={awardSpendingAgencyTableColumns(props.type)}
                    currentSort={{ field: sort, direction: order }}
                    updateSort={updateSort}
                    divider={props.subHeading} />
            </div>}
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
