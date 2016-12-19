/**
 * BarChart.jsx
 * Created by Kevin Li 12/16/16
 */

import React from 'react';
import * as d3 from 'd3';

import BarItem from './BarItem';
import BarXAxis from './BarXAxis';
import BarYAxis from './BarYAxis';

const propTypes = {

};

const paddingConst = {
    x: 50,
    y: 50,
    top: 20,
    right: 20
};

export default class BarChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     this.generateChart(nextProps);
    // }

    componentDidMount() {
        this.generateChart();
    }

    generateChart() {

        // const xAxis = d3.scaleBand().rangeRound([0, this.props.width]).padding(0.1);
        // const xValues = [];
        // this.props.data.forEach((item) => {
        //     xValues.push(item.x);
        // });

        // xAxis.domain(xValues);

        // const output = d3.svg.axisBottom(xAxis);
        // const output = axisBottom(this).apply(xAxis);
        // console.log(d3.svg.axis());
    }

    prepareXAxis() {
        const xProps = {
            height: this.props.height,
            width: this.props.width,
            data: this.props.data,
            paddingX: paddingConst.x,
            paddingY: paddingConst.y,
            paddingTop: paddingConst.top,
            paddingRight: paddingConst.right
        };

        return <BarXAxis {...xProps} />;
    }

    prepareYAxis() {
        const yProps = {
            height: this.props.height,
            width: this.props.width,
            data: this.props.data,
            paddingX: paddingConst.x,
            paddingY: paddingConst.y,
            paddingTop: paddingConst.top,
            paddingRight: paddingConst.right
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
