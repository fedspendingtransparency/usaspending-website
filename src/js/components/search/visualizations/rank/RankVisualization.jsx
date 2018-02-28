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
    height: 330,
    loading: true,
    disableTooltip: false,
    urlRoot: ''
};

const propTypes = {
    dataSeries: PropTypes.array,
    descriptions: PropTypes.array,
    loading: PropTypes.bool,
    meta: PropTypes.object,
    disableTooltip: PropTypes.bool
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
        else if (this.props.dataSeries.length > 0) {
            chart = (<HorizontalChart
                {...this.props}
                selectItem={this.selectItem}
                deselectItem={this.deselectItem} />);
            legend = (
                <div className="visualization-legend">
                    <div className="visualization-legend__circle" />
                    <div className="visualization-legend__label">
                        Obligations Incurred
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
