/**
 * PricingTypeContainer.jsx
 * Created by Emily Gullo on 6/22/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import { pricingTypeDefinitions, pricingTypeMapping } from "dataMapping/search/contractFields";
import ListCheckbox from "components/sharedComponents/checkbox/ListCheckbox";

const propTypes = {
    updatePricingType: PropTypes.func,
    pricingType: PropTypes.object,
    searchV2: PropTypes.bool
};

const PricingTypeContainer = ({ pricingType, updatePricingType, searchV2 }) => (
    <ListCheckbox
        filterCategoryMapping={pricingTypeMapping}
        filters={pricingTypeDefinitions}
        selectedFilters={pricingType}
        singleFilterChange={updatePricingType}
        searchV2={searchV2} />
);

PricingTypeContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        pricingType: state.filters.pricingType
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(PricingTypeContainer);
