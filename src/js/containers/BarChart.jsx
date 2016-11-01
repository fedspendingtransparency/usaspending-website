/**
 * BarChart.jsx
 * Created by Emily Gullo 10/14/2016
 **/
import rd3 from 'rd3';
import React from 'react';

export default class BarChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            barData: []
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({
            // replace with API input when available
            barData: [
                {
                    name: "Series A",
                    values: [
                        {
                            x: 1,
                            y: 91
                        },
                        {
                            x: 2,
                            y: 290
                        },
                        {
                            x: 3,
                            y: -25
                        }
                    ]
                },
                {
                    name: "Series B",
                    values: [
                        {
                            x: 1,
                            y: 9
                        },
                        {
                            x: 2,
                            y: 49
                        },
                        {
                            x: 3,
                            y: -20
                        }
                    ]
                },
                {
                    name: "Series C",
                    values: [
                        {
                            x: 1,
                            y: 14
                        },
                        {
                            x: 2,
                            y: 77
                        },
                        {
                            x: 3,
                            y: -70
                        }
                    ]
                }
            ]
        });
    }

    render() {
        return (
            // pass in appropriate vars + styles
            <rd3.BarChart
                data={this.state.barData}
                width={500}
                height={300}
                title="Bar Chart"
                xAxisLabel="Value"
                yAxisLabel="Label" />
        );
    }
}
