/**
 * SetAsideContainer.jsx
 * Created by Emily Gullo on 6/22/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is } from 'immutable';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import ContractFilter from 'components/search/filters/contractFilters/ContractFilter';

const propTypes = {
    updateSetAside: PropTypes.func,
    setAside: PropTypes.object,
    appliedSetAside: PropTypes.object
};

const SetAsideContainer = ({ updateSetAside, setAside, appliedSetAside }) => {
    const selectSetAside = (value) => {
        updateSetAside(value);
    };

    const dirtyFilters = () => {
        if (is(setAside, appliedSetAside)) {
            return null;
        }
        return Symbol('dirty set aside');
    };

    return (
        <ContractFilter
            setAside={setAside}
            dirtyFilters={dirtyFilters()}
            contractFilterType="set_aside"
            contractFilterOptions="setAsideDefinitions"
            contractFilterState="setAside"
            toggleFilter={selectSetAside} />
    );
};

SetAsideContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        setAside: state.filters.setAside,
        appliedSetAside: state.appliedFilters.filters.setAside
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(SetAsideContainer);
