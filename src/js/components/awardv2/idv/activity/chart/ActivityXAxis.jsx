/**
 * ActivityXAxis.jsx
 * Created by Lizzie Salita 5/16/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import moment from 'moment';
import { convertDateToFY } from 'helpers/fiscalYearHelper';
import ActivityXAxisItem from './ActivityXAxisItem';

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
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.object
};

export default class ActivityXAxis extends React.Component {
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
            // TODO: adjust x-axis labels based on the time span
            // i.e. for smaller range show quarters,
            // for larger ranges don't show every FY
            const fiscalYear = convertDateToFY(moment(tick));
            return `FY ${fiscalYear}`;
        });

        // draw the grid lines
        const lineStart = -5;
        const lineEnd = 5;

        let description = '';
        if (tickLabels.length > 0) {
            description = `The X-axis of the chart, showing a range of dates from `;
            description += `${tickLabels[0]} to ${tickLabels[tickLabels.length - 1]}`;
        }

        // set all the labels 20px below the X axis
        const yPos = this.props.height + 20;

        // iterate through the D3 generated tick marks and add them to the chart
        const labels = props.ticks.map((tick, i) => {
            // calculate the X position
            // D3 scale returns the tick positions as pixels from the start of the axis
            const xPos = props.scale(tick) + this.props.padding.left;

            return (<ActivityXAxisItem
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
            <g
                className="bar-axis"
                transform={`translate(${this.props.padding.left},0)`}>
                <title>X-Axis</title>
                <desc>
                    {this.state.description}
                </desc>
                <line
                    className="x-axis"
                    x1={0}
                    y1={this.props.height}
                    x2={this.props.width}
                    y2={this.props.height}
                    style={lineStyle} />
                <g className="axis-labels">
                    {this.state.labels}
                </g>
            </g>
        );
    }
}

ActivityXAxis.propTypes = propTypes;
ActivityXAxis.defaultProps = defaultProps;
