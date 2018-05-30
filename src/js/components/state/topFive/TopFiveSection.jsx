/**
 * TopFiveSection.jsx
 * Created by Kevin Li 5/15/18
 */

import React from 'react';

import { categories as topCategories } from 'dataMapping/state/topCategories';
import ResultsTableTabs from 'components/search/table/ResultsTableTabs';
import TopFiveContainer from 'containers/state/topFive/TopFiveContainer';

const tabTypes = [
    {
        enabled: true,
        internal: 'all',
        label: 'All Awards'
    },
    {
        enabled: true,
        internal: 'contracts',
        label: 'Contracts'
    },
    {
        enabled: true,
        internal: 'grants',
        label: 'Grants'
    },
    {
        enabled: true,
        internal: 'direct_payments',
        label: 'Direct Payments'
    },
    {
        enabled: true,
        internal: 'loans',
        label: 'Loans'
    },
    {
        enabled: true,
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
                <h3
                    className="state-section__title">
                    Top 5
                </h3>
                <hr className="results-divider" />
                <div className="state-section__description">
                    The set of tables below provide a summary of federal spending in this state through multiple angles. The initial view includes all awards types, but you can also view individual award type amounts. To see more than the top 5, you can launch directly to our Advanced Search page.
                </div>
                <div className="topfive__tabs">
                    <ResultsTableTabs
                        types={tabTypes}
                        active={this.state.active}
                        switchTab={this.switchTab}
                        hideCounts />
                </div>
                <div className="topfive__content">
                    {content}
                </div>
            </div>
        );
    }
}
