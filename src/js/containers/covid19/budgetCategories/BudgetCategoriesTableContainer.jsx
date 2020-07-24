/**
 * BudgetCategoriesTableContainer.jsx
 * Created by James Lee 6/5/20
 */

import React, { useState, useEffect, useCallback } from 'react';
import { snakeCase } from 'lodash';
import { useSelector } from 'react-redux';
import { isCancel } from 'axios';
import PropTypes from 'prop-types';
import { Table, Pagination, TooltipWrapper, Picker } from 'data-transparency-ui';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {
    budgetColumns,
    budgetDropdownFieldValues,
    budgetCategoriesCssMappingTypes,
    defaultSort,
    budgetCategoriesNameSort,
    apiSpendingTypes
} from 'dataMapping/covid19/budgetCategories/BudgetCategoriesTableColumns';
import { fetchDisasterSpending, fetchLoanSpending } from 'helpers/disasterHelper';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import BaseBudgetCategoryRow from 'models/v2/covid19/BaseBudgetCategoryRow';
import { BudgetCategoriesInfo } from 'components/award/shared/InfoTooltipContent';


const propTypes = {
    type: PropTypes.string.isRequired
};


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
                <>
                    <div>Number</div>
                    <div>of Awards</div>
                </>
            ),
            right: true
        }
    ],
    loan_spending: [
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
    ]
};


const totalBudgetaryResourcesColumn = {
    title: 'totalBudgetaryResources',
    displayName: (
        <>
            <div>Total Budgetary</div>
            <div>Resources</div>
        </>
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
    const [request, setRequest] = useState(null);
    const defCodes = useSelector((state) => state.covid19.defCodes);

    const parseSpendingDataAndSetResults = (data) => {
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
            const code = budgetCategoryRow._code;
            if (link && code && props.type === 'federal_account') {
                link = (
                    <a
                        className="federal-account-profile__link"
                        href={`#/federal_account/${code}`}>
                        {budgetCategoryRow.name}
                    </a>
                );
            } else if (link && id && props.type === 'agency') {
                link = (
                    <a
                        className="agency-profile__link"
                        href={`#/agency/${id}`}>
                        {budgetCategoryRow.name}
                    </a>
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
        setResults(parsedData);
    };

    const fetchBudgetSpendingCallback = useCallback(() => {
        if (request) {
            request.cancel();
        }

        setLoading(true);
        if (defCodes && defCodes.length > 0 && spendingCategory) {
            const apiSortField = sort === 'name' ? budgetCategoriesNameSort[props.type] : snakeCase(sort);
            if (spendingCategory === 'loan_spending') {
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
                const requestLoanSpending = fetchLoanSpending(props.type, params);
                setRequest(requestLoanSpending);
                requestLoanSpending.promise
                    .then((res) => {
                        parseSpendingDataAndSetResults(res.data.results);
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
                const params = {
                    filter: {
                        def_codes: defCodes.map((defc) => defc.code)
                    },
                    spending_type: apiSpendingTypes[spendingCategory],
                    pagination: {
                        limit: pageSize,
                        page: currentPage,
                        sort: apiSortField,
                        order
                    }
                };
                const disasterSpendingRequest = fetchDisasterSpending(props.type, params);
                setRequest(disasterSpendingRequest);
                disasterSpendingRequest.promise
                    .then((res) => {
                        parseSpendingDataAndSetResults(res.data.results);
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
        // Reset to default sort when the active tab or spending category changes
        setSort(defaultSort[props.type][spendingCategory].sort);
        setOrder(defaultSort[props.type][spendingCategory].order);
    }, [props.type, spendingCategory]);

    useEffect(() => {
        // Reset to the first page
        changeCurrentPage(1);
        fetchBudgetSpendingCallback();
    }, [props.type, pageSize, defCodes, sort, order]);

    useEffect(() => {
        fetchBudgetSpendingCallback();
    }, [currentPage]);

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
    };

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

    const spendingViewPicker = () => (
        <div className="budget-categories-table__header">
            <label htmlFor="usa-dt-picker">Show amounts based on: </label>
            <Picker
                icon=""
                selectedOption={budgetDropdownFieldValues[spendingCategory]}
                options={Object.keys(budgetDropdownFieldValues).map((key) => ({
                    name: budgetDropdownFieldValues[key],
                    value: key,
                    onClick: spendingCategoryOnChange
                }))} />
            <TooltipWrapper
                className="budget-categories-section-tt"
                icon="info"
                tooltipPosition="right"
                tabIndex={0}
                tooltipComponent={BudgetCategoriesInfo} />
        </div>
    );

    if (message) {
        return (
            <>
                {spendingViewPicker()}
                <CSSTransitionGroup
                    transitionName="table-message-fade"
                    transitionLeaveTimeout={225}
                    transitionEnterTimeout={195}
                    transitionLeave>
                    {message}
                </CSSTransitionGroup>
            </>
        );
    }

    return (
        <>
            {spendingViewPicker()}
            <div className={`budget-categories-table_${budgetCategoriesCssMappingTypes[props.type]} table-wrapper`}>
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
        </>
    );
};

BudgetCategoriesTableContainer.propTypes = propTypes;
export default BudgetCategoriesTableContainer;
