/**
 * HeaderRow.jsx
 * Created by Lizzie Salita 10/13/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

import ExplorerHeaderCellContainer from
    'containers/explorer/detail/table/ExplorerHeaderCellContainer';

const propTypes = {
    columns: PropTypes.array
};

export default class HeaderRow extends React.Component {
    render() {
        const headers = this.props.columns.map((column, i) => (
            <td key={column.columnName}>
                <ExplorerHeaderCellContainer
                    {...column}
                    isLast={i === this.props.columns.length - 1} />
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
