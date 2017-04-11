/**
 * RankVisualization.jsx
 * Created by Kevin Li 2/2/17
 */

import React from 'react';

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
    dataSeries: React.PropTypes.array,
    descriptions: React.PropTypes.array,
    loading: React.PropTypes.bool,
    meta: React.PropTypes.object,
    disableTooltip: React.PropTypes.bool
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
        let chart = (<ChartMessage message={"No data to display"} />);
        if (this.props.loading) {
            chart = (<ChartMessage message={"Loading data..."} />);
        }
        else if (this.props.dataSeries.length > 0) {
            chart = (<HorizontalChart
                {...this.props}
                selectItem={this.selectItem}
                deselectItem={this.deselectItem} />);
        }

        let tooltip = null;
        if (this.state.showTooltip) {
            tooltip = (<RankVisualizationTooltip
                {...this.state.selectedItem}
                {...this.props.meta} />);
        }

        return (
            <div className="results-visualization-rank-container">
                {chart}
                {tooltip}
            </div>
        );
    }
}

RankVisualization.propTypes = propTypes;
RankVisualization.defaultProps = defaultProps;
