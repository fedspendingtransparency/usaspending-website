/**
 * ResultsTableTabs.jsx
 * Created by Lizzie Salita 1/11/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

import ResultsTableTabItem from './ResultsTableTabItem';

const propTypes = {
    types: PropTypes.array,
    active: PropTypes.string,
    switchTab: PropTypes.func,
    disabled: PropTypes.bool
};

export default class ResultsTableTabs extends React.Component {
    render() {
        const tabs = this.props.types.map((type) => (
            <ResultsTableTabItem
                {...type}
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
