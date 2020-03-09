/**
 * SelectedNAICS.jsx
 * Created by Emily Gullo 07/14/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as OtherFiltersFormatter from 'helpers/otherFiltersFormatter';
import ShownValue from 'components/search/filters/otherFilters/ShownValue';

const propTypes = {
    selectedNAICS: PropTypes.object,
    removeNAICS: PropTypes.func
};

export default class SelectedNAICS extends React.Component {
    render() {
        const shownNAICS = [];
        this.props.selectedNAICS.entrySeq().forEach((entry) => {
            const naics = entry[1].naics;
            const description = entry[1].naics_description;
            const value = (<ShownValue
                label={OtherFiltersFormatter.formatValue(naics, description)}
                key={naics}
                removeValue={this.props.removeNAICS.bind(null, entry[1])} />);
            shownNAICS.push(value);
        });
        return (
            <div
                className="selected-filters"
                role="status">
                {shownNAICS}
            </div>
        );
    }
}
SelectedNAICS.propTypes = propTypes;
