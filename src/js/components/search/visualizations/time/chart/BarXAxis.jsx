/**
 * BarXAxis.jsx
 * Created by Kevin Li 12/19/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

import BarXAxisItem from './BarXAxisItem';

const defaultProps = {
    padding: {
        left: 0,
        bottom: 0,
        top: 0,
        right: 0
    },
    width: 0
};

const propTypes = {
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    padding: PropTypes.object,
    axisPos: PropTypes.number,
    visualizationPeriod: PropTypes.string
};

export default class BarXAxis extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            labels: []
        };
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            this.drawAxis(this.props);
        }
    }

    parseLabels(props) {
        if (!props.data || props.data.length === 0) {
            return props.data;
        }

        if (props.activeLabel) {
            const xPos = props.scale(props.activeLabel.xValue) + (props.scale.bandwidth() / 2);
            return ([<BarXAxisItem
                x={xPos}
                y={15}
                label={props.activeLabel.xValue}
                key={`label-x-${props.activeLabel.xValue}`} />]);
        }

        // Figure out which labels to show depending on type
        let labelIterator = 1;
        let labelOffset = 0;
        // Year has 4 quarters
        if (props.visualizationPeriod === "quarter") {
            labelIterator = 4;
        }
        else if (props.visualizationPeriod === "month") {
            labelIterator = 12;
        }

        // Get offset in case of first period
        if (props.visualizationPeriod !== "fiscal_year" && props.rawLabels) {
            labelOffset = this.calculateDateOffset(props.rawLabels[0], props.visualizationPeriod);
        }

        return (
            props.rawLabels.map((item, index) => {
                // offset the D3 calculated position by the left padding and put the label in
                // the middle
                // of the each tick's width to center the text
                if ((index - labelOffset) % labelIterator !== 0 && index !== 0) {
                    return null;
                }

                // Figure out what to call the label and where to place it
                const label = this.calculateLabel(item, props);
                const xPos = this.calculateXPos(item, index, labelOffset, props);

                return (<BarXAxisItem
                    x={xPos}
                    y={15}
                    label={label}
                    key={`label-x-${item}-${index}`} />);
            })
        );
    }

    // Finds the position of the label, under bar for years or
    // average start and end for monthly/quarterly
    calculateXPos(item, index, labelOffset, props) {
        if (props.visualizationPeriod === 'fiscal_year') {
            return props.scale(item.year) + (props.scale.bandwidth() / 2);
        }
        const endIndex = this.calculateEndIndex(
            index,
            props.data,
            props.visualizationPeriod,
            labelOffset);

        // Need to use props.data because you cant scale by objects
        return (props.scale(props.data[index]) + props.scale(props.data[endIndex]) + props.scale.bandwidth()) / 2;
    }

    // Gets the content of the label, year, break apart the quarter, or
    // Fiscal year increments if the date range started between oct-dec
    calculateLabel(item, props) {
        if (props.visualizationPeriod === 'fiscal_year') {
            return item.year;
        }
        const year = item.year;
        if (props.visualizationPeriod === 'quarter') {
            return year;
        }
        const months = ['Oct', 'Nov', 'Dec'];
        const increment = months.indexOf(item.period) !== -1 ? 1 : 0;
        return (parseInt(year, 10) + increment).toString();
    }

    // Calcuate how many periods until the end of the FY so that the year label
    // is placed correctly
    calculateDateOffset(item, type) {
        const period = item.period;
        if (type === 'month') {
            // Fiscal year starts in October, so calculate how many months until the
            // end of the year
            // Mod 12 because 12 month offset == to 0 month offset
            const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May',
                'Jun', 'Jul', 'Aug', 'Sep'];
            return (12 - months.indexOf(period)) % 12;
        }
        // Calculate how many quarters left in the year
        // Mod 4 because 4 quarter offset  == 0 quarter offset
        const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
        return (4 - quarters.indexOf(period)) % 4;
    }

    // Finds the end of the year for a range of dates
    // Only matters for the first section and last since the date range can start
    // in the middle or not be finished yet. Every other date should be a full range
    calculateEndIndex(index, data, type, offset) {
        // Blocks of 4 for quarters (0-3)
        if (type === 'quarter') {
            let endIndex = index + 3;
            if (index < offset) {
                endIndex = offset - 1;
            }
            if (endIndex >= data.length) {
                endIndex = data.length - 1;
            }
            return endIndex;
        }

        // Blocks of 12 for monthly (0-11)
        let endIndex = index + 11;
        if (index < offset) {
            endIndex = offset - 1;
        }
        if (endIndex >= data.length) {
            endIndex = data.length - 1;
        }
        return endIndex;
    }

    drawAxis(props) {
        if (!props.scale) {
            return;
        }

        // generate the X axis labels
        const labels = this.parseLabels(props);

        let description = '';
        if (props.data.length > 0) {
            description = `The X-axis of the chart, showing a range of time periods from `;
            description += `${props.data[0]} to ${props.data[props.data.length - 1]}`;
        }

        this.setState({
            labels,
            description
        });
    }

    render() {
        // draw the X axis at the zero Y-axis position (multiply by negative to account for the
        // fact that the bar axis group is shifted downward)
        return (
            <g
                className="bar-axis"
                transform={`translate(${this.props.padding.left},${this.props.top})`}>
                <title>X-Axis</title>
                <desc>
                    {this.state.description}
                </desc>
                <line
                    className="x-axis"
                    x1={0}
                    y1={-1 * this.props.axisPos}
                    x2={this.props.width}
                    y2={-1 * this.props.axisPos} />
                <g className="axis-labels">
                    {this.state.labels}
                </g>
            </g>
        );
    }
}

BarXAxis.propTypes = propTypes;
BarXAxis.defaultProps = defaultProps;
