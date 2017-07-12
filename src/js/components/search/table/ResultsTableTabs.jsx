/**
  * ResultsTableTabs.jsx
  * Created by Kevin Li 11/29/16
  **/

import React from 'react';

import ResultsTableTabItem from './ResultsTableTabItem';

const propTypes = {
    types: React.PropTypes.array,
    counts: React.PropTypes.object,
    active: React.PropTypes.string,
    switchTab: React.PropTypes.func
};

export default class ResultsTableTabs extends React.Component {
    render() {
        const tabs = this.props.types.map((type) => (
            <ResultsTableTabItem
                {...type}
                count={this.props.counts[type.internal]}
                active={this.props.active === type.internal}
                switchTab={this.props.switchTab}
                key={`table-type-item-${type.internal}`} />
        ));

        return (
            <div className="table-types">
                {tabs}
            </div>
        );
    }
}

ResultsTableTabs.propTypes = propTypes;
