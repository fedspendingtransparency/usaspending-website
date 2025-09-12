/**
  * ResultsTableErrorMessage.jsx
  * Created by Kevin Li 12/21/17
  **/

import React from 'react';
import PropTypes from 'prop-types';

import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
};
const ResultsTableErrorMessage = ({
    title = 'An error occurred.',
    description = 'Something went wrong while gathering your data.'
}) => (
    <div className="results-table-error">
        <div className="icon">
            <ExclamationTriangle alt="An error occurred" />
        </div>
        <div className="title">
            {title}
        </div>
        <div className="description">
            {description}
        </div>
    </div>
);


ResultsTableErrorMessage.propTypes = propTypes;
export default ResultsTableErrorMessage;
