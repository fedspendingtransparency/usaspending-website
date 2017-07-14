/**
  * PSCSearchContainer.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import PSCSearch from 'components/search/filters/psc/PSCSearch';

const propTypes = {
    updateSelectedPSC: React.PropTypes.func
};

const ga = require('react-ga');

class PSCSearchContainer extends React.Component {

    static logPlaceFilterEvent(place) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: `Applied PSC Filter`,
            label: place.toLowerCase()
        });
    }

    constructor(props) {
        super(props);

        // Bind functions
        this.selectPSC = this.selectPSC.bind(this);
        this.removePSC = this.removePSC.bind(this);
    }

    selectPSC(psc, isValid) {
        // If psc exists and is valid
        if (psc !== null && isValid) {
            const updateParams = {};
            updateParams.psc = psc;
            this.props.updateSelectedPSC(updateParams);

            // Analytics
            PSCSearchContainer.logPlaceFilterEvent(psc.place);
        }
    }

    removePSC(psc) {
        const updateParams = {};
        updateParams.psc = psc;
        this.props.updateSelectedPSC(updateParams);
    }

    render() {
        return (
            <PSCSearch
                {...this.props}
                selectPSC={this.selectPSC}
                removePSC={this.removePSC} />
        );
    }
}

PSCSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedPSC: state.filters.selectedPSC }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(PSCSearchContainer);
