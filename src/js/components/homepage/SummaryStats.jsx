/**
 * SummaryStats.jsx
 * Created by Andrea Blackwell 07/18/22
 */

import React, { useEffect, useState } from 'react';
import { FlexGridRow, FlexGridCol } from "data-transparency-ui";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchBreakdown } from 'helpers/explorerHelper';

const SummaryStats = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isWide, setIsWide] = useState(0);

    const handleWindowResize = () => {
        const wWidth = window.innerWidth;
        if (windowWidth !== wWidth) {
            setWindowWidth(wWidth);
            setIsWide(wWidth >= 992);
        }
    };

    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [handleWindowResize]);

    const budgetFunctionCategories = ["Medicare", "National Defense", "Education", "Social Security", "Transportation", "Agriculture", "Veterans Benefits & Services", "Energy", "Net Interest"];

    return (
        <section className="summary-stats">
            {isWide ?
                <>
                    <FlexGridRow className="grid-content">
                        <FlexGridCol width={4} style={{ color: "white", margin: "24px 0", "min-width": "344px" }}>
                            <span>So far this year, the federal government</span><br />
                            <span>plans to spend $4.30 Trillion including…</span>
                        </FlexGridCol>
                        <FlexGridCol width={6} style={{ color: "white", display: "flex" }}>
                            <div style={{ margin: "24px 7% 24px 3.5%" }}>
                                <span>$710.11 Billion</span><br />
                                <span>on Medicare</span>
                            </div>
                            <div style={{ margin: "24px 7% 24px 0" }}>
                                <span>$617.04 Billion</span><br />
                                <span>on National Defense</span>
                            </div>
                            <div style={{ margin: "24px 7% 24px 0" }}>
                                <span>$6.89 Billion</span><br />
                                <span>on Energy</span>
                            </div>
                        </FlexGridCol>
                        <FlexGridCol width={2} style={{ color: "white", margin: "24px 0" }}>
                            <FlexGridRow>
                                <div style={{ "margin-right": "8px" }}>
                                    <span>See more breakdowns</span><br />
                                    <span>of federal spending</span>
                                </div>
                                <div style={{ margin: "auto 0" }}>
                                    <FontAwesomeIcon size="lg" fontSize="24" icon="arrow-alt-circle-right" />
                                </div>
                            </FlexGridRow>
                        </FlexGridCol>
                    </FlexGridRow>
                </>
                :
                <>
                    <FlexGridRow className="grid-content">
                        <FlexGridCol width={12} style={{ color: "white", margin: "32x 0 24px", "min-width": "344px", padding: "0" }}>
                            <span>So far this year, the federal government</span><br />
                            <span>plans to spend $4.30 Trillion including…</span>
                        </FlexGridCol>
                        <FlexGridCol width={12} style={{ color: "white", display: "flex", "min-width": "470px", padding: "0", "margin-bottom": "24px", flexDirection: windowWidth <= 576 ? 'column' : 'row' }}>
                            <div style={{ margin: "24px 7% 24px 3.5%" }}>
                                <span>$710.11 Billion</span><br />
                                <span>on Medicare</span>
                            </div>
                            <div style={{ margin: "24px 7% 24px 0" }}>
                                <span>$617.04 Billion</span><br />
                                <span>on National Defense</span>
                            </div>
                            <div style={{ margin: "24px 7% 24px 0" }}>
                                <span>$6.89 Billion</span><br />
                                <span>on Energy</span>
                            </div>
                        </FlexGridCol>
                        <FlexGridCol width={12} style={{ color: "white", margin: "0 0 32px", "min-width": "344px" }}>
                            <FlexGridRow style={{ "justify-content": "center" }}>
                                <div style={{ "margin-right": "8px" }}>
                                    <span>See more breakdowns</span><br />
                                    <span>of federal spending</span>
                                </div>
                                <div style={{ margin: "auto 0" }}>
                                    <a href="/explorer/budget_function"><FontAwesomeIcon size="lg" fontSize="24" icon="arrow-alt-circle-right" /></a>
                                </div>
                            </FlexGridRow>
                        </FlexGridCol>
                    </FlexGridRow>
                </>}
        </section>);
};

export default SummaryStats;
