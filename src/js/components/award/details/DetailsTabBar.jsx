/**
 * DetailsTabBar.jsx
 * Created by Elizabeth Dabbs 2/22/17
 **/

import React from 'react';

import DetailsTabItem from './DetailsTabItem';

const propTypes = {
    activeTab: React.PropTypes.string,
    clickTab: React.PropTypes.func,
    tabOptions: React.PropTypes.array
};

export default class DetailsTabBar extends React.Component {
    render() {
        const tabs = this.props.tabOptions.map((tab) => (
            <DetailsTabItem
                {...tab}
                active={tab.internal === this.props.activeTab}
                clickTab={this.props.clickTab}
                key={tab.internal} />));

        return (
            <div className="table-types">
                {tabs}
            </div>
        );
    }
}

DetailsTabBar.propTypes = propTypes;
