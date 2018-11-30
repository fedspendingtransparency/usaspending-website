/**
 * BarYAxis.jsx
 * Created by Kevin Li 12/19/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import { isEqual } from 'lodash';

import BarYAxisItem from './BarYAxisItem';

/* eslint-disable react/no-unused-prop-types */
// we're catching the props before they're fully set, so eslint thinks these props are unused
const propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    padding: PropTypes.object,
    scale: PropTypes.func,
    average: PropTypes.number
};
/* eslint-enable react/no-unused-prop-types */

export default class BarYAxis extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            labels: [],
            gridLines: []
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        // reduce unnecessary renders
        if (!isEqual(nextProps, this.props)) {
            return true;
        }
        else if (!isEqual(nextState, this.state)) {
            return true;
        }
        return false;
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
            // format the tick label based on the numerical unit chosen for the axis
            let formattedValue =
                MoneyFormatter.formatMoneyWithPrecision(tick / units.unit, units.precision);

            if (tick === 0) {
                formattedValue = '$0';
            }
            else {
                formattedValue += units.unitLabel;
            }

            return formattedValue;
        });

        // draw the grid lines
        const lineStart = props.padding.left;
        const lineEnd = props.width + props.padding.left;

        let description = '';
        if (tickLabels.length > 0) {
            description = `The Y-axis of the chart, showing a range of spending from `;
            description += `${tickLabels[0]} to ${tickLabels[tickLabels.length - 1]}`;
        }

        // set all the labels 10px left of the edge of Y axis
        const xPos = props.padding.left - 10;

        // iterate through the D3 generated tick marks and add them to the chart
        const labels = props.ticks.map((tick, i) => {
            // calculate the Y position
            // D3 scale returns the tick positions as pixels from the start of the axis (top as min)
            // but we want to display the axis as top max, bottom min, so invert the Y position by
            // subtracting from the total Y axis height
            const yPos = props.height - props.scale(tick);

            return (<BarYAxisItem
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
        return (
            <g className="bar-axis">
                <title>Y-Axis</title>
                <desc>
                    {this.state.description}
                </desc>
                <line
                    className="y-axis"
                    x1={this.props.padding.left}
                    y1={0}
                    x2={this.props.padding.left}
                    y2={this.props.height} />
                <g className="axis-labels">
                    {this.state.labels}
                </g>
            </g>
        );
    }
}

BarYAxis.propTypes = propTypes;
