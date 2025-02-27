/**
 * AwardAmountSearchContainer.jsx
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is } from 'immutable';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import AwardAmountSearch from 'components/search/filters/awardAmount/AwardAmountSearch';


const propTypes = {
    updateAwardAmounts: PropTypes.func,
    awardAmounts: PropTypes.object,
    appliedAmounts: PropTypes.object,
    updateGenericFilter: PropTypes.func,
    searchV2: PropTypes.bool
};

const AwardAmountSearchContainer = (props) => {
    const selectAwardRange = (awardAmountRange) => {
        props.updateAwardAmounts(awardAmountRange);
    };

    const dirtyFilters = () => {
        if (is(props.awardAmounts, props.appliedAmounts)) {
            return null;
        }
        return Symbol('dirty amount');
    };

    const removeFilter = (key) => {
        const newValue = props.awardAmounts.delete(key);
        props.updateGenericFilter({
            type: 'awardAmounts',
            value: newValue
        });
    };


    return (
        <div className="award-amount-filter">
            <AwardAmountSearch
                removeFilter={removeFilter}
                dirtyFilters={dirtyFilters()}
                awardAmounts={props.awardAmounts}
                selectAwardRange={selectAwardRange}
                searchV2={props.searchV2} />
        </div>
    );
};

AwardAmountSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        awardAmounts: state.filters.awardAmounts,
        appliedAmounts: state.appliedFilters.filters.awardAmounts
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AwardAmountSearchContainer);
