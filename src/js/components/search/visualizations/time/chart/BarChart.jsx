/**
 * BarChart.jsx
 * Created by Kevin Li 12/16/16
 */

import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import BarItem from './BarItem';
import BarXAxis from './BarXAxis';
import BarYAxis from './BarYAxis';

import BarXAxisItem from './BarXAxisItem';
import BarYAxisItem from './BarYAxisItem';

const propTypes = {

};

const paddingConst = {
    left: 50,
    bottom: 50,
    top: 20,
    right: 20
};

export default class BarChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            xLabels: [],
            yLabels: [],
            yGridLines: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.generateChart(nextProps);
    }

    // componentDidMount() {
    //     this.generateChart();
    // }

    generateChart(props) {

        // calculate the axes and ranges
        const xValues = [];
        const xRange = [];
        const yValues = [];
        const yRange = [];

        props.data.forEach((point) => {
            xValues.push(point.x);
            yValues.push(point.y);
        });

        xRange.push(_.min(xValues));
        xRange.push(_.max(xValues));

        yRange.push(_.min(yValues));
        yRange.push(_.max(yValues));

        // create the D3 scales for calculating the tick points
        const graphWidth = props.width - paddingConst.left - paddingConst.right;
        const graphHeight = props.height - paddingConst.top - paddingConst.bottom;

        const xScale = d3.scaleBand()
                    .domain(xValues)
                    .range([0, graphWidth])
                    .round(true);


        const yScale = d3.scaleLinear()
            .domain(yRange)
            .range([0, graphHeight]);

        this.setState({
            xScale,
            yScale
        });
    }

    prepareXAxis() {
        const xProps = {
            height: this.props.height,
            width: this.props.width,
            data: this.props.data,
            paddingLeft: paddingConst.left,
            paddingBottom: paddingConst.bottom,
            paddingTop: paddingConst.top,
            paddingRight: paddingConst.right,
            scale: this.state.xScale
        };

        return <BarXAxis {...xProps} />;
    }

    prepareYAxis() {
        const yProps = {
            height: this.props.height,
            width: this.props.width,
            data: this.props.data,
            paddingLeft: paddingConst.left,
            paddingBottom: paddingConst.bottom,
            paddingTop: paddingConst.top,
            paddingRight: paddingConst.right,
            scale: this.state.yScale
        };

        return <BarYAxis {...yProps} />;
    }

    render() {
        return (
            <svg className="bar-graph" width={this.props.width} height={this.props.height}>
                {this.state.items}
                {this.prepareXAxis()}
                {this.prepareYAxis()}
            </svg>
        );
    }
}

BarChart.propTypes = propTypes;
