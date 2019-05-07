/**
  * NoResultsMessage.jsx
  * Created by Jonathan Hill 05/07/19
  **/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
    title: 'Not Available',
    message: 'No available data to display'
};

const propTypes = {
    title: PropTypes.string,
    message: PropTypes.string
};

export default class NoResultsMessage extends Component {
    render() {
        const { title, message } = this.props;
        return (
            <div className="no-results-container">
                <div className="no-results-title">
                    <h4>
                        {title}
                    </h4>
                </div>
                <div className="no-results-message">
                    <p>{message}</p>
                </div>
            </div>
        );
    }
}

NoResultsMessage.propTypes = propTypes;
NoResultsMessage.defaultProps = defaultProps;
