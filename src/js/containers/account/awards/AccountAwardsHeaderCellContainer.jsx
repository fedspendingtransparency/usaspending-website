/**
 * AccountAwardsHeaderCellContainer.jsx
 * Created by Kevin Li 4/14/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// just import the two relevant actions
import * as accountActions from 'redux/actions/account/accountActions';

import ResultsTableHeaderCell from 'components/search/table/cells/ResultsTableHeaderCell';

const propTypes = {
    setAccountAwardOrder: PropTypes.func
};

export class AccountAwardsHeaderCellContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setSearchOrder = this.setSearchOrder.bind(this);
    }

    setSearchOrder(field, direction) {
        this.props.setAccountAwardOrder({
            field,
            direction
        });
    }

    render() {
        return (
            <ResultsTableHeaderCell
                {...this.props}
                setSearchOrder={this.setSearchOrder} />
        );
    }
}

AccountAwardsHeaderCellContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        order: state.account.awardsOrder
    }),
    (dispatch) => bindActionCreators(accountActions, dispatch)
)(AccountAwardsHeaderCellContainer);
