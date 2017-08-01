/**
 * HeaderRow.jsx
 * Created by Lizzie Salita 08/01/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

import HeaderCell from './HeaderCell';

const propTypes = {
    columns: PropTypes.array
};

export default class HeaderRow extends React.Component {
    render() {
        const headers = this.props.columns.map((column) => (
            <HeaderCell {...column} key={column.columnId} />
        ));

        return (
            <tr>
                {headers}
            </tr>
        );
    }
}

HeaderRow.propTypes = propTypes;
