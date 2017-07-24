/**
 * AwardAmountSearchContainer.jsx
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import AwardAmountSearch from 'components/search/filters/awardAmount/AwardAmountSearch';

const propTypes = {
    updateAwardAmounts: PropTypes.func
};

export class AwardAmountSearchContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.selectAwardRange = this.selectAwardRange.bind(this);
    }

    selectAwardRange(amount, searchType) {
        const updateParams = { amount, searchType };
        this.props.updateAwardAmounts(updateParams);
    }

    render() {
        return (
            <AwardAmountSearch
                {...this.props}
                selectAwardRange={this.selectAwardRange} />
        );
    }
}

AwardAmountSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({ awardAmounts: state.filters.awardAmounts }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AwardAmountSearchContainer);
