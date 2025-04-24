/**
 * SummaryStats.jsx
 * Created by Andrea Blackwell 07/18/22
 */

import React, { useEffect, useRef, useState } from 'react';
import { FlexGridRow, FlexGridCol } from "data-transparency-ui";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchBreakdown } from 'helpers/explorerHelper';
import { formatMoneyWithUnits } from "helpers/moneyFormatter";
import { useLatestAccountData } from 'containers/account/WithLatestFy';
import Analytics from 'helpers/analytics/Analytics';

const SummaryStats = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const request = useRef(null);
    const [budgetData, setBudgetData] = useState([]);
    const [budgetTotal, setBudgetTotal] = useState([]);
    const [randomIndex, setRandomIndex] = useState(0);
    const budgetCategories = [{ name: "Medicare" }, { name: "National Defense" }, { name: "Social Security" }, { name: "Transportation" }, { name: "Agriculture" }, { name: "Veterans Benefits and Services", label: "Veterans Benefits" }, { name: "Energy" }, { name: "Net Interest" }];
    const [, , { year: latestFy, period: latestPeriod }] = useLatestAccountData();

    const trackExplorerLink = () => Analytics.event({
        event: 'homepage-summary-stats',
        category: 'Homepage',
        action: 'Link',
        label: 'explorer'
    });

    const selectRandomIndex = () => Math.floor(Math.random() * 10);

    const fetchBudgetFunctions = () => {
        if (request.current) {
            request.current.cancel();
        }
        if (error) {
            setError(false);
        }
        if (!loading) {
            setLoading(true);
        }

        const params = {
            type: "budget_function",
            filters: {
                fy: latestFy,
                period: latestPeriod
            }
        };

        request.current = fetchBreakdown(params);
        request.current.promise
            .then((res) => {
                const budgetDataArr = [];
                setBudgetTotal(res?.data?.total);
                res?.data?.results?.forEach((item) => {
                    const budgetCategoriesIndex = budgetCategories.map((e) => e.name).indexOf(item.name);
                    if (budgetCategoriesIndex > -1) {
                        const name = 'label' in budgetCategories[budgetCategoriesIndex] ? budgetCategories[budgetCategoriesIndex].label : budgetCategories[budgetCategoriesIndex].name;
                        budgetDataArr.push({
                            name,
                            amount: item.amount
                        });
                    }
                });
                setRandomIndex(selectRandomIndex());
                setBudgetData(budgetDataArr);
                setLoading(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    };

    useEffect(() => {
        if (latestFy && latestPeriod) {
            fetchBudgetFunctions();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [latestFy, latestPeriod]);

    return (
        <section className="summary-stats">
            <div className="summary-stats-desktop">
                <FlexGridRow className="grid-content">
                    <FlexGridCol width={4} className="summary-stats__budget-total-container">
                        <span>So far this year, the federal government</span><br />
                        <span>plans to spend {loading ? <span className="dot-pulse" /> : <span className="summary-stats__budget-total">{formatMoneyWithUnits(budgetTotal)}</span>} including…</span>
                    </FlexGridCol>
                    <FlexGridCol className="summary-stats__budget-items">
                        <div className="summary-stats__budget-item">
                            {loading ? <span className="dot-pulse" /> :
                                <>
                                    <span className="budget-item__amount">{formatMoneyWithUnits(budgetData[randomIndex % budgetData?.length]?.amount)}</span><br />
                                    <span className="budget-item__name">{!error ? 'on ' : ''}<strong>{budgetData[randomIndex % budgetData?.length]?.name}</strong></span>
                                </>
                            }
                        </div>
                        <div className="summary-stats__budget-item">
                            {loading ? <span className="dot-pulse" /> :
                                <>
                                    <span className="budget-item__amount">{formatMoneyWithUnits(budgetData[(randomIndex + 1) % budgetData?.length]?.amount)}</span><br />
                                    <span className="budget-item__name">{!error ? 'on ' : ''}<strong>{budgetData[(randomIndex + 1) % budgetData?.length]?.name}</strong></span>
                                </>
                            }
                        </div>
                        <div className="summary-stats__budget-item">
                            {loading ? <span className="dot-pulse" /> :
                                <>
                                    <span className="budget-item__amount">{formatMoneyWithUnits(budgetData[(randomIndex + 2) % budgetData?.length]?.amount)}</span><br />
                                    <span className="budget-item__name">{!error ? 'on ' : ''}<strong>{budgetData[(randomIndex + 2) % budgetData?.length]?.name}</strong></span>
                                </>
                            }
                        </div>
                    </FlexGridCol>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
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
                                        position: "relative", justifyContent: "center", alignItems: "center", marginTop: "8px"
                                    }}>
                                    <FontAwesomeIcon color="white" icon="circle" style={{ position: "absolute", width: "24", height: "24" }} />
                                    <FontAwesomeIcon className="arrow-circle-right" icon="arrow-circle-right" style={{ position: "absolute" }} />
                                </div>
                            </Link>
                        </FlexGridRow>
                    </FlexGridCol>
                </FlexGridRow>
            </div>
            <div className="summary-stats-mobile">
                <FlexGridRow className="grid-content">
                    <FlexGridCol width={12} className="summary-stats__budget-total-container">
                        <span>So far this year, <span style={{ whiteSpace: "nowrap" }}>the federal government</span></span><br />
                        <span>plans to spend {loading ? <span className="dot-pulse" /> : <span className="summary-stats__budget-total">{formatMoneyWithUnits(budgetTotal)}</span>} including…</span>
                    </FlexGridCol>
                    <FlexGridCol
                        width={12}
                        className="summary-stats__budget-items">
                        <div className="summary-stats__budget-item">
                            {loading ? <span className="dot-pulse" /> :
                                <>
                                    <span className="budget-item__amount">{formatMoneyWithUnits(budgetData[randomIndex % budgetData?.length]?.amount)}</span><br />
                                    <span className="budget-item__name">{!error ? 'on ' : ''}<strong>{budgetData[randomIndex % budgetData?.length]?.name}</strong></span>
                                </>
                            }
                        </div>
                        <div className="summary-stats__budget-item">
                            {loading ? <span className="dot-pulse" /> :
                                <>
                                    <span className="budget-item__amount">{formatMoneyWithUnits(budgetData[(randomIndex + 1) % budgetData?.length]?.amount)}</span><br />
                                    <span className="budget-item__name">{!error ? 'on ' : ''}<strong>{budgetData[(randomIndex + 1) % budgetData?.length]?.name}</strong></span>
                                </>
                            }
                        </div>
                        <div className="summary-stats__budget-item">
                            {loading ? <span className="dot-pulse" /> :
                                <>
                                    <span className="budget-item__amount">{formatMoneyWithUnits(budgetData[(randomIndex + 2) % budgetData?.length]?.amount)}</span><br />
                                    <span className="budget-item__name">{!error ? 'on ' : ''}<strong>{budgetData[(randomIndex + 2) % budgetData?.length]?.name}</strong></span>
                                </>
                            }
                        </div>
                    </FlexGridCol>
                    <FlexGridCol width={12} className="summary-stats__spending-link">
                        <FlexGridRow>
                            <Link to="/explorer/budget_function">
                                <div className="summary-stats__spending-link-text">
                                    See more breakdowns of federal spending
                                </div>
                                <div className="icon-stack" style={{ position: "relative", justifyContent: "center", alignItems: "center" }}>
                                    <FontAwesomeIcon color="white" icon="circle" style={{ position: "absolute", width: "24", height: "24" }} />
                                    <FontAwesomeIcon className="arrow-circle-right" icon="arrow-circle-right" style={{ position: "absolute" }} />
                                </div>
                            </Link>
                        </FlexGridRow>
                    </FlexGridCol>
                </FlexGridRow>
            </div>
        </section>);
};

export default SummaryStats;
