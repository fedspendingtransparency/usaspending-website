/**
 * AwardAmountSearchContainer.jsx
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is } from 'immutable';
import { each } from 'lodash';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import AwardAmountSearch from 'components/search/filters/awardAmount/AwardAmountSearch';
import SelectedAwardAmountBound from
    'components/search/filters/awardAmount/SelectedAwardAmountBound';
import { formatAwardAmountRange } from 'helpers/awardAmountHelper';


const propTypes = {
    updateAwardAmounts: PropTypes.func,
    awardAmounts: PropTypes.object,
    appliedAmounts: PropTypes.object,
    updateGenericFilter: PropTypes.func
};

export class AwardAmountSearchContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.selectAwardRange = this.selectAwardRange.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
    }

    selectAwardRange(awardAmountRange) {
        this.props.updateAwardAmounts(awardAmountRange);
    }

    dirtyFilters() {
        if (is(this.props.awardAmounts, this.props.appliedAmounts)) {
            return null;
        }
        return Symbol('dirty amount');
    }

    removeFilter(key) {
        const newValue = this.props.awardAmounts.delete(key);
        this.props.updateGenericFilter({
            type: 'awardAmounts',
            value: newValue
        });
    }

    stagedFilters() {
        const filterObject = this.props.awardAmounts.toObject();
        let stagedFilter;
        let name;
        each(filterObject, (val, key) => {
            stagedFilter = val;
            name = key;
        });
        if (!stagedFilter) return null;
        const label = formatAwardAmountRange(stagedFilter);
        return (
            <SelectedAwardAmountBound
                removeFilter={this.removeFilter}
                name={name}
                label={label} />
        );
    }

    render() {
        const stagedFilters = this.stagedFilters();
        return (
            <div className="award-amount-filter">
                <AwardAmountSearch
                    dirtyFilters={this.dirtyFilters()}
                    awardAmounts={this.props.awardAmounts}
                    selectAwardRange={this.selectAwardRange} />
                <div
                    className="selected-filters"
                    role="status">
                    {stagedFilters}
                </div>
            </div>
        );
    }
}

AwardAmountSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        awardAmounts: state.filters.awardAmounts,
        appliedAmounts: state.appliedFilters.filters.awardAmounts
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AwardAmountSearchContainer);
