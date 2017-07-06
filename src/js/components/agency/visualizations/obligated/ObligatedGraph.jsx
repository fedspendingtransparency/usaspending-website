/**
 * ObligatedGraph.jsx
 * Created by Lizzie Salita 6/12/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import BarChartLegend from 'components/search/visualizations/time/chart/BarChartLegend';
import HorizontalBarItem from './HorizontalBarItem';

const propTypes = {
    activeFY: PropTypes.string,
    reportingFiscalQuarter: PropTypes.number,
    obligatedAmount: PropTypes.number,
    budgetAuthority: PropTypes.number,
    width: PropTypes.number,
    obligatedText: PropTypes.string,
    legend: PropTypes.array
};

export default class AgencyObligatedGraph extends React.Component {
    render() {
        const obligatedValue = this.props.obligatedAmount;
        const authorityValue = this.props.budgetAuthority;
        const remainderValue = authorityValue - obligatedValue;

        let obligatedPercent = 0;

        if (obligatedValue !== 0 && authorityValue !== 0) {
            obligatedPercent = (obligatedValue / authorityValue);
        }
        const obligatedWidth = this.props.width * obligatedPercent;
        const remainderWidth = this.props.width - obligatedWidth;

        const remainderUnits = MoneyFormatter.calculateUnitForSingleValue(remainderValue);
        const remainder = `${MoneyFormatter.formatMoney(remainderValue / remainderUnits.unit)}
        ${remainderUnits.longLabel}`;

        const obligatedDescription = `${this.props.obligatedText} Obligated`;
        const remainderDescription = `${remainder} Remaining`;

        return (
            <svg className="horizontal-bar">
                <g>
                    <HorizontalBarItem
                        description={obligatedDescription}
                        x={0}
                        y={0}
                        width={obligatedWidth}
                        color={this.props.legend[0].color} />
                    <HorizontalBarItem
                        description={remainderDescription}
                        x={obligatedWidth}
                        y={0}
                        width={remainderWidth}
                        color={this.props.legend[1].color} />
                    <g
                        className="legend-container"
                        transform={`translate(0,52)`}>
                        <BarChartLegend legend={this.props.legend} />
                    </g>
                </g>
            </svg>
        );
    }
}

AgencyObligatedGraph.propTypes = propTypes;
