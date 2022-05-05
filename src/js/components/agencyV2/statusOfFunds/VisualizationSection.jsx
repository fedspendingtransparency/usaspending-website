/**
 * VisualizationSection.jsx
 * Created by Lizzie Salita 10/29/21
 */

// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { levels } from './StatusOfFunds';
import StatusOfFundsChart from '../visualizations/StatusOfFundsChart';
import RoundedToggle from "../../sharedComponents/RoundedToggle";

const propTypes = {
    level: PropTypes.number.isRequired,
    setLevel: PropTypes.func,
    loading: PropTypes.bool,
    setLoading: PropTypes.func,
    totalItems: PropTypes.number,
    setTotalItems: PropTypes.func,
    agencyName: PropTypes.string,
    fy: PropTypes.string,
    results: PropTypes.array,
    fetchFederalAccounts: PropTypes.func,
    selectedSubcomponent: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
        budgetaryResources: PropTypes.string,
        obligations: PropTypes.string
    })
};

const VisualizationSection = ({
    loading,
    setLoading,
    level,
    setLevel,
    totalItems,
    setTotalItems,
    agencyName,
    fy,
    results,
    selectedSubcomponent,
    fetchFederalAccounts
}) => (
    <div className="status-of-funds__visualization">
        <h6>{level === 1 ? selectedSubcomponent?.name : agencyName} by <strong>{levels[level]}</strong> for FY {fy}</h6>
        <div className="status-of-funds__controls">
            <RoundedToggle label="View Outlays" />
        </div>
        <div className="status-of-funds__visualization-chart">
            <StatusOfFundsChart fetchFederalAccounts={fetchFederalAccounts} totalItems={totalItems} setTotalItems={setTotalItems} loading={loading} setLoading={setLoading} fy={fy} results={results} level={level} setLevel={setLevel} />
        </div>
    </div>
);

VisualizationSection.propTypes = propTypes;
export default VisualizationSection;
