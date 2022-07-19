/**
 * SummaryStats.jsx
 * Created by Andrea Blackwell 07/18/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from "data-transparency-ui";

const SummaryStats = () => (
    <section className="summary-stats" style={{ height: "98px", "background-color": "#00687D" }}>
        <FlexGridRow className="grid-content-max">
            <FlexGridCol desktop="4" style={{ color: "white", margin: "24px 0" }}>
                <span>So far this year, the federal government</span><br />
                <span>plans to spend $4.30 Trillion including…</span>
            </FlexGridCol>
            <FlexGridCol desktop="6" style={{ color: "white", display: "flex" }}>
                <div style={{ margin: "24px 104px 24px 56px" }}>
                    <span>$710.11 Billion</span><br />
                    <span>on Medicare</span>
                </div>
                <div style={{ margin: "24px 104px 24px 0" }}>
                    <span>$617.04 Billion</span><br />
                    <span>on National Defense</span>
                </div>
                <div style={{ margin: "24px 56px 24px 0" }}>
                    <span>$6.89 Billion</span><br />
                    <span>on Energy</span>
                </div>
            </FlexGridCol>
            <FlexGridCol desktop="2" style={{ color: "white", margin: "24px 0" }}>
                <span>See more breakdowns</span><br />
                <span>of federal spending</span>
            </FlexGridCol>
        </FlexGridRow>
    </section>);

export default SummaryStats;