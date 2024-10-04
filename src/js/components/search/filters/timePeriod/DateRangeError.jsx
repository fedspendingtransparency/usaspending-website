/**
 * DateRangeError.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
    header: '',
    message: ''
};

const propTypes = {
    header: PropTypes.string,
    message: PropTypes.string
};

const DateRangeError = (props) => {
    const errorHeader = props.header || 'Invalid search';
    return (
        <div className="date-range__warning">
            <span className="date-range__invalid">{errorHeader}</span>
            <ul>
                <li>{props.message}</li>
            </ul>
        </div>
    );
};
DateRangeError.defaultProps = defaultProps;
DateRangeError.propTypes = propTypes;
export default DateRangeError;
