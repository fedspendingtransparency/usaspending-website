/**
 * DetailRow.jsx
 * Created by Emily Gullo 02/06/2017
 **/

import React from 'react';

const propTypes = {
    title: React.PropTypes.string,
    value: React.PropTypes.string
};

export default class DetailRow extends React.Component {

    render() {
        return (
            <tr>
                <td>{this.props.title}</td>
                <td>{this.props.value}</td>
            </tr>
        );
    }
}
DetailRow.propTypes = propTypes;
