/**
 * DateRangeError.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '../../../sharedComponents/icons/Icons';

const defaultProps = {
    header: '',
    message: ''
};

const propTypes = {
    header: PropTypes.string,
    message: PropTypes.string
};

export default class DateRangeError extends React.Component {
    render() {
        return (
            <div className="error-message">
                <div className="error-title">
                    <Icons.ExclamationCircle />
                    <div className="heading">{this.props.header}</div>
                </div>
                <p className="message">{this.props.message}</p>
            </div>
        );
    }
}
DateRangeError.defaultProps = defaultProps;
DateRangeError.propTypes = propTypes;
