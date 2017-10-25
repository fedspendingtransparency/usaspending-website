/**
 * ExplorerHeaderCellContainer.jsx
 * Created by Lizzie Salita 10/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// just import the relevant action(s)
import { setExplorerTableOrder } from 'redux/actions/explorer/explorerActions';

import ResultsTableHeaderCell from 'components/search/table/cells/ResultsTableHeaderCell';

// combine the action functions into an object for the react-redux bindings
const actions = {
    setExplorerTableOrder
};

const propTypes = {
    setExplorerTableOrder: PropTypes.func,
    order: PropTypes.object,
    displayName: PropTypes.string,
    defaultDirection: PropTypes.string,
    columnName: PropTypes.string,
    isLast: PropTypes.bool
};

export class ExplorerHeaderCellContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setExplorerTableOrder = this.setExplorerTableOrder.bind(this);
    }

    setExplorerTableOrder(field, direction) {
        this.props.setExplorerTableOrder({
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
                setSearchOrder={this.setExplorerTableOrder} />
        );
    }
}

ExplorerHeaderCellContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        order: state.explorer.table.order
    }),
    (dispatch) => bindActionCreators(actions, dispatch)
)(ExplorerHeaderCellContainer);
