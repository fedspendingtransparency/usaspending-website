/**
 * Error.jsx
 * Created by Emily Gullo 02/02/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    title: PropTypes.string,
    message: PropTypes.string
};

const defaultProps = {
    title: "Error",
    message: "We're sorry, there has been an unexpected error.  Please try again in a few moments."
};

export default class Error extends React.Component {
    render() {
        return (
            <main className="main-content" id="main-content">
                <div className="error-container">
                    <h4>{this.props.title}</h4>
                    <p>{this.props.message}</p>
                </div>
            </main>
        );
    }
}
Error.propTypes = propTypes;
Error.defaultProps = defaultProps;
