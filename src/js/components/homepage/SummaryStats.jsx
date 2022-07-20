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


const SummaryStats = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isWide, setIsWide] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const request = useRef(null);
    const [budgetData, setBudgetData] = useState([]);
    const [budgetTotal, setBudgetTotal] = useState([]);
    const budgetCategories = ["Medicare", "National Defense", "Education, Training, Employment, and Social Services", "Social Security", "Transportation", "Agriculture", "Veterans Benefits and Services", "Energy", "Net Interest"];

    const handleWindowResize = () => {
        const wWidth = window.innerWidth;
        if (windowWidth !== wWidth) {
            setWindowWidth(wWidth);
            setIsWide(wWidth >= 992);
        }
    };

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

        //TODO fix the filter here
        const params = {
            type: "budget_function",
            filters: {
                fy: 2022,
                quarter: 1
            }
        };

        request.current = fetchBreakdown(params);
        request.current.promise
            .then((res) => {
                const budgetDataArr = [];
                setBudgetTotal(res?.data?.total);
                res?.data?.results?.forEach((item) => {
                    if (budgetCategories.indexOf(item.name) > -1) {
                        budgetDataArr.push({
                            name: item.name,
                            amount: item.amount
                        });
                    }
                });
                setBudgetData(budgetDataArr);
                setLoading(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    };

    useEffect(() => {
        fetchBudgetFunctions();
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <section className="summary-stats">
            {isWide ?
                <>
                    <FlexGridRow className="grid-content">
                        <FlexGridCol width={4} className="summary-stats__budget-total-container">
                            <span>So far this year, the federal government</span><br />
                            <span>plans to spend {loading ? <span className="dot-pulse" /> : <span className="summary-stats__budget-total">{formatMoneyWithUnits(budgetTotal)}</span>} including…</span>
                        </FlexGridCol>
                        <FlexGridCol className="summary-stats__budget-items">
                            <div className="summary-stats__budget-item">
                                {loading ? <span className="dot-pulse" /> :
                                    <>
                                        <span className="budget-item__amount">{formatMoneyWithUnits(budgetData[0]?.amount)}</span><br />
                                        <span className="budget-item__name">on <strong>{budgetData[0]?.name}</strong></span>
                                    </>
                                }
                            </div>
                            <div className="summary-stats__budget-item">
                                {loading ? <span className="dot-pulse" /> :
                                    <>
                                        <span className="budget-item__amount">{formatMoneyWithUnits(budgetData[1]?.amount)}</span><br />
                                        <span className="budget-item__name">on <strong>{budgetData[1]?.name}</strong></span>
                                    </>
                                }
                            </div>
                            <div className="summary-stats__budget-item">
                                {loading ? <span className="dot-pulse" /> :
                                    <>
                                        <span className="budget-item__amount">{formatMoneyWithUnits(budgetData[2]?.amount)}</span><br />
                                        <span className="budget-item__name">on <strong>{budgetData[2]?.name}</strong></span>
                                    </>
                                }
                            </div>
                        </FlexGridCol>
                        <FlexGridCol width={2} className="summary-stats__spending-link">
                            <FlexGridRow>
                                <Link to="/explorer/budget_function">
                                    <div className="summary-stats__spending-link-text">
                                        <span>See more breakdowns</span><br />
                                        <span>of federal spending</span>
                                    </div>
                                    <FontAwesomeIcon size="lg" className="arrow-circle-right" icon="arrow-circle-right" />
                                </Link>
                            </FlexGridRow>
                        </FlexGridCol>
                    </FlexGridRow>
                </>
                :
                <>
                    {/*<FlexGridRow className="grid-content">*/}
                    {/*    <FlexGridCol*/}
                    {/*        width={12}*/}
                    {/*        style={{*/}
                    {/*            color: "white", margin: "32x 0 24px", "min-width": "344px", padding: "0"*/}
                    {/*        }}>*/}
                    {/*        <span>So far this year, the federal government</span><br />*/}
                    {/*        <span>plans to spend $4.30 Trillion including…</span>*/}
                    {/*    </FlexGridCol>*/}
                    {/*    <FlexGridCol*/}
                    {/*        width={12}*/}
                    {/*        style={{*/}
                    {/*            color: "white", display: "flex", "min-width": "470px", padding: "0", "margin-bottom": "24px", flexDirection: windowWidth <= 576 ? 'column' : 'row'*/}
                    {/*        }}>*/}
                    {/*        <div style={{ margin: "24px 7% 24px 3.5%" }}>*/}
                    {/*            <span>$710.11 Billion</span><br />*/}
                    {/*            <span>on Medicare</span>*/}
                    {/*        </div>*/}
                    {/*        <div style={{ margin: "24px 7% 24px 0" }}>*/}
                    {/*            <span>$617.04 Billion</span><br />*/}
                    {/*            <span>on National Defense</span>*/}
                    {/*        </div>*/}
                    {/*        <div style={{ margin: "24px 7% 24px 0" }}>*/}
                    {/*            <span>$6.89 Billion</span><br />*/}
                    {/*            <span>on Energy</span>*/}
                    {/*        </div>*/}
                    {/*    </FlexGridCol>*/}
                    {/*    <FlexGridCol width={12} style={{ color: "white", margin: "0 0 32px", "min-width": "344px" }}>*/}
                    {/*        <FlexGridRow style={{ "justify-content": "center" }}>*/}
                    {/*            <div style={{ "margin-right": "8px" }}>*/}
                    {/*                <span>See more breakdowns</span><br />*/}
                    {/*                <span>of federal spending</span>*/}
                    {/*            </div>*/}
                    {/*            <div style={{ margin: "auto 0" }}>*/}
                    {/*                <a href="/explorer/budget_function"><FontAwesomeIcon size="lg" fontSize="24" icon="arrow-alt-circle-right" /></a>*/}
                    {/*            </div>*/}
                    {/*        </FlexGridRow>*/}
                    {/*    </FlexGridCol>*/}
                    {/*</FlexGridRow>*/}
                </>}
        </section>);
};

export default SummaryStats;
