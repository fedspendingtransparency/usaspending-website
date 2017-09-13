/**
 * PricingTypeContainer.jsx
 * Created by Emily Gullo on 6/22/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import ContractFilter from 'components/search/filters/contractFilters/ContractFilter';

const propTypes = {
    updatePricingType: React.PropTypes.func
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

    render() {
        return (
            <ContractFilter
                {...this.props}
                contractFilterType="pricing_type"
                contractFilterOptions="pricingTypeDefinitions"
                contractFilterState="pricingType"
                toggleFilter={this.selectPricingType} />
        );
    }
}

PricingTypeContainer.propTypes = propTypes;

export default connect(
    (state) => ({ pricingType: state.filters.pricingType }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(PricingTypeContainer);
