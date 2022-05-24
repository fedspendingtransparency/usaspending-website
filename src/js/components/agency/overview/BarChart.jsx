/**
 * BarChart.jsx
 * Created by Max Kendall 4/13/21
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LoadingMessage, ErrorMessage, TooltipWrapper } from 'data-transparency-ui';
import { formatMoney } from 'helpers/moneyFormatter';

export const getLastFourYears = ({ year }, selectedFy) => {
    const fy = parseInt(selectedFy, 10);
    // Data Act reporting began in 2017. Before 2021, return true for 2017 - 2021.
    if (fy <= 2021 && year <= 2021) return true;
    // After 2021, return true for the previous 4 years and the currently selected year.
    if (fy > 2021 && year >= parseInt(selectedFy, 10) - 4 && year <= fy) return true;
    return false;
};

/**
 * The visualization is 208px tall (src/_scss/pages/agency/overview/_visualizationSection.scss)
 * Maximum bar height is 187px (src/_scss/pages/agency/overview/_barChart.scss)
 * To display the tooltip at the midpoint of the bar, get the inverse of half the height of the bar
 * Subtract 15px for the arrow spacer
 */
export const calculateOffsetTop = (percentOfGreatestBudget) => 187 - (187 * percentOfGreatestBudget * 0.5) - 15;

const BarChart = ({
    isLoading,
    isError,
    agencyBudgetByYear,
    selectedFy
}) => {
    const [hoveredFy, setHoveredFy] = useState(false);
    const renderBars = () => {
        const greatestAgencyBudget = agencyBudgetByYear
            .filter((o) => getLastFourYears(o, selectedFy))
            .reduce((acc, obj) => (obj.budget > acc ? obj.budget : acc), 0);
        return agencyBudgetByYear
            .filter((o) => getLastFourYears(o, selectedFy))
            .sort((a, b) => a.year - b.year)
            .map(({ year: fy, budget }) => {
                const fyStr = String(fy);
                const tooltip = (
                    <div className="bar-chart-tooltip">
                        <div className="tooltip__title">
                            FY {fy}
                        </div>
                        <div className="tooltip__text">
                            <div className="bar-chart-tooltip__desc">Total Budgetary Resources</div>
                            <div className="bar-chart-tooltip__amount">{formatMoney(budget)}</div>
                        </div>
                    </div>
                );
                return (
                    <div
                        className="bar-chart__item"
                        key={fy}
                        onMouseEnter={() => setHoveredFy(true)}
                        onMouseLeave={() => setHoveredFy(false)}>
                        <TooltipWrapper
                            className={`bar-chart__tooltip-wrapper${!hoveredFy && fyStr === selectedFy ? ' bar-chart__tooltip-wrapper_active' : ''}`}
                            tooltipComponent={tooltip}
                            offsetAdjustments={{
                                top: calculateOffsetTop(budget / greatestAgencyBudget),
                                left: 0,
                                right: 0
                            }}>
                            <div
                                role="img"
                                className={`bar-chart__bar${fyStr === selectedFy ? ' bar-chart__bar_selected' : ''}`}
                                style={{
                                    height: `${(budget / greatestAgencyBudget) * 100}%`,
                                    minHeight: '0.5%'
                                }}
                                alt={`FY ${fyStr[2]}${fyStr[3]} total budgetary resources are ${formatMoney(budget)};
                                    a ${(budget / greatestAgencyBudget).toFixed(2)} to 1 ratio compared to the largest total budgetary resources
                                    in 5 consecutive years (${formatMoney(greatestAgencyBudget)}).`} />
                        </TooltipWrapper>
                        <div className={`bar-chart__label${fyStr === selectedFy ? ' bar-chart__label_selected' : ''}`}>
                            {`FY ${fyStr[2]}${fyStr[3]}`}
                        </div>
                    </div>
                );
            });
    };
    if (!isLoading && isError) {
        return <ErrorMessage />;
    }
    if (isLoading && !isError) {
        return <LoadingMessage />;
    }
    return (
        <div className="viz-container bar-chart" alt="Bar chart of total budgetary resources over five consecutive years">
            {renderBars()}
        </div>
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
