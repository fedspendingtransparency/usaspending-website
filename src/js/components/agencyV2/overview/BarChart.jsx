/**
 * BarChart.jsx
 * Created by Max Kendall 4/13/21
 */

import React from 'react';
import PropTypes from 'prop-types';

export const mockData = [
    {
        fiscal_year: 2026,
        agency_budgetary_resources: 376290363576.32,
        agency_total_obligated: 82847861416.69,
        total_budgetary_resources: 9688581391799.6
    },
    {
        fiscal_year: 2025,
        agency_budgetary_resources: 376290363576.32,
        agency_total_obligated: 82847861416.69,
        total_budgetary_resources: 9688581391799.6
    },
    {
        fiscal_year: 2024,
        agency_budgetary_resources: 376290363576.32,
        agency_total_obligated: 82847861416.69,
        total_budgetary_resources: 9688581391799.6
    },
    {
        fiscal_year: 2023,
        agency_budgetary_resources: 376290363576.32,
        agency_total_obligated: 82847861416.69,
        total_budgetary_resources: 9688581391799.6
    },
    {
        fiscal_year: 2022,
        agency_budgetary_resources: 376290363576.32,
        agency_total_obligated: 82847861416.69,
        total_budgetary_resources: 9688581391799.6
    },
    {
        fiscal_year: 2021,
        agency_budgetary_resources: 376290363576.32,
        agency_total_obligated: 82847861416.69,
        total_budgetary_resources: 9688581391799.6
    },
    {
        fiscal_year: 2020,
        agency_budgetary_resources: 322370908923.19,
        agency_total_obligated: 239791172810.38,
        total_budgetary_resources: 11461083881445.67
    },
    {
        fiscal_year: 2019,
        agency_budgetary_resources: 242451803717.47,
        agency_total_obligated: 170898908395.86,
        total_budgetary_resources: 7985747377194.5
    },
    {
        fiscal_year: 2018,
        agency_budgetary_resources: 224372520297.27,
        agency_total_obligated: 157671655471.61,
        total_budgetary_resources: 7593801808266.06
    },
    {
        fiscal_year: 2017,
        agency_budgetary_resources: 220459743630.97,
        agency_total_obligated: 163075192516.58,
        total_budgetary_resources: 7157959573120.1
    }
];

const getLastFourYears = ({ year }, selectedFy) => {
    if (parseInt(selectedFy, 10) <= 2021 && year <= 2021) return true;
    if (parseInt(selectedFy, 10) > 2021 && year >= parseInt(selectedFy, 10) - 4) return true;
    return false;
};

const BarChart = ({
    agencyBudgetByYear = mockData,
    selectedFy
}) => {
    const renderBars = () => {
        const greatestAgencyBudget = agencyBudgetByYear
            .filter((o) => getLastFourYears(o, selectedFy))
            .reduce((acc, obj) => (obj.budget > acc ? obj.budget : acc), 0);
        return agencyBudgetByYear
            .filter((o) => getLastFourYears(o, selectedFy))
            .sort((a, b) => a.year - b.year)
            .map(({ year: fy, budget }, i) => {
                const fyStr = String(fy);
                return (
                    <li className="bar-chart__bar" key={i}>
                        <span
                            className={`${fyStr === selectedFy ? 'active-fy ' : ''}`}
                            style={{
                                height: `${(budget / greatestAgencyBudget) * 100}%`
                            }} />
                        <span>{`FY ${fyStr[2]}${fyStr[3]}`}</span>
                    </li>
                );
            });
    };
    return (
        <ul className="viz-container bar-chart">
            {renderBars()}
        </ul>
    );
};

BarChart.propTypes = {
    selectedFy: PropTypes.string.isRequired,
    agencyBudgetByYear: PropTypes.arrayOf(PropTypes.shape({
        fiscal_year: PropTypes.number.isRequired,
        agency_budgetary_resources: PropTypes.number.isRequired
    }))
};

export default BarChart;
