/**
 * GrantTransactionHeaderCellContainer.jsx
 * Created by Lizzie Dabbs 03/07/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GrantTransactionHeaderCell from 'components/award/table/cells/GrantTransactionHeaderCell';

// just import the two relevant actions
import * as awardActions from 'redux/actions/award/awardActions';


export class GrantTransactionHeaderCellContainer extends React.Component {
    render() {
        return (
            <GrantTransactionHeaderCell {...this.props} />
        );
    }
}

export default connect(
    (state) => ({
        order: state.award.transactionSort
    }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(GrantTransactionHeaderCellContainer);
