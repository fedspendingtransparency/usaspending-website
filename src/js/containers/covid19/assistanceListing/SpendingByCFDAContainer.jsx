/**
 * SpendingByCFDAContainer.jsx
 * Created by Lizzie Salita 6/24/20
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { isCancel } from 'axios';
import { OrderedMap } from 'immutable';
import { Table, Pagination, SearchBar } from 'data-transparency-ui';
import { useHistory } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import replaceString from 'helpers/replaceString';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import BaseSpendingByCfdaRow from 'models/v2/covid19/BaseSpendingByCfdaRow';
import { spendingTableSortFields } from 'dataMapping/covid19/covid19';
import { fetchSpendingByCfda, fetchCfdaLoans } from 'apis/disaster';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import ResultsTableNoResults from 'components/search/table/ResultsTableNoResults';
import { clearAllFilters } from 'redux/actions/search/searchFilterActions';
import { resetAppliedFilters, applyStagedFilters, setAppliedFilterCompletion } from 'redux/actions/search/appliedFilterActions';
import { initialState as defaultAdvancedSearchFilters, CheckboxTreeSelections } from 'redux/reducers/search/searchFiltersReducer';
import Analytics from 'helpers/analytics/Analytics';
import { calculateUnlinkedTotals } from 'helpers/covid19Helper';

import CFDADetailModal from 'components/covid19/assistanceListing/CFDADetailModal';
import { showModal } from 'redux/actions/modal/modalActions';

const propTypes = {
    activeTab: PropTypes.string.isRequired,
    scrollIntoView: PropTypes.func.isRequired
};

let tableHeight = 'auto';

const columns = [
    {
        title: 'name',
        displayName: (
            <div className="table-header-label__title">
                <div>Assistance Listing</div>
                <div>(CFDA Program)</div>
            </div>
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
        title: 'assistanceListing',
        displayName: (
            <div className="table-header-label__title">
                <div>Assistance Listing</div>
                <div>(CFDA Program)</div>
            </div>
        )
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

const SpendingByCFDAContainer = ({ activeTab, scrollIntoView }) => {
    const [currentPage, changeCurrentPage] = useState(1);
    const [pageSize, changePageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [results, setResults] = useState([]);
    const [resultTotal, setResultTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [sort, setSort] = useState('obligation');
    const [order, setOrder] = useState('desc');
    const [query, setQuery] = useState('');
    const [modalData, setModalData] = useState(null);
    const [cfdaModal, showCFDAModal] = useState(false);
    const tableRef = useRef(null);
    const tableWrapperRef = useRef(null);
    const errorOrLoadingWrapperRef = useRef(null);
    const request = useRef(null);
    const [unlinkedDataClass, setUnlinkedDataClass] = useState(false);
    const { defcParams } = useSelector((state) => state.covid19);
    const assistanceTotals = useSelector((state) => state.covid19.assistanceTotals);
    const currentModalData = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    const history = useHistory();

    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };

    const launchModal = (e) => {
        e.persist();
        if (e?.target) {
            setModalData(() => results.find((cfda) => cfda.code === (e.target.parentNode.getAttribute('data-code') || e.target.getAttribute('data-code'))));
            showCFDAModal(true);
        }
    };
    const closeModal = () => showCFDAModal(false);

    const displayRedirectModal = (e) => {
        e.persist();
        dispatch(showModal(e.target.value, 'redirect'));
    };

    const updateAdvancedSearchFilters = (e) => {
        e.preventDefault();
        dispatch(clearAllFilters());
        dispatch(resetAppliedFilters());
        const cfdaData = results.find((cfda) => cfda.code === e.target.value);
        dispatch(setAppliedFilterCompletion(false));
        dispatch(applyStagedFilters(
            Object.assign(
                {}, defaultAdvancedSearchFilters,
                {
                    defcParams: new CheckboxTreeSelections({
                        require: defcParams,
                        exclude: [],
                        counts: [{ value: "COVID-19", count: defcParams.length, label: "COVID-19 Response" }]
                    })
                },
                {
                    selectedCFDA: OrderedMap({
                        [cfdaData.code]: {
                            program_number: cfdaData.code,
                            program_title: cfdaData.description,
                            popular_name: cfdaData.description,
                            identifier: cfdaData.code
                        }
                    })
                }
            )
        ));
        history.push('/search');
        Analytics.event({
            category: `COVID-19 - Award Spending by Assistance Listing - ${activeTab}`,
            action: 'CFDA listing click',
            label: cfdaData.description
        });
    };

    const addUnlinkedData = useCallback((rows, cfdaTotals = resultTotal, overallAsstAwardTotals = assistanceTotals) => {
        if (!rows.length) return [];
        if (Object.keys(overallAsstAwardTotals).length === 0 || activeTab !== 'all') {
            setUnlinkedDataClass(false);
            return rows;
        }
        setUnlinkedDataClass(true);
        return rows
            .filter(({ isUnlinkedRow }) => !isUnlinkedRow)
            .concat([{
                isUnlinkedRow: true,
                description: (
                    <div className="unlinked-data">
                        Unknown CFDA Program (Unlinked Data)
                    </div>),
                ...calculateUnlinkedTotals(overallAsstAwardTotals, cfdaTotals)
            }]);
    });

    const parseRows = () => (
        results.map((row) => {
            const rowData = Object.create(BaseSpendingByCfdaRow);
            rowData.populate(row);
            let link = rowData.name;
            if (query) link = replaceString(link, query, "query-matched");
            if (rowData.code) {
                link = (
                    <div className="assistance-listing__button__container">
                        <button
                            className="assistance-listing__button"
                            data-code={rowData.code}
                            onClick={launchModal}>
                            {link}
                            <span className="assistance-listing__button__icon"><FontAwesomeIcon data-code={rowData.code} icon="window-restore" /></span>
                        </button>
                    </div>
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

    const fetchSpendingByCfdaCallback = useCallback(() => {
        if (request.current) {
            request.current.cancel();
        }
        setLoading(true);
        if (defcParams && defcParams.length > 0) {
            const params = {
                filter: {
                    def_codes: defcParams
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
            if (query) {
                params.filter.query = query;
            }
            let cfdaRequest;
            if (activeTab === 'loans') {
                cfdaRequest = fetchCfdaLoans(params);
            }
            else {
                // when not loan tab, if sort is on faceValueOfLoan, make it obligation instead to avoid API error
                if (sort === 'faceValueOfLoan') {
                    setSort('obligation');
                    params.pagination.sort = 'obligation';
                    setOrder('desc');
                    params.pagination.order = 'desc';
                }
                cfdaRequest = fetchSpendingByCfda(params);
            }
            request.current = cfdaRequest;
            cfdaRequest.promise
                .then((res) => {
                    const rows = res.data.results;
                    const totals = res.data.totals;
                    setResults(addUnlinkedData(rows, totals));
                    setResultTotal(totals);
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
        if (Object.keys(assistanceTotals).length) {
            setResults(addUnlinkedData(results, resultTotal, assistanceTotals));
        }
    }, [assistanceTotals, resultTotal]);

    useEffect(() => {
    // Reset to the first page
        if (currentPage === 1) {
            fetchSpendingByCfdaCallback();
        }
        else {
            changeCurrentPage(1);
        }
    }, [pageSize, defcParams, sort, order, activeTab, query]);

    useEffect(() => {
        fetchSpendingByCfdaCallback();
    }, [currentPage]);

    useEffect(() => {
        scrollIntoView(loading, error, errorOrLoadingWrapperRef, tableWrapperRef, 100, true);
    }, [loading, error]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [document]);

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
                        {!error && !loading && results.length === 0 && <ResultsTableNoResults />}
                    </div>
                </CSSTransition>
            </TransitionGroup>
            }
            {!loading && !error && results.length > 0 &&
            <div ref={tableRef} className={`table-wrapper ${unlinkedDataClass ? 'unlinked-data' : ''}`} >
                <Table
                    columns={activeTab === 'loans' ? loanColumns : columns}
                    rows={parseRows(results)}
                    updateSort={updateSort}
                    currentSort={{ field: sort, direction: order }} />
            </div>}
            <Pagination
                currentPage={currentPage}
                changePage={changeCurrentPage}
                changeLimit={changePageSize}
                limitSelector
                resultsText
                pageSize={pageSize}
                totalItems={totalItems} />
            <CFDADetailModal
                mounted={currentModalData.modal !== 'redirect' && cfdaModal}
                closeModal={closeModal}
                data={modalData}
                updateAdvancedSearchFilters={updateAdvancedSearchFilters}
                displayRedirectModal={displayRedirectModal} />
        </div>
    );
};

SpendingByCFDAContainer.propTypes = propTypes;
export default SpendingByCFDAContainer;
