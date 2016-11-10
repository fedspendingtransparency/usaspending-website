/**
 * DateRangeError.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React from 'react';

const defaultProps = {
    header: '',
    message: ''
};

const propTypes = {
    header: React.PropTypes.string,
    message: React.PropTypes.string
};

export default class DateRangeError extends React.Component {

    render() {
        return (
            <div className="usa-input-error-message">{this.props.header}
                <p>{this.props.message}</p>
            </div>
        );
    }

}
DateRangeError.defaultProps = defaultProps;
DateRangeError.propTypes = propTypes;
