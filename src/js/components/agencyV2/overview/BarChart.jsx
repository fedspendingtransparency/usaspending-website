/**
 * BarChart.jsx
 * Created by Max Kendall 4/13/21
 */

import React from 'react';

const mockData = [
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

const BarChart = ({
    obligationsByFy = mockData,
    selectedFy
}) => {
    const renderBars = () => {
        const highestYear = obligationsByFy.reduce((acc, obj) => {
            if (obj.total_budgetary_resources > acc) return obj.total_budgetary_resources;
            return acc;
        }, 0);
        return obligationsByFy
            .sort((a, b) => a.fiscal_year - b.fiscal_year)
            .map(({ fiscal_year: fy, total_budgetary_resources: total }) => {
                return (
                    <li className="bar-chart__bar">
                        <span
                            className={`${String(fy) === selectedFy ? 'active-fy ' : ''}`}
                            style={{
                                height: `${(total / highestYear) * 100}%`
                            }} />
                        <span>{`FY ${String(fy)[2]}${String(fy)[3]}`}</span>
                    </li>
                );
            });
    }
    return (
        <ul className="viz-container bar-chart">
            {renderBars()}
        </ul>
    );
};

export default BarChart;
