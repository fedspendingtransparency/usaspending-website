/**
 * SelectedNAICS.jsx
 * Created by Emily Gullo 07/14/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as OtherFiltersFormatter from 'helpers/otherFiltersFormatter';
import ShownNAICS from './ShownNAICS';

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
            const value = (<ShownNAICS
                naics={naics}
                label={OtherFiltersFormatter.formatNAICS(naics, description)}
                key={naics}
                removeNAICS={this.props.removeNAICS.bind(null, entry[1])} />);
            shownNAICS.push(value);
        });

        return (
            <div className="selected-filters">
                {shownNAICS}
            </div>
        );
    }
}
SelectedNAICS.propTypes = propTypes;
