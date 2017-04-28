/**
 * SubawardsHeaderCellContainer.jsx
 * Created by Kevin Li 2/25/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SubawardsHeaderCell from 'components/award/subawards/cells/SubawardsHeaderCell';

// just import the two relevant actions
import * as awardActions from 'redux/actions/award/awardActions';


export class SubawardsHeaderCellContainer extends React.Component {
    render() {
        return (
            <SubawardsHeaderCell {...this.props} />
        );
    }
}

export default connect(
    (state) => ({
        order: state.award.subawardSort
    }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(SubawardsHeaderCellContainer);
