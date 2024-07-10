/**
 * TopFiveSection.jsx
 * Created by Kevin Li 5/15/18
 */

import React from 'react';
import { Tabs, SectionHeader } from 'data-transparency-ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { categories as topCategories } from 'dataMapping/state/topCategories';
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

export default class TopFiveSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 'all'
        };

        this.switchTab = this.switchTab.bind(this);
    }

    switchTab(tab) {
        this.setState({
            active: tab
        });
    }

    render() {
        const content = topCategories[this.state.active].map((category) => (
            <TopFiveContainer
                key={category}
                category={category}
                type={this.state.active} />
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
                    active={this.state.active}
                    switchTab={this.switchTab} />
                <div className="topfive__content">
                    {content}
                </div>
            </div>
        );
    }
}
