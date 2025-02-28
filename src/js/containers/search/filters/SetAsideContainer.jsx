/**
 * SetAsideContainer.jsx
 * Created by Emily Gullo on 6/22/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import { setAsideDefinitions, setAsideTypeMapping } from 'dataMapping/search/contractFields';
import ListCheckbox from "components/sharedComponents/checkbox/ListCheckbox";

const propTypes = {
    updateSetAside: PropTypes.func,
    setAside: PropTypes.object,
    searchV2: PropTypes.bool
};

const SetAsideContainer = ({ updateSetAside, setAside, searchV2 }) => (
    <ListCheckbox
        filterCategoryMapping={setAsideTypeMapping}
        filters={setAsideDefinitions}
        selectedFilters={setAside}
        singleFilterChange={updateSetAside}
        searchV2={searchV2} />
);

SetAsideContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        setAside: state.filters.setAside,
        appliedSetAside: state.appliedFilters.filters.setAside
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(SetAsideContainer);
