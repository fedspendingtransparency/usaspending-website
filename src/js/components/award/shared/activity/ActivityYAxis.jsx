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
    extendLine: PropTypes.number,
    textAnchor: PropTypes.string,
    tickLabelFunction: PropTypes.func
};

const defaultProps = {
    extendLine: 10
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
        const {
            padding,
            ticks,
            scale,
            height,
            textAnchor
        } = props;
        if (!props.scale) {
            return;
        }
        const units = MoneyFormatter.calculateUnits(ticks);
        const tickLabelFunction = (tick) => {
            // determine the numerical unit to display in the Y axis labels
            let formattedValue = MoneyFormatter.formatMoneyWithPrecision(tick / units.unit, units.precision);
            if (tick === 0) {
                formattedValue = '$0';
            }
            else {
                formattedValue = `${formattedValue} ${units.unitLabel}`;
            }

            return formattedValue;
        };
        // generate the labels
        const tickLabels = ticks.map(this.props.tickLabelFunction || tickLabelFunction);

        // draw the grid lines
        const lineStart = -5;
        const lineEnd = 5;

        let description = '';
        if (tickLabels.length > 0) {
            description = 'The Y-axis of the chart, showing a range of awarded amounts from ';
            description += `${tickLabels[0]} to ${tickLabels[tickLabels.length - 1]}`;
        }

        /**
         * Default (w/ padding left) : set all the labels 20px to the left of the Y axis
         * Optional (w/ padding labels) : when passing textAnchor it is helpful to keep
         * the vertical line in place and update where we place the labels with their x
         * position with padding.labels
         */
        const xPos = (padding.labels || padding.left) - 20;

        // iterate through the D3 generated tick marks and add them to the chart
        const labels = ticks.map((tick, i) => {
            // calculate the X position
            // D3 scale returns the tick positions as pixels from the start of the axis (top as min)
            // but we want to display the axis as top max, bottom min, so invert the Y position by
            // subtracting from the total Y axis height
            const yPos = height - scale(tick);

            return (<ActivityYAxisItem
                x={xPos}
                y={yPos}
                label={`${tickLabels[i]}`}
                key={`label-y-${tick}-${i}`}
                lineStart={lineStart}
                lineEnd={lineEnd}
                textAnchor={textAnchor || 'middle'} />);
        });

        this.setState({
            labels,
            description
        });
    }
    /**
     * Note - When using nice we will always have a max tick at the top of the y-axis.
     * Bar height just extends the line for visual purposes to cover the max tick label.
     */
    render() {
        return (
            <g className="bar-axis">
                <title>Y-Axis</title>
                <desc>
                    {this.state.description}
                </desc>
                <line
                    className="axis y-axis"
                    x1={this.props.padding.left}
                    y1={-this.props.extendLine}
                    x2={this.props.padding.left}
                    y2={this.props.height} />
                <g className="axis-labels">
                    {this.state.labels}
                </g>
            </g>
        );
    }
}

ActivityYAxis.propTypes = propTypes;
ActivityYAxis.defaultProps = defaultProps;
