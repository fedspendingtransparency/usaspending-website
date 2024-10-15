/**
 * TopFiveSection.jsx
 * Created by Kevin Li 5/15/18
 */

import React, { useState } from 'react';
import { Tabs, SectionHeader } from 'data-transparency-ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { categories as topCategories } from 'dataMapping/topCategories';
import TopFiveContainer from 'containers/state/topFive/TopFiveContainer';

const tabTypes = [
    {
        internal: 'all',
        label: 'All Awards'
    },
    {
        internal: 'contracts',
        label: 'Contracts'
    },
    {
        internal: 'grants',
        label: 'Grants'
    },
    {
        internal: 'direct_payments',
        label: 'Direct Payments'
    },
    {
        internal: 'loans',
        label: 'Loans'
    },
    {
        internal: 'other',
        label: 'Other Financial Assistance'
    }
];

const TopFiveSection = () => {
    const [active, setActive] = useState('all');
    const switchTab = (tab) => {
        setActive(tab);
    };

    const content = topCategories[active].map((category) => (
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
                The set of tables below provide a summary of federal spending in this state through multiple angles. The initial view includes all awards types, but you can also view individual award type amounts. To see more than the top 5, you can launch directly to our Advanced Search page.
            </div>
            <Tabs
                types={tabTypes}
                active={active}
                switchTab={switchTab} />
            <div className="topfive__content">
                {content}
            </div>
        </div>
    );
};

export default TopFiveSection;
