/**
  * ResultsTableMessage.jsx
  * Created by Kevin Li 12/12/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
    message: ''
};

const propTypes = {
    message: PropTypes.string
};

export default class ResultsTableMessage extends React.Component {
    render() {
        return (
            <div className="results-table-message">
                {this.props.message}
            </div>
        );
    }
}

ResultsTableMessage.propTypes = propTypes;
ResultsTableMessage.defaultProps = defaultProps;
