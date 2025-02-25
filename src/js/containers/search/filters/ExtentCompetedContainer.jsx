/**
 * ExtentCompetedContainer.jsx
 * Created by Emily Gullo on 6/22/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import ListCheckbox from 'components/sharedComponents/checkbox/ListCheckbox';
import { extentCompetedDefinitions, extentCompetedTypeMapping } from 'dataMapping/search/contractFields';

const propTypes = {
    updateExtentCompeted: PropTypes.func,
    extentCompeted: PropTypes.object,
    searchV2: PropTypes.bool
};

const ExtentCompetedContainer = ({ updateExtentCompeted, extentCompeted, searchV2 }) => (
    <ListCheckbox
        filterCategoryMapping={extentCompetedTypeMapping}
        filters={extentCompetedDefinitions}
        selectedFilters={extentCompeted}
        singleFilterChange={updateExtentCompeted}
        searchV2={searchV2} />
);

ExtentCompetedContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        extentCompeted: state.filters.extentCompeted,
        appliedEC: state.appliedFilters.filters.extentCompeted
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(ExtentCompetedContainer);
