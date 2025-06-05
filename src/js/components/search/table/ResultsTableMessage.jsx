/**
  * ResultsTableMessage.jsx
  * Created by Kevin Li 12/12/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    message: PropTypes.string
};

const ResultsTableMessage = ({ message = '' }) => (
    <div className="results-table-message">
        {message}
    </div>
);

ResultsTableMessage.propTypes = propTypes;
export default ResultsTableMessage;
