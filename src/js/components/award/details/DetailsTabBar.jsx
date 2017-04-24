/**
 * DetailsTabBar.jsx
 * Created by Elizabeth Dabbs 2/22/17
 **/

import React from 'react';

import DetailsTabItem from './DetailsTabItem';

const propTypes = {
    tabs: React.PropTypes.array,
    activeTab: React.PropTypes.string,
    clickTab: React.PropTypes.func
};

const defaultProps = {
    tabs: [
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
        },
        {
            label: 'Additional Details',
            code: 'additional',
            disabled: false
        }
    ]
};

export default class DetailsTabBar extends React.Component {
    render() {
        const tabs = this.props.tabs.map((tab) => (
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
DetailsTabBar.defaultProps = defaultProps;
