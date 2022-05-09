/**
 * HorizontalXAxis.jsx
 * Created by Kevin Li 2/6/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import HorizontalXLabel from './HorizontalXLabel';

const propTypes = {
    range: PropTypes.array,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number
};

export default class HorizontalXAxis extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            labels: []
        };
    }

    componentDidMount() {
        this.generateLabels(this.props);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            this.generateLabels(this.props);
        }
    }

    generateLabels(props) {
        if (!props.xScale) {
            return;
        }
        let tickCount = 5;
        if (props.width < 500) {
            tickCount = 3;
        }

        const ticks = props.xScale.ticks(tickCount);
        const units = MoneyFormatter.calculateUnits(props.data, tickCount);

        // determine how much space the last tick has
        const lastTick = ticks[ticks.length - 1];
        const lastTickPosition = props.xScale(lastTick);
        const lastTickToEnd = this.props.width - lastTickPosition;

        const labels = [];
        ticks.forEach((tick, index) => {
            let formattedValue =
                MoneyFormatter.formatMoneyWithPrecision(tick / units.unit, units.precision);

            if (tick === 0) {
                formattedValue = '$0';
            }
            else {
                formattedValue += units.unitLabel;
            }

            let alignment = 'middle';
            if (index === ticks.length - 1 && lastTickToEnd < 50) {
                // right-align the label if this is the last tick and there is less than 50px from
                // the end
                alignment = 'end';
            }

            const label = (<HorizontalXLabel
                key={`x-label-${tick}`}
                x={props.xScale(tick)}
                y={0}
                height={props.height}
                alignment={alignment}
                label={formattedValue} />);

            labels.push(label);
        });

        this.setState({
            labels
        });
    }

    render() {
        return (
            <g
                className="bar-axis"
                transform={`translate(${this.props.x},${this.props.y})`}>
                <title>X-Axis</title>
                <desc>
                    {`A horizontal axis depicting a range of monetary values from ${MoneyFormatter.formatMoney(this.props.range[0])} to ${MoneyFormatter.formatMoney(this.props.range[1])}.`}
                </desc>
                <line
                    className="x-axis"
                    x1={0}
                    x2={this.props.width}
                    y1={0}
                    y2={0} />
                <g className="axis-labels">
                    {this.state.labels}
                </g>
            </g>
        );
    }
}

HorizontalXAxis.propTypes = propTypes;
