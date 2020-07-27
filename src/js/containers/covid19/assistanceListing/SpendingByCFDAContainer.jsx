/**
 * SpendingByCFDAContainer.jsx
 * Created by Lizzie Salita 6/24/20
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { isCancel } from 'axios';
import { OrderedMap } from 'immutable';
import { Table, Pagination } from 'data-transparency-ui';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import BaseSpendingByCfdaRow from 'models/v2/covid19/BaseSpendingByCfdaRow';
import { spendingTableSortFields } from 'dataMapping/covid19/covid19';
import { fetchSpendingByCfda, fetchCfdaLoans } from 'helpers/disasterHelper';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import { clearAllFilters } from 'redux/actions/search/searchFilterActions';
import { resetAppliedFilters, applyStagedFilters } from 'redux/actions/search/appliedFilterActions';
import Router from 'containers/router/Router';
import { initialState as defaultAdvancedSearchFilters, CheckboxTreeSelections } from 'redux/reducers/search/searchFiltersReducer';


const propTypes = {
    activeTab: PropTypes.string.isRequired,
    scrollIntoView: PropTypes.func.isRequired
};

const columns = [
    {
        title: 'name',
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
];

const SpendingByCFDAContainer = ({ activeTab, scrollIntoView }) => {
    const [currentPage, changeCurrentPage] = useState(1);
    const [pageSize, changePageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [sort, setSort] = useState('obligation');
    const [order, setOrder] = useState('desc');
    const [request, setRequest] = useState(null);
    const tableRef = useRef(null);
    const tableWrapperRef = useRef(null);
    const errorOrLoadingWrapperRef = useRef(null);


    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };
    const defCodes = useSelector((state) => state.covid19.defCodes);
    const dispatch = useDispatch();

    const updateAdvancedSearchFilters = (e) => {
        e.preventDefault();
        dispatch(clearAllFilters());
        dispatch(resetAppliedFilters());
        const cfdaData = results.find((cfda) => cfda.code === e.target.value);
        dispatch(applyStagedFilters(
            Object.assign(
                {}, defaultAdvancedSearchFilters,
                {
                    defCodes: new CheckboxTreeSelections({
                        require: defCodes.map((code) => code.code),
                        exclude: [],
                        counts: [{ value: "COVID-19", count: defCodes.length, label: "COVID-19 Response" }]
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
        Router.history.push('/search');
    };

    const parseRows = () => (
        results.map((row) => {
            const rowData = Object.create(BaseSpendingByCfdaRow);
            rowData.populate(row);
            let link = rowData.name;
            if (rowData._code) {
                link = (
                    <button
                        className="assistance-listing__button"
                        value={rowData._code}
                        onClick={updateAdvancedSearchFilters}>
                        {rowData.name}
                    </button>
                );
            }
            if (activeTab === 'loans') {
                return [
                    link,
                    rowData.obligation,
                    rowData.outlay,
                    rowData.faceValueOfLoan,
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

    const fetchSpendingByCfdaCallback = useCallback(() => {
        if (request) {
            request.cancel();
        }
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
            let cfdaRequest = fetchSpendingByCfda(params);
            if (activeTab === 'loans') {
                cfdaRequest = fetchCfdaLoans(params);
            }
            setRequest(cfdaRequest);
            cfdaRequest.promise
                .then((res) => {
                    setResults(res.data.results);
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
        fetchSpendingByCfdaCallback();
    }, [pageSize, defCodes, sort, order, activeTab]);

    useEffect(() => {
        fetchSpendingByCfdaCallback();
    }, [currentPage]);

    useEffect(() => {
        scrollIntoView(loading, error, errorOrLoadingWrapperRef, tableWrapperRef, 100, true);
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
                <CSSTransitionGroup
                    transitionName="table-message-fade"
                    transitionLeaveTimeout={225}
                    transitionEnterTimeout={195}
                    transitionLeave>
                    {message}
                </CSSTransitionGroup>
            </div>
        );
    }

    return (
        <div ref={tableWrapperRef}>
            <Pagination
                currentPage={currentPage}
                changePage={changeCurrentPage}
                changeLimit={changePageSize}
                limitSelector
                resultsText
                pageSize={pageSize}
                totalItems={totalItems} />
            <div ref={tableRef} className="table-wrapper" >
                <Table
                    columns={activeTab === 'loans' ? loanColumns : columns}
                    rows={parseRows(results)}
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
        </div>
    );
};

SpendingByCFDAContainer.propTypes = propTypes;
export default SpendingByCFDAContainer;
