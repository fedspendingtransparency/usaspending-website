/**
 * BudgetCategoriesTableContainer.jsx
 * Created by James Lee 6/5/20
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination, TooltipWrapper, Picker } from 'data-transparency-ui';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { budgetColumns, budgetDropdownColumns, budgetDropdownFieldValues, totalBudgetaryResourcesColumn, apiSpendingTypes, budgetCategoriesCssMappingTypes } from 'dataMapping/covid19/budgetCategories/BudgetCategoriesTableColumns';
import { fetchDisasterSpending, fetchLoanSpending } from 'helpers/covid19/budgetCategoriesHelper';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import BaseBudgetCategoryRow from 'models/covid19/budgetCategories/BaseBudgetCategoryRow';
import { BudgetCategoriesInfo } from '../../../components/award/shared/InfoTooltipContent';


const propTypes = {
    fy: PropTypes.number,
    type: PropTypes.string.isRequired,
    subHeading: PropTypes.string
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

    const parseSpendingDataAndSetResults = (data) => {
        const parsedData = data.map((row) => {
            const budgetCategoryRow = Object.create(BaseBudgetCategoryRow);
            budgetCategoryRow.populate(row, props.type, spendingCategory);
            return budgetCategoryRow;
        });
        setResults(parsedData);
    };

    const fetchBudgetSpendingCallback = useCallback(() => {
        if (props.defCodes && spendingCategory) {
            setLoading(true);

            if (spendingCategory === 'loan_spending') {
                const params = {
                    filter: {
                        def_codes: props.defCodes,
                        fiscal_year: props.fy
                    },
                    pagination: {
                        size: pageSize,
                        page: currentPage,
                        order,
                        sort
                    }
                };
                const requestLoanSpending = fetchLoanSpending(props.type, params);
                requestLoanSpending.promise
                    .then((res) => {
                        parseSpendingDataAndSetResults(res.data.results);
                        setTotalItems(res.data.pagination_metadata.total);
                        setLoading(false);
                        setError(false);
                    }).catch((err) => {
                        setError(true);
                        setLoading(false);
                        console.error(err);
                    });
            } else {
                const params = {
                    filter: {
                        def_codes: props.defCodes,
                        fiscal_year: props.fy
                    },
                    spending_type: apiSpendingTypes[spendingCategory],
                    pagination: {
                        size: pageSize,
                        page: currentPage,
                        order,
                        sort
                    }
                };
                const requestDisasterSpending = fetchDisasterSpending(props.type, params);
                requestDisasterSpending.promise
                    .then((res) => {
                        parseSpendingDataAndSetResults(res.data.results);
                        setTotalItems(res.data.pagination_metadata.total);
                        setLoading(false);
                        setError(false);
                    }).catch((err) => {
                        setError(true);
                        setLoading(false);
                        console.error(err);
                    });
            }
        }
    });

    const sortBasedOnTypeAndSpendingCategory = () => {
        if (props.type === 'object_class' && spendingCategory === 'total_spending') {
            setSort('totalObligation');
        } else if (spendingCategory === 'total_spending') {
            setSort('totalBudgetaryResources');
        } else if (spendingCategory === 'loan_spending') {
            setSort('faceValueOfLoan');
        } else {
            setSort('awardObligation');
        }
    };

    useEffect(() => {
        sortBasedOnTypeAndSpendingCategory();
    }, [props.type, props.fy, spendingCategory]);

    useEffect(() => {
        // Reset to the first page
        changeCurrentPage(1);
        fetchBudgetSpendingCallback();
    }, [props.type, props.fy, pageSize, sort, order, spendingCategory]);

    useEffect(() => {
        fetchBudgetSpendingCallback();
    }, [currentPage]);

    const renderColumns = () => {
        if (props.type && spendingCategory) {
            if (props.type !== 'object_class' && spendingCategory === 'total_spending') {
                return [
                    ...budgetColumns[props.type],
                    ...budgetDropdownColumns[spendingCategory],
                    totalBudgetaryResourcesColumn
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
    }

    return (
        <>
            {spendingViewPicker()}
            <div className={`budget-categories-table_${budgetCategoriesCssMappingTypes[props.type]}`}>
                <Table
                    expandable
                    rows={results}
                    columns={renderColumns()}
                    divider={props.subHeading}
                    currentSort={{ field: sort, direction: order }}
                    updateSort={updateSort} />
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
