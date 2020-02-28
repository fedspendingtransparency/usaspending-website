import React from 'react';
import PropTypes from 'prop-types';
import ContractGrantsActivityChart from './ContractGrantsActivityChart';

const propTypes = {
    transactions: PropTypes.array
};

const ContractGrantActivity = ({ transactions }) => {
    return (
        <div className="activity-visualization">
            <ContractGrantsActivityChart 
                height={360} />
        </div>
    );
};

ContractGrantActivity.propTypes = propTypes;

export default ContractGrantActivity;
