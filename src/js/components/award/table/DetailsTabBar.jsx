/**
 * DetailsTabBar.jsx
 * Created by Elizabeth Dabbs 2/22/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import Analytics from 'helpers/analytics/Analytics';

import DetailsTabItem from './DetailsTabItem';

const propTypes = {
    activeTab: PropTypes.string,
    clickTab: PropTypes.func,
    tabOptions: PropTypes.array,
    awardId: PropTypes.string
};

export default class DetailsTabBar extends React.Component {
    render() {
        const tabs = this.props.tabOptions.map((tab) => {
            const onClick = tab.internal === 'subaward'
                ? () => {
                    Analytics.event({
                        event: 'award_history_table_tab',
                        category: 'Award Page',
                        action: 'Subaward Table',
                        label: `${this.props.awardId}`
                    });
                    this.props.clickTab('subaward');
                }
                : this.props.clickTab;
            return (
                <DetailsTabItem
                    {...tab}
                    active={tab.internal === this.props.activeTab}
                    clickTab={onClick}
                    key={tab.internal} />
            );
        });

        return (
            <div className="table-types">
                {tabs}
            </div>
        );
    }
}

DetailsTabBar.propTypes = propTypes;
