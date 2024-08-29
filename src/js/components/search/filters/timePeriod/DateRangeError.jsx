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

const DateRangeError = (props) => (
    <div className="date-range__warning">
        <span className="date-range__invalid">Invalid search</span>
        <ul>
            <li>{props.message}</li>
        </ul>
    </div>
);
DateRangeError.defaultProps = defaultProps;
DateRangeError.propTypes = propTypes;
export default DateRangeError;
