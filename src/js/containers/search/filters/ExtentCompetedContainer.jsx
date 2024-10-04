/**
 * ExtentCompetedContainer.jsx
 * Created by Emily Gullo on 6/22/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is } from 'immutable';
import { QAT } from 'GlobalConstants';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import ContractFilter from 'components/search/filters/contractFilters/ContractFilter';
import ListCheckbox from 'components/sharedComponents/checkbox/ListCheckbox';
import { extentCompetedDefinitions, extentCompetedTypeMapping } from 'dataMapping/search/contractFields';

const propTypes = {
    updateExtentCompeted: PropTypes.func,
    extentCompeted: PropTypes.object,
    appliedEC: PropTypes.object
};

const ExtentCompetedContainer = ({ updateExtentCompeted, extentCompeted, appliedEC }) => {
    const selectExtentCompeted = (value) => {
        updateExtentCompeted(value);
    };

    const dirtyFilters = () => {
        if (is(extentCompeted, appliedEC)) {
            return null;
        }
        return Symbol('dirty extent competed');
    };

    return (QAT ?
        <ListCheckbox
            filterCategoryMapping={extentCompetedTypeMapping}
            filters={extentCompetedDefinitions}
            selectedFilters={extentCompeted}
            singleFilterChange={updateExtentCompeted} />
        :
        <ContractFilter
            extentCompeted={extentCompeted}
            dirtyFilters={dirtyFilters()}
            contractFilterType="extent_competed"
            contractFilterOptions="extentCompetedDefinitions"
            contractFilterState="extentCompeted"
            toggleFilter={selectExtentCompeted} />
    );
};

ExtentCompetedContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        extentCompeted: state.filters.extentCompeted,
        appliedEC: state.appliedFilters.filters.extentCompeted
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(ExtentCompetedContainer);
