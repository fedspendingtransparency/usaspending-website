/**
 * RankVisualization.jsx
 * Created by Kevin Li 2/2/17
 */

import React from 'react';
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
    descriptions: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    meta: PropTypes.object,
    disableTooltip: PropTypes.bool,
    industryCodeError: PropTypes.bool
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
        if (this.props.loading) {
            chart = (<ChartMessage message="Loading data..." />);
        }
        else if (this.props.error) {
            chart = (<ChartMessage message="An error has occurred." />);
            if (this.props.industryCodeError) {
                chart = (<ChartMessage message="Industry codes are unavailable for Sub-Awards." />);
            }
        }
        else if (this.props.dataSeries.length > 0) {
            const itemHeight = 35;
            // Height is number of results * item height + 30px padding
            const height = (this.props.dataSeries.length * itemHeight) + 30;
            chart = (
                <HorizontalChart
                    {...this.props}
                    itemHeight={itemHeight}
                    height={height}
                    selectItem={this.selectItem}
                    deselectItem={this.deselectItem} />
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
            <section
                className="results-visualization-rank-container"
                aria-label="Spending by Category">
                {chart}
                {legend}
                {tooltip}
            </section>
        );
    }
}

RankVisualization.propTypes = propTypes;
RankVisualization.defaultProps = defaultProps;
