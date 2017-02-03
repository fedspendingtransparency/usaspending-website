/**
 * Error.jsx
 * Created by Emily Gullo 02/02/2017
 **/

import React from 'react';

const propTypes = {
    title: React.PropTypes.string,
    message: React.PropTypes.string
};

const defaultProps = {
    title: "Error",
    message: "We're sorry, there has been an unexpected error.  Please try again in a few moments."
};

export default class Error extends React.Component {
    render() {
        return (
            <div className="error">
                <h4>{this.props.title}</h4>
                <p>{this.props.message}</p>
            </div>
        );
    }
}
Error.propTypes = propTypes;
Error.defaultProps = defaultProps;
