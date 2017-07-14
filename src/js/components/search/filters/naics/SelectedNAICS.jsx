/**
 * SelectedNAICS.jsx
 * Created by Emily Gullo 07/14/2017
 **/

import React from 'react';

import * as OtherFiltersFormatter from 'helpers/otherFiltersFormatter';
import ShownNAICS from './ShownNAICS';

const propTypes = {
    selectedNAICS: React.PropTypes.object,
    removeNAICS: React.PropTypes.func
};

export default class SelectedNAICS extends React.Component {
    render() {
        const shownNAICS = [];
        this.props.selectedNAICS.entrySeq().forEach((entry) => {
            const key = entry[0];
            const naics = entry[1];
            const value = (<ShownNAICS
                naics={naics}
                label={OtherFiltersFormatter.formatNAICS(key, naics)}
                key={key}
                removeNAICS={this.props.removeNAICS.bind(null, naics)} />);
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
