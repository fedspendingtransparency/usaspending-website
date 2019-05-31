/**
 * ActivityYAxis.jsx
 * Created by Lizzie Salita 5/16/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import ActivityYAxisItem from './ActivityYAxisItem';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.object,
    barHeight: PropTypes.number
};

const defaultProps = {
    barHeight: 10
};

export default class ActivityYAxis extends React.Component {
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

        // determine the numerical unit to display in the Y axis labels
        const units = MoneyFormatter.calculateUnits(props.data);

        // generate the labels
        const tickLabels = props.ticks.map((tick) => {
            let formattedValue = MoneyFormatter.formatMoneyWithPrecision(tick / units.unit, units.precision);
            
            if (tick === 0) {
                formattedValue = '$0';
            }
            else {
                formattedValue += units.unitLabel;
            }

            return formattedValue;
        });

        // draw the grid lines
        const lineStart = -5;
        const lineEnd = 5;

        let description = '';
        if (tickLabels.length > 0) {
            description = `The Y-axis of the chart, showing a range of awarded amounts from `;
            description += `${tickLabels[0]} to ${tickLabels[tickLabels.length - 1]}`;
        }

        // set all the labels 20px to the left of the Y axis
        const xPos = props.padding.left - 20;

        // iterate through the D3 generated tick marks and add them to the chart
        const labels = props.ticks.map((tick, i) => {
            // calculate the X position
            // D3 scale returns the tick positions as pixels from the start of the axis (top as min)
            // but we want to display the axis as top max, bottom min, so invert the Y position by
            // subtracting from the total Y axis height
            const yPos = props.height - props.scale(tick);

            return (<ActivityYAxisItem
                x={xPos}
                y={yPos}
                label={`${tickLabels[i]}`}
                key={`label-y-${tick}-${i}`}
                lineStart={lineStart}
                lineEnd={lineEnd} />);
        });

        this.setState({
            labels,
            description
        });
    }

    render() {
        // TODO: move this to sass file
        const lineStyle = {
            stroke: 'rgb(0,0,0)',
            strokeWidth: '1'
        };
        return (
            <g className="bar-axis">
                <title>Y-Axis</title>
                <desc>
                    {this.state.description}
                </desc>
                <line
                    className="y-axis"
                    x1={this.props.padding.left}
                    y1={-this.props.barHeight}
                    x2={this.props.padding.left}
                    y2={this.props.height}
                    style={lineStyle} />
                <g className="axis-labels">
                    {this.state.labels}
                </g>
            </g>
        );
    }
}

ActivityYAxis.propTypes = propTypes;
ActivityYAxis.defaultProps = defaultProps;
