/**
 * DetailsTabBar.jsx
 * Created by Elizabeth Dabbs 2/22/17
 **/

import React from 'react';

import DetailsTabItem from './DetailsTabItem';

const propTypes = {
    activeTab: React.PropTypes.string,
    clickTab: React.PropTypes.func,
    type: React.PropTypes.string
};

const tabOptions = [
    {
        label: 'Transaction History',
        code: 'transaction',
        disabled: false
    },
    {
        label: 'Sub-Awards',
        code: 'subaward',
        disabled: false
    },
    {
        label: 'Financial System Details',
        code: 'financial',
        disabled: false
    }
];

export default class DetailsTabBar extends React.Component {
    render() {
        const tabsSet = tabOptions.slice();
        if (this.props.type === 'contract') {
            tabsSet.push({
                label: 'Additional Details',
                code: 'additional',
                disabled: false
            });
        }
        const tabs = tabsSet.map((tab) => (
            <DetailsTabItem
                {...tab}
                active={tab.code === this.props.activeTab}
                clickTab={this.props.clickTab}
                key={tab.code} />));

        return (
            <div className="table-tabs">
                {tabs}
            </div>
        );
    }
}

DetailsTabBar.propTypes = propTypes;
