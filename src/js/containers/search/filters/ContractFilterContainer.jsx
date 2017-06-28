/**
 * ContractFilterContainer.jsx
 * Created by Emily Gullo on 6/22/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import ContractFilter from 'components/search/filters/contractFilters/ContractFilter';

const propTypes = {
    updatePricingType: React.PropTypes.func,
    updateSetAside: React.PropTypes.func,
    updateExtentCompeted: React.PropTypes.func
};

export class ContractFilterContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.selectPricingType = this.selectPricingType.bind(this);
        this.selectSetAside = this.selectSetAside.bind(this);
        this.selectExtentCompeted = this.selectExtentCompeted.bind(this);
    }

    selectPricingType(value) {
        this.props.updatePricingType(value);
    }

    selectSetAside(value) {
        this.props.updateSetAside(value);
    }

    selectExtentCompeted(value) {
        this.props.updateExtentCompeted(value);
    }

    render() {
        return (
            <div>
                <ContractFilter
                    {...this.props}
                    contractFilterType="pricing_type"
                    contractFilterOptions="pricingTypeDefinitions"
                    contractFilterState="pricingType"
                    toggleFilter={this.selectPricingType} />
                <ContractFilter
                    {...this.props}
                    contractFilterType="set_aside"
                    contractFilterOptions="setAsideDefinitions"
                    contractFilterState="setAside"
                    toggleFilter={this.selectSetAside} />
                <ContractFilter
                    {...this.props}
                    contractFilterType="extent_competed"
                    contractFilterOptions="extentCompetedDefinitions"
                    contractFilterState="extentCompeted"
                    toggleFilter={this.selectExtentCompeted} />
            </div>
        );
    }
}

ContractFilterContainer.propTypes = propTypes;

export default connect(
    (state) => ({ pricingType: state.filters.pricingType,
        setAside: state.filters.setAside,
        extentCompeted: state.filters.extentCompeted }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(ContractFilterContainer);
