/**
 * TimeVisualization.jsx
 * Created by Kevin Li 12/16/16
 */

import React from 'react';

import BarChart from './chart/BarChart';

const defaultProps = {
    data: [
        {
            year: 2013,
            value: 100
        },
        {
            year: 2014,
            value: 200
        },
        {
            year: 2015,
            value: 150
        },
        {
            year: 2016,
            value: 350
        }],
    yMin: 0,
    yMax: 0,
    width: 0,
    height: 250
};

export default class TimeVisualization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formattedData: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.formatData(nextProps.data);
    }

    formatData(data) {
        // build the data for each bar
        const formattedData = [];
        let yMin = this.state.yMin;
        let yMax = this.state.yMax;
        data.forEach((item) => {
            const dataPoint = {
                x: item.year,
                y: item.value
            };

            formattedData.push(dataPoint);

            if (item.value < yMin) {
                yMin = item.value;
            }
            if (item.value > yMax) {
                yMax = item.value;
            }
        });

        this.setState({ formattedData, yMin, yMax });
    }

    render() {
        return (
            <div className="results-visualization-time-container">
                <BarChart
                    width={this.props.width}
                    height={this.props.height}
                    yMin={this.props.yMin}
                    yMax={this.props.yMax}
                    data={this.state.formattedData} />
            </div>
        );
    }
}

TimeVisualization.defaultProps = defaultProps;
