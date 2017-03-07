/**
 * FinSysHeaderCellContainer.jsx
 * Created by Kevin Li 3/7/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FinSysHeaderCell from 'components/award/table/cells/FinSysHeaderCell';

// just import the two relevant actions
import * as awardActions from 'redux/actions/award/awardActions';


export class FinSysHeaderCellContainer extends React.Component {
    render() {
        return (
            <FinSysHeaderCell {...this.props} />
        );
    }
}

export default connect(
    (state) => ({
        order: state.award.transactionSort
    }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(FinSysHeaderCellContainer);
