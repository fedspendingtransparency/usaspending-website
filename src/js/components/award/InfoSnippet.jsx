/**
 * InfoSnippet.jsx
 * Created by Emily Gullo 01/30/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default class InfoSnippet extends React.Component {
    render() {
        return (
            <li>
                <div className="format-item">
                    <div className="item-label">
                        {this.props.label}
                    </div>
                    <div className="item-value">
                        {this.props.value}
                    </div>
                </div>
            </li>);
    }
}
InfoSnippet.propTypes = propTypes;
