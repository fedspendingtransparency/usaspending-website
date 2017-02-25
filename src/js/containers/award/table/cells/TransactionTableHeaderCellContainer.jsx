/**
 * TransactionTableHeaderCellContainer.jsx
 * Created by Kevin Li 2/25/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TransactionTableHeaderCell from 'components/award/table/cells/TransactionTableHeaderCell';

// just import the two relevant actions
import * as awardActions from 'redux/actions/award/awardActions';


export class TransactionTableHeaderCellContainer extends React.Component {
    render() {
        return (
            <TransactionTableHeaderCell {...this.props} />
        );
    }
}

export default connect(
    (state) => ({
        order: state.award.transactionSort
    }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(TransactionTableHeaderCellContainer);
