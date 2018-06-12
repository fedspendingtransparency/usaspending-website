/**
 * ExtentCompetedContainer.jsx
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
    updateExtentCompeted: PropTypes.func,
    extentCompeted: PropTypes.object,
    appliedEC: PropTypes.object
};

export class ExtentCompetedContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.selectExtentCompeted = this.selectExtentCompeted.bind(this);
    }

    selectExtentCompeted(value) {
        this.props.updateExtentCompeted(value);
    }

    dirtyFilters() {
        if (is(this.props.extentCompeted, this.props.appliedEC)) {
            return null;
        }
        return Symbol('dirty extent competed');
    }

    render() {
        return (
            <ContractFilter
                extentCompeted={this.props.extentCompeted}
                dirtyFilters={this.dirtyFilters()}
                contractFilterType="extent_competed"
                contractFilterOptions="extentCompetedDefinitions"
                contractFilterState="extentCompeted"
                toggleFilter={this.selectExtentCompeted} />
        );
    }
}

ExtentCompetedContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        extentCompeted: state.filters.extentCompeted,
        appliedEC: state.appliedFilters.filters.extentCompeted
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(ExtentCompetedContainer);
