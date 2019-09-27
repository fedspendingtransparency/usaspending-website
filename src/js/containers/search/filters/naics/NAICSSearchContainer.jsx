/**
  * NAICSSearchContainer.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { is } from 'immutable';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import NAICSSearch from 'components/search/filters/naics/NAICSSearch';

const propTypes = {
    updateSelectedNAICS: PropTypes.func,
    selectedNAICS: PropTypes.object,
    appliedNAICS: PropTypes.object
};

export class NAICSSearchContainer extends React.Component {
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
        }
    }

    removeNAICS(naics) {
        const updateParams = {};
        updateParams.naics = naics;
        this.props.updateSelectedNAICS(updateParams);
    }

    dirtyFilters() {
        if (is(this.props.selectedNAICS, this.props.appliedNAICS)) {
            return null;
        }
        return Symbol('dirty NAICS');
    }

    render() {
        return (
            <NAICSSearch
                selectedNAICS={this.props.selectedNAICS}
                dirtyFilters={this.dirtyFilters()}
                selectNAICS={this.selectNAICS}
                removeNAICS={this.removeNAICS} />
        );
    }
}

NAICSSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedNAICS: state.filters.selectedNAICS,
        appliedNAICS: state.appliedFilters.filters.selectedNAICS
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(NAICSSearchContainer);
