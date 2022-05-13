/**
  * CFDASearchContainer.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { is } from 'immutable';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import CFDASearch from 'components/search/filters/cfda/CFDASearch';

const propTypes = {
    selectedCFDA: PropTypes.object,
    appliedCFDA: PropTypes.object,
    updateSelectedCFDA: PropTypes.func
};

export class CFDASearchContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.selectCFDA = this.selectCFDA.bind(this);
        this.removeCFDA = this.removeCFDA.bind(this);
    }

    selectCFDA(cfda, isValid) {
    // If cfda exists and is valid
        if (cfda !== null && isValid) {
            const updateParams = {};
            updateParams.cfda = cfda;
            this.props.updateSelectedCFDA(updateParams);
        }
    }

    removeCFDA(cfda) {
        const updateParams = {};
        updateParams.cfda = cfda;
        this.props.updateSelectedCFDA(updateParams);
    }

    dirtyFilters() {
        if (is(this.props.selectedCFDA, this.props.appliedCFDA)) {
            return null;
        }
        return Symbol('dirty CFDA');
    }

    render() {
        return (
            <CFDASearch
                selectedCFDA={this.props.selectedCFDA}
                dirtyFilters={this.dirtyFilters()}
                selectCFDA={this.selectCFDA}
                removeCFDA={this.removeCFDA} />
        );
    }
}

CFDASearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedCFDA: state.filters.selectedCFDA,
        appliedCFDA: state.appliedFilters.filters.selectedCFDA
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(CFDASearchContainer);
