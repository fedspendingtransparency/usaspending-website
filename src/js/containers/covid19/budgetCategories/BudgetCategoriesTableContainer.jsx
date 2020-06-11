/**
 * BudgetCategoriesTableContainer.jsx
 * Created by James Lee 6/5/20
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination, TooltipWrapper, Picker } from 'data-transparency-ui';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { budgetColumns, budgetDropdownColumns, budgetDropdownFieldValues, totalBudgetaryResourcesColumn } from 'dataMapping/covid19/budgetCategories/BudgetCategoriesTableColumns';
// import { fetchDisasterSpending, fetchDefCodes } from 'helpers/covid19/budgetCategoriesHelper';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import BaseBudgetCategoryRow from 'models/covid19/budgetCategories/BaseBudgetCategoryRow';


const propTypes = {
    fy: PropTypes.number,
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
    const [defCodes, setDefCodes] = useState([]);
    const [params, setParams] = useState({});

    const parseSpending = (data) => {
        const parsedData = data.map((row) => {
            const budgetCategoryRow = Object.create(BaseBudgetCategoryRow);
            budgetCategoryRow.populate(row, props.type, spendingCategory);
            return budgetCategoryRow;
        });
        setResults(parsedData);
    };

    const fetchBudgetSpendingCallback = useCallback(async () => {
        setLoading(true);

        // TODO - Uncomment below code when API is ready
        // const requestDefCodes = fetchDefCodes();
        // await requestDefCodes.promise.then((res) => {
        //     setDefCodes(res.data.codes.filter((code) => code.disaster === 'covid_19'));
        // });

        // const params = {
        //     filter: {
        //         def_codes: [...defCodes.filter((defCode) => defCode.disaster === 'covid_19')],
        //         spending_facets: Object.values(budgetFields[spendingCategory])
        //     },
        //     pagination: {
        //         order,
        //         size: pageSize,
        //         page: currentPage
        //     }
        // };
        // const requestDisasterSpending = fetchDisasterSpending(props.type, params);
        // requestDisasterSpending.promise
        //     .then((res) => {
        //         parseSpending(res.data.results);
        //         setTotalItems(res.data.page_metadata.total);
        //         setLoading(false);
        //         setError(false);
        //     }).catch((err) => {
        //         setError(true);
        //         setLoading(false);
        //         console.error(err);
        //     });

        setTimeout(() => {
            if (props.type === 'def_codes') {
                parseSpending([
                    {
                        id: 43,
                        code: "L",
                        description: "Description text of L, for humans",
                        children: [],
                        count: 54,
                        total_obligation: 89.01,
                        total_outlay: 70.98,
                        total_budgetary_resources: 19
                    },
                    {
                        id: 41,
                        code: "M",
                        description: "Description text of M, for humans",
                        children: [],
                        count: 2,
                        total_obligation: 50,
                        total_outlay: 10,
                        total_budgetary_resources: 19
                    }
                ]);
            } else if (props.type === 'agencies') {
                parseSpending([
                    {
                        id: 43,
                        code: "090",
                        description: "Description text of 090, for humans",
                        children: [],
                        count: 54,
                        award_obligation: 10.01,
                        award_outlay: 11.98
                    },
                    {
                        id: 41,
                        code: "012",
                        description: "Description text of 012, for humans",
                        children: [],
                        count: 2,
                        award_obligation: 50,
                        award_outlay: 10
                    }
                ]);
            } else if (props.type === 'def_codes') {
                parseSpending([
                    {
                        id: 43,
                        code: "020",
                        description: "Description text of 020, for humans",
                        children: [],
                        count: 54,
                        award_obligation: 12.01,
                        award_outlay: 13.98
                    },
                    {
                        id: 41,
                        code: "013",
                        description: "Description text of 013, for humans",
                        children: [],
                        count: 2,
                        award_obligation: 60,
                        award_outlay: 20
                    }
                ]);
            } else if (props.type === 'object_classes') {
                parseSpending([
                    {
                        id: 43,
                        code: "070",
                        description: "Description text of 070, for humans",
                        children: [],
                        count: 54,
                        award_obligation: 13.01,
                        award_outlay: 14.98
                    },
                    {
                        id: 41,
                        code: "011",
                        description: "Description text of 011, for humans",
                        children: [],
                        count: 2,
                        award_obligation: 70,
                        award_outlay: 30
                    }]);
            } else {
                parseSpending([
                    {
                        id: 43,
                        code: "055",
                        description: "Description text of 055, for humans",
                        children: [],
                        count: 54,
                        award_obligation: 14.01,
                        award_outlay: 15.98
                    },
                    {
                        id: 41,
                        code: "099",
                        description: "Description text of 099, for humans",
                        children: [],
                        count: 2,
                        award_obligation: 80,
                        award_outlay: 40
                    }]);
            }

            setTotalItems(2);
            setLoading(false);
            setError(false);
        }, 1000);
    });

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
            if (props.type !== 'object_classes' && spendingCategory !== 'award_spending') {
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
            <div className={`budget-categories-table-${props.type}`}>
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
