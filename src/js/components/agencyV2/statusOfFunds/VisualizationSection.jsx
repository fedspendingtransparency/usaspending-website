/**
 * VisualizationSection.jsx
 * Created by Lizzie Salita 10/29/21
 */

// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'data-transparency-ui';
import { levels } from './StatusOfFunds';

const propTypes = {
    level: PropTypes.number,
    agencyId: PropTypes.string,
    agencyName: PropTypes.string,
    fy: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
};

const VisualizationSection = ({
    level,
    agencyName,
    fy,
    children
}) => (
    <div className="status-of-funds__visualization">
        <p>{agencyName} by <strong>{levels[level]}</strong> for FY {fy}</p>
        <div>
            {children}
        </div>
        <Pagination // TODO: replace mock props data with pagination data from API when endpoints are available
            currentPage={1}
            changePage={1}
            changeLimit={1}
            limitSelector
            resultsText
            pageSize={10}
            totalItems={10} />
    </div>
);

VisualizationSection.propTypes = propTypes;
export default VisualizationSection;
