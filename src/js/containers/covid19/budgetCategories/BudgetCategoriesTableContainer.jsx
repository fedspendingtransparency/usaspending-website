/**
 * BudgetCategoriesTableContainer.jsx
 * Created by James Lee 6/5/20
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { snakeCase } from 'lodash';
import { useSelector } from 'react-redux';
import { isCancel } from 'axios';
import PropTypes from 'prop-types';
import { Table, Pagination, Picker, TooltipWrapper } from 'data-transparency-ui';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';

import kGlobalConstants from 'GlobalConstants';
import Analytics from 'helpers/analytics/Analytics';


import {
    budgetColumns,
    budgetDropdownFieldValues,
    defaultSort,
    budgetCategoriesNameSort,
    apiSpendingTypes
} from 'dataMapping/covid19/budgetCategories/BudgetCategoriesTableColumns';
import { fetchDisasterSpending, fetchLoanSpending } from 'helpers/disasterHelper';
import { handleSort, calculateUnlinkedTotals } from 'helpers/covid19Helper';

import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import BaseBudgetCategoryRow from 'models/v2/covid19/BaseBudgetCategoryRow';

import { SpendingTypesTT } from 'components/covid19/Covid19Tooltips';

const propTypes = {
    type: PropTypes.string.isRequired,
    subHeading: PropTypes.string,
    scrollIntoView: PropTypes.func.isRequired,
    totals: PropTypes.shape({
        count: PropTypes.number,
        totalBudgetaryResources: PropTypes.number,
        totalObligations: PropTypes.number,
        totalOutlays: PropTypes.number
    })
};

let tableHeight = 'auto';

const budgetDropdownColumns = {
    total_spending: [
        {
            title: 'obligation',
            displayName: 'Total Obligations',
            right: true
        },
        {
            title: 'outlay',
            displayName: 'Total Outlays',
            right: true
        }
    ],
    award_spending: [
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
    ],
    loan_spending: [
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
    ]
};


const totalBudgetaryResourcesColumn = {
    title: 'totalBudgetaryResources',
    displayName: (
        <div className="table-header-label__title">
            <div>Total Budgetary</div>
            <div>Resources</div>
        </div>
    ),
    right: true
};

const BudgetCategoriesTableContainer = (props) => {
    const [currentPage, changeCurrentPage] = useState(1);
    const [pageSize, changePageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [sort, setSort] = useState('totalBudgetaryResources');
    const [order, setOrder] = useState('desc');
    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [spendingCategory, setSpendingCategory] = useState("total_spending");
    const tableRef = useRef(null);
    const tableWrapperRef = useRef(null);
    const errorOrLoadingWrapperRef = useRef(null);
    const request = useRef(null);
    const [unlinkedDataClass, setUnlinkedDataClass] = useState(false);

    const { overview, defCodes, allAwardTypeTotals } = useSelector((state) => state.covid19);

    const clickedAgencyProfile = (agencyName) => {
        Analytics.event({
            category: `COVID-19 - Total Spending by Budget Category - ${props.type}`,
            action: `${spendingCategory} - agency profile click`,
            label: agencyName
        });
    };

    const clickedFedAcctProfile = (accountName) => {
        Analytics.event({
            category: `COVID-19 - Total Spending by Budget Category - ${props.type}`,
            action: `${spendingCategory} - federal account profile click`,
            label: accountName
        });
    };

    const addUnlinkedData = (parsedData, totals) => {
        let unlinkedName = '';

        const overviewTotals = {
            totalBudgetaryResources: overview._totalBudgetAuthority,
            obligation: overview._totalObligations,
            outlay: overview._totalOutlays
        };
        const unlinkedData = calculateUnlinkedTotals(overviewTotals, totals);

        if (props.type === 'agency' && spendingCategory === 'total_spending') {
            unlinkedName = 'Unknown Agency (Unlinked Data)';
        }
        else if (props.type === 'federal_account' && spendingCategory === 'total_spending') {
            unlinkedName = 'Unknown Federal Account (Unlinked Data)';
        }
        else if (props.type === 'object_class' && spendingCategory === 'total_spending') {
            unlinkedName = 'Unknown Object Class (Unlinked Data)';
        }

        if (unlinkedName && unlinkedData && overview) {
            setUnlinkedDataClass(true);
            const unlinkedColumn = (
                <div>
                    {unlinkedName}
                </div>
            );
            unlinkedData.name = unlinkedColumn;

            const unlinkedRow = Object.create(BaseBudgetCategoryRow);
            unlinkedRow.populate(unlinkedData);

            if (spendingCategory === 'award_spending') {
                unlinkedRow.obligation = null;
                unlinkedRow.outlay = null;
                unlinkedRow.totalBudgetaryResources = null;
            }
            parsedData.push(unlinkedRow);
        }
        else {
            setUnlinkedDataClass(false);
        }

        setResults(parsedData);
    };

    const parseSpendingDataAndSetResults = (data, totals) => {
        const parsedData = data.map((item) => {
            const budgetCategoryRow = Object.create(BaseBudgetCategoryRow);
            budgetCategoryRow.populate(item, props.type);

            let rowChildren = [];
            if (item.children && item.children.length > 0) {
                rowChildren = item.children.map((childItem) => {
                    const budgetCategoryChildRow = Object.create(BaseBudgetCategoryRow);
                    budgetCategoryChildRow.populate(childItem, props.type, true);
                    return budgetCategoryChildRow;
                });
            }

            if (rowChildren && rowChildren.length > 0) {
                Object.defineProperty(budgetCategoryRow, "children", {
                    value: rowChildren
                });
            }

            let link = budgetCategoryRow.name;
            const id = budgetCategoryRow._id;
            const code = budgetCategoryRow.code;
            if (link && code && props.type === 'federal_account') {
                link = (
                    <Link
                        className="federal-account-profile__link"
                        onClick={clickedFedAcctProfile.bind(null, `${budgetCategoryRow.name}`)}
                        to={`/federal_account/${code}`}>
                        {budgetCategoryRow.name}
                    </Link>
                );
            }
            else if (link && id && props.type === 'agency') {
                link = (
                    <Link
                        className="agency-profile__link"
                        onClick={clickedAgencyProfile.bind(null, `${budgetCategoryRow.name}`)}
                        to={`/agency/${id}`}>
                        {budgetCategoryRow.name}
                    </Link>
                );
            }

            return {
                ...budgetCategoryRow,
                obligation: budgetCategoryRow.obligation,
                outlay: budgetCategoryRow.outlay,
                totalBudgetaryResources: budgetCategoryRow.totalBudgetaryResources,
                faceValueOfLoan: budgetCategoryRow.faceValueOfLoan,
                awardCount: budgetCategoryRow.awardCount,
                children: budgetCategoryRow.children,
                name: link
            };
        });

        addUnlinkedData(parsedData, totals);
    };

    const fetchBudgetSpendingCallback = useCallback(() => {
        if (request.current) {
            request.current.cancel();
        }

        setLoading(true);
        if (defCodes && defCodes.length > 0 && spendingCategory && overview) {
            const apiSortField = sort === 'name' ? budgetCategoriesNameSort[props.type] : snakeCase(sort);
            const params = {
                filter: {
                    def_codes: defCodes.map((defc) => defc.code)
                },
                pagination: {
                    limit: pageSize,
                    page: currentPage,
                    sort: apiSortField,
                    order
                }
            };


            if (spendingCategory !== 'loan_spending') {
                params.spending_type = apiSpendingTypes[spendingCategory];
            }

            const disasterSpendingRequest = spendingCategory === 'loan_spending' ? fetchLoanSpending(props.type, params) : fetchDisasterSpending(props.type, params);

            request.current = disasterSpendingRequest;
            disasterSpendingRequest.promise
                .then((res) => {
                    parseSpendingDataAndSetResults(res.data.results, res.data.totals);
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
        // If the sort and order is the same as the default sort and default order, then we are just changing tabs or just changing the spending category.
        // In this particular case, we want to fetch from api.
        if (sort === defaultSort[props.type][spendingCategory].sort && order === defaultSort[props.type][spendingCategory].order) {
            changeCurrentPage(1);
            fetchBudgetSpendingCallback();
        }
        // Reset to default sort when the active tab or spending category changes
        setSort(defaultSort[props.type][spendingCategory].sort);
        setOrder(defaultSort[props.type][spendingCategory].order);
    }, [props.type, spendingCategory]);

    useEffect(() => {
        // Reset to the first page
        if (currentPage === 1) {
            fetchBudgetSpendingCallback();
        }
        changeCurrentPage(1);
    }, [pageSize, sort, order, defCodes, overview, allAwardTypeTotals]);

    useEffect(() => {
        fetchBudgetSpendingCallback();
    }, [currentPage]);

    useEffect(() => {
        props.scrollIntoView(loading, error, errorOrLoadingWrapperRef, tableWrapperRef, 100, true);
    }, [loading, error]);

    const renderColumns = () => {
        if (props.type && spendingCategory) {
            if (props.type !== 'object_class' && spendingCategory === 'total_spending') {
                return [
                    ...budgetColumns[props.type],
                    totalBudgetaryResourcesColumn,
                    ...budgetDropdownColumns[spendingCategory]
                ];
            }
            return [
                ...budgetColumns[props.type],
                ...budgetDropdownColumns[spendingCategory]
            ];
        }
        return null;
    };

    const spendingCategoryOnChange = (key) => {
        setSpendingCategory(key);
        Analytics.event({ category: 'covid-19 - profile', action: `total spending - ${props.type} - ${spendingCategory}` });
    };

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

    const spendingViewPicker = () => (
        <div className="budget-categories-table__header">
            <label htmlFor="usa-dt-picker">Show amounts based on: </label>
            <Picker
                sortFn={handleSort}
                icon=""
                selectedOption={budgetDropdownFieldValues[spendingCategory].label}
                options={Object.keys(budgetDropdownFieldValues).map((key) => ({
                    name: budgetDropdownFieldValues[key].label,
                    sortOrder: budgetDropdownFieldValues[key].sortOrder,
                    value: key,
                    onClick: spendingCategoryOnChange
                }))} />
            <TooltipWrapper
                className="homepage__covid-19-tt"
                icon="info"
                wide
                tooltipPosition="right"
                tooltipComponent={<SpendingTypesTT />} />
        </div>
    );

    if (loading || error) {
        return (
            <div ref={errorOrLoadingWrapperRef}>
                {kGlobalConstants.CARES_ACT_RELEASED_2 && spendingViewPicker()}
                <Pagination
                    currentPage={currentPage}
                    changePage={changeCurrentPage}
                    changeLimit={changePageSize}
                    limitSelector
                    resultsText
                    pageSize={pageSize}
                    totalItems={totalItems} />
                <TransitionGroup>
                    <CSSTransition
                        classNames="table-message-fade"
                        timeout={{ exit: 225, enter: 195 }}
                        exit>
                        <div className="results-table-message-container" style={{ height: tableHeight }}>
                            {error && <ResultsTableErrorMessage />}
                            {loading && <ResultsTableLoadingMessage />}
                        </div>
                    </CSSTransition>
                </TransitionGroup>
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
        <div ref={tableWrapperRef}>
            {kGlobalConstants.CARES_ACT_RELEASED_2 && spendingViewPicker()}
            <Pagination
                currentPage={currentPage}
                changePage={changeCurrentPage}
                changeLimit={changePageSize}
                limitSelector
                resultsText
                pageSize={pageSize}
                totalItems={totalItems} />
            <div ref={tableRef} className={unlinkedDataClass ? 'table-wrapper unlinked-data' : 'table-wrapper'}>
                <Table
                    expandable
                    rows={results}
                    columns={renderColumns()}
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

BudgetCategoriesTableContainer.propTypes = propTypes;
export default BudgetCategoriesTableContainer;
