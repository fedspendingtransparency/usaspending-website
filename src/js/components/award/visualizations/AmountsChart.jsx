/**
 * AmountsChart.jsx
 * Created by Emily Gullo 02/13/2017
 **/

import React from 'react';
import { scaleLinear } from 'd3-scale';

import SubAwardBar from './SubAwardBar';
import CurrentAwardBar from './CurrentAwardBar';
import PotentialAwardBar from './PotentialAwardBar';

const propTypes = {
    potential: React.PropTypes.number,
    current: React.PropTypes.number,
    sub: React.PropTypes.number,
    graphWidth: React.PropTypes.number,
    graphHeight: React.PropTypes.number
};

const defaultProps = {
    graphWidth: 500,
    graphHeight: 300
};

export default class AmountsChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        this.generateChart = this.generateChart.bind(this);
    }

    componentDidMount() {
        this.generateChart();
    }

    generateChart() {
        // Set Y axis min and max
        // Uncalculated values for now
        // Once this is working, sub in logic for handling missing/weird amounts
        const yRange = [];
        const yMin = 0;
        const yMax = this.props.potential;
        yRange.push(yMin);
        yRange.push(yMax);

        // Set graph size
        // Calculate this properly once this works
        const graphWidth = this.props.graphWidth;
        const graphHeight = this.props.graphHeight;

        // Math the y scale value (d3 magic)

        const yScale = scaleLinear()
            .domain(yRange)
            .range([0, graphHeight])
            .clamp(true);

        // Put the values together
        const items = [];

        const potential = this.props.potential;
        const current = this.props.current;
        const sub = this.props.sub;
        const potentialBarHeight = yScale(potential) - yScale(0);
        const potentialYPos = graphHeight - yScale(0) - potentialBarHeight;
        const currentBarHeight = yScale(current) - yScale(0);
        const currentYPos = graphHeight - yScale(0) - currentBarHeight;
        const subBarHeight = yScale(sub) - yScale(0);
        const subYPos = graphHeight - yScale(0) - subBarHeight;

        const potentialAwardBar = (<PotentialAwardBar
            identifier={`value-${potential}`}
            dataY={potential}
            height={potentialBarHeight}
            width={graphWidth}
            x="0"
            y={potentialYPos} />);
        items.push(potentialAwardBar);

        const currentAwardBar = (<CurrentAwardBar
            identifier={`value-${current}`}
            dataY={current}
            height={currentBarHeight}
            width={graphWidth}
            x="0"
            y={currentYPos} />);
        items.push(currentAwardBar);

        if (sub) {
            const subAwardBar = (<SubAwardBar
                identifier={`value-${sub}`}
                dataY={sub}
                height={subBarHeight}
                width={graphWidth}
                x="0"
                y={subYPos} />);
            items.push(subAwardBar);
        }

        this.setState({
            items
        });
    }

    render() {
        return (
            <div
                ref={(div) => {
                    this.divRef = div;
                }}>
                <svg
                    className="amounts-graph"
                    width={this.props.graphWidth}
                    height={this.props.graphHeight}
                    ref={(svg) => {
                        this.svgRef = svg;
                    }}>
                    {this.state.items}
                </svg>
            </div>
        );
    }
}
AmountsChart.propTypes = propTypes;
AmountsChart.defaultProps = defaultProps;
