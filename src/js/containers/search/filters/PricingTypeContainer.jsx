/**
 * PricingTypeContainer.jsx
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
    updatePricingType: PropTypes.func,
    pricingType: PropTypes.object,
    appliedPricing: PropTypes.object
};

export class PricingTypeContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.selectPricingType = this.selectPricingType.bind(this);
    }

    selectPricingType(value) {
        this.props.updatePricingType(value);
    }

    dirtyFilters() {
        if (is(this.props.pricingType, this.props.appliedPricing)) {
            return null;
        }
        return Symbol('dirty pricing type');
    }

    render() {
        return (
            <ContractFilter
                pricingType={this.props.pricingType}
                dirtyFilters={this.dirtyFilters()}
                contractFilterType="pricing_type"
                contractFilterOptions="pricingTypeDefinitions"
                contractFilterState="pricingType"
                toggleFilter={this.selectPricingType} />
        );
    }
}

PricingTypeContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        pricingType: state.filters.pricingType,
        appliedPricing: state.appliedFilters.filters.pricingType
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(PricingTypeContainer);
