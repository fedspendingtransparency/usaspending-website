/**
  * NAICSSearchContainer.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import NAICSSearch from 'components/search/filters/naics/NAICSSearch';

const propTypes = {
    updateSelectedNAICS: React.PropTypes.func
};

const ga = require('react-ga');

export class NAICSSearchContainer extends React.Component {

    static logPlaceFilterEvent(naics) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: `Applied NAICS Filter`,
            label: naics.toLowerCase()
        });
    }

    constructor(props) {
        super(props);

        // Bind functions
        this.selectNAICS = this.selectNAICS.bind(this);
        this.removeNAICS = this.removeNAICS.bind(this);
    }

    selectNAICS(naics, isValid) {
        // If naics exists and is valid
        if (naics !== null && isValid) {
            const updateParams = {};
            updateParams.naics = naics;
            this.props.updateSelectedNAICS(updateParams);

            // Analytics
            NAICSSearchContainer.logPlaceFilterEvent(naics.naics_description);
        }
    }

    removeNAICS(naics) {
        const updateParams = {};
        updateParams.naics = naics;
        this.props.updateSelectedNAICS(updateParams);
    }

    render() {
        return (
            <NAICSSearch
                {...this.props}
                selectNAICS={this.selectNAICS}
                removeNAICS={this.removeNAICS} />
        );
    }
}

NAICSSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedNAICS: state.filters.selectedNAICS }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(NAICSSearchContainer);
