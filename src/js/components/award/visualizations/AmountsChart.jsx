/**
 * AmountsChart.jsx
 * Created by Emily Gullo 02/13/2017
 **/

import React from 'react';
import { scaleLinear } from 'd3-scale';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import CurrentAwardBar from './CurrentAwardBar';
import PotentialAwardBar from './PotentialAwardBar';
import IndividualBar from './IndividualBar';
import AwardLabels from './AwardLabels';

const propTypes = {
    potential: React.PropTypes.number,
    current: React.PropTypes.number,
    graphHeight: React.PropTypes.number
};

const defaultProps = {
    graphHeight: 300
};

const labelDistance = 15;

export default class AmountsChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            graphWidth: 0,
            barWidth: 0,
            potential: null,
            potentialY: 0,
            current: null,
            currentY: 0,
            currentMiddle: 0,
            currentLabelPath: ''
        };

        this.measureWidth = this.measureWidth.bind(this);
    }

    componentDidMount() {
        this.generateChart();
        this.monitorWidth();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.graphWidth !== this.state.graphWidth) {
            this.generateChart();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.measureWidth);
    }

    monitorWidth() {
        window.addEventListener('resize', this.measureWidth);
        this.measureWidth();
    }

    measureWidth() {
        // measure the available width
        const width = this.divRef.getBoundingClientRect().width;
        this.setState({
            graphWidth: width
        });
    }

    calculateScale() {
        // Set Y axis min and max (always assume the potential exceeds the current value)
        const yMin = 0;
        const yMax = this.props.potential;

        // don't swap min and max if the potential value is negative; the scale needs to be inverted
        // anyway in that case

        // calculate the scale (reverse scale because greater Y is lower on the SVG image)
        const yScale = scaleLinear()
            .domain([yMin, yMax])
            .range([0, this.props.graphHeight]);

        return yScale;
    }

    generateChart() {
        if (this.state.graphWidth === 0) {
            return;
        }
        // calculate the Y axis scale
        const yScale = this.calculateScale();

        // leave 200px on each side for labels
        const barWidth = this.state.graphWidth - 400;

        // draw the potential bar
        const potentialY = this.props.graphHeight - yScale(this.props.potential);
        const potentialBar = (<PotentialAwardBar
            data={MoneyFormatter.formatMoney(this.props.potential)}
            width={barWidth}
            height={yScale(this.props.potential)}
            x={0}
            y={0} />);

        // draw the current var
        const currentY = this.props.graphHeight - yScale(this.props.current);
        const currentBar = (<CurrentAwardBar
            data={MoneyFormatter.formatMoney(this.props.current)}
            width={barWidth}
            height={yScale(this.props.current)}
            x={0}
            y={0} />);

        // calculate the label paths
        let currentLabelPath = '';
        // start at the top of the current bar
        currentLabelPath += `195,${currentY}`;
        // move left the specified amount
        currentLabelPath += ` ${195 - labelDistance},${currentY}`;
        // go to the bottom of the current bar
        currentLabelPath += ` ${195 - labelDistance},${this.props.graphHeight}`;
        // go to the edge of the bar
        currentLabelPath += ` 195,${this.props.graphHeight}`;
        // come back
        currentLabelPath += ` ${195 - labelDistance},${this.props.graphHeight}`;
        // go to the center
        const currentMiddle = this.props.graphHeight - (yScale(this.props.current) / 2);
        currentLabelPath += ` ${195 - labelDistance},${currentMiddle}`;
        // move left more to the text
        currentLabelPath += ` ${195 - (labelDistance * 2)},${currentMiddle}`;

        this.setState({
            barWidth,
            currentLabelPath,
            currentMiddle,
            potentialY,
            currentY,
            potential: potentialBar,
            current: currentBar
        });
    }

    render() {
        return (
            <div
                className="amounts-visualization-wrapper"
                ref={(div) => {
                    this.divRef = div;
                }}>
                <svg
                    className="amounts-graph"
                    width={this.state.graphWidth}
                    height={this.props.graphHeight + 10}
                    ref={(svg) => {
                        this.svgRef = svg;
                    }}>

                    <g transform="translate(0, 5)">
                        <IndividualBar
                            name="potential"
                            yValue={this.state.potentialY}
                            barValue={this.state.potential} />

                        <IndividualBar
                            name="current"
                            yValue={this.state.currentY}
                            barValue={this.state.current} />

                        <AwardLabels
                            name="current"
                            path={this.state.currentLabelPath}
                            middle={this.state.currentMiddle}
                            amount={this.props.current}
                            groupTransform="0,0"
                            singleTransform={`0,${this.state.currentMiddle}`}
                            subtitle="Funding Obligated"
                            labelDistance={labelDistance}
                            line="poly" />

                    </g>
                </svg>
            </div>
        );
    }
}
AmountsChart.propTypes = propTypes;
AmountsChart.defaultProps = defaultProps;
