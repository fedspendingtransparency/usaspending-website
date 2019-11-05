/**
  * ResultsTableTabs.jsx
  * Created by Kevin Li 11/29/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

import ResultsTableTabItem from './ResultsTableTabItem';

const propTypes = {
    types: PropTypes.array,
    counts: PropTypes.object,
    active: PropTypes.string,
    switchTab: PropTypes.func,
    disabled: PropTypes.bool,
    hideCounts: PropTypes.bool,
    tabsClassName: PropTypes.string
};

export default class ResultsTableTabs extends React.Component {
    render() {
        const tabs = this.props.types.map((type) => {
            const count = this.props.hideCounts ? null : this.props.counts[type.internal];
            return (
                <ResultsTableTabItem
                    {...type}
                    count={count}
                    active={this.props.active === type.internal}
                    switchTab={this.props.switchTab}
                    key={`table-type-item-${type.internal}`}
                    enabled={!this.props.disabled}
                    hideCounts={this.props.hideCounts}
                    className={this.props.tabsClassName} />
            );
        });

        return (
            <div
                className="table-types"
                role="menu">
                {tabs}
            </div>
        );
    }
}

ResultsTableTabs.propTypes = propTypes;
