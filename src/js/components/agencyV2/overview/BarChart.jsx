/**
 * BarChart.jsx
 * Created by Max Kendall 4/13/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { LoadingMessage, ErrorMessage } from 'data-transparency-ui';

const getLastFourYears = ({ year }, selectedFy) => {
    if (parseInt(selectedFy, 10) <= 2021 && year <= 2021) return true;
    if (parseInt(selectedFy, 10) > 2021 && year >= parseInt(selectedFy, 10) - 4) return true;
    return false;
};

const BarChart = ({
    isLoading,
    isError,
    agencyBudgetByYear,
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
                                height: `${(budget / greatestAgencyBudget) * 100}%`,
                                minHeight: '0.5%'
                            }} />
                        <span>{`FY ${fyStr[2]}${fyStr[3]}`}</span>
                    </li>
                );
            });
    };
    if (!isLoading && isError) {
        return <ErrorMessage description="There was an error fetching this data." />;
    }
    if (isLoading && !isError) {
        return <LoadingMessage />;
    }
    return (
        <ul className="viz-container bar-chart">
            {renderBars()}
        </ul>
    );
};

BarChart.propTypes = {
    selectedFy: PropTypes.string.isRequired,
    agencyBudgetByYear: PropTypes.arrayOf(PropTypes.shape({
        year: PropTypes.string.isRequired,
        budget: PropTypes.number.isRequired
    })),
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired
};

export default BarChart;
