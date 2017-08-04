/**
 * AccountLandingHeaderCellContainer.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// just import the relevant action(s)
import { setAccountsOrder } from 'redux/actions/accountLanding/accountLandingActions';

import ResultsTableHeaderCell from 'components/search/table/cells/ResultsTableHeaderCell';

// combine the action functions into an object for the react-redux bindings
const actions = {
    setAccountsOrder
};

const propTypes = {
    setAccountsOrder: PropTypes.func,
    order: PropTypes.object,
    displayName: PropTypes.string,
    defaultDirection: PropTypes.string,
    columnName: PropTypes.string,
    isLast: PropTypes.bool
};

class AccountLandingHeaderCellContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setAccountsOrder = this.setAccountsOrder.bind(this);
    }

    setAccountsOrder(field, direction) {
        this.props.setAccountsOrder({
            field,
            direction
        });
    }

    render() {
        return (
            <ResultsTableHeaderCell
                label={this.props.displayName}
                defaultDirection={this.props.defaultDirection}
                column={this.props.columnName}
                isLast={this.props.isLast}
                order={this.props.order}
                setSearchOrder={this.setAccountsOrder} />
        );
    }
}

AccountLandingHeaderCellContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        order: state.accountLanding.accountsOrder
    }),
    (dispatch) => bindActionCreators(actions, dispatch)
)(AccountLandingHeaderCellContainer);
