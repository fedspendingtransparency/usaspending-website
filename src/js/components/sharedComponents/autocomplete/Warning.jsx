/**
 * Created by michaelbray on 1/27/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '../icons/Icons';

const defaultProps = {
    header: '',
    description: ''
};

const propTypes = {
    header: PropTypes.string,
    description: PropTypes.string
};

export default class Warning extends React.Component {
    render() {
        return (
            <div className="error-message" role="alert">
                <div className="error-title">
                    <Icons.ExclamationCircle alt="Warning icon" />
                    <div className="heading">{this.props.header}</div>
                </div>
                <p className="message">{this.props.description}</p>
            </div>
        );
    }
}

Warning.defaultProps = defaultProps;
Warning.propTypes = propTypes;
