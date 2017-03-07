/**
 * AwardAmountSearchContainer.jsx
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import AwardAmountSearch from 'components/search/filters/awardAmount/AwardAmountSearch';

const propTypes = {
    updateAwardAmounts: React.PropTypes.func
};

export class AwardAmountSearchContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.selectAwardAmount = this.selectAwardAmount.bind(this);
    }

    selectAwardAmount(awardAmount) {
        console.log(awardAmount);
        this.props.updateAwardAmounts(awardAmount);
    }

    render() {
        return (
            <AwardAmountSearch
                {...this.props} />
        );
    }
}

AwardAmountSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({ awardAmounts: state.filters.awardAmounts }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AwardAmountSearchContainer);
