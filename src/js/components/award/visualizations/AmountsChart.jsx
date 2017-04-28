/**
 * AmountsChart.jsx
 * Created by Emily Gullo 02/13/2017
 **/

import React from 'react';
import { scaleLinear } from 'd3-scale';
import _ from 'lodash';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import CurrentAwardBar from './CurrentAwardBar';
import PotentialAwardBar from './PotentialAwardBar';
import IndividualBar from './IndividualBar';
import AwardLabels from './AwardLabels';

const propTypes = {
    potential: React.PropTypes.number,
    current: React.PropTypes.number,
    graphHeight: React.PropTypes.number,
    awardId: React.PropTypes.number,
    showPotential: React.PropTypes.bool,
    type: React.PropTypes.string
};

const defaultProps = {
    graphHeight: 180,
    showPotential: true
};

const labelDistance = 15;
const labelPadding = 5;
const labelWidth = 200;

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
            currentMiddle: 0
        };

        this.measureWidth = this.measureWidth.bind(this);
    }

    componentDidMount() {
        this.generateChart();
        this.monitorWidth();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.graphWidth !== this.state.graphWidth ||
            prevProps.awardId !== this.props.awardId) {
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
        let yMin = 0;
        let yMax = this.props.potential;

        if (this.props.type !== 'contract') {
            yMax = this.props.current;
        }
        if (yMax === 0) {
            yMin = -100;
        }

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

        // draw the current bar
        const currentMiddle = this.props.graphHeight - (yScale(this.props.current) / 2);
        const currentY = this.props.graphHeight - yScale(this.props.current);
        const currentBar = (<CurrentAwardBar
            data={MoneyFormatter.formatMoney(this.props.current)}
            width={barWidth}
            height={yScale(this.props.current)}
            x={0}
            y={0} />);


        this.setState({
            barWidth,
            potentialY,
            currentY,
            potential: potentialBar,
            current: currentBar,
            currentMiddle
        });
    }

    render() {
        let potentialLabel = null;
        let potentialBar = null;

        if (this.props.showPotential) {
            potentialLabel = (<AwardLabels
                name="potential"
                amount={this.props.potential}
                groupTransform={`${200 + this.state.barWidth},0`}
                singleTransform={`${10 + labelDistance},5`}
                subtitle={`${_.capitalize(this.props.type)} Ceiling`}
                labelDistance={labelDistance}
                line="line"
                labelWidth={labelWidth}
                labelPadding={labelPadding}
                potentialY={this.state.potentialY}
                graphHeight={this.props.graphHeight} />);
            potentialBar = (<IndividualBar
                name="potential"
                yValue={this.state.potentialY}
                barValue={this.state.potential} />);
        }

        return (
            <div
                className="amounts-visualization-wrapper"
                ref={(div) => {
                    this.divRef = div;
                }}>
                <svg
                    className="amounts-graph"
                    width={this.state.graphWidth}
                    height={this.props.graphHeight + 30}
                    ref={(svg) => {
                        this.svgRef = svg;
                    }}>

                    <g transform="translate(0, 5)">

                        {potentialBar}
                        {potentialLabel}

                        <IndividualBar
                            name="current"
                            yValue={this.state.currentY}
                            barValue={this.state.current} />

                        <AwardLabels
                            name="current"
                            amount={this.props.current}
                            currentMiddle={this.state.currentMiddle}
                            groupTransform="0,0"
                            singleTransform={`0,${this.state.currentMiddle}`}
                            subtitle="Funding Obligated"
                            labelDistance={labelDistance}
                            line="poly"
                            labelWidth={labelWidth}
                            labelPadding={labelPadding}
                            currentY={this.state.currentY}
                            graphHeight={this.props.graphHeight}
                            type={this.props.type} />
                    </g>
                </svg>
            </div>
        );
    }
}
AmountsChart.propTypes = propTypes;
AmountsChart.defaultProps = defaultProps;
