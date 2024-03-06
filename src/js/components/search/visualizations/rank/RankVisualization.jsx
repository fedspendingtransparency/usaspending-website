/**
 * RankVisualization.jsx
 * Created by Kevin Li 2/2/17
 */

import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

import HorizontalChart from './chart/HorizontalChart';
import RankVisualizationTooltip from './RankVisualizationTooltip';
import ChartMessage from './RankVisualizationChartMessage';


const defaultProps = {
    labelSeries: [],
    dataSeries: [],
    linkSeries: [],
    descriptions: [],
    width: 0,
    loading: true,
    error: false,
    disableTooltip: false,
    urlRoot: ''
};

const propTypes = {
    dataSeries: PropTypes.array,
    linkSeries: PropTypes.array,
    descriptions: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    meta: PropTypes.object,
    disableTooltip: PropTypes.bool,
    industryCodeError: PropTypes.bool,
    recipientError: PropTypes.bool
};

export default class RankVisualization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTooltip: false,
            selectedItem: {}
        };

        this.selectItem = this.selectItem.bind(this);
        this.deselectItem = this.deselectItem.bind(this);
    }

    selectItem(data) {
        if (this.props.disableTooltip) {
            return;
        }

        this.setState({
            showTooltip: true,
            selectedItem: data
        });
    }

    deselectItem() {
        if (this.props.disableTooltip) {
            return;
        }

        this.setState({
            showTooltip: false
        });
    }

    render() {
        let chart = (<ChartMessage message="No data to display" />);
        let legend = null;

        let chart3;

        if (this.props.loading) {
            chart = (<ChartMessage message="Loading data..." />);
        }
        else if (this.props.error) {
            chart = (<ChartMessage message="An error has occurred." />);
            if (this.props.industryCodeError) {
                chart = (<ChartMessage message="Industry codes are unavailable for Sub-Awards." />);
            }
            else if (this.props.recipientError) {
                chart = (<ChartMessage message="Paging to 10,000 records and above is not available for Spending by Recipient." />);
            }
        }
        else if (this.props.dataSeries.length > 0) {
            const itemHeight = 35;
            // Height is number of results * item height + 30px padding
            const height = (this.props.dataSeries.length * itemHeight) + 30;

            // these two functions are from the 10249 pr
            const dataStuff = [];
            if (this.props.dataSeries.length === this.props.labelSeries.length) {
                for (let i = 0; i < this.props.dataSeries.length; i++) {
                    dataStuff.push({
                        value: this.props.dataSeries[i],
                        label: this.props.labelSeries[i],
                        desc: this.props.descriptions[i],
                        link: this.props.linkSeries[i]
                    });
                }
            }

            const CustomTick = (props) => {
                const {
                    x, y, stroke, payload, link
                } = props;
                return (
                    <g transform={`translate(${x},${y})`} >
                        <a href={`${link[payload.index].link}`}>
                            <text x={0} y={0} dy={0} textAnchor="end" fill="#666" fontSize={12} >
                                {payload.value}
                            </text>
                        </a>
                    </g>);
            };

            chart = (
                <HorizontalChart
                    {...this.props}
                    itemHeight={itemHeight}
                    height={height}
                    selectItem={this.selectItem}
                    deselectItem={this.deselectItem} />
            );

            chart3 = (
                <div className="recharts-time-visualization-container">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={dataStuff}
                            layout="vertical"
                            barCategoryGap={10}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 200,
                                bottom: 10
                            }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="label" tick={<CustomTick link={dataStuff} />} fontSize="12px" link="link" />
                            {/* todo - tooltips in next ticket */}
                            {/* <Tooltip /> */}
                            <Bar dataKey="value" fill="#8884d8" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            );
            legend = (
                <div className="visualization-legend">
                    <div className="visualization-legend__circle" />
                    <div className="visualization-legend__label">
                        Amount Obligated
                    </div>
                </div>
            );
        }

        let tooltip = null;
        if (this.state.showTooltip) {
            tooltip = (<RankVisualizationTooltip
                {...this.state.selectedItem}
                {...this.props.meta} />);
        }

        return (
            <>
                <section
                    className="results-visualization-rank-container"
                    aria-label="Spending by Category">
                    {chart}
                    {legend}
                    {tooltip}
                </section>

                {/* // <section */}
                {/* //     className="results-visualization-rank-container" */}
                {/* //     aria-label="Spending by Category"> */}
                {/* //     {chart3} */}
                {/* // </section> */}

                <div
                    className="recharts-time-visualization-container"
                    aria-label="Spending by Category ReChart">
                    {chart3}
                </div>
            </>
        );
    }
}

RankVisualization.propTypes = propTypes;
RankVisualization.defaultProps = defaultProps;
