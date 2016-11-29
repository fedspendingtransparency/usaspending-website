/**
  * ResultsTableTabs.jsx
  * Created by Kevin Li 11/29/16
  **/

import React from 'react';

import ResultsTableTabItem from './ResultsTableTabItem';

const propTypes = {
    types: React.PropTypes.array
};

export default class ResultsTableTabs extends React.Component {
    render() {
        const tabs = this.props.types.map((type) => (
            <ResultsTableTabItem label={type.label} key={`table-type-item-${type.internal}`} />
        ));

        return (
            <div className="table-types">
                {tabs}
            </div>
        );
    }
}

ResultsTableTabs.propTypes = propTypes;
