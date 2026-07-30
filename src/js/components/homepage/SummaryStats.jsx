/**
 * SummaryStats.jsx
 * Created by Andrea Blackwell 07/18/22
 */

import React, { useRef, useMemo } from 'react';
import { isCancel } from "axios";
import { FlexGridRow, FlexGridCol } from "data-transparency-ui";
import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { REQUEST_VERSION } from "GlobalConstants";
import { formatMoneyWithUnits } from "helpers/moneyFormatter";
import Analytics from 'helpers/analytics/Analytics';
import { generateUrlHash } from "helpers/searchHelper";
import { initialState as defaultFilters } from 'redux/reducers/search/searchFiltersReducer';
import useFetchBreakdown from "hooks/useFetchBreakdown";
import { useLatestAccountData } from 'containers/account/WithLatestFy';

const budgetCategories = [
    { name: "Medicare" },
    { name: "National Defense" },
    { name: "Social Security" },
    { name: "Transportation" },
    { name: "Agriculture" },
    { name: "Veterans Benefits and Services", label: "Veterans Benefits" },
    { name: "Energy" }, { name: "Net Interest" }
];

const trackExplorerLink = () => Analytics.event({
    event: 'homepage-summary-stats',
    category: 'Homepage',
    action: 'Link',
    label: 'explorer'
});

const trackBudgetFunctionLink = (title) => Analytics.event({
    event: 'homepage-summary-stats',
    category: 'Homepage - Summary Stats Budget Function Title Click',
    action: 'Link',
    label: `clicked - ${title}`
});

const SummaryStats = () => {
    const [, , { year: latestFy, period: latestPeriod }] = useLatestAccountData();
    const params = useMemo(() => ({
        type: "budget_function",
        filters: {
            fy: latestFy,
            period: latestPeriod
        }
    }), [latestFy, latestPeriod]);
    const {
        data, total: budgetTotal, randomIndex, error, loading
    } = useFetchBreakdown(params);
    const hashRef = useRef(null);

    const budgetData = [];

    data?.results.forEach((item) => {
        const budgetCategoriesIndex = budgetCategories
            .map((e) => e.name).indexOf(item.name);
        if (budgetCategoriesIndex > -1) {
            const name = 'label' in budgetCategories[budgetCategoriesIndex] ?
                budgetCategories[budgetCategoriesIndex].label :
                budgetCategories[budgetCategoriesIndex].name;
            budgetData.push({
                name,
                amount: item.amount
            });
        }
    });

    const performSearch = (title, e) => {
        e.preventDefault();

        const filterValue = {
            filters: {
                ...defaultFilters,
                keyword: { [title]: title }
            },
            version: REQUEST_VERSION
        };

        hashRef.current = generateUrlHash(filterValue);
        hashRef.current.promise
            .then((results) => {
                const hashData = results.data;
                trackBudgetFunctionLink(title);
                window.open(`/search?hash=${encodeURIComponent(hashData.hash)}`, '_blank');
                // operation has resolved
                hashRef.current = null;
            })
            .catch((hashError) => {
                console.log(hashError);
                if (isCancel(hashError)) {
                    // Got canceled
                }
                else {
                    // Request failed
                    hashRef.current = null;
                    console.log(error);
                }
            });
    };


    const renderLink = (name) => (
        <a
            role="button"
            tabIndex={0}
            aria-label="View awards"
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    performSearch(name, e);
                }
            }}
            onClick={(e) => performSearch(name, e)}>
            {name}
        </a>);

    const loadBudgetItem = (index) => {
        if (loading) {
            return (<span className="dot-pulse" />);
        }
        return (
            <>
                <span className="budget-item__amount">
                    {formatMoneyWithUnits(budgetData[index % budgetData?.length]?.amount)}
                </span><br />
                <span className="budget-item__name">
                    {!error ? 'on ' : ''}
                    {renderLink(budgetData[index % budgetData?.length]?.name)}
                </span>
            </>);
    };

    return (
        <section className="summary-stats">
            <div className="summary-stats-desktop">
                <FlexGridRow className="grid-content">
                    <FlexGridCol width={4} className="summary-stats__budget-total-container">
                        <span>So far this year, the federal government</span><br />
                        <span>plans to spend {loading ? <span className="dot-pulse" />
                            :
                            <span className="summary-stats__budget-total">
                                {formatMoneyWithUnits(budgetTotal)}
                            </span>} including…
                        </span>
                    </FlexGridCol>
                    <FlexGridCol className="summary-stats__budget-items">
                        <div className="summary-stats__budget-item">
                            {loadBudgetItem(randomIndex)}
                        </div>
                        <div className="summary-stats__budget-item">
                            {loadBudgetItem(randomIndex + 1)}
                        </div>
                        <div className="summary-stats__budget-item">
                            {loadBudgetItem(randomIndex + 2)}
                        </div>
                    </FlexGridCol>
                    <div style={{
                        display: "flex", flexDirection: "row", justifyContent: "center"
                    }}>
                        <div className="summary-stats__vertical-border">&nbsp;</div>
                    </div>
                    <FlexGridCol width={2} className="summary-stats__spending-link">
                        <FlexGridRow>
                            <Link
                                to="/explorer/budget_function"
                                onClick={trackExplorerLink}>
                                <div className="summary-stats__spending-link-text">
                                    <div>See more breakdowns<br />
                                    of federal spending
                                    </div>
                                </div>
                                <div
                                    className="icon-stack"
                                    style={{
                                        position: "relative",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "8px"
                                    }}>
                                    <FontAwesomeIcon
                                        color="white"
                                        icon="circle"
                                        style={{
                                            position: "absolute", width: "24", height: "24"
                                        }} />
                                    <FontAwesomeIcon
                                        className="arrow-circle-right"
                                        icon="arrow-circle-right"
                                        style={{ position: "absolute" }} />
                                </div>
                            </Link>
                        </FlexGridRow>
                    </FlexGridCol>
                </FlexGridRow>
            </div>
            <div className="summary-stats-mobile">
                <FlexGridRow className="grid-content">
                    <FlexGridCol width={12} className="summary-stats__budget-total-container">
                        <span>So far this year,
                            <span style={{ whiteSpace: "nowrap" }}>
                                the federal government
                            </span>
                        </span>
                        <br />
                        <span>
                            plans to spend
                            { loading ?
                                <span className="dot-pulse" /> :
                                <span className="summary-stats__budget-total">
                                    {formatMoneyWithUnits(budgetTotal)}
                                </span>}
                            including…
                        </span>
                    </FlexGridCol>
                    <FlexGridCol
                        width={12}
                        className="summary-stats__budget-items">
                        <div className="summary-stats__budget-item">
                            {loadBudgetItem(randomIndex)}
                        </div>
                        <div className="summary-stats__budget-item">
                            {loadBudgetItem(randomIndex + 1)}
                        </div>
                        <div className="summary-stats__budget-item">
                            {loadBudgetItem(randomIndex + 2)}
                        </div>
                    </FlexGridCol>
                    <FlexGridCol width={12} className="summary-stats__spending-link">
                        <FlexGridRow>
                            <Link to="/explorer/budget_function">
                                <div className="summary-stats__spending-link-text">
                                    See more breakdowns of federal spending
                                </div>
                                <div
                                    className="icon-stack"
                                    style={{
                                        position: "relative",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                    <FontAwesomeIcon
                                        color="white"
                                        icon="circle"
                                        style={{
                                            position: "absolute",
                                            width: "24",
                                            height: "24"
                                        }} />
                                    <FontAwesomeIcon
                                        className="arrow-circle-right"
                                        icon="arrow-circle-right"
                                        style={{ position: "absolute" }} />
                                </div>
                            </Link>
                        </FlexGridRow>
                    </FlexGridCol>
                </FlexGridRow>
            </div>
        </section>);
};

export default SummaryStats;
