/**
 * NAICSSearch.jsx
 * Created by Emily Gullo 07/14/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import NAICSListContainer from 'containers/search/filters/naics/NAICSListContainer';
import SelectedNAICS from './SelectedNAICS';

const propTypes = {
    selectNAICS: PropTypes.func,
    removeNAICS: PropTypes.func,
    selectedNAICS: PropTypes.object
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
                    <NAICSListContainer {...this.props} selectNAICS={this.props.selectNAICS} />
                    {selectedNAICS}
                </div>
            </div>
        );
    }
}

NAICSSearch.propTypes = propTypes;
