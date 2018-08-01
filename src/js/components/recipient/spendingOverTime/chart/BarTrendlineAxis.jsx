/**
 * BarTrendlineAxis.jsx
 * Created by Lizzie Salita 7/11/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import { isEqual } from 'lodash';

/* eslint-disable react/no-unused-prop-types */
// we're catching the props before they're fully set, so eslint thinks these props are unused
const propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    padding: PropTypes.object,
    scale: PropTypes.func,
    average: PropTypes.number,
    color: PropTypes.string
};
/* eslint-enable react/no-unused-prop-types */

export default class BarTrendlineAxis extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            labels: [],
            gridLines: []
        };
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            this.drawAxis(this.props);
        }
    }

    drawAxis(props) {
        if (!props.scale) {
            return;
        }
        // generate the labels
        const tickLabels = props.ticks.map((tick) => {
            // format the tick label based on the numerical unit chosen for the axis
            if (tick >= MoneyFormatter.unitValues.THOUSAND) {
                const units = MoneyFormatter.calculateUnitForSingleValue(tick);
                return `${MoneyFormatter.formatNumberWithPrecision(tick / units.unit, 1)} ${units.unitLabel}`;
            }
            return MoneyFormatter.formatNumber(tick);
        });

        let description = '';
        if (tickLabels.length > 0) {
            description = `The second Y-axis of the chart, showing a range of new awards from `;
            description += `${tickLabels[0]} to ${tickLabels[tickLabels.length - 1]}`;
        }

        // set all the labels right of the edge of the axis
        const xPos = (props.width + props.padding.left + props.padding.right) - 10;

        // iterate through the D3 generated tick marks and add them to the chart
        const labels = props.ticks.map((tick, i) => {
            // calculate the Y position
            // D3 scale returns the tick positions as pixels from the start of the axis (top as min)
            // but we want to display the axis as top max, bottom min, so invert the Y position by
            // subtracting from the total Y axis height
            const yPos = props.height - props.scale(tick);

            return (
                <g
                    key={`label-trendline-${tick}`}
                    className="axis-item y-axis">
                    <text
                        textAnchor="end"
                        transform={`translate(${xPos},${yPos + 6})`}>
                        {tickLabels[i]}
                    </text>
                </g>
            );
        });

        this.setState({
            labels,
            description
        });
    }

    render() {
        return (
            <g className="bar-axis">
                <title>Trendline-Axis</title>
                <desc>
                    {this.state.description}
                </desc>
                <line
                    className="y-axis"
                    x1={this.props.width + this.props.padding.left}
                    y1={0}
                    x2={this.props.width + this.props.padding.left}
                    y2={this.props.height} />
                <g className="axis-labels">
                    {this.state.labels}
                </g>
            </g>
        );
    }
}

BarTrendlineAxis.propTypes = propTypes;
