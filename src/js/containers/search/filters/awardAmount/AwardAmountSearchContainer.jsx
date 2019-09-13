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
import SelectedAwardAmountBound from 'components/search/filters/awardAmount/SelectedAwardAmountBound';
import { formatMoneyWithPrecision } from 'helpers/moneyFormatter';

const propTypes = {
    updateAwardAmounts: PropTypes.func,
    awardAmounts: PropTypes.object,
    appliedAmounts: PropTypes.object
};

export class AwardAmountSearchContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.selectAwardRange = this.selectAwardRange.bind(this);
        this.remove = this.remove.bind(this);
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

    remove() {

    };

    stagedFilters() {
        console.log(' Staged Filters : ', this.props.awardAmounts.toObject());
        const filterObject = this.props.awardAmounts.toObject();
        // [min, max]
        let stagedFilter;
        let name;
        each(filterObject, (range, val, key) => {
            stagedFilter = val;
            name = key;
        });
        if (!stagedFilter) return null;
        return stagedFilter.map((bound, index) => {
            if (!bound) return;
            const amount = formatMoneyWithPrecision(bound, { precision: 2 });
            const minOrMaxLabel = (index === 0) ? 'Min' : 'Max';
            const label = `${minOrMaxLabel} | ${amount}`;
            return (
                <SelectedAwardAmountBound
                    {...this.props}
                    name={name}
                    label={label}
                    key="award-range-specific"
                    rangeID="specific"
                    toggleSelection={this.searchSpecificRange} />
            );
        });
        return null;
    }

    render() {
        const stagedFilters = this.stagedFilters();
        return (
            <div>
                <AwardAmountSearch
                    dirtyFilters={this.dirtyFilters()}
                    awardAmounts={this.props.awardAmounts}
                    selectAwardRange={this.selectAwardRange} />
                <div
                    className="award-amount-item-wrapper"
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
