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
    disabled: PropTypes.bool
};

export default class ResultsTableTabs extends React.Component {
    render() {
        const tabs = this.props.types.map((type) => (
            <ResultsTableTabItem
                {...type}
                count={this.props.counts[type.internal]}
                active={this.props.active === type.internal}
                switchTab={this.props.switchTab}
                key={`table-type-item-${type.internal}`}
                enabled={!this.props.disabled} />
        ));

        return (
            <div className="table-types">
                {tabs}
            </div>
        );
    }
}

ResultsTableTabs.propTypes = propTypes;
