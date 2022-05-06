/**
 * HeaderCell.jsx
 * Created by Lizzie Salita 08/01/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    header: PropTypes.node
};

export default class HeaderCell extends React.Component {
    render() {
        return (
            <td>
                {this.props.header}
            </td>
        );
    }
}

HeaderCell.propTypes = propTypes;
