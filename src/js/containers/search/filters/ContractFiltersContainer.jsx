/**
 * ContractFiltersContainer.jsx
 * Created by Emily Gullo on 6/22/17.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import ContractFilters from 'components/search/filters/contractFilters/ContractFilters';

const propTypes = {
    updatePricingType: React.PropTypes.func,
    updateSetAside: React.PropTypes.func,
    updateExtentCompeted: React.PropTypes.func
};

export class ContractFiltersContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.selectAwardRange = this.selectAwardRange.bind(this);
    }

    selectAwardRange(amount, searchType) {
        const updateParams = { amount, searchType };
        this.props.updatePricingType(updateParams);
    }

    render() {
        return (
            <ContractFilters
                {...this.props}
                selectAwardRange={this.selectAwardRange} />
        );
    }
}

ContractFiltersContainer.propTypes = propTypes;

export default connect(
    (state) => ({ pricingType: state.filters.pricingType, setAside: state.filters.setAside, extentCompeted: state.filters.extentCompeted }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AwardAmountSearchContainer);
