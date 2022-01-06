/**
 * RecipientLandingTabs.jsx
 * Created by David Trinh 8/3/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'data-transparency-ui';

const propTypes = {
    setTab: PropTypes.func
};

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
            <Tabs
                types={tabTypes}
                active={this.state.active}
                switchTab={this.switchTab} />
        );
    }
}

RecipientLandingTabs.propTypes = propTypes;
