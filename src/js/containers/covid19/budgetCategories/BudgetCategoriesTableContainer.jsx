/**
 * BudgetCategoriesTableContainer.jsx
 * Created by James Lee 6/5/20
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination, TooltipWrapper, Picker } from 'data-transparency-ui';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { budgetColumns, budgetDropdownColumns, budgetDropdownFieldValues } from 'dataMapping/covid19/budgetCategories/BudgetCategoriesTableColumns';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import BaseBudgetCategoryRow from 'models/covid19/budgetCategories/BaseBudgetCategoryRow';


const propTypes = {
    type: PropTypes.string.isRequired,
    subHeading: PropTypes.string
};

const BudgetCategoriesTableContainer = (props) => {
    const [currentPage, changeCurrentPage] = useState(1);
    const [pageSize, changePageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [sort, setSort] = useState('totalObligatedAmount');
    const [order, setOrder] = useState('desc');
    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [spendingCategory, setSpendingCategory] = useState("total_spending");

    const parseSpending = (data) => {
        const parsedData = data.map((row) => {
            const budgetCategoryRow = Object.create(BaseBudgetCategoryRow);
            budgetCategoryRow.populate(row, props.type, spendingCategory);
            return budgetCategoryRow;
        });
        setResults(parsedData);
    };

    const fetchBudgetSpending = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            parseSpending([
                {
                    def_code: "L",
                    emergency_funding_mandate: "emergencyFundingMandate1",
                    total_obligated_amount: 1000000,
                    total_outlayed_amount: 999999,
                    award_total_obligated_amount: 123123123,
                    award_total_outlayed_amount: 321321321,
                    face_value_of_loans: 666666666
                },
                {
                    def_code: "M",
                    emergency_funding_mandate: "emergencyFundingMandate2",
                    total_obligated_amount: 1000000,
                    total_outlayed_amount: 999999,
                    award_total_obligated_amount: 123123123,
                    award_total_outlayed_amount: 321321321,
                    face_value_of_loans: 666666666
                },
                {
                    def_code: "N",
                    emergency_funding_mandate: "emergencyFundingMandate3",
                    total_obligated_amount: 1000000,
                    total_outlayed_amount: 999999,
                    award_total_obligated_amount: 123123123,
                    award_total_outlayed_amount: 321321321,
                    face_value_of_loans: 666666666
                },
                {
                    def_code: "O",
                    emergency_funding_mandate: "emergencyFundingMandate4",
                    total_obligated_amount: 1000000,
                    total_outlayed_amount: 999999,
                    award_total_obligated_amount: 123123123,
                    award_total_outlayed_amount: 321321321,
                    face_value_of_loans: 666666666
                },
                {
                    def_code: "P",
                    emergency_funding_mandate: "emergencyFundingMandate5",
                    total_obligated_amount: 1000000,
                    total_outlayed_amount: 999999,
                    award_total_obligated_amount: 123123123,
                    award_total_outlayed_amount: 321321321,
                    face_value_of_loans: 666666666
                }
            ]);
            setTotalItems(100);
            setLoading(false);
            setError(false);
        }, 1000);
    });

    useEffect(() => {
        // Reset to the first page
        changeCurrentPage(1);
        fetchBudgetSpending();
    }, [props.type, props.fy, props.agencyId, pageSize, sort, order, spendingCategory]);

    useEffect(() => {
        fetchBudgetSpending();
    }, [currentPage]);

    const renderColumns = () => {
        if (spendingCategory) {
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
                tabIndex={0} />
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
            <div className="budget-categories-table">
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
