/**
  * PSCSearchContainer.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { is } from 'immutable';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import PSCSearch from 'components/search/filters/psc/PSCSearch';

const propTypes = {
    updateSelectedPSC: PropTypes.func,
    selectedPSC: PropTypes.object,
    appliedPSC: PropTypes.object
};

export class PSCSearchContainer extends React.Component {
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
        }
    }

    removePSC(psc) {
        const updateParams = {};
        updateParams.psc = psc;
        this.props.updateSelectedPSC(updateParams);
    }

    dirtyFilters() {
        if (is(this.props.selectedPSC, this.props.appliedPSC)) {
            return null;
        }
        return Symbol('dirty PSC');
    }

    render() {
        return (
            <PSCSearch
                selectedPSC={this.props.selectedPSC}
                dirtyFilters={this.dirtyFilters()}
                selectPSC={this.selectPSC}
                removePSC={this.removePSC} />
        );
    }
}

PSCSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedPSC: state.filters.selectedPSC,
        appliedPSC: state.appliedFilters.filters.selectedPSC
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(PSCSearchContainer);
