/**
 * RecipientLandingTabs.jsx
 * Created by David Trinh 8/3/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import ResultsTableTabs from 'components/search/table/ResultsTableTabs';
import ResultsTablePicker from 'components/search/table/ResultsTablePicker';

const propTypes = {
    setTab: PropTypes.func
};

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
        internal: 'other_financial_assistance',
        label: 'Other Financial Assistance'
    }
];

export default class RecipientLandingTabs extends React.Component {
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
        }, () => {
            this.props.setTab(tab);
        });
    }

    render() {
        return (
            <div className="recipient-landing__tabs">
                <ResultsTableTabs
                    types={tabTypes}
                    active={this.state.active}
                    switchTab={this.switchTab}
                    hideCounts />
                <ResultsTablePicker
                    types={tabTypes}
                    active={this.state.active}
                    switchTab={this.switchTab} />
            </div>
        );
    }
}

RecipientLandingTabs.propTypes = propTypes;
