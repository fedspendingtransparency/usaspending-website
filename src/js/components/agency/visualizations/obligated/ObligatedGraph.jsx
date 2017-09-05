/**
 * ObligatedGraph.jsx
 * Created by Lizzie Salita 6/12/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import BarChartLegend from 'components/search/visualizations/time/chart/BarChartLegend';
import HorizontalBarItem from './HorizontalBarItem';
import OutlayLine from './OutlayLine';

const propTypes = {
    obligatedAmount: PropTypes.number,
    budgetAuthority: PropTypes.number,
    outlay: PropTypes.number,
    width: PropTypes.number,
    obligatedText: PropTypes.string,
    legend: PropTypes.array
};

export default class AgencyObligatedGraph extends React.Component {
    render() {
        const obligatedValue = this.props.obligatedAmount;
        const authorityValue = this.props.budgetAuthority;
        const remainderValue = authorityValue - obligatedValue;
        const outlayValue = this.props.outlay;

        let obligatedPercent = 0;
        let outlayPercent = 0;
        let remainderPercent = 0;

        if ((obligatedValue > 0) && (outlayValue > 0) && (authorityValue > 0)) {
            if (authorityValue > obligatedValue) {
                // Both bars are visible
                if (outlayValue < authorityValue) {
                    // Outlay line overlaps with the bars
                    obligatedPercent = (obligatedValue / authorityValue);
                    remainderPercent = (remainderValue / authorityValue);
                    outlayPercent = (outlayValue / authorityValue);
                }
                else {
                    // Outlay line is farther right than the bars
                    outlayPercent = 1;
                    obligatedPercent = (obligatedValue / outlayValue);
                    remainderPercent = (remainderValue / outlayValue);
                }
            }
            else if (obligatedValue > outlayValue) {
                // Obligated bar should cover budget authority
                // Outlay line overlaps obligated bar
                obligatedPercent = 1;
                outlayPercent = (outlayValue / obligatedValue);
            }
            else {
                // Outlay is farther right than the obligated bar
                outlayPercent = 1;
                if (outlayValue !== 0) {
                    obligatedPercent = (obligatedValue / outlayValue);
                }
            }
        }

        const obligatedWidth = this.props.width * obligatedPercent;
        const remainderWidth = this.props.width * remainderPercent;
        const outlayWidth = this.props.width * outlayPercent;

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
                        color={this.props.legend[2].color} />
                    <OutlayLine
                        description="Outlay Amount"
                        value={this.props.outlay}
                        x={outlayWidth}
                        y={0}
                        height={20}
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
