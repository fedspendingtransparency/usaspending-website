/**
 * ExtentCompetedContainer.jsx
 * Created by Emily Gullo on 6/22/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import ContractFilter from 'components/search/filters/contractFilters/ContractFilter';

const propTypes = {
    updateExtentCompeted: React.PropTypes.func
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

    render() {
        return (
            <ContractFilter
                {...this.props}
                contractFilterType="extent_competed"
                contractFilterOptions="extentCompetedDefinitions"
                contractFilterState="extentCompeted"
                toggleFilter={this.selectExtentCompeted} />
        );
    }
}

ExtentCompetedContainer.propTypes = propTypes;

export default connect(
    (state) => ({ extentCompeted: state.filters.extentCompeted }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(ExtentCompetedContainer);
