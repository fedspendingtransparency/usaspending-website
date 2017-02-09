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
    width: 0,
    height: 330,
    loading: true
};

const propTypes = {
    labelSeries: React.PropTypes.array,
    dataSeries: React.PropTypes.array,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    loading: React.PropTypes.bool
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
        this.setState({
            showTooltip: true,
            selectedItem: data
        });
    }

    deselectItem() {
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
