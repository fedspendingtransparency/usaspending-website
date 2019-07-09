/**
 * Note.jsx
 * Created by Jonathan Hill 07/09/19
 **/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    title: PropTypes.string,
    message: PropTypes.string
};

export default class Note extends Component {
    render() {
        const { title, message } = this.props;
        return (
            <p className="default-note">
                <strong>{title || 'NOTE: '}</strong>
                {message}
            </p>
        );
    }
}

Note.propTypes = propTypes;
