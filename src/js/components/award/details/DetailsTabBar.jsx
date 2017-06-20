/**
 * DetailsTabBar.jsx
 * Created by Elizabeth Dabbs 2/22/17
 **/

import React from 'react';

import DetailsTabItem from './DetailsTabItem';

const propTypes = {
    activeTab: React.PropTypes.string,
    clickTab: React.PropTypes.func,
    type: React.PropTypes.string,
    tabOptions: React.PropTypes.array
};

export default class DetailsTabBar extends React.Component {
    render() {
        const tabsSet = this.props.tabOptions.slice();
        if (this.props.type === 'contract') {
            tabsSet.push({
                label: 'Additional Details',
                internal: 'additional',
                enabled: true
            });
        }
        const tabs = tabsSet.map((tab) => (
            <DetailsTabItem
                {...tab}
                active={tab.code === this.props.activeTab}
                clickTab={this.props.clickTab}
                key={tab.internal} />));

        return (
            <div className="table-tabs">
                {tabs}
            </div>
        );
    }
}

DetailsTabBar.propTypes = propTypes;
