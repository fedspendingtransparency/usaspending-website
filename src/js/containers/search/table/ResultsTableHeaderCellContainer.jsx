/**
 * ResultsTableHeaderCellContainer.jsx
 * Created by Kevin Li 1/6/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// just import the two relevant actions
import { setSearchOrder, resetSearchOrder } from 'redux/actions/search/searchFilterActions';

import ResultsTableHeaderCell from 'components/search/table/cells/ResultsTableHeaderCell';

// combine the action functions into an object for the react-redux bindings
const actions = {
    setSearchOrder,
    resetSearchOrder
};

const propTypes = {
    setSearchOrder: PropTypes.func
};

class ResultsTableHeaderCellContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setSearchOrder = this.setSearchOrder.bind(this);
    }

    setSearchOrder(field, direction) {
        this.props.setSearchOrder({
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

ResultsTableHeaderCellContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        order: state.searchOrder
    }),
    (dispatch) => bindActionCreators(actions, dispatch)
)(ResultsTableHeaderCellContainer);
