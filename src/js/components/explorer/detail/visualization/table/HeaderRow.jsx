/**
 * HeaderRow.jsx
 * Created by Lizzie Salita 10/13/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

import ResultsTableHeaderCell from 'components/search/table/cells/ResultsTableHeaderCell';

const propTypes = {
    columns: PropTypes.array,
    order: PropTypes.object,
    setOrder: PropTypes.func
};

export default class HeaderRow extends React.Component {
    constructor(props) {
        super(props);

        this.setOrder = this.setOrder.bind(this);
    }

    setOrder(field, direction) {
        this.props.setOrder({
            field,
            direction
        });
    }

    render() {
        console.log(JSON.stringify(this.props.columns));
        const headers = this.props.columns.map((column, i) => (
            <td key={column.columnName}>
                <ResultsTableHeaderCell
                    label={column.displayName}
                    defaultDirection={column.defaultDirection}
                    column={column.columnName}
                    isLast={i === this.props.columns.length - 1}
                    order={this.props.order}
                    setSearchOrder={this.setOrder} />
            </td>
        ));

        return (
            <tr>
                {headers}
            </tr>
        );
    }
}

HeaderRow.propTypes = propTypes;
