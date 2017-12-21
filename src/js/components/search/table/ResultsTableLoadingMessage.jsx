/**
  * ResultsTableMessage.jsx
  * Created by Kevin Li 12/12/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

import LoadingSpinner from 'components/sharedComponents/LoadingSpinner';

const defaultProps = {
    message: ''
};

const propTypes = {
    message: PropTypes.string
};

export default class ResultsTableMessage extends React.Component {
    render() {
        return (
            <div className="award-results-table-loading">
                <LoadingSpinner />
                <div className="loading-message">
                    Gathering your data...
                </div>
            </div>
        );
    }
}

ResultsTableMessage.propTypes = propTypes;
ResultsTableMessage.defaultProps = defaultProps;
