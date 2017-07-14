/**
 * NAICSSearch.jsx
 * Created by Emily Gullo 07/14/2017
 **/

import React from 'react';

import NAICSListContainer from 'containers/search/filters/naics/NAICSListContainer';
import SelectedNAICS from './SelectedNAICS';

const propTypes = {
    selectNAICS: React.PropTypes.func,
    removeNAICS: React.PropTypes.func,
    selectedNAICS: React.PropTypes.object
};

export default class NAICSSearch extends React.Component {
    render() {
        let selectedNAICS = null;
        if (this.props.selectedNAICS.size > 0) {
            selectedNAICS = (<SelectedNAICS
                selectedNAICS={this.props.selectedNAICS}
                removeNAICS={this.props.removeNAICS} />);
        }

        return (
            <div className="naics-filter">
                <div className="filter-item-wrap">
                    <p>NAICS</p>
                    <NAICSListContainer {...this.props} selectNAICS={this.props.selectNAICS} />
                    {selectedNAICS}
                </div>
            </div>
        );
    }
}

NAICSSearch.propTypes = propTypes;
