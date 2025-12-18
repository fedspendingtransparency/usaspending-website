/**
 * TopFiveSection.jsx
 * Created by Kevin Li 5/15/18
 */

import React, { useState } from 'react';
import { Tabs, SectionHeader } from 'data-transparency-ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

import { categories } from 'dataMapping/topCategories';
import TopFiveContainer from 'containers/state/topFive/TopFiveContainer';
import { tabTypes } from "../stateHelper";

const TopFiveSection = () => {
    const [active, setActive] = useState('all');

    const content = categories[active].map((category) => (
        <TopFiveContainer
            key={category}
            category={category}
            type={active} />
    ));

    return (
        <div
            className="state-section topfive"
            id="state-top-five">
            <SectionHeader
                icon={<FontAwesomeIcon icon="table" size="2x" />}
                title="Top 5"
                titleTooltip={{ component: false }}
                descTooltip={{ component: false }} />
            <hr className="results-divider" />
            <div className="state-section__description">
                The tables below provide a summary of federal spending in this state through multiple angles.
                The initial view includes all award types, but you can also view individual award type amounts.
                To see more than the top 5, visit our <Link to="/search">Advanced Search</Link> page.
            </div>
            <Tabs
                types={tabTypes}
                active={active}
                switchTab={setActive} />
            <div className="topfive__content">
                {content}
            </div>
        </div>
    );
};

export default TopFiveSection;
