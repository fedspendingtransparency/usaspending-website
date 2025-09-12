/**
 * DateRangeError.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    header: PropTypes.string,
    message: PropTypes.string
};

const DateRangeError = ({
    header = '',
    message = ''
}) => {
    const errorHeader = header || 'Invalid search';
    return (
        <div className="date-range__warning">
            <span className="date-range__invalid">{errorHeader}</span>
            <ul>
                <li>{message}</li>
            </ul>
        </div>
    );
};
DateRangeError.propTypes = propTypes;
export default DateRangeError;
