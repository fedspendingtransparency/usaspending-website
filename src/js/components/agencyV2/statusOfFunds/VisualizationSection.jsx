/**
 * VisualizationSection.jsx
 * Created by Lizzie Salita 10/29/21
 */

// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'data-transparency-ui';
import { levels } from './StatusOfFunds';
import StatusOfFundsChart from '../visualizations/StatusOfFundsChart';

const propTypes = {
    level: PropTypes.number,
    agencyId: PropTypes.string,
    agencyName: PropTypes.string,
    fy: PropTypes.string,
    data: PropTypes.object
};

const VisualizationSection = ({
    level,
    agencyName,
    fy,
    data
}) => (
    <div className="status-of-funds__visualization">
        <h6>{agencyName} by <strong>{levels[level]}</strong> for FY {fy}</h6>
        <div>
            <StatusOfFundsChart data={data} />
        </div>
        <Pagination // TODO: replace mock props data with pagination data from API when endpoints are available
            resultsText
            changePage={() => {}}
            currentPage={1}
            pageSize={10}
            totalItems={12} />
    </div>
);

VisualizationSection.propTypes = propTypes;
export default VisualizationSection;
