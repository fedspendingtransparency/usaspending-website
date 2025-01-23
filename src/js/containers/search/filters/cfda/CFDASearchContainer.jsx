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
    updateSelectedCFDA: PropTypes.func,
    searchV2: PropTypes.bool
};

const CFDASearchContainer = ({
    selectedCFDA, appliedCFDA, updateSelectedCFDA, searchV2 = false
}) => {
    const selectCFDA = (cfda, isValid) => {
        // If cfda exists and is valid
        if (cfda !== null && isValid) {
            const updateParams = {};
            updateParams.cfda = cfda;
            updateSelectedCFDA(updateParams);
        }
    };

    const removeCFDA = (cfda) => {
        const updateParams = {};
        updateParams.cfda = cfda;
        updateSelectedCFDA(updateParams);
    };

    const dirtyFilters = () => {
        if (is(selectedCFDA, appliedCFDA)) {
            return null;
        }
        return Symbol('dirty CFDA');
    };

    return (
        <CFDASearch
            selectedCFDA={selectedCFDA}
            dirtyFilters={dirtyFilters()}
            selectCFDA={selectCFDA}
            removeCFDA={removeCFDA}
            searchV2={searchV2} />
    );
};

CFDASearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedCFDA: state.filters.selectedCFDA,
        appliedCFDA: state.appliedFilters.filters.selectedCFDA
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(CFDASearchContainer);
