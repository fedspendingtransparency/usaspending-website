/**
 * LoanTransactionHeaderCellContainer.jsx
 * Created by Emily Gullo
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoanTransactionHeaderCell from
    'components/award/table/cells/LoanTransactionHeaderCell';

// just import the two relevant actions
import * as awardActions from 'redux/actions/award/awardActions';


export class LoanTransactionHeaderCellContainer extends React.Component {
    render() {
        return (
            <LoanTransactionHeaderCell {...this.props} />
        );
    }
}

export default connect(
    (state) => ({
        order: state.award.transactionSort
    }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(LoanTransactionHeaderCellContainer);
