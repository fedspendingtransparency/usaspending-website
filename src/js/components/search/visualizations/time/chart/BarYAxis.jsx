/**
 * BarYAxis.jsx
 * Created by Kevin Li 12/19/16
 */

import React from 'react';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import _ from 'lodash';

import BarYAxisItem from './BarYAxisItem';

/* eslint-disable react/no-unused-prop-types */
// we're catching the props before they're fully set, so eslint thinks these props are unused
const propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    padding: React.PropTypes.object,
    scale: React.PropTypes.func,
    average: React.PropTypes.number
};
/* eslint-enable react/no-unused-prop-types */

const UNIT_CONSTS = {
    TRILLION: 1000000000000,
    BILLION: 1000000000,
    MILLION: 1000000,
    THOUSAND: 1000
};

export default class BarYAxis extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            labels: [],
            gridLines: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps, this.props)) {
            this.drawAxis(nextProps);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // reduce unnecessary renders
        if (!_.isEqual(nextProps, this.props)) {
            return true;
        }
        else if (!_.isEqual(nextState, this.state)) {
            return true;
        }
        return false;
    }

    drawAxis(props) {
        if (!props.scale) {
            return;
        }

        // determine the axis monetary unit to display
        let axisMax = props.scale.domain()[1];
        // use the absolute value to handle a case where the average value is negative
        const axisAvg = Math.abs(props.average);

        // check if the absolute value of the the minimum Y value is greater than the max value
        // if so, use that as the effective max for determine numerical unit
        if (Math.abs(props.scale.domain[0]) > axisMax) {
            axisMax = Math.abs(props.scale.domain[0]);
        }

        // determine the numerical unit to display in the Y axis labels
        let unit = 1;
        let unitString = '';
        if (axisMax >= UNIT_CONSTS.TRILLION) {
            // more than or equal to one trillion
            unit = UNIT_CONSTS.TRILLION;
            unitString = 'T';
            if (axisAvg < UNIT_CONSTS.TRILLION) {
                // if the average is less than one trillion, go down to billions
                // for better readabilility
                unit = UNIT_CONSTS.BILLION;
                unitString = 'B';
            }
        }
        else if (axisMax >= UNIT_CONSTS.BILLION) {
            // more than or equal to one billion
            unit = UNIT_CONSTS.BILLION;
            unitString = 'B';
            if (axisAvg < UNIT_CONSTS.BILLION) {
                // if the average is less than one billion, go down to millions
                // for better readabilility
                unit = UNIT_CONSTS.MILLION;
                unitString = 'M';
            }
        }
        else if (axisMax >= UNIT_CONSTS.MILLION) {
            // more than or equal to one million
            unit = UNIT_CONSTS.MILLION;
            unitString = 'M';
            if (axisAvg < UNIT_CONSTS.MILLION) {
                // if the average is less than one million, go down to thousands
                // for better readabilility
                unit = UNIT_CONSTS.THOUSAND;
                unitString = 'k';
            }
        }
        else if (axisMax >= UNIT_CONSTS.THOUSAND) {
            // more than or equal to one thousand
            unit = UNIT_CONSTS.THOUSAND;
            unitString = 'k';
            if (axisAvg < UNIT_CONSTS.THOUSAND) {
                // if the average is less than one thousand, just display the raw value
                unit = 1;
                unitString = '';
            }
        }

        let precision = 0;
        if ((axisMax / unit) < 6) {
            // show decimal values if the Y axis tick increment is less than one numerical unit
            precision = 2;
        }

        // generate the labels
        const tickLabels = props.ticks.map((tick) => {
            let formattedTick = tick;

            // format the tick label based on the numerical unit chosen for the axis
            if (tick === 0) {
                formattedTick = '$0';
            }
            else if (unit > 1) {
                formattedTick = MoneyFormatter.formatMoneyWithPrecision(tick / unit, precision)
                    + unitString;
            }
            else {
                formattedTick = MoneyFormatter.formatMoneyWithPrecision(tick, precision);
            }

            return formattedTick;
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
